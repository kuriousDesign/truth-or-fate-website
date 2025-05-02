"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import RotatingWords from "./components/RotatingWords";
import MovingButtons from "./components/MovingButtons";
import FloatingButtons2 from "./components/FloatingButtons2";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const size = 300;
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFloating(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} bg-black grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="absolute">
        {showFloating ? <FloatingButtons2 /> : <MovingButtons />}
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className={`relative flex items-center justify-center w-[${size}px] h-[${size}px]`}>
          <RotatingWords size={size} />
          <Image
            src="/primary-box-graphic.png"
            alt="box-primary-sun logo"
            fill
            priority
            className="object-contain grayscale opacity-70"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#a08b6e",
              mixBlendMode: "multiply",
              pointerEvents: "none",
            }}
          />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center" />
    </div>
  );
}
