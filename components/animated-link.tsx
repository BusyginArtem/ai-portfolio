"use client";

import { easeIn, easeOut, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

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
  const handleClick = () => {
    if (typeof window === "undefined") return;

    if (href.startsWith("/#")) {
      const targetSelector = href.slice(1); // "#section"

      try {
        // disable all ScrollTriggers while animating
        ScrollTrigger.getAll().forEach((trigger) => trigger.disable(false));

        // Try to resolve an element first, otherwise pass the selector/string to ScrollToPlugin
        const el = document.querySelector(targetSelector);
        const scrollToTarget = el || targetSelector;

        console.log("GSAP scrolling to:", scrollToTarget);

        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: scrollToTarget,
            autoKill: false, // Prevents ScrollTrigger from interrupting the scroll tween
          },
          onComplete: () => {
            ScrollTrigger.refresh(true);
            ScrollTrigger.getAll().forEach((trigger) => trigger.enable());
          },
        });
      } catch (err) {
        console.error("GSAP scroll error:", err);
        // make sure triggers are enabled on error
        ScrollTrigger.getAll().forEach((trigger) => trigger.enable());
      }

      return;
    }

    if (href.startsWith("mailto")) {
      let a = document.createElement("a");
      a.href = href;
      a.target = "_blank";
      a.click();
    }
  };

  return (
    <motion.span
      className={cn(
        "relative inline-block cursor-pointer w-fit font-semibold ",
        className
      )}
      {...props}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      whileHover="enter"
      whileTap="enter"
      transition={{ duration: 0.2 }}
      role="link"
      tabIndex={0}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-current"
        variants={underlineAnimations}
      />
    </motion.span>
  );
}
