import ChatHeader from "./header";
import ChatConversation from "./conversation";
import Prompt from "./prompt";

export default function Chat() {
  return (
    <section
      className="flex flex-col justify-end max-w-6xl mx-auto px-4 md:px-8 pb-16 size-full flex-1 mt-20 md:mt-32 transition-colors"
      aria-label="AI integrated chat section to get information about skills and experience. Includes chat header, conversation area, and prompt input."
    >
      <div className="flex flex-col h-full">
        <ChatHeader key="header" />

        <ChatConversation key="conversation" />

        <Prompt key="prompt" />
      </div>

      <div id="chat" className="h-1 w-1" />
    </section>
  );
}
