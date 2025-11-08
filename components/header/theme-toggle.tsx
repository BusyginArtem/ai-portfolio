"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";

import { Button } from "@/components/ui/button";

const MotionButton = motion.create(Button);

const createSunVariants = (
  xMove: number,
  yMove: number,
  disappearDelay: number = 0
) => ({
  initial: { y: 0, x: 0, opacity: 1 },
  hover: {
    y: yMove,
    x: xMove,
    transition: {
      duration: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      delay: disappearDelay,
    },
  },
});

const createMoonVariants = (
  xMove: number,
  yMove: number,
  disappearDelay: number = 0
) => ({
  initial: { y: 0, x: 0, opacity: 1, pathLength: 1 },
  hover: {
    y: yMove,
    x: xMove,
    transition: {
      duration: 0.05,
    },
  },
  exit: {
    pathLength: 0,
    transition: {
      delay: disappearDelay,
    },
  },
});

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [nextTheme, setNextTheme] = useState(resolvedTheme);

  const toggleTheme = () => {
    const theme = resolvedTheme === "light" ? "dark" : "light";
    setNextTheme(theme);

    setTimeout(() => {
      setTheme(theme);
    }, 850);
  };

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <MotionButton
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="text-muted-foreground [&_svg]:size-6 p-0 rounded-full relative overflow-visible"
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        {nextTheme === "dark" ? (
          <motion.svg
            key="sun"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-sun"
            initial="initial"
            animate={isHovering ? "hover" : "initial"}
            exit="exit"
          >
            {/* Sun center */}
            <motion.circle
              cx="12"
              cy="12"
              r="4"
              variants={createSunVariants(0, 0, 0.5)}
            />

            {/* Sun rays */}
            <motion.path
              d="M12 2v2"
              variants={createSunVariants(0, -1, 0.45)}
            />
            <motion.path d="M12 20v2" variants={createSunVariants(0, 1, 0.4)} />
            <motion.path
              d="m4.93 4.93 1.41 1.41"
              variants={createSunVariants(-1, -1, 0.35)}
            />
            <motion.path
              d="m17.66 17.66 1.41 1.41"
              variants={createSunVariants(1, 1, 0.3)}
            />
            <motion.path
              d="M2 12h2"
              variants={createSunVariants(-2, 0, 0.25)}
            />
            <motion.path d="M20 12h2" variants={createSunVariants(2, 0, 0.2)} />
            <motion.path
              d="m6.34 17.66-1.41 1.41"
              variants={createSunVariants(-1, 1, 0.15)}
            />
            <motion.path
              d="m19.07 4.93-1.41 1.41"
              variants={createSunVariants(1, -1, 0.1)}
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-moon-star"
            initial="initial"
            animate={isHovering ? "hover" : "initial"}
            exit="exit"
          >
            <motion.path
              d="M18 5h4"
              variants={createMoonVariants(1, -1, 0.3)}
            />
            <motion.path
              d="M20 3v4"
              variants={createMoonVariants(1, -1, 0.4)}
            />
            <motion.path
              d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
              variants={createMoonVariants(0, 0, 0.5)}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </MotionButton>
  );
}

export default ThemeToggle;
