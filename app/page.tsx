import ChatBot from "@/feature/chat";
import Hero from "@/feature/hero";

export default function Portfolio() {
  return (
    <main className='flex flex-col gap-8 px-[16px] md:px-[32px] py-16 min-h-screen'>
      <Hero />
      <div className='h-96'></div>
      <div className='h-96'></div>
      <div className='h-96'></div>
      <ChatBot />
    </main>
  );
}
