"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Splash() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      {/* ✅ Fullscreen splash image */}
      <div className="relative w-full h-full">
        <Image
          src="/imageep2.png"
          alt="Executive Partners Splash"
          fill
          priority
          className="object-contain object-center"
        />
      </div>
    </motion.div>
  );
}