import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className='theme-colors coloured:bg-blue transition-colors fixed px-4 md:px-10 z-10 top-0 w-full border-b border-borders grid grid-cols-3 text-sm uppercase tracking-wider items-center justify-between '>
      <div className='text-left py-6'>
        <a href='/#projects' className='underline hover:no-underline mr-10'>
          Projects
        </a>
      </div>
      <div className='text-center'>
        <ThemeToggle />
      </div>
      <div className='text-right py-6'>
        <a href='/#contact' className='underline hover:no-underline'>
          Chat
        </a>
      </div>
    </header>
  );
}
