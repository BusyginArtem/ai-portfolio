"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";

interface DroppedImage {
  body: Matter.Body;
  element: HTMLImageElement;
}

const imagePaths = [
  "/skills/react.png",
  "/skills/next.png",
  "/skills/js.png",
  "/skills/html.png",
  "/skills/css.png",
  "/skills/customer-management.jpg",
  "/skills/management.jpg",
  "/skills/dev-design.jpeg",
  "/skills/dev-framework.jpeg",
  "/skills/git.png",
  "/skills/php.png",
  "/skills/problem-solving.jpg",
  "/skills/seo.jpg",
  "/skills/shopify.jpg",
  "/skills/wow.jpeg",
  "/skills/office-wow.jpg",
  "/skills/omg-cat.jpeg",
  "/skills/roadmap.jpg",
  "/skills/error.jpg",
];

const ImageDropPhysics = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const imagesRef = useRef<DroppedImage[]>([]);
  const [dropCount, setDropCount] = useState(0);

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
        // width: window.innerWidth,
        width: document.documentElement.clientWidth,
        height: eightyPercentHeight,
        wireframes: false, // Important: we want to see images, not wireframes
        background: "#000",
        pixelRatio: window.devicePixelRatio || 1,
        showBounds: true,
        showPositions: true,
        showCollisions: true,
        showVelocity: true,
      },
    });
    renderRef.current = render;

    // Create boundaries
    const ground = Bodies.rectangle(
      document.documentElement.clientWidth / 2,
      eightyPercentHeight,
      document.documentElement.clientWidth,
      5,
      {
        isStatic: true,
        restitution: 0.8, // Bouncy ground
        render: { fillStyle: "#64748b" },
      }
    );

    const leftWall = Bodies.rectangle(
      5,
      eightyPercentHeight / 2,
      5,
      eightyPercentHeight,
      {
        isStatic: true,
        render: { fillStyle: "#64748b" },
      }
    );

    const rightWall = Bodies.rectangle(
      document.documentElement.clientWidth,
      eightyPercentHeight / 2,
      5,
      eightyPercentHeight,
      {
        isStatic: true,
        render: { fillStyle: "#64748b" },
      }
    );

    // Add boundaries to world
    // World.add(engine.world, [ground, leftWall, rightWall]);
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
    const imagePath = imagePaths[dropCount % imagePaths.length];

    try {
      // Load image to get dimensions
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imagePath;
      });

      // Image dimensions (scaled for the scene)
      const width = 160;
      const height = (img.height / img.width) * width; // Maintain aspect ratio

      // Random starting position at top
      const startX = Math.random() * window.innerWidth;
      // const startX = Math.random() * 400 + 200; // Between 200-600px
      const startY = -50; // Start above the canvas

      // Create physics body with higher restitution for bouncy behavior
      const body = Bodies.rectangle(startX, startY, width, height, {
        // restitution: 0.7, // Bounciness
        restitution: 0.45,
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

      // Add some initial rotation for more dynamic movement
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      // Add body to the world
      World.add(engineRef.current.world, [body]);

      // Store reference to the image
      imagesRef.current.push({ body, element: img });

      // Update drop count
      setDropCount((prev) => prev + 1);

      // Clean up old images if there are too many (performance)
      if (imagesRef.current.length > 30) {
        const oldImage = imagesRef.current.shift();
        if (oldImage) {
          World.remove(engineRef.current.world, oldImage.body);
        }
      }
    } catch (error) {
      console.error("Failed to load image:", error);
      // Fallback to rectangle if image fails to load
      const body = Bodies.rectangle(400, -50, 160, 160, {
        restitution: 0.45,
        friction: 0.01,
        render: {
          fillStyle: `hsl(${dropCount * 60}, 70%, 50%)`,
          strokeStyle: "#000",
          lineWidth: 2,
        },
      });
      World.add(engineRef.current.world, [body]);
      setDropCount((prev) => prev + 1);
    }
  }, [dropCount, imagePaths]);

  // const resetScene = useCallback(() => {
  //   if (!engineRef.current) return;

  //   const { World } = Matter;

  //   // Remove all image bodies
  //   imagesRef.current.forEach(({ body }) => {
  //     World.remove(engineRef.current!.world, body);
  //   });

  //   imagesRef.current = [];
  //   setDropCount(0);
  // }, []);

  useEffect(() => {
    const cleanup = initializePhysics();

    return () => {
      if (cleanup) cleanup();
    };
  }, [initializePhysics]);

  return (
    <div className="relative transition-colors h-[80vh] w-full text-center border-t">
      <button
        onClick={dropImage}
        className="text-center absolute z-[8] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] dark:hover:bg-white dark:hover:text-black dark:active:bg-black dark:active:text-white coloured:hover:bg-pink coloured:active:bg-blue dark:bg-neutral-800 dark:text-white text-white bg-black hover:bg-yellowDark active:bg-black md:text-xl uppercase w-[160px] h-[160px] md:w-[180px] md:h-[180px] md:normal-case md:px-8 md:py-3 rounded-full "
      >
        Skills and technologies. Click me!
      </button>

      <div ref={sceneRef} className="" />
    </div>
  );
};

export default ImageDropPhysics;
