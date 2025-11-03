"use client";

import { Fragment } from "react";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { Loader } from "@/components/ai-elements/loader";
import { useChatContext } from "@/components/providers/chat-context";

export default function ChatConversation() {
  const { messages, status } = useChatContext();

  return (
    <Conversation className='h-full'>
      <ConversationContent className='space-y-6'>
        {messages.map((message, idx) => (
          <div
            key={message.id}
            className='animate-in slide-in-from-bottom-4 fade-in duration-500'
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return (
                    <Fragment key={`${message.id}-${i}`}>
                      <Message from={message.role} className='transition-all duration-200 hover:scale-[1.01]'>
                        <MessageContent variant='flat' className='backdrop-blur-sm'>
                          <Response className='text-lg leading-relaxed'>{part.text}</Response>
                        </MessageContent>
                      </Message>
                    </Fragment>
                  );
                default:
                  return null;
              }
            })}
          </div>
        ))}

        {/* Loading indicator with animation */}
        {(status === "submitted" || status === "streaming") && (
          <div className='animate-in slide-in-from-bottom-2 fade-in duration-300'>
            <Message from='assistant'>
              <MessageContent variant='flat'>
                <Loader className='my-2' />
              </MessageContent>
            </Message>
          </div>
        )}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
}
