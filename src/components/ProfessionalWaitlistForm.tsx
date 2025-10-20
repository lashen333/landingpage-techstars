// src\components\ProfessionalWaitlistForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

const FormSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email"),
  designation: z
    .enum([
      "Working Professional",
      "Business Owners",
      "Aspiring Entrepreneurs",
      "Mompreneurs",
      "Digital Nomads",
      "Intrapreneurs",
      "Other",
    ])
    .optional(),
  company: z.string().max(120).optional(),
  contact: z.string().max(30).optional(),
  phone: z.string().max(0).optional(), // honeypot
});

type FormValues = z.infer<typeof FormSchema>;

/** Shape returned by your Apps Script endpoint */
type GScriptResponse = {
  result?: "success" | "error";
  error?: string;
  deduped?: boolean;
};

export default function ProfessionalWaitlistForm() {
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ defaultValues: { designation: "Working Professional" } });

  const onSubmit = async (values: FormValues) => {
    setStatus(null);

    const endpoint = process.env.NEXT_PUBLIC_GSHEET_ENDPOINT;
    if (!endpoint) {
      setStatus({ ok: false, msg: "Server endpoint is not configured." });
      return;
    }

    const parsed = FormSchema.safeParse(values);
    if (!parsed.success) {
      setStatus({ ok: false, msg: parsed.error.issues[0]?.message ?? "Invalid input" });
      return;
    }

    // Honeypot (spam) check
    if (values.phone && values.phone.length > 0) {
      setStatus({ ok: false, msg: "Spam check failed." });
      return;
    }

    try {
      const body = new FormData();
      body.append("Name", values.name);
      body.append("Email", values.email);
      if (values.designation) body.append("Designation", values.designation);
      if (values.company) body.append("Company", values.company);
      if (values.contact) body.append("Contact", values.contact);

      const res = await fetch(endpoint, { method: "POST", body });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // Parse JSON safely without `any`
      let json: GScriptResponse | null = null;
      try {
        json = (await res.json()) as GScriptResponse;
      } catch {
        json = null;
      }

      if (json === null || json.result === "success") {
        setStatus({
          ok: true,
          msg: json?.deduped ? "You were already on the list ✅" : "Thanks! You’re on the waitlist.",
        });
        reset();
        return;
      }

      // If Apps Script reported an error explicitly
      throw new Error(json.error || "Unknown error");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setStatus({ ok: false, msg: message });
    }
  };

  return (
    <form
      id="hero-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 text-left"
      aria-labelledby="hero-form-title"
    >
      {/* Name (required) */}
      <div>
        <label htmlFor="name" className="block text-xs font-medium text-white/90">
          Name<span className="text-brand-phosphor">*</span>
        </label>
        <input
          id="name"
          {...register("name", { required: true })}
          className="mt-1 w-full rounded-lg border border-white/15 bg-[#0b0b0b] px-3 py-2 text-white placeholder-white/40 focus:border-white/40 outline-none"
          placeholder="Your full name"
          autoComplete="name"
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
      </div>

      {/* Email (required) */}
      <div>
        <label htmlFor="email" className="block text-xs font-medium text-white/90">
          Email<span className="text-brand-phosphor">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { required: true })}
          className="mt-1 w-full rounded-lg border border-white/15 bg-[#0b0b0b] px-3 py-2 text-white placeholder-white/40 focus:border-white/40 outline-none"
          placeholder="you@example.com"
          autoComplete="email"
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
      </div>

      {/* Designation (optional) */}
      <div>
        <label htmlFor="designation" className="block text-xs font-medium text-white/90">Designation</label>
        <select
          id="designation"
          {...register("designation")}
          className="mt-1 w-full rounded-lg border border-white/15 bg-[#0b0b0b] px-3 py-2 text-white focus:border-white/40 outline-none"
        >
          <option>Working Professional</option>
          <option>Business Owners</option>
          <option>Aspiring Entrepreneurs</option>
          <option>Mompreneurs</option>
          <option>Digital Nomads</option>
          <option>Intrapreneurs</option>
          <option>Other</option>
        </select>
      </div>

      {/* Company / Business Name (optional) */}
      <div>
        <label htmlFor="company" className="block text-xs font-medium text-white/90">Company/Business Name</label>
        <input
          id="company"
          {...register("company")}
          className="mt-1 w-full rounded-lg border border-white/15 bg-[#0b0b0b] px-3 py-2 text-white placeholder-white/40 focus:border-white/40 outline-none"
          placeholder="Company or business"
          autoComplete="organization"
        />
      </div>

      {/* Contact No (optional) */}
      <div>
        <label htmlFor="contact" className="block text-xs font-medium text-white/90">Contact No</label>
        <input
          id="contact"
          {...register("contact")}
          className="mt-1 w-full rounded-lg border border-white/15 bg-[#0b0b0b] px-3 py-2 text-white placeholder-white/40 focus:border-white/40 outline-none"
          placeholder="e.g. +1-212-456-7890"
          inputMode="tel"
          autoComplete="tel"
        />
      </div>

      {/* Honeypot (hidden) */}
      <input type="text" tabIndex={-1} autoComplete="off" {...register("phone")} className="hidden" />

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-5 inline-flex items-center justify-center rounded-full border border-brand-phosphor bg-brand-phosphor px-5 py-2.5 font-medium text-white transition hover:bg-transparent hover:text-brand-phosphor disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Join the Waitlist"}
      </button>

      {status && (
        <p className={`text-center text-sm ${status.ok ? "text-brand-phosphor" : "text-red-400"}`}>
          {status.msg}
        </p>
      )}
    </form>
  );
}
