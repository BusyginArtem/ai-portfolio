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
  if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const data = new PDFParse({ data: buffer });
    const { text } = await data.getText();
    return text;
  }

  // Handle DOCX files (Word documents)
  if (
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx")
  ) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  // Handle DOC files (older Word format)
  if (fileType === "application/msword" || fileName.endsWith(".doc")) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
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

    console.log("<<<<<<<<<<<<<<<<<< content >>>>>>>>>>>>>>>>>>>>>>", content);

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
      message: "PDF processed successfully",
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
