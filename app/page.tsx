import ChatBot from "@/feature/chat";
import Hero from "@/feature/hero";

export default function Portfolio() {
  return (
    <main className='flex flex-col gap-8 px-[16px] md:px-[32px] py-16 min-h-[100vh]'>
      <Hero />
      <ChatBot />
    </main>
  );
}
