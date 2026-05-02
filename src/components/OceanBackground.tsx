export default function OceanBackground() {
  return (
    <div className="ocean-bg" aria-hidden="true">
      {/* Radial glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full animate-pulse-glow"
        style={{
          background:
            "radial-gradient(ellipse, rgba(212,168,83,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Animated ocean waves */}
      <div className="ocean-wave" />
      <div className="ocean-wave" />
      <div className="ocean-wave" />

      {/* Subtle star-like particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse-glow"
          style={{
            width: `${2 + Math.random() * 2}px`,
            height: `${2 + Math.random() * 2}px`,
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            background: "rgba(212,168,83,0.3)",
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}
