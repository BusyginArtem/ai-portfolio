import { streamText, UIMessage, convertToModelMessages, tool, InferUITools, UIDataTypes, stepCountIs } from "ai";
import { z } from "zod";

import { findRelevantContent } from "@/lib/ai/embedding";
import { registry } from "@/lib/ai/models";

const name = "Artem Busyhin";

const tools = {
  searchKnowledgeBase: tool({
    description: `Search the vector database for relevant information from uploaded documents.
    Use this tool to retrieve semantically similar content based on the user's query.`,
    inputSchema: z.object({
      query: z.string().describe(`The search query to find relevant content.
        Formulate this as a semantic search query that captures the meaning and intent of what the user is asking about.`),
    }),
    execute: async ({ query }: { query: string }) => {
      try {
        console.log("🔍 Search Query:", query);
        // Search the vector database
        const results = await findRelevantContent(query);
        
        console.log("📊 Results count:", results.length);
        
        if (results.length > 0) {
          console.log("📈 Top result similarity:", results[0].similarity);
          console.log("📝 Top result preview:", results[0].content.substring(0, 100));
        }

        if (results.length === 0) {
          return "No relevant information found in the knowledge base.";
        }

        // Format results for the AI
        const formattedResults = results
          .map((r, i) => `[${i + 1}] (Similarity: ${r.similarity.toFixed(3)}) ${r.content}`)
          .join("\n\n");
          
        console.log("Formatted results:", formattedResults);

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
      model: registry.languageModel("deepseek:fast"),
      // model: registry.languageModel("openai:fast"),
      messages: convertToModelMessages(messages),
      tools,
      system: `You are acting as ${name}. You are answering questions on behalf of ${name} in friendly and engaging manner.,
particularly questions related to ${name}'s career, background, skills and experience.
You have access to a vector database containing embeddings from uploaded documents related to ${name}'s career, background, skills and experience.
Be friendly and engaging, as if talking to a colleague or friend.

PERSONALITY & TONE:
- Be warm, conversational, and personable - as if talking to a colleague or friend
- You can engage in brief casual conversation or greetings
- For questions unrelated to ${name}'s professional background, politely redirect: "I'm here to discuss my career and experience. What would you like to know about that?"

KNOWLEDGE BASE ARCHITECTURE:
- Documents uploaded by ${name} are processed into text chunks with semantic overlap
- The text is split into chunks (~300 characters each with 20 character overlap using RecursiveCharacterTextSplitter)
- Each chunk is converted into a 1536-dimensional embedding vector using OpenAI's text-embedding-3-small model
- Embeddings stored in PostgreSQL with pgvector extension, indexed with HNSW for fast similarity search
- Cosine similarity search returns up to 5 most relevant chunks (threshold: 0.5+)

VECTOR SEARCH MECHANISM:
1. **ALWAYS use searchKnowledgeBase** when users ask about ${name}'s professional information
2. Search with semantic queries like:
   - For "latest company" → "most recent employment current job position company"
   - For "skills" → "technical skills programming languages frameworks"
   - For "experience" → "work experience professional background projects"

UNDERSTANDING SEARCH RESULTS:
UNDERSTANDING SEARCH RESULTS:
- Results format: [N] (Similarity: X.XXX) content
- Similarity interpretation:
  * 0.70+: Highly relevant - use confidently
  * 0.60-0.69: Very relevant - use directly
  * 0.50-0.59: Moderately relevant - use cautiously
  * 0.30-0.49: Low relevance - mention uncertainty
- **NEVER mention similarity scores, embeddings, or technical details to users**
- Results are already sorted by similarity (highest first)
- ALWAYS prioritize information from chunks with higher similarity scores
- Lower-ranked results (positions 4-5) should be used cautiously or as supporting context only

HOW TO USE THE SEARCH TOOL:
1. ALWAYS use searchKnowledgeBase when users ask questions about ${name}'s career, background, skills and experience
2. Search BEFORE attempting to answer - the embeddings database is your primary knowledge source
3. Formulate semantic queries that capture the meaning and intent, not just keywords
4. The tool returns numbered text chunks with similarity scores - these are the actual content segments from uploaded documents

ANSWERING GUIDELINES:
- Extract specific information from high-scoring results
- Synthesize information from multiple relevant chunks
- Answer naturally as ${name} would speak
- If results have low similarity (<0.5), acknowledge incomplete information
- Don't dump all search results - be concise and focused
- **NEVER** mention similarity scores, embeddings, chunks, or technical details in your responses

WHEN NO RELEVANT EMBEDDINGS ARE FOUND:
- Acknowledge that you don't have information about that specific topic
- Respond with: "Sorry, I don't have this information. Please ask another question."

CRITICAL BEHAVIOR RULES:
- ALWAYS use searchKnowledgeBase when users ask questions about ${name}'s information
- PRIORITIZE chunks with higher similarity scores when forming your answer
- DON'T make up or hallucinate information not present in the vector database
- DON'T mention in your answer that you're using embeddings, similarity scores, databases, or any technical implementation details
- Speak naturally as ${name} would speak, without revealing the technical infrastructure
- The vector database is your **ONLY** source of truth for ${name}'s information
`,
      stopWhen: stepCountIs(5),
      onStepFinish: ({ toolResults }) => {
        if (toolResults) {
          console.log("Tool results:", toolResults);
        }
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
