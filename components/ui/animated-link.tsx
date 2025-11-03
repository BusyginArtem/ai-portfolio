"use client";

import Link from "next/link";
import { easeIn, easeOut, motion } from "motion/react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

const underlineAnimations = {
  exit: {
    width: "0%",
    easeIn: easeIn(0.35),
  },
  enter: {
    width: "100%",
    easeOut: easeOut(0.55),
  },
};

export default function AnimatedLink({
  href,
  className,
  children,
  ...props
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <MotionLink
      href={href}
      className={cn("relative inline-block mr-10 text-base", className)}
      {...props}
      whileHover='enter'
      whileTap='enter'
      transition={{ duration: 0.2 }}
    >
      {children}
      <motion.span className='absolute bottom-0 left-0 h-[2px] bg-current' variants={underlineAnimations} />
    </MotionLink>
  );
}
