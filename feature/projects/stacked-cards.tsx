"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    title: "Greenspace",
    description:
      "Enterprise SaaS platform for cannabis operations — built to streamline projects, licenses, locations and compliance across regulated facilities. Owned by @GreenSpacePro",
    image: "/projects/greenspace.webp",
    href: "https://www.greenspacepro.com/",
  },
  {
    title: "Swan Bitcoin",
    description: "Bitcoin investment platform. Owned by @swanbitcoin",
    image: "/projects/swan.webp",
    href: "https://www.swanbitcoin.com/",
  },
  {
    title: "Sweet.TV",
    description:
      "Streaming platform site for SWEET.TV - built to showcase its multi-region OTT service, rich content catalogue and smart device coverage. Owned by @sweet.tv",
    image: "/projects/sweet.tv.webp",
    href: "https://sweet.tv",
  },
  {
    title: "Timesact",
    description: "SaaS Marketing Website for Shopify App. Owned by @timesact",
    image: "/projects/timesact.webp",
    href: "https://timesact.com/",
  },
] as const;

export default function StackedCards() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const contents = gsap.utils.toArray<HTMLDivElement>("#card-content");
      const texts = gsap.utils.toArray<HTMLDivElement>("#card-text");
      const images = gsap.utils.toArray<HTMLDivElement>("#card-image");

      // Set initial states for all elements
      contents.forEach((content, idx) => {
        if (idx === 0) {
          // First card is visible
          gsap.set(texts[idx], { opacity: 1, y: 0 });
          gsap.set(images[idx], {
            scale: 1,
            opacity: 1,
            y: 0,
            x: 0,
          });
        } else {
          // Other cards start hidden and scaled down
          gsap.set(texts[idx], { opacity: 0, y: 50 });
          gsap.set(images[idx], {
            scale: 0.85,
            opacity: 0,
            rotate: 0,
            y: 20,
            x: 0,
          });
        }
      });

      // Create timeline
      const tl = gsap
        .timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: container.current,
            pin: true,
            pinnedContainer: container.current,
            pinSpacing: true,
            start: "top top+=125px",
            end: `+=${contents.length * 100}%`,
            scrub: 1,
            // markers: true,
          },
        })
        .to(
          images[0],
          {
            rotate: -2,
          },
          0
        );

      // Animate through each card transition
      contents.forEach((_, idx) => {
        if (idx === contents.length - 1) return;

        const currentText = texts[idx];
        const nextImage = images[idx + 1];
        const nextText = texts[idx + 1];

        // Each card transition takes up equal timeline space
        tl
          // Fade out and move up current text
          .to(currentText, {
            opacity: 0,
            y: -50,
            duration: 1,
          })
          // Scale up and reveal next image (overlapping with text fadeout)
          .to(
            nextImage,
            {
              scale: 1,
              opacity: 1,
              y: (idx + 1) * 5,
              x: (idx + 1) * 5,
              rotate: (idx + 1) * 1.5 * (idx % 2 === 0 ? 1 : -1),
              duration: 1.25,
            },
            "<0.2" // Start 0.3s after previous animation starts
          )
          // Fade in next text (overlapping with image reveal)
          .to(
            nextText,
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
            },
            "<0.3" // Start 0.5s after image animation starts
          )
          // Add pause between card transitions
          .to({}, { duration: 0.3 });
      });
    },
    { scope: container, dependencies: [] }
  );

  return (
    <div
      ref={container}
      className="transition-colors w-full px-4 md:px-6 xl:px-8"
    >
      <h2 className="text-4xl md:text-[5vw] leading-none max-w-[80%] pb-4 md:pb-8">
        Some Projects
      </h2>

      <div className="relative h-full min-h-[50vh] py-6">
        {projects.map((project, idx) => (
          <a
            href={project.href}
            rel="noreferrer noopener"
            target="_blank"
            style={{ zIndex: idx + 1 }}
            key={project.title}
            id="card-content"
            className="text-card-foreground p-2 md:p-8 flex flex-col md:flex-row gap-12 md:gap-20 justify-center items-center absolute right-0 left-0 cursor-look"
          >
            <div className="w-full max-w-3xl h-full" id="card-text">
              <h1 className="text-[clamp(1rem,3vw,2rem)]">{project.title}</h1>
              <p className="mt-2 text-[clamp(1rem,2vw,1.15rem)]">
                {project.description}
              </p>
            </div>
            <div
              className="w-full xl:w-[600px] h-full min-h-[300px] xl:min-h-[50vh] relative"
              id="card-image"
            >
              <Image
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={project.image}
                alt={project.description}
                className="aspect-video mx-auto object-contain object-center"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
