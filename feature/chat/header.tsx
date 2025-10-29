export default function ChatHeader() {
  return (
    <div className='flex flex-col items-center justify-center flex-1 space-y-4 border-b-[1px] border-border border-spacing-2 pb-4'>
      <h2 className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-oswald uppercase tracking-wider text-center '>
        Ask me anything
      </h2>
      <p className='text-base sm:text-2xl text-muted-foreground text-center text-balance'>
        I&apos;m here to answer questions about my experience, skills, and background
      </p>
    </div>
  );
}
