import ChatBot from "@/feature/chat";
import Hero from "@/feature/hero";
import Projects from "@/feature/projects";

export default function Portfolio() {
  return (
    <main className='flex flex-col gap-8 px-[16px] md:px-[32px] py-16 min-h-screen'>
      <Hero />
      
      <Projects />
      
      <ChatBot />
    </main>
  );
}
