"use server";

import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

import {
  NewResourceParams,
  insertResourceSchema,
  resources,
} from "@/lib/db/schema/resources";
import { db } from "@/lib/db";
import { generateEmbeddings } from "@/lib/ai/embedding";
import { embeddings as embeddingsTable } from "@/lib/db/schema/embeddings";

/**
 * Pre-process resume text for better chunking and vector search
 */
function preprocessText(text: string): string {
  return (
    text
      // Normalize line endings
      .replace(/\r\n/g, "\n")
      // Remove excessive whitespace
      .replace(/\n{3,}/g, "\n\n")
      // Clean up common PDF artifacts
      .replace(/\s+/g, " ")
      // Preserve section structure
      .replace(/^([A-Z][A-Za-z\s&/]+):?$/gm, "\n\n$1\n")
      // Normalize bullet points
      .replace(/^[•\-\*]\s+/gm, "- ")
      .trim()
  );
}

async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  // Handle PDF files
  if (fileType === "application/pdf" && fileName.endsWith(".pdf")) {
    const bytes = await file.arrayBuffer();
    const data = new PDFParse({ data: new Uint8Array(bytes) });
    const { text } = await data.getText();
    console.log("📄 Raw PDF text length:", text.length);
    return preprocessText(text);
  }

  // Handle DOCX files (Word documents)
  if (
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
    fileName.endsWith(".docx")
  ) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      // Create a proper Node.js Buffer from the ArrayBuffer
      const buffer = Buffer.from(new Uint8Array(arrayBuffer));

      const result = await mammoth.extractRawText({
        buffer: buffer,
      });

      if (!result.value || result.value.trim().length === 0) {
        throw new Error("No text content found in DOCX file");
      }

      console.log("📄 Raw DOCX text length:", result.value.length);
      return preprocessText(result.value);
    } catch (error) {
      console.error("Mammoth extraction error:", error);
      throw new Error(
        `Failed to extract text from DOCX file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // Handle DOC files (older Word format)
  if (fileType === "application/msword" && fileName.endsWith(".doc")) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(new Uint8Array(arrayBuffer));

      const result = await mammoth.extractRawText({ buffer: buffer });

      if (!result.value || result.value.trim().length === 0) {
        throw new Error("No text content found in DOC file");
      }

      console.log("📄 Raw DOC text length:", result.value.length);
      return preprocessText(result.value);
    } catch (error) {
      console.error("Mammoth extraction error:", error);
      throw new Error(
        `Failed to extract text from DOC file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  throw new Error(
    `Unsupported file type: ${
      fileType || "unknown"
    }. Supported formats: PDF, DOC, DOCX`
  );
}

export const uploadDocument = async (formData: FormData) => {
  try {
    const file = formData.get("document") as File;

    if (!file) {
      return {
        success: false,
        message: "No file provided",
      };
    }

    const text = await extractTextFromFile(file);

    if (!text || text.trim().length === 0) {
      return {
        success: false,
        message: "No text found in document",
      };
    }

    const input: NewResourceParams = {
      content: text,
    };

    const { content } = insertResourceSchema.parse(input);

    const [resource] = await db
      .insert(resources)
      .values({ content })
      .returning();

    const embeddings = await generateEmbeddings(content);
    await db.insert(embeddingsTable).values(
      embeddings.map((embedding) => ({
        resourceId: resource.id,
        ...embedding,
      }))
    );

    return {
      success: true,
      message: "Document processed successfully",
    };
  } catch (e) {
    console.log("Error processing PDF", e);
    if (e instanceof Error) {
      return {
        success: false,
        message: e.message.length > 0 ? e.message : "Error, please try again.",
      };
    }

    return {
      success: false,
      message: "Error, please try again.",
    };
  }
};
