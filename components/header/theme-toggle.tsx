"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";

import { Button } from "@/components/ui/button";

const createPaintVariants = (
  xMove: number,
  yMove: number,
  disappearDelay: number = 0
) => ({
  initial: { y: yMove, x: yMove, opacity: 1 },
  animate: { y: 0, x: 0, opacity: 1 },
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

const createSunVariants = (
  xMove: number,
  yMove: number,
  disappearDelay: number = 0
) => ({
  initial: { y: yMove, x: yMove, opacity: 1 },
  animate: { y: 0, x: 0, opacity: 1 },
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
  initial: { y: yMove, x: xMove, pathLength: 1 },
  animate: { y: 0, x: 0, pathLength: 1 },
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
    const theme =
      resolvedTheme === "dark"
        ? "light"
        : resolvedTheme === "light"
        ? "coloured"
        : "dark";

    setNextTheme(theme);

    setTimeout(() => {
      setTheme(theme);
    }, 900);
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
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="text-muted-foreground [&_svg]:size-6 p-0 rounded-full relative overflow-visible cursor-theme"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence mode="wait">
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
            className="lucide lucide-sun cursor-theme"
            initial="initial"
            animate={isHovering ? "hover" : "animate"}
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
        ) : nextTheme === "light" ? (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-paintbrush-icon lucide-paintbrush"
            initial="initial"
            animate={isHovering ? "hover" : "animate"}
            exit="exit"
          >
            <motion.path
              d="m14.622 17.897-10.68-2.913"
              variants={createPaintVariants(-1, 1, 0.15)}
            />
            <motion.path
              d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"
              variants={createPaintVariants(-1, 1, 0.15)}
            />
            <motion.path
              d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"
              variants={createPaintVariants(-1, 1, 0.15)}
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
            className="lucide lucide-moon-star cursor-theme"
            initial="initial"
            animate={isHovering ? "hover" : "animate"}
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
    </Button>
  );
}

export default ThemeToggle;
