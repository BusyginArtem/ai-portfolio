import ChatBot from "@/sections/chat";
import Hero from "@/sections/hero";
import Projects from "@/sections/projects";
import SkillsSection from "@/sections/skills";

export const dynamic = "force-static";

export default function Portfolio() {
  return (
    <main className="flex flex-col py-16 min-h-screen">
      <Hero />

      <SkillsSection />

      <Projects />

      <ChatBot />
    </main>
  );
}
