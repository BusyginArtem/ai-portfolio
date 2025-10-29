"use client";

import { createContext, useContext, type ReactNode } from "react";
import { UIMessage, useChat, type UseChatHelpers } from "@ai-sdk/react";

type ChatContextType = UseChatHelpers<UIMessage> | null;

const ChatContext = createContext<ChatContextType>(null);

export function useChatContext() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChatContext must be used within ChatProvider");
  }
  return context;
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const chat = useChat({});

  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}
