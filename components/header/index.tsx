import AnimatedLink from "@/components/ui/animated-link";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className='bg-background theme-colors transition-colors fixed px-4 md:px-10 z-10 top-0 w-full border-b border-borders grid grid-cols-3 text-sm uppercase tracking-wider items-center justify-between '>
      <div className='text-left py-6'>
        <AnimatedLink href='/#projects'>Projects</AnimatedLink>
      </div>

      <div className='text-center'>
        <ThemeToggle />
      </div>
      <div className='text-right py-6'>
        <AnimatedLink href='/#chat'>Chat</AnimatedLink>
      </div>
    </header>
  );
}
