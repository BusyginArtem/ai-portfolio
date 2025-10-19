import { embedMany, embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { chunkContent } from "./chunking";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { embeddings } from "@/lib/db/schema/embeddings";

const embeddingModel = openai.embedding("text-embedding-3-small");

export const generateEmbeddings = async (data: string): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = await chunkContent(data);

  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });

  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateEmbedding = async (text: string): Promise<number[]> => {
  const input = text.replaceAll("\n", " ");

  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });

  return embedding;
};

export const findRelevantContent = async (userQuery: string, limit: number = 5, threshold: number = 0.5) => {
  const userQueryEmbedded = await generateEmbedding(userQuery);

  const similarity = sql<number>`1 - (${cosineDistance(embeddings.embedding, userQueryEmbedded)})`;

  const similarGuides = await db
    .select({ content: embeddings.content, similarity })
    .from(embeddings)
    .where(gt(similarity, threshold))
    .orderBy((t) => desc(t.similarity))
    .limit(limit);

    console.log('similarGuides >>>>>>>>>>>>>>>>>>>>>', similarGuides)

  return similarGuides;
};
