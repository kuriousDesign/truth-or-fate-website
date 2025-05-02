"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const BUTTONS = [
  { id: "moon-1", icon: "/emblem-moon.png" },
  { id: "sun", icon: "/emblem-sun.png" },
  { id: "diamond", icon: "/emblem-diamond.png" },
  { id: "moon-2", icon: "/emblem-moon.png", scaleX:"-1" },
];

export default function FloatingButtons2() {
  const [positions, setPositions] = useState<{ top: number; left: number }[]>([]);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const cx = width / 2;
    const cy = height / 2;
    const radius = width * 0.5;

    const arcCenter = -90;
    const arcRange = 100;
    const count = BUTTONS.length;

    const buttonWidth = 64; // Tailwind `w-16` = 64px

    const newPositions = BUTTONS.map((_, idx) => {
      const angleDeg = arcCenter - arcRange / 2 + (arcRange / (count - 1)) * idx;
      const angleRad = (angleDeg * Math.PI) / 180;
      const left = cx + radius * Math.cos(angleRad) - buttonWidth / 2;
      const top = cy + radius * Math.sin(angleRad);
      return { top, left };
    });

    setPositions(newPositions);
  }, []);

  const floats = useMemo(
    () =>
      BUTTONS.map(() => ({
        xAmplitude: Math.random() * .25 + .5,
        yAmplitude: Math.random() * .5 + .5,
        duration: Math.random() * 2 + 3,
        delay: Math.random() * 0 + 0,
      })),
    []
  );

  return (
    <>
      {positions.length > 0 &&
        BUTTONS.map((btn, idx) => {
          const float = floats[idx];
          const pos = positions[idx];
          return (
            <motion.button
              key={btn.id}
              className="w-16 h-16 bg-yellow-500 rounded-full shadow-lg fixed z-10"
              style={{
                position: "fixed",
                top: pos.top,
                left: pos.left,
                transform: "translateY(0%)",
                scaleX: btn.scaleX ? btn.scaleX : 1,
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
