// src\components\Header.tsx
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto max-w-6xl py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight">techstars<span className="text-brand-phosphor">_</span></span>
          
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#schedule" className="hover:text-white">Schedule</a>
          <a href="#team" className="hover:text-white">Team</a>
          <a href="#mentors" className="hover:text-white">Mentors & Judges</a>
          <a href="#sponsors" className="hover:text-white">Sponsors</a>
          
          <a href="#faq" className="hover:text-white">FAQ</a>
          <a
              href="#waitlist"
              className="
                inline-flex items-center gap-2 rounded-full px-6 py-3
                border border-white/25 bg-white/5 text-white
                hover:bg-white/[0.08] hover:border-brand-phosphor
                hover:shadow-[0_0_30px_rgba(57,196,99,.35)]
                transition
              "
            >
              Join the waitlist
            </a>
        </nav>
      </div>
    </header>
  );
}
