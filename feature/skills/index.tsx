"use client";

import { useEffect, useRef, useCallback } from "react";
import Matter from "matter-js";

interface DroppedImage {
  body: Matter.Body;
  element: HTMLImageElement;
}

const imagePaths = [
  "/skills/circle/react.webp",
  "/skills/circle/next.webp",
  "/skills/circle/js.webp",
  "/skills/circle/html.webp",
  "/skills/circle/css.webp",
  "/skills/circle/git.webp",
  "/skills/circle/php.webp",
  "/skills/square/seo.webp",
  "/skills/square/shopify.webp",
  "/skills/circle/react.webp",
  "/skills/circle/next.webp",
  "/skills/circle/js.webp",
  "/skills/circle/html.webp",
  "/skills/circle/css.webp",
  "/skills/circle/git.webp",
  "/skills/circle/php.webp",
  "/skills/square/seo.webp",
  "/skills/square/shopify.webp",
  "/skills/circle/react.webp",
  "/skills/circle/next.webp",
  "/skills/circle/js.webp",
  "/skills/circle/html.webp",
  "/skills/circle/css.webp",
  "/skills/circle/git.webp",
  "/skills/circle/php.webp",
  "/skills/square/seo.webp",
  "/skills/square/shopify.webp",
  "/skills/square/wow.webp",
  "/skills/square/dev-design.webp",
  "/skills/square/dev-framework.webp",
  "/skills/square/office-wow.webp",
  "/skills/square/problem-solving.webp",
  "/skills/square/omg-cat.webp",
  "/skills/square/management.webp",
  "/skills/square/roadmap.webp",
  "/skills/square/customer-management.webp",
];

const ImageDropPhysics = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const imagesRef = useRef<DroppedImage[]>([]);

  const initializePhysics = useCallback(() => {
    if (!sceneRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, World } = Matter;

    // Create engine with higher restitution for bouncier behavior
    const engine = Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 }, // Adjust gravity as needed
    });
    engineRef.current = engine;

    const eightyPercentHeight = window.innerHeight * 0.8;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: document.documentElement.clientWidth,
        height: eightyPercentHeight,
        wireframes: false, // Important: we want to see images, not wireframes
        background: "transparent",
        pixelRatio: window.devicePixelRatio || 1,
        // showBounds: true,
        // showPositions: true,
        // showCollisions: true,
        // showVelocity: true,
      },
    });
    renderRef.current = render;

    // Create boundaries
    const ground = Bodies.rectangle(
      document.documentElement.clientWidth / 2,
      eightyPercentHeight,
      document.documentElement.clientWidth,
      15,
      {
        isStatic: true,
        restitution: 0.75, // Bouncy ground
        render: {
          fillStyle: "transparent",
          opacity: 0,
        },
      }
    );

    const leftWall = Bodies.rectangle(
      5,
      eightyPercentHeight / 2,
      5,
      eightyPercentHeight,
      {
        isStatic: true,
        render: { fillStyle: "transparent", opacity: 0 },
      }
    );

    const rightWall = Bodies.rectangle(
      document.documentElement.clientWidth,
      eightyPercentHeight / 2,
      5,
      eightyPercentHeight,
      {
        isStatic: true,
        render: { fillStyle: "transparent", opacity: 0 },
      }
    );

    // Add boundaries to world
    Composite.add(engine.world, [ground, leftWall, rightWall]);

    // Run the renderer
    Render.run(render);

    // Create and run the runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      if (sceneRef.current && render.canvas) {
        sceneRef.current.removeChild(render.canvas);
      }
    };
  }, []);

  const dropImage = useCallback(async () => {
    if (!engineRef.current) return;

    const { Bodies, World, Body } = Matter;

    // Get random image path
    const imgIndex = Math.round(Math.random() * (imagePaths.length - 1));
    const imagePath = imagePaths[imgIndex];

    try {
      // Load image to get dimensions
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imagePath;
        img.style.borderRadius = "9999px";
      });

      // Random starting position at top
      const startX = Math.random() * window.innerWidth;
      const startY = -50; // Start above the canvas
      let body;

      if (imagePath.includes("/square/")) {
        // Image dimensions (scaled for the scene)
        const width = imagePath.includes("/shopify") ? 180 : 240;
        const height = (img.height / img.width) * width; // Maintain aspect ratio
        // Create physics body with higher restitution for bouncy behavior
        body = Bodies.rectangle(startX, startY, width, height, {
          restitution: 0.5, // Bounciness
          friction: 0.01, // Low friction for sliding
          frictionAir: 0.001, // Low air resistance
          render: {
            sprite: {
              texture: imagePath,
              xScale: width / img.width,
              yScale: height / img.height,
            },
          },
        });
      } else {
        // Image dimensions (scaled for the scene)
        const width = 160;
        const height = (img.height / img.width) * width; // Maintain aspect ratio
        // Create physics body with higher restitution for bouncy behavior
        body = Bodies.circle(startX, startY, width / 2, {
          restitution: 0.5,
          friction: 0.01, // Low friction for sliding
          frictionAir: 0.001, // Low air resistance
          render: {
            sprite: {
              texture: imagePath,
              xScale: width / img.width,
              yScale: height / img.height,
            },
          },
        });
      }

      // Add some initial rotation for more dynamic movement
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      // Add body to the world
      World.add(engineRef.current.world, [body]);

      // Store reference to the image
      imagesRef.current.push({ body, element: img });

      // Clean up old images if there are too many (performance)
      if (imagesRef.current.length > 30) {
        const oldImage = imagesRef.current.shift();
        if (oldImage) {
          World.remove(engineRef.current.world, oldImage.body);
        }
      }
    } catch (error) {
      console.error("Failed to load image:", error);
      const body = Bodies.rectangle(400, -50, 160, 160, {
        restitution: 0.55,
        friction: 0.01,
        render: {
          fillStyle: `hsl(${imgIndex * 60}, 70%, 50%)`,
          strokeStyle: "#000",
          lineWidth: 2,
        },
      });
      World.add(engineRef.current.world, [body]);
    }
  }, []);

  useEffect(() => {
    const cleanup = initializePhysics();

    return () => {
      if (cleanup) cleanup();
    };
  }, [initializePhysics]);

  return (
    <section className="relative transition-colors h-[80vh] w-full text-center border-t skills_border-bottom-offset min-h-fit">
      <button
        onClick={dropImage}
        className="text-center absolute z-8 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:text-xl uppercase w-[160px] h-[160px] md:w-[180px] md:h-[180px] md:normal-case md:px-8 md:py-3 rounded-full cursor-none skills_button"
      >
        Skills and technologies. Click me!
      </button>

      <div ref={sceneRef} />
    </section>
  );
};

export default ImageDropPhysics;
