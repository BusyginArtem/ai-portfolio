import ChatHeader from "./header";
import ChatConversation from "./conversation";
import Prompt from "./prompt";

export default function ChatBot() {
  return (
    <div className="flex flex-col justify-end min-h-screen max-w-6xl mx-auto px-[16px] md:px-[32px] pb-[64px] size-full flex-1">
      <div className="flex flex-col h-full">
        <ChatHeader key="header" />

        <ChatConversation key="conversation" />

        <Prompt key="prompt" />
      </div>

      <div id="chat" className="h-1 w-1" />
    </div>
  );
}
