"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, easeInOut } from "motion/react";

import { Button } from "@/components/ui/button";

const createPaintVariants = (
  yMove: number,
  rotate: number = 0,
  disappearDelay: number = 0
) => ({
  initial: { y: yMove, pathLength: 1 },
  animate: { y: 0, x: 0, pathLength: 1 },
  hover: {
    y: yMove,
    rotate,
    transition: {
      duration: 0.05,
    },
  },
  exit: {
    y: yMove * 10,
    rotate: rotate * 3,
    pathLength: 0,
    transition: {
      delay: disappearDelay,
      easeInOut,
      rotate: {
        duration: 0.2,
      },

      pathLength: {
        delay: disappearDelay + 0.5, // or hardcoded number
        duration: 0.4,
      },
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
  const [currentTheme, setCurrentTheme] = useState(resolvedTheme);

  const toggleTheme = () => {
    const theme =
      resolvedTheme === "dark"
        ? "light"
        : resolvedTheme === "light"
        ? "coloured"
        : "dark";

    setCurrentTheme(theme);

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
      role="button"
      aria-label="Toggle theme button"
      variant="ghost"
      size="icon"
      className="text-muted-foreground [&_svg]:size-6.5 p-0 rounded-full relative overflow-visible cursor-theme"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence mode="wait">
        {currentTheme === "dark" ? (
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
        ) : currentTheme === "light" ? (
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
            className="lucide lucide-paint-bucket-icon lucide-paint-bucket"
            initial="initial"
            animate={isHovering ? "hover" : "animate"}
            exit="exit"
          >
            <motion.path
              variants={createPaintVariants(0, 7, 0.15)}
              d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"
            />
            <motion.path
              variants={createPaintVariants(0, 7, 0.15)}
              d="m5 2 5 5"
            />
            <motion.path
              variants={createPaintVariants(0, 7, 0.15)}
              d="M2 13h15"
            />
            <motion.path
              variants={createPaintVariants(1.05, 0, 0.15)}
              d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"
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
