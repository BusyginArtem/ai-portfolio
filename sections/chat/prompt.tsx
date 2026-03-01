"use client";

import { useState } from "react";

import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import {
  Suggestion,
  Suggestions,
} from "@/components/ai-elements/suggestion";
import { useChatContext } from "@/components/providers/chat-context";

const SUGGESTED_QUESTIONS = [
  "What are your main skills?",
  "Tell me about your experience",
  "What projects have you worked on?",
  "What technologies do you use?",
  "What is your educational background?",
];

export default function Prompt() {
  const [input, setInput] = useState("");

  const { sendMessage, status, messages } = useChatContext();

  const showSuggestions = messages.length === 0;

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text) {
      return;
    }
    sendMessage({
      text: message.text,
    });
    setInput("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage({ text: suggestion });
  };

  return (
    <div className="mt-4 md:mt-6 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-150">
      {showSuggestions && (
        <Suggestions className="mb-3">
          {SUGGESTED_QUESTIONS.map((q) => (
            <Suggestion key={q} suggestion={q} onClick={handleSuggestionClick} />
          ))}
        </Suggestions>
      )}
      <PromptInput
        onSubmit={handleSubmit}
        className=" **:data-[slot=input-group]:ring-black/5!"
      >
        <PromptInputBody className="">
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What would you like to know about me?"
            className=" text-base md:text-lg resize-none placeholder:text-muted-foreground/50 placeholder:text-xl"
          />
        </PromptInputBody>
        <PromptInputFooter className="border-t">
          <PromptInputTools>
            <span className="text-lg text-muted-foreground hidden sm:inline">
              Press Enter to send
            </span>
          </PromptInputTools>
          <PromptInputSubmit
            disabled={!input && !status}
            status={status}
            className="rounded-md cursor-pointer text-background"
          />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}
