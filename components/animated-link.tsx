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
    if (href.startsWith("/#")) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.disable(false));

      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: href.slice(1),
          autoKill: false, // Prevents ScrollTrigger from interrupting the scroll tween
        },
        onComplete: () => {
          ScrollTrigger.refresh(true);
          ScrollTrigger.getAll().forEach((trigger) => trigger.enable());
        },
      });
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
      whileHover="enter"
      whileTap="enter"
      transition={{ duration: 0.2 }}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] bg-current"
        variants={underlineAnimations}
      />
    </motion.span>
  );
}
