"use client";

import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    title: "Greenspace",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tellus at erat facilisis sodales sit amet vel nibh. Aliquam posuere nunc ut augue vehicula, vitae porttitor elit faucibus. Integer neque nibh, euismod id nulla vitae, scelerisque consectetur est.",
    image: "/projects/greenspace.webp",
    href: "https://www.greenspacepro.com/",
  },
  {
    title: "Swan Bitcoin",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tellus at erat facilisis sodales sit amet vel nibh. Aliquam posuere nunc ut augue vehicula, vitae porttitor elit faucibus. Integer neque nibh, euismod id nulla vitae, scelerisque consectetur est.",
    image: "/projects/swan.webp",
    href: "https://www.swanbitcoin.com/",
  },
  {
    title: "Sweet.TV",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tellus at erat facilisis sodales sit amet vel nibh. Aliquam posuere nunc ut augue vehicula, vitae porttitor elit faucibus. Integer neque nibh, euismod id nulla vitae, scelerisque consectetur est.",
    image: "/projects/sweet.tv.webp",
    href: "https://sweet.tv",
  },
  {
    title: "Timesact",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tellus at erat facilisis sodales sit amet vel nibh. Aliquam posuere nunc ut augue vehicula, vitae porttitor elit faucibus. Integer neque nibh, euismod id nulla vitae, scelerisque consectetur est.",
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

      // Target the first paragraph of the first #card-content div
      // if (texts.length > 0) {
      //   const firstText = texts[0] as HTMLElement;

      //   if (firstText) {
      //     gsap.set(firstText, { y: -50 });
      //   }
      // }

      //  Set initial states for all elements
      contents.forEach((content, idx) => {
        if (idx === 0) {
          // First card is visible
          gsap.set(texts[idx], { opacity: 1, y: -50 });
          gsap.set(images[idx], {
            scale: 1,
            opacity: 1,
            rotate: -3,
            y: 0,
            x: 0,
          });
        } else {
          // Other cards start hidden and scaled down
          gsap.set(texts[idx], { opacity: 0, y: 0 });
          gsap.set(images[idx], {
            scale: 0.8,
            opacity: 0,
            rotate: 0,
            y: 0,
            x: 0,
          });
        }
      });

      const tl = gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: container.current,
            pin: true,
            pinSpacing: "margin",
            start: "bottom 100px",
            // end: "+=1600",
            end: `+=${contents.length * 50}%`,
            scrub: 3,
            markers: true,
          },
        })
        .to(
          images[0],
          {
            rotate: -3,
          },
          0
        );

      contents.forEach((_, idx) => {
        if (idx === contents.length - 1) return;

        tl.to(texts[idx], { opacity: 0, duration: 2 }, "+=0.5")
          .to(
            images[idx + 1],
            {
              scale: 1,
              duration: 2,
              y: (idx + 1) * 5,
              x: (idx + 1) * 5,
              opacity: 1,
              rotate: (idx + 1) * 3 * (idx % 2 === 0 ? 1 : -1),
            },
            "<"
          )
          .to(texts[idx + 1], { opacity: 1, y: -50, duration: 2 }, "<+=0.5");
      });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="transition-colors w-full h-[80vh] border-t skills_border-bottom-offset px-4 md:px-8 xl:px-32 relative"
    >
      {projects.map((project, idx) => (
        <div
          className="size-full text-card-foreground p-2 md:p-8 flex flex-col md:flex-row gap-4 justify-center items-center absolute inset-0"
          style={{ zIndex: projects.length + idx }}
          key={project.title}
          id="card-content"
        >
          <div className="w-full xl:flex-1 h-full" id="card-text">
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
              className="aspect-video mx-auto object-contain object-center saturate-[-9] brightness-5"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// "use client";

// import { useRef } from "react";
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

// gsap.registerPlugin(useGSAP, ScrollTrigger);

// const projects = [
//   {
//     title: "Greenspace",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tellus at erat facilisis sodales sit amet vel nibh. Aliquam posuere nunc ut augue vehicula, vitae porttitor elit faucibus. Integer neque nibh, euismod id nulla vitae, scelerisque consectetur est.",
//     image: "/projects/greenspace.webp",
//     href: "https://www.greenspacepro.com/",
//   },
//   {
//     title: "Swan Bitcoin",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tellus at erat facilisis sodales sit amet vel nibh. Aliquam posuere nunc ut augue vehicula, vitae porttitor elit faucibus. Integer neque nibh, euismod id nulla vitae, scelerisque consectetur est.",
//     image: "/projects/swan.webp",
//     href: "https://www.swanbitcoin.com/",
//   },
//   {
//     title: "Sweet.TV",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tellus at erat facilisis sodales sit amet vel nibh. Aliquam posuere nunc ut augue vehicula, vitae porttitor elit faucibus. Integer neque nibh, euismod id nulla vitae, scelerisque consectetur est.",
//     image: "/projects/sweet.tv.webp",
//     href: "https://sweet.tv",
//   },
//   {
//     title: "Timesact",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tellus at erat facilisis sodales sit amet vel nibh. Aliquam posuere nunc ut augue vehicula, vitae porttitor elit faucibus. Integer neque nibh, euismod id nulla vitae, scelerisque consectetur est.",
//     image: "/projects/timesact.webp",
//     href: "https://timesact.com/",
//   },
// ] as const;

// export default function StackedCards() {
//   const container = useRef(null);

//   useGSAP(
//     () => {
//       const contents = gsap.utils.toArray<HTMLDivElement>("#card-content");
//       const texts = gsap.utils.toArray<HTMLDivElement>("#card-text");
//       const images = gsap.utils.toArray<HTMLDivElement>("#card-image");

//       // Set initial states for all elements
//       contents.forEach((content, idx) => {
//         if (idx === 0) {
//           // First card is visible
//           gsap.set(texts[idx], { opacity: 1, y: 0 });
//           gsap.set(images[idx], {
//             scale: 1,
//             opacity: 1,
//             rotate: -3,
//             y: 0,
//             x: 0,
//           });
//         } else {
//           // Other cards start hidden and scaled down
//           gsap.set(texts[idx], { opacity: 0, y: 0 });
//           gsap.set(images[idx], {
//             scale: 0.8,
//             opacity: 0,
//             rotate: 0,
//             y: 0,
//             x: 0,
//           });
//         }
//       });

//       const tl = gsap.timeline({
//         defaults: { ease: "power2.inOut" },
//         scrollTrigger: {
//           trigger: container.current,
//           pin: true,
//           pinSpacing: "margin",
//           start: "bottom 100px",
//           end: `+=${contents.length * 100}%`,
//           scrub: 0.5,
//           markers: true,
//         },
//       });

//       // Animate through each card
//       contents.forEach((_, idx) => {
//         if (idx === contents.length - 1) return;

//         tl.to(
//           texts[idx],
//           {
//             opacity: 0,
//             y: -50,
//             duration: 1,
//           },
//           `card${idx}`
//         )
//           .to(
//             images[idx + 1],
//             {
//               scale: 1,
//               opacity: 1,
//               y: (idx + 1) * 5,
//               x: (idx + 1) * 5,
//               rotate: (idx + 1) * 3 * (idx % 2 === 0 ? 1 : -1),
//               duration: 2,
//             },
//             `card${idx}+=0.3`
//           )
//           .to(
//             texts[idx + 1],
//             {
//               opacity: 1,
//               y: 0,
//               duration: 1.5,
//             },
//             `card${idx}+=1`
//           );
//       });
//     },
//     { scope: container }
//   );

//   return (
//     <div
//       ref={container}
//       // className="w-full h-screen border-t border-gray-700 px-4 md:px-8 xl:px-32 relative bg-gray-900"
//       className="transition-colors w-full h-[80vh] border-t skills_border-bottom-offset px-4 md:px-8 xl:px-32"
//     >
//       {projects.map((project) => (
//         <div
//           className="size-full text-card-foregrounde p-4 md:p-8 flex flex-col md:flex-row gap-8 justify-center items-center absolute inset-0"
//           key={project.title}
//           id="card-content"
//         >
//           <div
//             className="w-full xl:flex-1 h-full flex flex-col justify-center"
//             id="card-text"
//           >
//             <h1 className="text-3xl md:text-5xl font-bold mb-4">
//               {project.title}
//             </h1>
//             <p className="text-lg md:text-xl text-card-foreground max-w-2xl">
//               {project.description}
//             </p>
//           </div>
//           <div
//             className="w-full xl:w-[600px] h-[300px] xl:h-[50vh] relative rounded-xl overflow-hidden shadow-2xl"
//             id="card-image"
//           >
//             <Image
//               src={project.image}
//               alt={project.title}
//               fill
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
//               className="aspect-video object-contain object-center"
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// "use client";

// import { useRef } from "react";
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(useGSAP, ScrollTrigger);

// const projects = [
//   {
//     title: "Greenspace",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tellus at erat facilisis sodales sit amet vel nibh. Aliquam posuere nunc ut augue vehicula, vitae porttitor elit faucibus.",
//     image:
//       "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
//     href: "https://www.greenspacepro.com/",
//   },
//   {
//     title: "Swan Bitcoin",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tellus at erat facilisis sodales sit amet vel nibh. Aliquam posuere nunc ut augue vehicula, vitae porttitor elit faucibus.",
//     image:
//       "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80",
//     href: "https://www.swanbitcoin.com/",
//   },
//   {
//     title: "Sweet.TV",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tellus at erat facilisis sodales sit amet vel nibh. Aliquam posuere nunc ut augue vehicula, vitae porttitor elit faucibus.",
//     image:
//       "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=800&q=80",
//     href: "https://sweet.tv",
//   },
//   {
//     title: "Timesact",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tellus at erat facilisis sodales sit amet vel nibh. Aliquam posuere nunc ut augue vehicula, vitae porttitor elit faucibus.",
//     image:
//       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
//     href: "https://timesact.com/",
//   },
// ];

// export default function StackedCards() {
//   const container = useRef(null);

//   useGSAP(
//     () => {
//       const cards = gsap.utils.toArray("#card-content");
//       const texts = gsap.utils.toArray("#card-text");
//       const images = gsap.utils.toArray("#card-image");

//       // Set initial states - only hide cards after the first one
//       cards.forEach((card, idx) => {
//         if (idx === 0) {
//           // First card visible
//           gsap.set(texts[idx], { opacity: 1, y: 0 });
//           gsap.set(images[idx], {
//             scale: 1,
//             opacity: 1,
//             rotate: -3,
//             y: 0,
//             x: 0,
//           });
//         } else {
//           // Hidden cards start scaled down and behind
//           gsap.set(texts[idx], { opacity: 0, y: 50 });
//           gsap.set(images[idx], {
//             scale: 0.9,
//             opacity: 0,
//             rotate: 0,
//             y: -20,
//             x: 0,
//           });
//         }
//       });

//       // Create timeline with scroll trigger
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: container.current,
//           pin: true,
//           start: "top top",
//           end: `+=${cards.length * 100}%`,
//           scrub: 1,
//         },
//       });

//       // Animate each card transition
//       cards.forEach((_, idx) => {
//         if (idx === cards.length - 1) return;

//         const nextIdx = idx + 1;

//         tl
//           // Fade out current text
//           .to(texts[idx], {
//             opacity: 0,
//             y: -100,
//             duration: 0.5,
//             ease: "power2.in",
//           })
//           // Scale and reveal next image
//           .to(
//             images[nextIdx],
//             {
//               scale: 1,
//               opacity: 1,
//               y: nextIdx * 5,
//               x: nextIdx * 5,
//               rotate: nextIdx * 3 * (nextIdx % 2 === 0 ? 1 : -1),
//               duration: 1,
//               ease: "power2.out",
//             },
//             "-=0.3"
//           )
//           // Fade in next text
//           .to(
//             texts[nextIdx],
//             {
//               opacity: 1,
//               y: 0,
//               duration: 0.5,
//               ease: "power2.out",
//             },
//             "-=0.5"
//           )
//           // Add pause between cards
//           .to({}, { duration: 0.3 });
//       });
//     },
//     { scope: container, dependencies: [] }
//   );

//   return (
//     <div
//       ref={container}
//       className="relative w-full h-screen border-t border-slate-700 px-4 md:px-8 xl:px-32"
//     >
//       {projects.map((project, idx) => (
//         <div
//           key={project.title}
//           id="card-content"
//           className="absolute inset-0 w-full h-full p-4 md:p-8 flex flex-col md:flex-row gap-8 justify-center items-center"
//           style={{ zIndex: projects.length + idx }}
//         >
//           <div
//             id="card-text"
//             className="w-full xl:flex-1 flex flex-col justify-center"
//           >
//             <h1 className="text-3xl md:text-5xl font-bold mb-4">
//               {project.title}
//             </h1>
//             <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
//               {project.description}
//             </p>
//           </div>
//           <div
//             id="card-image"
//             className="w-full xl:w-[600px] h-[300px] xl:h-[50vh] relative rounded-xl overflow-hidden shadow-2xl"
//           >
//             <img
//               src={project.image}
//               alt={project.title}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
