"use client";

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

import FloatingButtons2 from "@/pages/components/FloatingButtons2";
import OrientationInfo from "@/components/OrientationInfo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} bg-black grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="absolute w-screen  h-screen top-0 left-0 flex justify-center">
        <div className="relative top-10 w-7/8 h-16 flex items-center justify-center ">
          <Image
            src="/truthorfatelogo.png"
            alt="box-primary-sun logo"
            fill
            priority
          />
        </div>

        <FloatingButtons2 />
        <div className="absolute bottom-50 w-full">
          <OrientationInfo />
        </div>
        
        <div className="fixed bottom-10 left-4 w-16 h-16 flex items-center justify-center bg-amber-400 ">
          <Image
            src="/hand.png"
            alt="hand logo"
            fill
            priority
            style={{ transform: 'scaleX(-1)' }}
          />
        </div>
        <div className="fixed bottom-10 right-4 w-16 h-16 flex items-center justify-center bg-amber-400 ">
          <Image
            src="/hand.png"
            alt="hand logo"
            fill
            priority
            style={{ transform: 'scaleX(1)' }}
          />
        </div>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center" />
    </div>
  );
}
