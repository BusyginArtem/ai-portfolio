"use client";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  return <div>Hero</div>;
}
