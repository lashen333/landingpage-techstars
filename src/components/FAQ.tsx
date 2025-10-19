// src\components\FAQ.tsx
import Reveal from "./Reveal";

const faqs = [
  { q: "Who can join?", a: "Developers, designers, business folks, students—anyone excited to build." },
  { q: "Do I need an idea?", a: "No. Pitch your idea or join a team after voting on Friday." },
  { q: "Do I need a team?", a: "Teams form on Day 1. Solo? You’ll find teammates there." },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal><h2 className="text-3xl font-bold text-center">FAQ</h2></Reveal>
        <div className="mt-8 space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <details className="group rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <summary className="cursor-pointer list-none font-medium text-white/95">
                  {f.q}
                  <span className="float-right transition group-open:rotate-45">＋</span>
                </summary>
                <p className="mt-2 text-white/80">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
