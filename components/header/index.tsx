import Link from "next/link";
import ThemeToggle from "./theme-toggle";
// import SmoothScroll from "../ui/smooth-scroll";

export default function Header() {
  return (
    <header className='bg-background theme-colors transition-colors fixed px-4 md:px-10 z-10 top-0 w-full border-b border-borders grid grid-cols-3 text-sm uppercase tracking-wider items-center justify-between '>
      <div className='text-left py-6'>
        <Link href='/#projects' className='underline hover:no-underline mr-10 text-base'>
          Projects
        </Link>
      </div>
      {/* <div className='text-left py-6'>
        <SmoothScroll trigger='#projects' className='uppercase underline hover:no-underline text-base py-0 h-auto'>
          Projects
        </SmoothScroll>
      </div> */}

      <div className='text-center'>
        <ThemeToggle />
      </div>
      <div className='text-right py-6'>
        <Link href='/#chat' className='underline hover:no-underline text-base'>
          Chat
        </Link>
      </div>

      {/* <div className='text-right py-6'>
        <SmoothScroll trigger='#chat'>Chat</SmoothScroll>
      </div> */}
    </header>
  );
}
