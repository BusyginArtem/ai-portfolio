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
        wordsClass: "word",
      });

      gsap.set(split.words, { opacity: "0.2" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            pin: true,
            start: "center center",
            end: "+=350",
            scrub: 1,
          },
        })
        .to(split.words, {
          opacity: "1",
          duration: 1,
          ease: "none",
          stagger: 1,
        });
    },
    { scope: container, dependencies: [fontsReady] }
  );

  if (!fontsReady) {
    return <div className='md:max-w-[80%] lg:max-w-[50%] flex-1 flex flex-col justify-center items-center' />;
  }

  return (
    <div className='md:max-w-[80%] lg:max-w-[50%] flex-1 flex flex-col justify-center items-center'>
      <h1 ref={container} className='text-2xl md:text-4xl lg:text-6xl leading-none'>
        I&apos;m Artem Busyhin, a front-end developer passionate about building sites & apps with great user
        experiences. My focus is React and Next.js
      </h1>
    </div>
  );
}
