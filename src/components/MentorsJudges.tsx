// src\components\MentorsJudges.tsx
"use client";

import Reveal from "./Reveal";

/* Tiny LinkedIn icon */
function LinkedInIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4.96V24H.5zM8 8h4.77v2.2h.06c.66-1.2 2.27-2.46 4.72-2.46 5.04 0 6 3.33 6 7.67V24h-4.96V16.3c0-1.83-.03-4.18-2.54-4.18-2.55 0-2.94 1.99-2.94 4.05V24H8z"/>
    </svg>
  );
}

/* Avatar with subtle phosphor ring */
function Avatar({ alt, src }: { alt: string; src?: string }) {
  return (
    <div className="relative">
      <div className="size-12 rounded-full p-[2px] bg-gradient-to-b from-brand-phosphor/70 to-brand-phosphor/20">
        <div className="size-full rounded-full bg-brand-black overflow-hidden grid place-items-center">
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt} className="size-full object-cover grayscale" />
          ) : (
            <div className="size-full grid place-items-center bg-white/5">
              <div className="size-5 rounded-full bg-white/15" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type Person = {
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
};

/* Dummy data (replace later) */
const PEOPLE: Person[] = [
  { name: "Amaya Dias", role: "Judge — VC Partner", image: "", linkedin: "https://www.linkedin.com/" },
  { name: "Ramesh Kulasekara", role: "Mentor — Product", image: "", linkedin: "https://www.linkedin.com/" },
  { name: "Shenuki Gunawardena", role: "Mentor — Growth", image: "", linkedin: "https://www.linkedin.com/" },
  { name: "Thivanka Fernando", role: "Judge — Founder", image: "", linkedin: "https://www.linkedin.com/" },
  { name: "Niroshan Perera", role: "Mentor — Design", image: "", linkedin: "https://www.linkedin.com/" },
  { name: "Savini Jayasena", role: "Mentor — AI/ML", image: "", linkedin: "https://www.linkedin.com/" },
  { name: "Harsha Wickramasinghe", role: "Judge — Angel", image: "", linkedin: "https://www.linkedin.com/" },
  { name: "Maleesha Abey", role: "Mentor — Engineering", image: "", linkedin: "https://www.linkedin.com/" },
  { name: "Ishanka Weerasinghe", role: "Mentor — Marketing", image: "", linkedin: "https://www.linkedin.com/" },
];

/* Card for grid cell */
function PersonCard({ p }: { p: Person }) {
  return (
    <div
      className="
        relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03]
        px-4 py-4 hover:bg-white/[0.05] hover:shadow-[0_0_24px_rgba(57,196,99,.15)]
        transition
      "
    >
      <Avatar alt={`${p.name} photo`} src={p.image} />

      <div className="min-w-0 pr-10">
        <h3 className="font-semibold truncate">{p.name}</h3>
        <p className="text-white/70 text-sm truncate">{p.role}</p>
      </div>

      {p.linkedin && (
        <a
          href={p.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${p.name} LinkedIn`}
          className="
            absolute right-3 top-1/2 -translate-y-1/2 inline-grid place-items-center
            size-7 rounded-full border border-white/20 bg-white/5 text-brand-phosphor
            hover:border-brand-phosphor hover:shadow-[0_0_18px_rgba(57,196,99,.35)]
            transition
          "
        >
          <LinkedInIcon className="size-3.5" />
        </a>
      )}
    </div>
  );
}

export default function MentorsJudges() {
  return (
    <section id="mentors" className="py-20 bg-brand-black">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight">
            Mentors & Judges
            <span className="block  text-base sm:text-lg font-bold mt-1">
              Tagline Experts who’ll guide your 54-hour sprint
            </span>
          </h2>
        </Reveal>

        {/* 3×3 grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {PEOPLE.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.03}>
              <PersonCard p={p} />
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-white/50 text-sm">
          *Lineup evolves as we confirm availability.
        </p>
      </div>
    </section>
  );
}
