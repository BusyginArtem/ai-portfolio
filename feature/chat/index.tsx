import ChatHeader from "./header";
import ChatConversation from "./conversation";
import Prompt from "./prompt";

export default function ChatBot() {
  return (
    <div
      id='chat'
      className='flex flex-col justify-end min-h-screen max-w-6xl mx-auto p-4 pb-[64px] px-6 size-full flex-1'
    >
      <div className='flex flex-col h-full'>
        <ChatHeader key='header' />

        <ChatConversation key='conversation' />

        <Prompt key='prompt' />
      </div>
    </div>
  );
}
