"use client";

import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function SmoothScroll({
  children,
  trigger,
  className,
}: {
  children: React.ReactNode;
  trigger: string;
  className?: string;
}) {
  const smoother = useRef<ScrollSmoother>();

  const scrollTo = () => {
    if (!smoother.current) return;

    smoother.current.scrollTo(trigger, true, "center center");
  };

  useGSAP(() => {
    smoother.current = ScrollSmoother.create({
      smooth: 2,
      effects: true,
    });
    ScrollTrigger.create({
      trigger,
      // pin: true,
      start: "center center",
      // end: "+=20",
      // markers: true,
    });
  });

  return (
    <Button
      variant="link"
      onClick={scrollTo}
      className={cn(
        "underline-offset-4 uppercase underline hover:no-underline text-base py-0 h-auto",
        className
      )}
    >
      {children}
    </Button>
  );
}
