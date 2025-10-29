"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, easeIn, easeOut } from "motion/react";

import { Button } from "@/components/ui/button";

const buttonAnimations = {
  initial: { rotate: 0 },
  hover: { rotate: 25 },
  tap: { rotate: 25 },
};

const iconAnimations = {
  exit: {
    scale: 0,
    rotate: 90,
    opacity: 0,
    transition: {
      scale: { duration: 0.45 },
      opacity: { duration: 0.65 },
      rotate: { duration: 0.45 },
    },
    easeIn: easeIn(0.35),
  },
  enter: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      scale: { duration: 0.45 },
      opacity: { duration: 0.55 },
      rotate: { duration: 0.55 },
    },
    easeOut: easeOut(0.55),
  },
};

const MotionButton = motion.create(Button);

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <MotionButton
      onClick={toggleTheme}
      variant='ghost'
      size='icon'
      className='text-muted-foreground [&_svg]:size-6 p-0 rounded-full relative overflow-visible'
      variants={buttonAnimations}
      initial='initial'
      whileHover='hover'
      whileTap='tap'
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode='wait' initial={false}>
        <motion.div
          key={resolvedTheme}
          variants={iconAnimations}
          initial='exit'
          animate='enter'
          exit='exit'
          className='absolute inset-0 flex items-center justify-center'
        >
          {resolvedTheme === "dark" ? <Sun /> : <Moon />}
        </motion.div>
      </AnimatePresence>
    </MotionButton>
  );
}

export default ThemeToggle;
