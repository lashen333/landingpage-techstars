"use client";

import { motion } from "framer-motion";

const items = [
  { title: "Working Professionals", blurb: "Level up your skills and test a venture in 54 hours." },
  { title: "Business Owners", blurb: "Pressure‑test new products or spin‑offs with real feedback." },
  { title: "Mompreneurs", blurb: "Bring your idea to life with mentors and a focused team." },
  { title: "Aspiring Entrepreneurs", blurb: "Start here. Learn by doing and ship an MVP." },
  { title: "Digital Nomads", blurb: "Co‑create with a global‑minded community in Colombo." },
  { title: "Intrapreneurs", blurb: "Prototype solutions that matter inside your organization." },
];

export default function WhoIsItFor() {
  return (
    <section className="relative isolate bg-brand-black py-16 sm:py-20">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-3xl font-bold sm:text-4xl"
          >
            Who is it for?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.06, ease: "easeOut" }}
            className="mt-3 text-white/80"
          >
            Whether you are just starting out or already established, this edition is built to help
            professionals transform ideas into real ventures.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur supports-[backdrop-filter]:bg-white/[0.04]"
            >
              {/* Minimal monochrome accent line (no green) */}
              <span className="absolute inset-x-0 top-0 h-px bg-white/15" aria-hidden />

              <div className="flex items-start gap-3">
                {/* Inline checkmark icon (white only) */}
                <svg aria-hidden viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 opacity-80">
                  <path fill="currentColor" d="M9.55 17.6 4.9 13l1.4-1.4 3.25 3.2 7.2-7.2L18.1 9l-8.55 8.6Z" />
                </svg>
                <div>
                  <h3 className="text-base font-semibold">{it.title}</h3>
                  <p className="mt-1 text-sm text-white/75">{it.blurb}</p>
                </div>
              </div>

              {/* Hover lift (subtle) */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 transition group-hover:ring-1 group-hover:ring-white/15" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

