// src\components\About.tsx
import Reveal from "./Reveal";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-16">
      <div className="mx-auto max-w-6xl px-4 grid gap-10 md:grid-cols-2">
        <Reveal>
          <div>
            <h2 className="text-3xl font-bold">What is Startup Weekend?</h2>
            <p className="mt-4 text-white/85 leading-relaxed">
              A three-day, hands-on event where anyone can pitch ideas, form teams,
              build prototypes with mentor support, and present to judges — all in 54 hours.
            </p>
            <p className="mt-2 text-white/85 leading-relaxed">
              Be part of Colombo’s first Techstars Startup Weekend — learn by doing,
              meet collaborators, and ship an MVP.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <figure className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <Image
              src="/section1.jpg"          
              alt="Teams collaborating at Startup Weekend"
              fill                              
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-center"
              priority                          
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
