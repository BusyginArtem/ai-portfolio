"use client";

import { useRef, useState } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function Hero() {
  const [fontsReady, setFontsReady] = useState(false);

  const container = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      setFontsReady(true);
    });
  }, []);

  useGSAP(
    () => {
      if (!fontsReady) return;

      const split = SplitText.create(container.current, {
        type: "words",
      });

      gsap.set(split.words, { opacity: "0.2" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            pin: true,
            pinSpacing: "margin",
            start: "center center",
            end: "+=800",
            scrub: 1,
            toggleActions: "play none none none",
            // markers: true,
          },
        })
        .to(split.words, {
          opacity: "1",
          duration: 0.75,
          ease: "none",
          stagger: 1,
        });
    },
    { scope: container, dependencies: [fontsReady] }
  );

  if (!fontsReady) {
    return <div className="min-h-dvh flex-1 px-4 md:px-8 " />;
  }

  return (
    <section
      ref={container}
      className="min-h-dvh md:max-w-[80%] col-center px-4 md:px-8 transition-colors"
    >
      <h1 className="text-4xl sm:text-6xl lg:text-8xl leading-none text-balance">
        I&apos;m Artem Busyhin, a front-end developer passionate about building
        sites & apps with great user experiences. My focus is React and Next.js
      </h1>
    </section>
  );
}
