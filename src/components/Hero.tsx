// src\components\Hero.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProfessionalWaitlistForm from "./ProfessionalWaitlistForm";

export default function Hero() {
  // Floating bubbles (ambient background)
  const [bubbles, setBubbles] = useState<Array<{
    id: number;
    size: number;
    left: number; // vw
    top: number;  // vh
    driftY: number;
    duration: number;
    delay: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 48 }).map((_, i) => {
      const size = Math.random() * 6 + 2;   // 2–8px
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const driftY = Math.random() * 80 + 40;  // 40–120px
      const duration = Math.random() * 6 + 8;  // 8–14s
      const delay = Math.random() * 4;         // 0–4s
      const opacity = Math.random() * 0.45 + 0.15; // 0.15–0.6
      return { id: i, size, left, top, driftY, duration, delay, opacity };
    });
    setBubbles(generated);
  }, []);

  return (
    <section
      className="
        relative isolate overflow-hidden bg-brand-black
        /* add a gentle top gap on mobile so content clears the header */
        pt-24 md:pt-0
      "
      style={{ minHeight: "100svh" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid" aria-hidden />

      {/* Phosphor glow (subtle) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.22 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="pointer-events-none absolute -top-[32rem] left-1/2 h-[46rem] w-[68rem] -translate-x-1/2 rounded-full bg-brand-phosphor blur-[140px]"
      />

      {/* Ambient bubbles */}
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
              borderRadius: 9999,
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,.85), rgba(255,255,255,.12) 60%, transparent 70%)",
              boxShadow: "0 0 12px rgba(255,255,255,.06)",
              filter: "saturate(0.8)",
            }}
          />
        ))}
      </div>

      {/* Content wrapper */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-4">
        <div className="grid w-full items-center gap-8 md:grid-cols-2">
          {/* Left copy */}
          <div
            className="
              /* center text on mobile, left align on md+ */
              text-center md:text-left
              /* add small bottom gap on mobile when form stacks below */
              md:pr-6
            "
          >
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="
                font-extrabold leading-[1.05] tracking-tight
                text-4xl sm:text-6xl md:text-6xl
              "
            >
              <span className="block">Techstars</span>
              <span className="block">Startup Weekend</span>
              <span className="block text-white/85">Sri Lanka</span>
              <span className="mt-3 block text-[0.62em] font-semibold uppercase tracking-[.18em] text-white/70">
                Professional Edition
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.06, ease: "easeOut" }}
              className="mt-4 text-sm sm:text-base md:text-lg text-white/80"
            >
              54 hours to pitch, build, and launch a startup.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
              className="mt-1 text-white/75"
            >
              <strong className="text-white">Dec 05-07, 2025</strong> • Colombo
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
              className="
                mt-6 flex flex-wrap items-center gap-3
                /* center CTAs on mobile, left align on md+ */
                justify-center md:justify-start
              "
            >
              <a
                href="#hero-form"
                className="
                  inline-flex items-center justify-center rounded-full
                  border border-brand-phosphor bg-brand-phosphor
                  px-5 py-2.5 font-medium text-white
                  transition hover:bg-transparent hover:text-brand-phosphor
                "
              >
                Join the Waitlist
              </a>
              <a
                href="#impact-stats"
                className="
                  inline-flex items-center gap-2 rounded-full
                  px-5 py-3 text-white/85 hover:text-white
                "
              >
                Learn more
              </a>
            </motion.div>
          </div>

          {/* Right: Compact card form */}
          <div className="md:mt-7 mt-4">
            <div className="rounded-2xl border border-white bg-white/2 p-5 backdrop-blur supports-[backdrop-filter]:bg-white/6">
              <h2 id="hero-form-title" className="text-2xl font-semibold text-white text-center md:text-left">
                Join the Waitlist
              </h2>
              <p className="mt-1 text-xs text-white/70 text-center md:text-left">
                Be the first to know when registration opens.
              </p>
              <div className="mt-4">
                <ProfessionalWaitlistForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
