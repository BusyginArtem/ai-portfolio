"use client";

import { useEffect, useState } from "react";

export const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-8 h-8 transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 border rounded-full pointer-events-none cursor-follower z-9999 border-primary"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  );
};
