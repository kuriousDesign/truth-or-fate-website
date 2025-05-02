"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const BUTTONS = [
  { id: "top-left", icon: "/emblem-sun.png", initial: { top: 0, left: 0 }, target: { top: "40%", left: "40%" } },
  { id: "top-right", icon: "/emblem-diamond.png", initial: { top: 0, right: 0 }, target: { top: "40%", left: "60%" } },
  { id: "bottom-left", icon: "/emblem-moon.png", initial: { bottom: 0, left: 0 }, target: { top: "60%", left: "40%" } },
  { id: "bottom-right", icon: "/emblem-moon.png", initial: { bottom: 0, right: 0 }, target: { top: "60%", left: "60%" } },
];

export default function MovingButtons() {
  const [startMove, setStartMove] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStartMove(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {BUTTONS.map((btn) => (
        <motion.button
          key={btn.id}
          className="w-16 h-16 p-2 bg-yellow-500 rounded-full shadow-lg fixed z-10"
          initial={btn.initial}
          animate={
            startMove
              ? {
                  top: btn.target.top,
                  left: btn.target.left,
                  bottom: undefined,
                  right: undefined,
                }
              : {}
          }
          transition={{ duration: 1 }}
          style={{ position: "fixed" }}
        >
          <Image src={btn.icon} alt={btn.id} width={32} height={32} />
        </motion.button>
      ))}
    </>
  );
}
