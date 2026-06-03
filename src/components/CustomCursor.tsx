import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device supports touch to hide custom cursor on mobile
    const checkDevice = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkDevice();

    const mouseMove = (e: MouseMoveEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const mouseOverLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("button") || 
        target.closest("a") ||
        target.classList.contains("canvas-hover")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", mouseOverLink);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", mouseOverLink);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#d6d6d6] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        animate={{
          x: position.x,
          y: position.y,
          scale: hovered ? 1.6 : 1,
          borderColor: hovered ? "#ffffff" : "#d6d6d6",
          boxShadow: hovered ? "0 0 12px rgba(255, 255, 255, 0.32)" : "none"
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.2 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#8f8f8f] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: position.x,
          y: position.y,
          scale: hovered ? 0.5 : 1,
          backgroundColor: hovered ? "#ffffff" : "#8f8f8f"
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28, mass: 0.1 }}
      />
    </>
  );
}

// Inline custom types for window mouse listener
type MouseMoveEvent = {
  clientX: number;
  clientY: number;
};
