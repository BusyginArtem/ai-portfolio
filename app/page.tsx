import ChatBot from "@/feature/chat";
import Hero from "@/feature/hero";
import Projects from "@/feature/projects";
import SkillsSection from "@/feature/skills";

export default function Portfolio() {
  return (
    <main className="flex flex-col gap-8 py-16 min-h-screen">
      <Hero />

      <SkillsSection />

      <Projects />

      <ChatBot />
    </main>
  );
}
