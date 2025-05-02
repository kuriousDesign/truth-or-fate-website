"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const BUTTONS = [
  { id: "sun", icon: "/emblem-sun.png" },
  { id: "diamond", icon: "/emblem-diamond.png" },
  { id: "moon-1", icon: "/emblem-moon.png" },
  { id: "moon-2", icon: "/emblem-moon.png" },
];

export default function MovingButtons2() {
  const [positions, setPositions] = useState<{ top: number; left: number }[]>([]);
  const [startMove, setStartMove] = useState(false);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const cx = width / 2;
    const cy = height / 2;
    const radius = width * 0.4;

    const arcCenter = -90; // top
    const arcRange = 100;
    const count = BUTTONS.length;
    const buttonSize = 64;

    const newPositions = BUTTONS.map((_, idx) => {
      const angleDeg = arcCenter - arcRange / 2 + (arcRange / (count - 1)) * idx;
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = cx + radius * Math.cos(angleRad) - buttonSize / 2;
      const y = cy + radius * Math.sin(angleRad) - buttonSize / 2;
      return { left: x, top: y };
    });

    setPositions(newPositions);

    const timer = setTimeout(() => setStartMove(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {positions.length > 0 &&
        BUTTONS.map((btn, idx) => {
          const pos = positions[idx];
          return (
            <motion.button
              key={btn.id}
              className="w-16 h-16 p-2 bg-yellow-500 rounded-full shadow-lg fixed z-10"
              initial={{ top: pos.top, left: pos.left }}
              animate={
                startMove
                  ? {
                      top: "50%",
                      left: "50%",
                      translateX: "-50%",
                      translateY: "-50%",
                    }
                  : {}
              }
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ position: "fixed" }}
            >
              <Image src={btn.icon} alt={btn.id} width={32} height={32} />
            </motion.button>
          );
        })}
    </>
  );
}
