export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-white/70">
        <p>© {new Date().getFullYear()} Techstars Startup Weekend Colombo</p>
        <p className="mt-1">Dates: Nov 14–16, 2025 • Colombo, Sri Lanka</p>
      </div>
    </footer>
  );
}
