// src\components\Team.tsx
"use client";

import Reveal from "./Reveal";

/* ---------- Round LinkedIn button icon ---------- */
function LinkedInIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4.96V24H.5zM8 8h4.77v2.2h.06c.66-1.2 2.27-2.46 4.72-2.46 5.04 0 6 3.33 6 7.67V24h-4.96V16.3c0-1.83-.03-4.18-2.54-4.18-2.55 0-2.94 1.99-2.94 4.05V24H8z"/>
    </svg>
  );
}

/* ---------- Placeholder avatar (used when image is missing) ---------- */
function Placeholder({ className = "size-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} aria-hidden>
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="rgba(57,196,99,.18)" />
          <stop offset="1" stopColor="rgba(255,255,255,.06)" />
        </linearGradient>
      </defs>
      <rect width="128" height="128" rx="64" fill="url(#g)" />
      <circle cx="64" cy="50" r="22" fill="rgba(255,255,255,.2)" />
      <rect x="28" y="78" width="72" height="28" rx="14" fill="rgba(255,255,255,.15)" />
    </svg>
  );
}

/* ---------- Types & dummy data ---------- */
type Member = {
  name: string;
  role: string;
  image?: string;      // e.g. "/team/ayesha.jpg"
  linkedin: string;    // full URL
};

const TEAM: Member[] = [
  { name: "Ayesha Perera", role: "Lead Organizer", image: "", linkedin: "https://www.linkedin.com/" },
  { name: "Ruwan Silva", role: "Community Co-Lead", image: "", linkedin: "https://www.linkedin.com/" },
  { name: "Nadun Jayasuriya", role: "Operations", image: "", linkedin: "https://www.linkedin.com/" },
  
  
];

/* ---------- Card ---------- */
function Card({ m }: { m: Member }) {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 pt-8
                    hover:shadow-[0_0_40px_rgba(57,196,99,.18)] transition">

      {/* Avatar with phosphor ring */}
      <div className="mx-auto">
        <div className="relative mx-auto size-32 rounded-full p-[3px]
                        bg-gradient-to-b from-brand-phosphor/70 to-brand-phosphor/20">
          <div className="size-full rounded-full bg-brand-black grid place-items-center overflow-hidden">
            {m.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.image} alt={`${m.name} photo`} className="size-full object-cover" />
            ) : (
              <Placeholder className="size-full" />
            )}
          </div>
        </div>
      </div>

      {/* Name + role */}
      <div className="mt-5 text-center">
        <h3 className="text-lg font-semibold text-brand-phosphor">{m.name}</h3>
        <p className="text-white/70 text-sm">{m.role}</p>
      </div>

      {/* Round LinkedIn button centered at bottom */}
      <div className="mt-8 pb-4 relative">
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-6
                        size-12 rounded-full bg-brand-phosphor/10 blur-xl" />
        <a
          href={m.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${m.name}'s LinkedIn`}
          className="group absolute left-1/2 -bottom-4 -translate-x-1/2
                     size-12 rounded-full grid place-items-center
                     border border-white/20 bg-white/5 text-brand-phosphor
                     hover:border-brand-phosphor hover:shadow-[0_0_30px_rgba(57,196,99,.35)]
                     transition"
        >
          <LinkedInIcon className="size-5" />
          <span className="sr-only">LinkedIn</span>
        </a>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */
export default function Team() {
  return (
    <section id="team" className="py-20 bg-brand-black">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight">
          Our Team
          <span className="block  text-base sm:text-lg font-bold mt-1">
            Tagline Organizers & Leads
          </span>
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.04}>
              <div className="relative">
                <Card m={m} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
