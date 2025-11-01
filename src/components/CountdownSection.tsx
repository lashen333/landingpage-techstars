// src\components\CountdownSection.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* Brand */
const PHOSPHOR = "#39C463";
const SLATE = "#8298AB";

/* Your original logic (kept) */
const TARGET_DATE = new Date("2025-12-05T00:00:00+05:30"); // adjust TZ as needed

function getTimeRemaining(endTime: Date) {
  const now = new Date();
  const total = endTime.getTime() - now.getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

function SegmentedRing({
  size = 132,
  stroke = 10,
  segments,
  filled,               // integer: 0..segments
  label,
  valueText,
}: {
  size?: number;
  stroke?: number;
  segments: number;
  filled: number;
  label: string;
  valueText: string;
}) {
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;

  // “crack” look: portion of each segment that is visible (dash) vs gap
  const visibleRatio = 0.62;               // tweak 0.5–0.75 to match your taste
  const theta = (2 * Math.PI) / segments;  // angle per segment
  const dashAngle = theta * visibleRatio;

  function arcPath(startAngle: number, endAngle: number) {
    const sx = cx + r * Math.cos(startAngle);
    const sy = cy + r * Math.sin(startAngle);
    const ex = cx + r * Math.cos(endAngle);
    const ey = cy + r * Math.sin(endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    // Sweep = 1 (clockwise). We start at 12 o’clock, so subtract PI/2.
    return `M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`;
  }

  const segmentsArr = Array.from({ length: segments }, (_, i) => i);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background ticks (Slate) */}
        {segmentsArr.map((i) => {
          // 12 o’clock start: rotate by -90deg (−π/2)
          const start = -Math.PI / 2 + i * theta + (theta - dashAngle) / 2;
          const end = start + dashAngle;
          return (
            <path
              key={`bg-${i}`}
              d={arcPath(start, end)}
              fill="none"
              stroke={SLATE}
              strokeOpacity={0.35}
              strokeWidth={stroke}
              strokeLinecap="butt"
            />
          );
        })}

        {/* Foreground filled ticks (Phosphor) */}
        {segmentsArr.slice(0, Math.max(0, Math.min(filled, segments))).map((i) => {
          const start = -Math.PI / 2 + i * theta + (theta - dashAngle) / 2;
          const end = start + dashAngle;
          return (
            <path
              key={`fg-${i}`}
              d={arcPath(start, end)}
              fill="none"
              stroke={PHOSPHOR}
              strokeWidth={stroke}
              strokeLinecap="butt"
              style={{ transition: "stroke 0.15s linear, opacity 0.15s linear" }}
            />
          );
        })}

        {/* Number */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          suppressHydrationWarning
          style={{
            fontWeight: 900,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "0.5px",
          }}
          className="fill-[var(--phosphor,_#39C463)] text-[36px] sm:text-[40px]"
        >
          {valueText}
        </text>
      </svg>

      <span className="mt-2 text-[12px] tracking-[0.18em] uppercase text-white/75">
        {label}
      </span>
    </div>
  );
}


export default function CountdownSection() {
  // client-only guard to avoid hydration mismatches
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [time, setTime] = useState(() => getTimeRemaining(TARGET_DATE));
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeRemaining(TARGET_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  // snapshot initial days so the day ring has that many segments (e.g., 32)
  const initialDaysRef = useRef<number | null>(null);
  if (mounted && initialDaysRef.current === null) {
    initialDaysRef.current = Math.max(1, time.days); // e.g., 32 today
  }
  const daySegments = initialDaysRef.current ?? Math.max(1, time.days || 1);

  
  if (!mounted) {
    return (
      <section className="relative isolate bg-brand-black py-20 px-4 overflow-hidden">
        {/* backdrop grid */}
        <div className="absolute inset-0 bg-grid" aria-hidden />
        {/* optional soft vignette */}
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
        {/* content */}
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-xl font-bold sm:text-5xl">Countdown to Startup Weekend</h2>
          <p className="mt-2 text-white/80">Dec 05–07 • Colombo, Sri Lanka</p>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="h-[132px]" />
            <div className="h-[132px]" />
            <div className="h-[132px]" />
            <div className="h-[132px]" />
          </div>
        </div>
      </section>
    );
  }

  if (time.total <= 0) {
    return (
      <section className="relative isolate bg-brand-black text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
        <div className="relative text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">The event is live now!</h2>
          <p className="mt-4 text-white/75">Join us Dec 05–07 in Colombo.</p>
        </div>
      </section>
    );
  }
  
  // —— DISCRETE FILL COUNTS (one segment per unit) ——
  // Days: fill increases when a whole day passes
  const filledDays = Math.min(
    daySegments,
    Math.max(0, (initialDaysRef.current ?? daySegments) - time.days)
  );

  // Hours: 24 segments, fill increases when hour value decreases
  const HOUR_SEGMENTS = 24;
  const filledHours = Math.min(HOUR_SEGMENTS, Math.max(0, HOUR_SEGMENTS - time.hours));

  // Minutes: 60 segments, fill increases when minute value decreases
  const MIN_SEGMENTS = 60;
  const filledMinutes = Math.min(MIN_SEGMENTS, Math.max(0, MIN_SEGMENTS - time.minutes));

  // Seconds: 60 segments, fill increases every second
  const SEC_SEGMENTS = 60;
  const filledSeconds = Math.min(SEC_SEGMENTS, Math.max(0, SEC_SEGMENTS - time.seconds));

  return (
    <section className="relative isolate bg-brand-black text-white py-20 px-4 overflow-hidden">
      {/* backdrop grid (same as ImpactStats) */}
      <div className="absolute inset-0 bg-grid" aria-hidden />
      {/* subtle vignette to soften the edges */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
      {/* optional phosphor glow accent */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "conic-gradient(from 0deg, #39C46333, transparent)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
          >
            Countdown to Startup Weekend
          </motion.h2>
        <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="mt-2 text-white/80"
          >
            Dec 05–07 • Colombo, Sri Lanka
          </motion.p>

        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <SegmentedRing
            label="Days"
            valueText={String(time.days).padStart(2, "0")}
            segments={daySegments}
            filled={filledDays}
          />
          <SegmentedRing
            label="Hours"
            valueText={String(time.hours).padStart(2, "0")}
            segments={24}
            filled={filledHours}
          />
          <SegmentedRing
            label="Minutes"
            valueText={String(time.minutes).padStart(2, "0")}
            segments={60}
            filled={filledMinutes}
          />
          <SegmentedRing
            label="Seconds"
            valueText={String(time.seconds).padStart(2, "0")}
            segments={60}
            filled={filledSeconds}
          />
        </div>
      </div>
    </section>
  );
}