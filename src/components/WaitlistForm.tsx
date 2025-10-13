// src\components\WaitlistForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FormSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().max(0).optional(), // honeypot
});
type FormValues = z.infer<typeof FormSchema>;

export default function WaitlistForm() {
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>();

  const [bubbles, setBubbles] = useState<Array<{
      id: number;
      size: number;
      left: number;
      top: number;
      driftY: number;
      duration: number;
      delay: number;
      opacity: number;
    }>>([]);
  
    // Generate bubbles ONLY on client side after component mounts
    useEffect(() => {
      const generatedBubbles = Array.from({ length: 64 }).map((_, i) => {
        const size = Math.random() * 5 + 2;    // 2–7px
        const left = Math.random() * 100;      // vw
        const top = Math.random() * 100;       // vh
        const driftY = Math.random() * 70 + 40; // 40–110px vertical drift
        const duration = Math.random() * 6 + 6; // 6–12s (faster)
        const delay = Math.random() * 3;       // 0–3s
        const opacity = Math.random() * 0.5 + 0.2; // 0.2–0.7
        return { id: i, size, left, top, driftY, duration, delay, opacity };
      });
      
      setBubbles(generatedBubbles);
    }, []); // Empty dependency array = runs once after mount

  const onSubmit = async (values: FormValues) => {
    setStatus(null);
    const parsed = FormSchema.safeParse(values);
    if (!parsed.success) return setStatus({ ok: false, msg: parsed.error.issues[0]?.message ?? "Invalid input" });
    if (values.phone && values.phone.length > 0) return setStatus({ ok: false, msg: "Spam check failed." });

    try {
      const body = new FormData();
      body.append("Name", values.name);
      body.append("Email", values.email);

      const res = await fetch(process.env.NEXT_PUBLIC_GSHEET_ENDPOINT!, { method: "POST", body });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json?.result === "success") {
        setStatus({ ok: true, msg: "Thanks! You’re on the waitlist." });
        reset();
      } else throw new Error(json?.error || "Unknown error");
    } catch {
      setStatus({ ok: false, msg: "Something went wrong. Please try again." });
    }
  };

  return (
    <section
      id="waitlist"
      className="
        relative overflow-hidden section-vignette
        bg-brand-black
        py-24
      "
    >
      {/* 1) Grid */}
      <div className="absolute inset-0 bg-grid" aria-hidden />

      {/* 2) Phosphor-tinted bottom wash (darkens like your reference) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.28 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="
          pointer-events-none absolute -bottom-[36rem] left-1/2
          h-[40rem] w-[70rem] -translate-x-1/2
          rounded-full bg-brand-phosphor blur-[140px] 
        "
      />
      
      {/* 3) Ambient bubbles */}
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
              borderRadius: "9999px",
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,.9), rgba(255,255,255,.12) 60%, transparent 70%)",
              boxShadow: "0 0 10px rgba(255,255,255,.06)",
              filter: "saturate(0.85)",
            }}
          />
        ))}
      </div>

      {/* 4) Content */}
      <div className="relative mx-auto max-w-xl px-4 text-center">
        <h2 className="text-3xl font-bold h-balance">Join the Waitlist</h2>
        <p className="mt-2 text-white/80">Be the first to know when registration opens.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 text-left">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/90">Name</label>
            <input
              id="name"
              {...register("name", { required: true })}
              className="
                mt-1 w-full rounded-xl border border-white/15 px-3 py-2 text-white
                placeholder-white/40 focus:border-brand-phosphor  bg-[#0b0b0b]   
              "
              placeholder="Your full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/90">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className="
                mt-1 w-full rounded-xl border border-white/15 px-3 py-2 text-white
                placeholder-white/40 focus:border-brand-phosphor  bg-[#0b0b0b]
              "
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
          </div>

          {/* Honeypot */}
          <input type="text" tabIndex={-1} autoComplete="off" {...register("phone")} className="hidden" />

          {/* CTA — pill outline like the hero, with phosphor hover ring */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full rounded-full px-5 py-3 mt-2 font-semibold
              border border-white/25 bg-brand-phosphor text-white
              hover:bg-white/[0.08] hover:border-brand-phosphor
              hover:shadow-[0_0_30px_rgba(57,196,99,.35)]
              transition disabled:opacity-60
            "
          >
            {isSubmitting ? "Submitting..." : "Join the waitlist"}
          </button>

          {status && (
            <p className={`text-center ${status.ok ? "text-brand-phosphor" : "text-red-400"}`}>{status.msg}</p>
          )}
        </form>
      </div>
    </section>
  );
}
