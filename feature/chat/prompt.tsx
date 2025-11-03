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
import { useChatContext } from "@/components/providers/chat-context";

export default function Prompt() {
  const [input, setInput] = useState("");

  const { sendMessage, status } = useChatContext();
  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text) {
      return;
    }
    sendMessage({
      text: message.text,
    });
    setInput("");
  };

  return (
    <div className='mt-4 md:mt-6 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-150'>
      <PromptInput onSubmit={handleSubmit} className=' [&_[data-slot=input-group]]:!ring-black/5'>
        <PromptInputBody className=''>
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='What would you like to know about me?'
            className=' text-base md:text-lg resize-none placeholder:text-muted-foreground/50 placeholder:text-xl'
          />
        </PromptInputBody>
        <PromptInputFooter className='border-t'>
          <PromptInputTools>
            <span className='text-lg text-muted-foreground hidden sm:inline'>Press Enter to send</span>
          </PromptInputTools>
          <PromptInputSubmit disabled={!input && !status} status={status} className='' />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}
