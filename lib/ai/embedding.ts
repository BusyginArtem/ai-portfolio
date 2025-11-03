import { embedMany, embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { chunkContent } from "./chunking";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { embeddings } from "@/lib/db/schema/embeddings";

const embeddingModel = openai.embedding("text-embedding-3-small");

export const generateEmbeddings = async (data: string): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = await chunkContent(data, 1500);
  
  console.log(`📦 Generated ${chunks.length} chunks from document`);
  console.log(`📏 Average chunk size: ${Math.round(chunks.reduce((sum, c) => sum + c.length, 0) / chunks.length)} chars`);

  const { embeddings: embeddingVectors  } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });

   return embeddingVectors.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateEmbedding = async (text: string): Promise<number[]> => {
  const input = text.replaceAll("\n", " ").trim();

  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });

  return embedding;
};

export const findRelevantContent = async (userQuery: string, limit: number = 5, threshold: number = 0.5) => {
  try {
    console.log("🔍 Searching for:", userQuery);
    
    // Generate embedding for the query
    const userQueryEmbedded = await generateEmbedding(userQuery);
    console.log("✅ Query embedding generated, dimensions:", userQueryEmbedded.length);

    // Calculate similarity
    const similarity = sql<number>`1 - (${cosineDistance(embeddings.embedding, userQueryEmbedded)})`;

    // Execute search
    const similarGuides = await db
      .select({ 
        content: embeddings.content, 
        similarity,
        id: embeddings.id 
      })
      .from(embeddings)
      .where(gt(similarity, threshold))
      .orderBy((t) => desc(t.similarity))
      .limit(limit);

    console.log(`📊 Found ${similarGuides.length} results above threshold ${threshold}`);
    
    if (similarGuides.length > 0) {
      console.log(`📈 Top similarity: ${similarGuides[0].similarity.toFixed(3)}`);
    }

    // If no results above threshold, try without threshold to see what's available
    if (similarGuides.length === 0) {
      console.log("⚠️  No results above threshold, checking all embeddings...");
      
      const allResults = await db
        .select({ 
          content: embeddings.content, 
          similarity 
        })
        .from(embeddings)
        .orderBy((t) => desc(t.similarity))
        .limit(3);
      
      console.log(`📊 Total embeddings available: checking top 3`);
      allResults.forEach((r, i) => {
        console.log(`  [${i + 1}] Similarity: ${r.similarity.toFixed(3)} - ${r.content.substring(0, 80)}...`);
      });
    }

    return similarGuides;
  } catch (error) {
    console.error("❌ Error in findRelevantContent:", error);
    throw error;
  }
};
