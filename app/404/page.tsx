"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { HomeIcon, ArrowLeftIcon } from "lucide-react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  const numberRef = useRef<HTMLHeadingElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate the 404 number
    if (numberRef.current) {
      gsap.fromTo(
        numberRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
      );
    }

    // Glitch effect on hover
    if (glitchRef.current) {
      const glitchElement = glitchRef.current;

      const handleMouseEnter = () => {
        gsap.to(glitchElement, {
          x: () => gsap.utils.random(-2, 2),
          y: () => gsap.utils.random(-2, 2),
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.set(glitchElement, { x: 0, y: 0 });
          },
        });
      };

      glitchElement.addEventListener("mouseenter", handleMouseEnter);
      return () => {
        glitchElement.removeEventListener("mouseenter", handleMouseEnter);
      };
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 md:px-10 py-16">
      <div className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div ref={glitchRef} className="relative">
          <motion.h1
            ref={numberRef}
            className="general-title text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            404
          </motion.h1>

          {/* Glitch effect layers */}
          <motion.div
            className="absolute inset-0 general-title text-destructive opacity-20 pointer-events-none"
            animate={{
              x: [0, -2, 2, 0],
              y: [0, 2, -2, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            aria-hidden="true"
          >
            404
          </motion.div>
        </div>

        {/* Error Message */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wider">
            Page Not Found
          </h2>
          <p className="text-base md:text-lg text-muted-foreground tracking-wide max-w-md mx-auto">
            The page you're looking for seems to have wandered off into the
            digital void.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="lg"
            className="cursor-pointer uppercase tracking-wider font-semibold w-full sm:w-auto"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Go Back
          </Button>

          <Button
            onClick={() => router.push("/")}
            size="lg"
            className="cursor-pointer uppercase tracking-wider font-semibold w-full sm:w-auto"
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            Home Page
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
