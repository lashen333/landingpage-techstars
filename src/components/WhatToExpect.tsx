// src\components\WhatToExpect.tsx
"use client";

import { motion } from "framer-motion";

const steps = [
    {
        id: "1",
        title: "Walk away with a validated business idea",
        desc: "Learn how to refine your concept through real feedback and mentor sessions.",
    },
    {
        id: "2",
        title: "Turn creative thinking into a ready-to-launch business plan",
        desc: "Convert ideas into structured strategies guided by experienced coaches.",
    },
    {
        id: "3",
        title: "Learn proven methods to ideate and test new ventures",
        desc: "Discover frameworks used by global startup founders and innovators.",
    },
    {
        id: "4",
        title: "Collaborate effectively with diverse teams",
        desc: "Experience teamwork that mirrors real startup dynamics and challenges.",
    },
    {
        id: "5",
        title: "Experience an intense, time-bound startup sprint",
        desc: "Validate ideas quickly, build prototypes, and pitch to judges.",
    },
    {
        id: "6",
        title: "Network with mentors and other professionals",
        desc: "Build meaningful relationships that can accelerate your startup journey.",
    },
];

export default function WhatToExpect() {
    return (
        <section className="relative isolate bg-brand-black py-20">
            <div className="absolute inset-0 bg-grid" aria-hidden />
            <div className="relative mx-auto max-w-6xl px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl font-bold"
                    >
                        What to Expect Over 54 Hours?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="mt-3 text-white/80"
                    >
                        You’ll leave Startup Weekend not just inspired, but with a clear roadmap to bring your idea to life.
                    </motion.p>
                </div>

                {/* Roadmap timeline */}
                <div className="relative mx-auto max-w-4xl">
                    {/* Connecting line (central timeline) */}
                    <div className="absolute left-1/2 top-0 -ml-[1px] h-full w-[2px] bg-gradient-to-b from-white/30 to-white/5 pointer-events-none hidden sm:block" />

                    <div className="space-y-12 sm:space-y-20">
                        {steps.map((s, i) => (
                            <motion.div
                                key={s.id}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className={`relative flex flex-col sm:flex-row sm:items-center ${i % 2 === 0 ? "sm:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Connector dot (responsive sizes + phosphor glow) */}
                                <div className="relative flex justify-center sm:w-1/2">
                                    <div className="absolute sm:static top-0 sm:translate-y-0 flex flex-col items-center">
                                        <div className="relative">
                                            {/* Glow halos (scale with breakpoint so it doesn’t overpower on mobile) */}
                                            <span
                                                aria-hidden
                                                className="
          absolute rounded-full bg-brand-phosphor/25 blur-md
          -inset-1 md:-inset-2
        "
                                            />
                                            <span
                                                aria-hidden
                                                className="
          absolute rounded-full bg-brand-phosphor/15 blur-xl animate-pulse
          -inset-2 md:-inset-4
        "
                                            />

                                            {/* Dot: h-8 w-8 on mobile, h-20 w-20 on desktop */}
                                            <div
                                                className="
          relative flex items-center justify-center rounded-full
          bg-brand-black border border-white/20
          h-8 w-8 md:h-20 md:w-20
          shadow-[0_0_0_2px_rgba(57,196,99,0.20),0_0_18px_rgba(57,196,99,0.35)]
        "
                                            >
                                                {/* Number size scales with the dot */}
                                                <span
                                                    className="
            text-white font-semibold leading-none
            text-[10px] sm:text-xs md:text-3xl
          "
                                                >
                                                    {s.id}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Connector line below the dot (kept subtle) */}
                                        <div className="hidden sm:block h-8 w-[2px] bg-white/15" />
                                    </div>
                                </div>



                                {/* Content card */}
                                <div className="mt-4 sm:mt-0 sm:w-1/2 px-3 sm:px-6">
                                    <div className="rounded-2xl border border-white/10 bg-white/8 p-5 transition hover:border-white/20 hover:bg-white/10">
                                        <h3 className="font-semibold text-white text-base sm:text-lg">
                                            {s.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-white/70">{s.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA — only green element */}
                <div className="mt-16 text-center">
                    <motion.a
                        href="#hero-form"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-brand-phosphor px-8 py-3 font-medium text-white transition hover:border-brand-phosphor hover:bg-white/10 hover:shadow-[0_0_30px_rgba(57,196,99,.35)]"
                    >
                        Join the Waitlist
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
