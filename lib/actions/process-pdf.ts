"use server";

import { PDFParse } from "pdf-parse";

import { NewResourceParams, insertResourceSchema, resources } from "@/lib/db/schema/resources";
import { db } from "@/lib/db";
import { generateEmbeddings } from "@/lib/ai/embedding";
import { embeddings as embeddingsTable } from "@/lib/db/schema/embeddings";

export const processPdfFile = async (formData: FormData) => {
  try {
    const file = formData.get("pdf") as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const data = new PDFParse({ data: buffer });
    const { text } = await data.getText();

    if (!text || text.trim().length === 0) {
      return {
        success: false,
        message: "No text found in PDF",
      };
    }

    const input: NewResourceParams = {
      content: text,
    };

    const { content } = insertResourceSchema.parse(input);

    console.log("<<<<<<<<<<<<<<<<<< content >>>>>>>>>>>>>>>>>>>>>>", content)

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
    console.error("Error processing PDF", e);
    if (e instanceof Error) {
      return {
        success: false,
        message: e.message.length > 0 ? e.message : "Error, please try again.",
      };
    };

    return {
      success: false,
      message: "Error, please try again.",
    };
  }
};
