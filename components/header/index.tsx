import AnimatedLink from "@/components/animated-link";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="bg-background theme-colors transition-colors fixed z-10 top-0 border-b">
      <nav className="grid grid-cols-3 items-center w-screen px-4 md:px-10 ">
        <div className="text-left py-4 md:py-6">
          <AnimatedLink href="/#projects" className="header-link">
            Projects
          </AnimatedLink>
        </div>

        <div className="text-center">
          <ThemeToggle />
        </div>

        <div className="text-right py-4 md:py-6">
          <AnimatedLink href="/#chat" className="header-link">
            Chat
          </AnimatedLink>
        </div>
      </nav>
    </header>
  );
}
