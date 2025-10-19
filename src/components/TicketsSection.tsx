"use client";

import { motion } from "framer-motion";
import type React from "react";

type Ticket = {
  name: string;
  price: string;
  desc: string;
  tag: string;
  expires?: string;
  highlight?: boolean;
};

const tickets: Ticket[] = [
  {
    name: "Early Bird Ticket",
    price: "LKR 18,500",
    desc: "Discounted for early supporters. Ends soon!",
    tag: "Ends 7th November 2025",
    expires: "7 Nov 2025",
    highlight: true,
  },
  {
    name: "Regular Ticket",
    price: "LKR 24,500",
    desc: "Standard access to all sessions and networking opportunities.",
    tag: "Available until sold out",
  },
];

export default function TicketsSection() {
  return (
    <section className="relative isolate bg-brand-black py-20">
      {/* Section grid (not visible inside tickets) */}
      <div className="absolute inset-0 bg-grid" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold"
          >
            Tickets & Registration
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 text-white/80"
          >
            Limited seats available. Joining the waitlist is required for qualification.
          </motion.p>
        </div>

        {/* Ticket cards (ticket-shaped) */}
        <div className="mt-12 grid gap-6 sm:gap-8 md:grid-cols-2">
          {tickets.map((t, i) => (
            <TicketCard key={t.name} ticket={t} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Ticket Card Component ---- */
function TicketCard({
  ticket,
  delay,
}: {
  ticket: Ticket;
  delay: number;
}) {
  // Mask for ticket shape (cut circular notches left/right)
  const ticketMask =
    "radial-gradient(14px 14px at left 50%, transparent 98%, #000 100%) 0 0 / 28px 100% no-repeat," +
    "radial-gradient(14px 14px at right 50%, transparent 98%, #000 100%) 100% 0 / 28px 100% no-repeat," +
    "linear-gradient(#000,#000)";

  // Type-safe style object (no `any`)
  const maskStyle: React.CSSProperties = {
    // React supports these keys in CSSProperties
    WebkitMask: ticketMask,
    mask: ticketMask,
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ translateY: -4 }}
      style={maskStyle}
      className="relative overflow-hidden rounded-2xl"
    >
      {/* Solid background (no grid visible) */}
      <div className="relative flex flex-col sm:flex-row items-stretch bg-[#0b0b0b] text-white border border-white/10 rounded-[18px] shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
        {/* Left: Ticket main body */}
        <div className="flex-1 p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-semibold">{ticket.name}</h3>
            <p className="text-xl sm:text-2xl font-bold">{ticket.price}</p>
          </div>
          <p className="mt-2 text-sm text-white/75">{ticket.desc}</p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs text-white/75">
            <CalendarIcon className="h-3.5 w-3.5 text-white/70" />
            <span>{ticket.tag}</span>
          </div>
        </div>

        {/* Perforated divider */}
        <div className="relative hidden sm:block w-px bg-transparent">
          <div className="absolute inset-y-4 left-[-0.5px] w-px border-l border-dashed border-white/25" />
        </div>

        {/* Right stub (CTA) */}
        <div className="shrink-0 sm:w-60 p-6 sm:p-7 flex flex-col justify-between bg-[#0e0e0e]">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/60">Registration</p>
            <p className="mt-1 text-sm text-white/80">
              {ticket.expires ? "Early access offer" : "Available while seats last"}
            </p>
          </div>

          <motion.a
            href="#hero-form"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-5 inline-flex items-center justify-center rounded-full border border-brand-phosphor bg-brand-phosphor px-5 py-2.5 text-sm font-medium text-white transition hover:bg-transparent hover:text-brand-phosphor"
          >
            Join Waitlist
          </motion.a>
        </div>
      </div>

      {/* Glow for Early Bird only */}
      {ticket.highlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 inset-0 rounded-[18px] blur-2xl"
          style={{ boxShadow: "0 0 160px 8px rgba(57,196,99,0.18)" }}
        />
      )}
      {/* Decorative Accent Strip */}
      <div className="absolute right-0 top-0 h-full w-[6px] bg-gradient-to-b from-brand-phosphor/90 to-brand-phosphor/50" />
    </motion.article>
  );
}

/* Minimal monochrome calendar icon */
function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={props.className}>
      <path
        fill="currentColor"
        d="M7 2h2v2h6V2h2v2h1a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V2Zm-2 8h14v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V10Z"
      />
    </svg>
  );
}
