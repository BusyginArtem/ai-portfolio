import AnimatedLink from "../animated-link";

export default function Footer() {
  return (
    <footer className="bg-background fixed px-4 md:px-10 py-5 z-10 bottom-0 w-full border-t flex flex-col gap-2 sm:gap-0 sm:flex-row  md:items-center justify-between">
      <p className="text-base md:text-xl uppercase tracking-wider">
        Currently in Europe (GMT +01:00)
      </p>

      <AnimatedLink
        href="mailto:artembusygin87@gmail.com?body=Hi Artem,"
        className="uppercase text-base md:text-xl tracking-wider"
      >
        Write Me
      </AnimatedLink>
    </footer>
  );
}
