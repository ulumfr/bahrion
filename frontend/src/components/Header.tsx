export default function Header() {
  return (
    <header className="relative z-10 text-center pt-12 pb-6 px-4 animate-fade-in-up">
      {/* Logo */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className="text-4xl" role="img" aria-label="anchor">
          ⚓
        </span>
        <h1
          className="text-4xl md:text-5xl font-bold tracking-wider"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="text-gradient-gold">BAHRION</span>
        </h1>
      </div>

      {/* Tagline */}
      <p className="text-mist text-base md:text-lg tracking-wide">
        Your Captain in the Ocean of Wealth
      </p>

      {/* Decorative line */}
      <div className="mt-5 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </header>
  );
}
