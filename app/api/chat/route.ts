import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  InferUITools,
  UIDataTypes,
  stepCountIs,
} from "ai";
import { z } from "zod";

import { findRelevantContent } from "@/lib/ai/embedding";
import { registry } from "@/lib/ai/models";
import { buildSystemPrompt, toolDescription } from "./prompts";

const MAX_MESSAGES = 40;
const MAX_MESSAGE_LENGTH = 2000;

const tools = {
  searchKnowledgeBase: tool({
    // description: `Search the vector database for relevant information from uploaded documents.
    // Use this tool to retrieve semantically similar content based on the user's query.`,
    description: toolDescription,
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
          console.log(
            "📝 Top result preview:",
            results[0].content.substring(0, 100)
          );
        }

        if (results.length === 0) {
          return "No relevant information found in the knowledge base.";
        }

        // Format results for the AI
        const formattedResults = results
          .map(
            (r, i) =>
              `[${i + 1}] (Similarity: ${r.similarity.toFixed(3)}) ${r.content}`
          )
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

    if (!Array.isArray(messages)) {
      return new Response("Invalid request body", { status: 400 });
    }

    if (messages.length > MAX_MESSAGES) {
      return new Response("Too many messages in conversation", { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const lastMessageText = lastMessage?.parts
      ?.filter((p) => p.type === "text")
      .map((p) => (p as { type: "text"; text: string }).text)
      .join("");

    if (lastMessageText && lastMessageText.length > MAX_MESSAGE_LENGTH) {
      return new Response("Message is too long", { status: 400 });
    }

    const result = streamText({
      model: registry.languageModel("deepseek:fast"),
      messages: convertToModelMessages(messages),
      tools,
      system: buildSystemPrompt(),
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
