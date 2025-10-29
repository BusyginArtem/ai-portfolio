"use client";

import { useRef, useState } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function Hero() {
  const [fontsReady, setFontsReady] = useState(false);

  const container = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      setFontsReady(true);
    });
  });

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
            start: "center center",
            end: "+=600",
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
    return <div className='min-h-screen flex-1' />;
  }

  return (
    <div className='min-h-screen md:max-w-[80%] flex-1 flex flex-col justify-center items-center mt-[-64px]'>
      <h1 ref={container} className='text-2xl sm:text-6xl lg:text-8xl leading-none text-balance'>
        I&apos;m Artem Busyhin, a front-end developer passionate about building sites & apps with great user
        experiences. My focus is React and Next.js
      </h1>
    </div>
  );
}
