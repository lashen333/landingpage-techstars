// src\components\ImpactStats.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Format numbers into short units with a trailing '+' (e.g., 7000 -> "7K+") */
function formatAbbrev(n: number) {
  if (n >= 1_000_000) return `${Math.round(n / 100_000) / 10}M+`.replace(".0", "") ;
  if (n >= 1_000) return `${Math.round(n / 100) / 10}K+`.replace(".0", "");
  return `${n}+`;
}

/** Count-up hook: animates from 0 to target over duration ms once when in view */
function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return value;
}

type Stat = {
  label: string;
  target: number; // raw number, will be abbreviated with K+/M+
};

const stats: Stat[] = [
  { label: "Programs held", target: 7000 },
  { label: "Community Leaders", target: 19000 },
  { label: "Countries", target: 150 },
  { label: "Total participants", target: 428000 },
];

export default function ImpactStats() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <section ref={sectionRef} className="relative isolate bg-brand-black py-20">
      {/* section backdrop grid, not inside cards */}
      <div className="absolute inset-0 bg-grid" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Join Sri Lanka’s first-ever Techstars Startup Weekend for Professionals
          </motion.h2>
        </div>

        {/* Stats grid */}
        <div className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-4 sm:grid-cols-2">
          {stats.map((s, i) => (
            <StatCard key={s.label} label={s.label} target={s.target} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  target,
  index,
  inView,
}: {
  label: string;
  target: number;
  index: number;
  inView: boolean;
}) {
  const value = useCountUp(target, inView, 1200 + index * 150);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
    >
      {/* number */}
      <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white tabular-nums">
        {formatAbbrev(value)}
      </div>
      {/* divider */}
      <div className="mx-auto my-3 h-px w-12 bg-white/15" />
      {/* label */}
      <p className="text-sm text-white/75">{label}</p>

      {/* subtle hover effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 transition group-hover:ring-1" />
    </motion.div>
  );
}
