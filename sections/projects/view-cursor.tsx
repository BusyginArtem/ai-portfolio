import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = "default";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed w-16 h-16 pointer-events-none z-9999 transition-transform duration-100 ease-linear"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: `url('/icons/icon-look.gif') no-repeat center`,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default CustomCursor;
