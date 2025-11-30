"use client";

import { useRef } from "react";
import Image, { ImageLoader } from "next/image";
import { useMediaQuery } from "react-responsive";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    title: "AI Image Inpaint",
    description: "Owned by @artembusyhin",
    href: "https://ai-image-enhancer-ashen.vercel.app/",
    image:
      "https://res.cloudinary.com/dtrl8p5mc/image/upload/v1764245731/Screenshot_9_ykwzvq.png",
    dataId: "inpaint",
  },
  {
    title: "Greenspace",
    description: "Owned by @GreenSpacePro",
    href: "https://www.greenspacepro.com/",
    image:
      "https://res.cloudinary.com/dtrl8p5mc/image/upload/v1763725659/5_swm0ah.png",
    dataId: "greenspace",
  },
  {
    title: "Swan Bitcoin",
    description: "Owned by @swanbitcoin",
    image:
      "https://res.cloudinary.com/dtrl8p5mc/image/upload/v1763725659/4_supra1.png",
    href: "https://www.swanbitcoin.com/",
    dataId: "swan",
  },
  {
    title: "Sweet.TV",
    description: "Owned by @sweet.tv",
    image:
      "https://res.cloudinary.com/dtrl8p5mc/image/upload/v1763725659/3_rribvt.png",
    href: "https://sweet.tv",
    dataId: "sweet",
  },
  {
    title: "Timesact",
    description: "Owned by @timesact",
    href: "https://timesact.com/",
    image:
      "https://res.cloudinary.com/dtrl8p5mc/image/upload/v1763725659/2_hewtph.png",
    dataId: "timesact",
  },
] as const;

const imageLoader: ImageLoader = (config) => {
  const { src, quality } = config;
  const srcPaths = src.split("upload/");
  const urlStart = srcPaths[0];
  const urlEnd = srcPaths[1];
  const transformations = `h_600,q_${quality}/f_auto`;

  return `${urlStart}upload/${transformations}/${urlEnd}`;
};

export default function StackedCards() {
  const container = useRef<HTMLDivElement | null>(null);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useGSAP(
    () => {
      const contents = gsap.utils.toArray<HTMLDivElement>("#card-content");

      const tl = gsap
        .timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: container.current,
            pin: true,
            pinnedContainer: container.current,
            pinSpacing: true,
            start: "top top+=300px",
            end: `+=${contents.length * 100}%`,
            scrub: 1,
            // markers: true,
          },
        })
        .to(
          "#title",
          {
            scale: isTabletOrMobile ? 0.6 : 0.4,
            duration: 0.05,
            y: isTabletOrMobile ? -200 : -215,
          },
          0
        )
        .to(
          "#card-content",
          {
            duration: 0.05,
            y: isTabletOrMobile ? -200 : -250,
          },
          0
        );

      contents.reverse().forEach((content, idx) => {
        tl.to(content, {
          rotate: 0,
          duration: 0.25,
        }).to(content, {
          rotate: 0,
          duration: 0.12,
        });

        if (idx === contents.length - 1) return;

        tl.to(
          content,
          {
            x: -2000,
            rotateY: -90,
            duration: 0.25,
          },
          "+=0.15"
        );
      });
    },
    { scope: container, dependencies: [] }
  );

  return (
    <div ref={container} className="transition-colors">
      <h2
        id="title"
        className="text-4xl font-medium text-center md:text-[5vw] leading-none mb-10"
      >
        Some Projects
      </h2>

      <div className="relative h-full min-h-[50vh] perspective-midrange">
        {projects.map((project, idx) => (
          <article
            style={{
              zIndex: idx - 1,
              rotate: `${(idx + 1) * 0.9 * (idx % 2 === 0 ? 1 : -1)}deg`,
            }}
            key={project.title}
            id="card-content"
            data-card={project.dataId}
            className="group projects-card transform-3d mx-auto p-4 md:p-6 rounded-3xl max-w-[632px] md:max-w-[648px] flex flex-col items-center justify-between gap-6 absolute right-0 left-0"
          >
            <div className="w-full xl:w-[600px] md:h-full relative aspect-5/3 overflow-hidden rounded-3xl">
              <Image
                fill
                quality={75}
                loader={imageLoader}
                loading="lazy"
                src={project.image}
                alt={project.description}
                className="object-cover object-center rounded-3xl group-hover:scale-102 transition-transform duration-300"
              />
            </div>

            <div className="w-full">
              <a href={project.href} rel="noreferrer noopener" target="_blank">
                <h1 className="text-[clamp(1.5rem,3vw,3rem)] font-medium text-center">
                  {project.title}
                </h1>
              </a>
              <div className="flex wrap justify-center">
                {project.description.split(" ").map((part) => (
                  <span
                    key={part}
                    className="description mt-2 text-[clamp(0.65rem,2vw,0.9rem)] text-center uppercase ml-1 rounded-xs"
                  >
                    {part}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
