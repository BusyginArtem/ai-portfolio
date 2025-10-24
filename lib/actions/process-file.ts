"use server";

import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

import { NewResourceParams, insertResourceSchema, resources } from "@/lib/db/schema/resources";
import { db } from "@/lib/db";
import { generateEmbeddings } from "@/lib/ai/embedding";
import { embeddings as embeddingsTable } from "@/lib/db/schema/embeddings";

async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  // Handle PDF files
  if (fileType === "application/pdf" && fileName.endsWith(".pdf")) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const data = new PDFParse({ data: buffer });
    const { text } = await data.getText();
    return text;
  }

  // Handle DOCX files (Word documents)
  if (
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
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

      return result.value;
    } catch (error) {
      console.error("Mammoth extraction error:", error);
      throw new Error(
        `Failed to extract text from DOCX file: ${error instanceof Error ? error.message : "Unknown error"}`
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

      return result.value;
    } catch (error) {
      console.error("Mammoth extraction error:", error);
      throw new Error(
        `Failed to extract text from DOC file: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  throw new Error(`Unsupported file type: ${fileType || "unknown"}. Supported formats: PDF, DOC, DOCX`);
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

    const [resource] = await db.insert(resources).values({ content }).returning();

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
