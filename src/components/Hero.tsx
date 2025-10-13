// src\components\Hero.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
  // State to hold bubbles - initially empty
  const [bubbles, setBubbles] = useState<Array<{
    id: number;
    size: number;
    left: number;
    top: number;
    driftY: number;
    duration: number;
    delay: number;
    opacity: number;
  }>>([]);

  // Generate bubbles ONLY on client side after component mounts
  useEffect(() => {
    const generatedBubbles = Array.from({ length: 64 }).map((_, i) => {
      const size = Math.random() * 5 + 2;    // 2–7px
      const left = Math.random() * 100;      // vw
      const top = Math.random() * 100;       // vh
      const driftY = Math.random() * 70 + 40; // 40–110px vertical drift
      const duration = Math.random() * 6 + 6; // 6–12s (faster)
      const delay = Math.random() * 3;       // 0–3s
      const opacity = Math.random() * 0.5 + 0.2; // 0.2–0.7
      return { id: i, size, left, top, driftY, duration, delay, opacity };
    });
    
    setBubbles(generatedBubbles);
  }, []); // Empty dependency array = runs once after mount

  return (
    <section
        className="relative isolate min-h-[480px] pt-24 pb-20 flex items-center justify-center text-center overflow-hidden"
    >
      {/* 1) Subtle grid across hero */}
      <div className="absolute inset-0 bg-grid" aria-hidden />

      {/* 2) Top-to-bottom phosphor wash (originates from above the viewport) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.28 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="
          pointer-events-none absolute -top-[36rem] left-1/2
          h-[50rem] w-[70rem] -translate-x-1/2
          rounded-full bg-brand-phosphor blur-[140px]
        "
      />

      {/* 3) Floating bubbles (more & faster) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {bubbles.map((b) => (
          <motion.span
            key={b.id}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -b.driftY, opacity: b.opacity }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: `${b.left}vw`,
              top: `${b.top}vh`,
              width: b.size,
              height: b.size,
              borderRadius: "9999px",
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,.9), rgba(255,255,255,.15) 60%, transparent 70%)",
              boxShadow: "0 0 12px rgba(255,255,255,.08)",
              filter: "saturate(0.85)",
            }}
          />
        ))}
      </div>

      {/* 4) Bottom darkening like the reference */}
      <div className="absolute inset-x-0 bottom-0 h-56 hero-bottom-fade" aria-hidden />

      {/* 5) Content */}
      <div className="relative mx-auto w-full max-w-6xl px-4">
        <div className="text-center">
          {/* 5a) Headline: split across two lines, balanced */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="
              h-balance leading-[1.05] font-extrabold tracking-tight
              text-4xl sm:text-6xl md:text-7xl
            "
          >
            <span>Techstars Startup Weekend</span>{" "}
            <span className="block text-white/85">Colombo</span>
          </motion.h1>

          {/* 5b) Sub copy */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: "easeOut" }}
            className="mt-5 text-base sm:text-lg md:text-xl text-white/80"
          >
            54 hours to pitch, build, and launch —{" "}
            <strong className="text-white">Nov 14–16, 2025</strong> • Colombo
          </motion.p>

          {/* 5c) CTA row (pill buttons, outline style like Cobalt; on-brand accent on hover) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="mt-9 flex items-center justify-center gap-3"
          >
            {/* Primary: outline pill; hover ring uses phosphor */}
            <a
              href="#waitlist"
              className="
                inline-flex items-center gap-2 rounded-full px-6 py-3
                border border-white/25 bg-white/5 text-white
                hover:bg-white/[0.08] hover:border-brand-phosphor
                hover:shadow-[0_0_30px_rgba(57,196,99,.35)]
                transition
              "
            >
              Join the waitlist
            </a>

            {/* Secondary: subtle text link */}
            <a
              href="#about"
              className="
                inline-flex items-center gap-2 rounded-full px-5 py-3
                text-white/85 hover:text-white
              "
            >
              Learn more
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}