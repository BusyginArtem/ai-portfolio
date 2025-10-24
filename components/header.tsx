export default function Header() {
  return (
    <header className='theme-colors coloured:bg-blue transition-colors fixed px-4 md:px-10 z-10 top-0 w-full border-b border-borders grid grid-cols-3 text-sm uppercase tracking-wider items-center justify-between '>
      <div className='text-left py-6'>
        <a href='/#projects' className='underline hover:no-underline mr-10'>
          Projects
        </a>
      </div>
      <div className='text-center py-6'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          className='lucide lucide-moon-icon lucide-moon'
        >
          <path d='M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401' />
        </svg>
        {/* ---------------------------------------------- */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          className='lucide lucide-sun-icon lucide-sun'
        >
          <circle cx='12' cy='12' r='4' />
          <path d='M12 2v2' />
          <path d='M12 20v2' />
          <path d='m4.93 4.93 1.41 1.41' />
          <path d='m17.66 17.66 1.41 1.41' />
          <path d='M2 12h2' />
          <path d='M20 12h2' />
          <path d='m6.34 17.66-1.41 1.41' />
          <path d='m19.07 4.93-1.41 1.41' />
        </svg>
      </div>
      <div className='text-right py-6'>
        <a href='/#contact' className='underline hover:no-underline'>
          Contact
        </a>
      </div>
    </header>
  );
}
