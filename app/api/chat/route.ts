import { streamText, UIMessage, convertToModelMessages, tool, InferUITools, UIDataTypes, stepCountIs } from "ai";
import { z } from "zod";

import { findRelevantContent } from "@/lib/ai/embedding";
import { registry } from "@/lib/ai/models";

const tools = {
  searchKnowledgeBase: tool({
    description: `Search the vector database for relevant information from uploaded PDF documents.
    Use this tool to retrieve semantically similar content based on the user's query.`,
    inputSchema: z.object({
      query: z.string().describe(`The search query to find relevant content.
        Formulate this as a semantic search query that captures the meaning and intent of what the user is asking about.`),
    }),
    execute: async ({ query }) => {
      try {
        // Search the vector database
        const results = await findRelevantContent(query);

        if (results.length === 0) {
          return "No relevant information found in the knowledge base.";
        }

        // Format results for the AI
        const formattedResults = results.map((r, i) => `[${i + 1}] ${r.content}`).join("\n\n");

        return formattedResults;
      } catch (error) {
        console.error("Search error:", error);
        return "Error searching the knowledge base.";
      }
    },
  }),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    const result = streamText({
      model: registry.languageModel("openai:fast"),
      messages: convertToModelMessages(messages),
      tools,
      system: `You are a helpful AI assistant with access to a vector database containing embeddings from uploaded PDF documents.

DATA ARCHITECTURE:
- PDFs are uploaded by users and their text content is extracted
- The text is split into chunks (~100 characters each with 20 character overlap using RecursiveCharacterTextSplitter)
- Each chunk is converted into a 1536-dimensional embedding vector using OpenAI's text-embedding-3-small model
- Embeddings are stored in a PostgreSQL database with pgvector extension in the 'embeddings' table
- Each embedding is linked to its source document in the 'resources' table via resource_id foreign key
- The database uses HNSW indexing for efficient vector similarity search

VECTOR SEARCH MECHANISM:
- When you search, the query is converted to an embedding using the same text-embedding-3-small model
- A cosine similarity search finds the most semantically similar chunks in the database
- Only chunks with similarity > 0.5 threshold are returned
- Results are ordered by similarity score (1 - cosine_distance) in descending order
- Maximum of 5 most relevant chunks are returned per search

HOW TO USE THE SEARCH TOOL:
1. ALWAYS use searchKnowledgeBase when users ask questions about uploaded documents, specific information, or topics that might exist in their PDFs
2. Search BEFORE attempting to answer - the embeddings database is your primary knowledge source
3. Formulate semantic queries that capture the meaning and intent, not just keywords
4. The tool returns numbered text chunks [1], [2], etc. - these are the actual content segments from the PDFs

ANSWERING BASED ON EMBEDDINGS:
- Treat search results as authoritative source material from the user's uploaded documents
- Synthesize information across multiple chunks when they relate to the same topic
- Be concise and focused - extract only what's needed to answer the user's specific question
- Don't repeat or dump all search results - intelligently summarize and answer
- If results are insufficient or irrelevant, clearly state what information is missing
- Reference that your answer comes from their uploaded documents when appropriate

WHEN NO RESULTS ARE FOUND:
- Acknowledge that no relevant information exists in the uploaded documents
- Don't make up or hallucinate information not present in the vector database
- Offer to help if they want to upload additional documents

The vector database with embeddings is your single source of truth for document-related queries. Always search the embeddings first, then respond based solely on what the vector search returns.`,
      stopWhen: stepCountIs(2),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}