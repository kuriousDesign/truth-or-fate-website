"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";

const BUTTONS = [
  { id: "top-left", icon: "/emblem-sun.png", position: { top: "40%", left: "40%" } },
  { id: "top-right", icon: "/emblem-diamond.png", position: { top: "40%", left: "60%" } },
  { id: "bottom-left", icon: "/emblem-moon.png", position: { top: "60%", left: "40%" } },
  { id: "bottom-right", icon: "/emblem-moon.png", position: { top: "60%", left: "60%" } },
];

export default function FloatingButtons() {
  // Memoize randomized floating patterns per render
  const floats = useMemo(
    () =>
      BUTTONS.map(() => ({
        xAmplitude: Math.random()  + 1,
        yAmplitude: Math.random()  + 1,
        duration: Math.random() * 2 + 3,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <>
      {BUTTONS.map((btn, idx) => {
        const float = floats[idx];
        return (
          <motion.button
            key={btn.id}
            className="w-16 h-16 p-2 bg-yellow-500 rounded-full shadow-lg fixed z-10"
            style={{
              ...btn.position,
              position: "fixed",
            }}
            animate={{
              y: [0, -float.yAmplitude, 0, float.yAmplitude, 0],
              x: [0, float.xAmplitude, 0, -float.xAmplitude, 0],
            }}
            transition={{
              duration: float.duration,
              delay: float.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image src={btn.icon} alt={btn.id} width={32} height={32} />
          </motion.button>
        );
      })}
    </>
  );
}
