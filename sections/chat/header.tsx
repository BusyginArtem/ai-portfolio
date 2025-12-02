"use client";

import { useRef, useState } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function ChatHeader() {
  const [fontsReady, setFontsReady] = useState(false);

  const container = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      setFontsReady(true);
    });
  }, []);

  useGSAP(
    () => {
      if (!fontsReady || !container.current) return;

      const title = SplitText.create(".title", {
        type: "lines",
      });

      const subtitle = SplitText.create(".subtitle", {
        type: "lines",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom-=250px",
            once: true,
            // markers: true,
          },
        })
        .from(title.lines, {
          duration: 0.5,
          y: 150,
          ease: "power2.out",
          stagger: 0.2,
        })
        .from(
          subtitle.lines,
          {
            duration: 0.5,
            y: 200,
            stagger: 0.2,
            ease: "power2.out",
          },
          ">-0.35"
        );
    },
    { scope: container, dependencies: [fontsReady] }
  );

  if (!fontsReady) {
    return (
      <div className="">
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-oswald uppercase tracking-wider text-center "></h2>
        <p className="text-base sm:text-2xl text-muted-foreground text-center text-balance"></p>
      </div>
    );
  }

  return (
    <div
      ref={container}
      className="col-center flex-1 space-y-4 border-b border-border border-spacing-2 pb-4"
    >
      <h2 className="title text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-oswald uppercase tracking-wider text-center ">
        Ask me anything
      </h2>
      <p className="subtitle text-base sm:text-2xl text-muted-foreground text-center text-balance">
        I&apos;m here to answer questions about my experience, skills, and
        background
      </p>
    </div>
  );
}
