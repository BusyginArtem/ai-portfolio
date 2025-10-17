import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { createProviderRegistry, customProvider, defaultSettingsMiddleware, wrapLanguageModel } from "ai";

const customOpenAI = customProvider({
  languageModels: {
    fast: openai("gpt-5-nano"),
    smart: openai("gpt-5-mini"),
    reasoning: wrapLanguageModel({
      model: openai("gpt-5-mini"),
      middleware: defaultSettingsMiddleware({
        settings: {
          providerOptions: {
            openai: {
              reasoningEffort: "high",
            },
          },
        },
      }),
    }),
  },
  fallbackProvider: openai,
});

const customAnthropic = customProvider({
  languageModels: {
    fast: anthropic("claude-3-5-haiku-20241022"),
    smart: anthropic("claude-sonnet-4-20250514"),
  },
  fallbackProvider: anthropic,
});

export const registry = createProviderRegistry({
  openai: customOpenAI,
  anthropic: customAnthropic,
});

