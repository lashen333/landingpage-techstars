// src\components\EventSchedule.tsx
"use client";

import { motion } from "framer-motion";

type Day = {
  dateLabel: string;   // e.g., "Fri, Nov 14"
  title: string;       // e.g., "Ignition Night"
  timeRange: string;   // e.g., "6:00 PM – 10:00 PM"
  desc: string;        // one-paragraph description
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
};

/* Monochrome inline icons */
const RocketIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden className={props.className}>
    <path fill="currentColor" d="M12 2c3.6 0 6.2 2.6 6.2 2.6S16.4 10.4 12 14.8 2.6 21.8 2.6 21.8 3.8 15 8.2 10.6 12 2 12 2Zm0 0s-2 3.2-2 5.2 2 2 2 2 2 0 2-2-2-5.2-2-5.2ZM10.6 14.8 9 18l3.2-1.6-1.6-1.6Z" />
  </svg>
);
const GearsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden className={props.className}>
    <path fill="currentColor" d="M10 4h4l.4 1.9 1.8.8 1.6-1.1 2.8 2.8-1.1 1.6.8 1.8L22 14v4l-1.9.4-.8 1.8 1.1 1.6-2.8 2.8-1.6-1.1-1.8.8L14 22h-4l-.4-1.9-1.8-.8-1.6 1.1-2.8-2.8 1.1-1.6-.8-1.8L2 14v-4l1.9-.4.8-1.8-1.1-1.6L6.4 3l1.6 1.1 1.8-.8L10 4Zm2 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" />
  </svg>
);
const TrophyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden className={props.className}>
    <path fill="currentColor" d="M18 3v2h3v2a5 5 0 0 1-5 5h-1a6 6 0 0 1-2 3v3h3v2H8v-2h3v-3a6 6 0 0 1-2-3H8a5 5 0 0 1-5-5V5h3V3h2v2h8V3h2Z" />
  </svg>
);

const days: Day[] = [
  {
    dateLabel: "Fri, Nov 14",
    title: "Ignition Night",
    timeRange: "6:00 PM – 10:00 PM",
    icon: RocketIcon,
    desc:
      "Kick-off, concise overview, rapid idea sharing, and team formation. Set expectations, align goals, and scope what’s realistic to ship in 54 hours.",
  },
  {
    dateLabel: "Sat, Nov 15",
    title: "Build Day",
    timeRange: "9:00 AM – 9:00 PM",
    icon: GearsIcon,
    desc:
      "Validate with customers, iterate on the business model, and build your MVP. Get hands-on mentor feedback across product, GTM, and pitch.",
  },
  {
    dateLabel: "Sun, Nov 16",
    title: "Showcase Sunday",
    timeRange: "9:00 AM – 7:00 PM",
    icon: TrophyIcon,
    desc:
      "Polish your demo and narrative. Present final pitches to judges celebrate wins, and plan next steps for your venture.",
  },
];

export default function EventSchedule() {
  return (
    <section className="relative isolate bg-brand-black py-20">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-4xl font-bold sm:text-5xl"
          >
            Event Schedule 
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
            className="mt-3 text-white/80"
          >
            3 days of ideation, collaboration, and innovation.
          </motion.p>
        </div>

        {/* Three columns — stack on small screens */}
        <div className="mt-12 grid gap-5 sm:gap-6 md:grid-cols-3">
          {days.map((d, idx) => {
            const Icon = d.icon;
            return (
              <motion.article
                key={d.dateLabel}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ translateY: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur supports-[backdrop-filter]:bg-white/5"
              >
                {/* Top row: icon + date + time badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded-xl border border-white/15 bg-black/60 p-2">
                      <Icon className="h-5 w-5 text-white/90" />
                    </span>
                    <span className="text-sm font-bold">{d.dateLabel}</span>
                  </div>
                  <span
                    className="rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-xs text-white/80"
                    aria-label={`Time: ${d.timeRange}`}
                  >
                    {d.timeRange}
                  </span>
                </div>

                {/* Title + description (no timeline items) */}
                <h3 className="mt-4 text-lg font-semibold text-white">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{d.desc}</p>

                {/* Hover ring */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 transition group-hover:ring-1 group-hover:ring-white/15" />
              </motion.article>
            );
          })}
        </div>

        
      </div>
    </section>
  );
}
