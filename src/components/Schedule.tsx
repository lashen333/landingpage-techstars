// src\components\Schedule.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { useState } from "react";

/* ---------------- Icons (inline SVG, no extra deps) ---------------- */
function Icon({ name, className = "size-5" }: { name: string; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  switch (name) {
    case "ticket":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M3 9a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v6a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2z" />
          <path d="M9 7v10" />
        </svg>
      );
    case "megaphone":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M3 10v4" />
          <path d="M5 10l9-5v14l-9-5" />
          <path d="M14 12h4" />
          <path d="M14 8h3" />
          <path d="M14 16h3" />
        </svg>
      );
    case "dinner":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M6 3v8" />
          <path d="M10 3v8" />
          <path d="M8 3v8" />
          <path d="M14 4h4a3 3 0 0 1 0 6h-4z" />
          <path d="M6 14v7" />
          <path d="M18 14v7" />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M13 2L3 14h7l-1 8 10-12h-7z" />
        </svg>
      );
    case "vote":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <path d="M12 3l4 5-6 3-4-5z" />
        </svg>
      );
    case "team":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M16 11a4 4 0 1 0-8 0" />
          <path d="M3 21a7 7 0 0 1 18 0" />
        </svg>
      );
    case "coffee":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M3 9h12v5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
          <path d="M15 9h3a2 2 0 1 1 0 4h-3" />
          <path d="M8 2v3M12 2v3M4 2v3" />
        </svg>
      );
    case "map":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3z" />
          <path d="M9 3v15M15 6v15" />
        </svg>
      );
    case "lunch":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M4 3v8a4 4 0 0 0 4 4v6" />
          <path d="M10 3v8a4 4 0 0 1-4 4" />
          <path d="M16 3v18" />
          <path d="M20 8h-4" />
        </svg>
      );
    case "speed":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 12l5-2" />
        </svg>
      );
    case "code":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M8 9l-4 3 4 3" />
          <path d="M16 9l4 3-4 3" />
          <path d="M14 5l-4 14" />
        </svg>
      );
    case "lock":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "mic":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <rect x="9" y="3" width="6" height="10" rx="3" />
          <path d="M5 10a7 7 0 0 0 14 0" />
          <path d="M12 17v4" />
        </svg>
      );
    case "trophy":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M7 4h10v4a5 5 0 0 1-10 0z" />
          <path d="M4 6h3a5 5 0 0 1-3 5zM20 6h-3a5 5 0 0 0 3 5z" />
        </svg>
      );
    case "users":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <circle cx="9" cy="7" r="3" />
          <circle cx="17" cy="9" r="3" />
          <path d="M2 21a7 7 0 0 1 14 0" />
          <path d="M13 21a6 6 0 0 1 9 0" />
        </svg>
      );
    default:
      return <svg viewBox="0 0 24 24" className={className} {...common}><circle cx="12" cy="12" r="9" /></svg>;
  }
}

/* --------------- Data (icons mapped to keys above) --------------- */
type Slot = { time: string; title: string; note?: string; icon: string };
type Day = { num: number; dateLabel: string; tagline: string; subTagline: string; slots: Slot[] };

const agenda: Day[] = [
  {
    num: 1,
    dateLabel: "Friday, Nov 14",
    tagline: "Ignition Night",
    subTagline: "Form teams, find focus, start building",
    slots: [
      { time: "5:00 PM", title: "Doors Open & Registration", note: "Check-in, grab name tags, network naturally", icon: "ticket" },
      { time: "5:30 PM", title: "Welcome & Rules", note: "30 minutes. SW methodology. That’s it.", icon: "megaphone" },
      { time: "5:45 PM", title: "Dinner + Networking", note: "Food + natural conversation. No forced icebreakers.", icon: "dinner" },
      { time: "6:30 PM", title: "Pitch Rally — Round 1", note: "60-second pitches. Ideas only. No slides.", icon: "bolt" },
      { time: "7:15 PM", title: "Pitch Rally — Round 2", note: "More rapid pitches. No slides.", icon: "bolt" },
      { time: "7:45 PM", title: "Idea Voting", note: "Dot voting. Top 12–20 ideas advance.", icon: "vote" },
      { time: "8:00 PM", title: "Team Formation", note: "Ideas secure recruits. Teams form by 9 PM.", icon: "team" },
    ],
  },
  {
    num: 2,
    dateLabel: "Saturday, Nov 15",
    tagline: "Build Day",
    subTagline: "Code, create, validate — repeat until collapse",
    slots: [
      { time: "8:00 AM", title: "Doors Open + Coffee", note: "Caffeine available. Teams trickle in.", icon: "coffee" },
      { time: "8:30 AM", title: "All-Hands Check-In", note: "5 minutes. Logistics only.", icon: "map" },
      { time: "8:35 AM", title: "Get Out of the Building", note: "Customer interviews. Market research. GO.", icon: "map" },
      { time: "12:00 PM", title: "Lunch Break", note: "45-min max. Working lunch encouraged.", icon: "lunch" },
      { time: "3:00 PM", title: "Mentor Speed Dating", note: "Fast feedback with mentors.", icon: "speed" },
      { time: "3:30 PM", title: "Build Sprint Continues", note: "Code, design, prototype, test.", icon: "code" },
      { time: "6:00 PM", title: "Dinner", note: "Fuel up for the night shift.", icon: "dinner" },
      { time: "6:45 PM", title: "Build Until You Drop", note: "Pure execution. No seminars.", icon: "bolt" },
    ],
  },
  {
    num: 3,
    dateLabel: "Sunday, Nov 16",
    tagline: "Showcase Sunday",
    subTagline: "Finish strong. Pitch hard. Win or learn.",
    slots: [
      { time: "8:00 AM", title: "Doors Open", note: "Final push begins.", icon: "lock" },
      { time: "8:15 AM", title: "Morning Announcements", note: "Pitch order, judging criteria, logistics.", icon: "megaphone" },
      { time: "8:30 AM", title: "Final Sprint", note: "Build, refine, practice.", icon: "code" },
      { time: "12:00 PM", title: "Submissions Due", note: "Decks, demos, links.", icon: "upload" /* fallback circle */ },
      { time: "12:15 PM", title: "Lunch + Setup", note: "Team prep, presentation space.", icon: "lunch" },
      { time: "1:00 PM", title: "Pitch Lab", note: "Practice with mentor feedback.", icon: "mic" },
      { time: "2:00 PM", title: "Final Pitch Prep", note: "Polish and rehearse.", icon: "mic" },
      { time: "2:30 PM", title: "Judges + VIP Arrival", note: "Investors & community leaders arrive.", icon: "users" },
      { time: "3:00 PM", title: "Final Presentations", note: "3 min + 2 min Q&A per team.", icon: "trophy" },
      { time: "4:30 PM", title: "Awards & Closing", note: "Winner announcement & celebration.", icon: "trophy" },
    ],
  },
];

/* ---------------- Card primitives ---------------- */
function IconChip({ name }: { name: string }) {
  return (
    <div className="relative mr-3 shrink-0">
      
      {/* square chip */}
      <div className="flex size-9 items-center justify-center rounded-xl bg-brand-phosphor/15 ring-1 ring-brand-phosphor/30 text-brand-phosphor">
        <Icon name={name} />
      </div>
    </div>
  );
}

function SlotRow({ s }: { s: Slot }) {
  return (
    <li className="relative">
      <div className="rounded-2xl border border-white/10 bg-[#0b0f0b]/90 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start">
            <IconChip name={s.icon} />
            <div>
              <div className="font-semibold text-white">{s.title}</div>
              {s.note && <div className="text-white/60 text-sm">{s.note}</div>}
            </div>
          </div>
          <div className="shrink-0 text-white/70 text-sm font-medium">{s.time}</div>
        </div>
      </div>
    </li>
  );
}

function DayCard({ day, open, onToggle }: { day: Day; open: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full text-left px-5 sm:px-7 py-5 sm:py-6 flex items-center gap-4 hover:bg-white/[0.04] transition"
        aria-expanded={open}
      >
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-phosphor/15 ring-1 ring-brand-phosphor/30 text-brand-phosphor font-extrabold">
          {day.num}
        </div>
        <div className="flex-1">
          <div className="text-xl sm:text-2xl font-extrabold tracking-tight">{day.dateLabel}</div>
          <div className="mt-1 text-brand-phosphor font-bold">// {day.tagline}</div>
          <div className="text-white/60 text-sm">/** {day.subTagline} */</div>
        </div>
        <span className="text-white/50 text-xl sm:text-2xl">{open ? "▴" : "▾"}</span>
      </button>

      {/* Body with vertical line */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="px-5 sm:px-7 pb-6">
              <div className="relative pl-10">
                {/* timeline spine (phosphor gradient) */}
                <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-phosphor/70 via-brand-phosphor/30 to-transparent" />
                <ul className="space-y-3">
                  {day.slots.map((slot, i) => <SlotRow key={i} s={slot} />)}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Main component ---------------- */
export default function Schedule() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="schedule" className="relative py-20 bg-brand-black">
      {/* NOTE: grid removed by request. We keep the brand-black background only. */}

      <div className="relative mx-auto max-w-5xl px-4">
        <Reveal>
          <h2 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="text-white">Event Agenda</span>
            <span className="block text-base sm:text-lg font-bold mt-1">// Tagline 54 hours of innovation</span>
          </h2>
        </Reveal>

        <div className="mt-10 space-y-6">
          {agenda.map((day, i) => (
            <Reveal key={day.num} delay={i * 0.05}>
              <DayCard
                day={day}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>

        
      </div>
    </section>
  );
}
