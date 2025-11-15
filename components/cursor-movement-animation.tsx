// import { useRef, useState, useEffect, ReactNode } from "react";
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(useGSAP);

// // Utility functions
// const random = (min: number, max: number) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

// const SPARKLE_COLORS = [
//   "#FFC700", // Gold
//   "#FF6B6B", // Red
//   "#4ECDC4", // Teal
//   "#95E1D3", // Mint
//   "#F38181", // Pink
//   "#AA96DA", // Purple
//   "#FCBAD3", // Light Pink
//   "#FFFFD2", // Light Yellow
// ];

// interface Sparkle {
//   id: string;
//   createdAt: number;
//   color: string;
//   size: number;
//   x: number;
//   y: number;
// }

// const generateSparkle = (x: number, y: number): Sparkle => {
//   return {
//     id: String(random(10000, 99999)),
//     createdAt: Date.now(),
//     color: SPARKLE_COLORS[random(0, SPARKLE_COLORS.length - 1)],
//     size: random(10, 20),
//     x,
//     y,
//   };
// };

// const SparkleElement = ({ sparkle }: { sparkle: Sparkle }) => {
//   const sparkleRef = useRef<HTMLDivElement>(null);

//   useGSAP(
//     () => {
//       if (!sparkleRef.current) return;

//       const tl = gsap.timeline();

//       tl.fromTo(
//         sparkleRef.current,
//         { scale: 0, rotation: 0 },
//         { scale: 1, rotation: 180, duration: 0.35, ease: "power2.out" }
//       ).to(sparkleRef.current, {
//         scale: 0,
//         rotation: 360,
//         duration: 0.35,
//         ease: "power2.in",
//       });
//     },
//     { scope: sparkleRef }
//   );

//   const path =
//     "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";

//   return (
//     <div
//       ref={sparkleRef}
//       className="absolute pointer-events-none z-50"
//       style={{
//         left: sparkle.x,
//         top: sparkle.y,
//         width: sparkle.size,
//         height: sparkle.size,
//       }}
//     >
//       <svg
//         width={sparkle.size}
//         height={sparkle.size}
//         viewBox="0 0 68 68"
//         fill="none"
//         className="block"
//       >
//         <path d={path} fill={sparkle.color} />
//       </svg>
//     </div>
//   );
// };

// interface CursorSparklesProps {
//   children: ReactNode;
//   className?: string;
// }

// export default function CursorSparkles({
//   children,
//   className = "",
// }: CursorSparklesProps) {
//   const [sparkles, setSparkles] = useState<Sparkle[]>([]);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const lastSparkleTimeRef = useRef(0);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const handleMouseMove = (e: MouseEvent) => {
//       if (!containerRef.current) return;

//       const rect = containerRef.current.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;

//       const now = Date.now();
//       // Throttle sparkle generation to every 100ms
//       if (now - lastSparkleTimeRef.current < 100) return;
//       lastSparkleTimeRef.current = now;

//       // Add random offset to sparkle position
//       const offsetX = random(-30, 30);
//       const offsetY = random(-30, 30);

//       const newSparkle = generateSparkle(x + offsetX, y + offsetY);

//       setSparkles((prev) => {
//         // Clean up old sparkles (older than 750ms)
//         const filtered = prev.filter(
//           (sparkle) => now - sparkle.createdAt < 750
//         );
//         return [...filtered, newSparkle];
//       });
//     };

//     const container = containerRef.current;
//     container.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       container.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className={`relative ${className}`}>
//       {sparkles.map((sparkle) => (
//         <SparkleElement key={sparkle.id} sparkle={sparkle} />
//       ))}
//       {children}
//     </div>
//   );
// }
// ---------------------------------------------------------------------------------------------------------------------------
import { useRef, useEffect, ReactNode } from "react";

interface Line {
  id: number;
  x: number;
  y: number;
  length: number;
  color: string;
}

const LINE_COLORS = [
  "#FFC700", // Gold
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#95E1D3", // Mint
  "#F38181", // Pink
  "#AA96DA", // Purple
  "#FCBAD3", // Light Pink
  "#FFFFD2", // Light Yellow
];

const random = (min: number, max: number) => Math.random() * (max - min) + min;

interface CursorSparklesProps {
  children: ReactNode;
  className?: string;
  lineCount?: number;
}

export default function CursorSparkles({
  children,
  className = "",
  lineCount = 20,
}: CursorSparklesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<Line[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);

  // Initialize lines
  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    linesRef.current = Array.from({ length: lineCount }, (_, i) => ({
      id: i,
      x: random(0, rect.width),
      y: random(0, rect.height),
      length: random(30, 80),
      color: LINE_COLORS[Math.floor(Math.random() * LINE_COLORS.length)],
    }));
  }, [lineCount]);

  // Handle mouse movement
  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const container = containerRef.current;
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      linesRef.current.forEach((line) => {
        // Calculate angle to mouse
        const dx = mouseRef.current.x - line.x;
        const dy = mouseRef.current.y - line.y;
        const angle = Math.atan2(dy, dx);

        // Calculate end point of line
        const endX = line.x + Math.cos(angle) * line.length;
        const endY = line.y + Math.sin(angle) * line.length;

        // Draw line
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Draw circle at start
        ctx.fillStyle = line.color;
        ctx.beginPath();
        ctx.arc(line.x, line.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw arrow head
        const arrowSize = 8;
        ctx.fillStyle = line.color;
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(
          endX - arrowSize * Math.cos(angle - Math.PI / 6),
          endY - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          endX - arrowSize * Math.cos(angle + Math.PI / 6),
          endY - arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-50"
      />
      {children}
    </div>
  );
}
// -------------------------------------------------------------------------------------------------------------------
