"use client";

import {useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function Hero() {
  const container = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    const splitLetters = SplitText.create(container.current, { type: "words" });

    gsap.set(splitLetters.chars, { opacity: "0.2" });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          start: "center center",
          end: "+=150",
          scrub: 1
        }
      })
      .to(splitLetters.chars, {
        opacity: "1",
        duration: 1,
        ease: "none",
        stagger: 1
      });
  }, { scope: container })


  return <div ref={container} className="min-h-screen px-4 md:px-10 flex items-center content-center">
    <h1 className="text-5xl md:text-[6vw] leading-none lg:max-w-[80%] relative z-[2]">
      I&apos;m Artem Busyhin, a front-end developer passionate about
      building sites & apps with great user experiences. My focus is React and Next.js
    </h1>
  </div>;
}
