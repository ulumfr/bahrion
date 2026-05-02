import Image from "next/image";

interface Props {
  insight: string;
}

export default function CaptainInsight({ insight }: Props) {
  return (
    <div className="glass-card-gold p-6 md:p-8 relative overflow-hidden" id="captain-insight">
      {/* Decorative corner accent */}
      <div
        className="absolute top-0 left-0 w-20 h-20 opacity-10"
        style={{
          background:
            "linear-gradient(135deg, var(--color-gold) 0%, transparent 60%)",
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center overflow-hidden relative shrink-0 shadow-[0_0_15px_rgba(212,168,83,0.15)]">
          <Image
            src="/character.png"
            alt="Captain Bahrion"
            fill
            sizes="(max-width: 768px) 64px, 80px"
            className="object-cover object-top"
          />
        </div>
        <div>
          <h3
            className="text-gold font-bold text-base tracking-wide"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Captain&apos;s Insight
          </h3>
          <p className="text-mist text-xs">Intelligence Briefing</p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-gold/30 via-gold/10 to-transparent mb-4" />

      {/* Insight text */}
      <div className="relative pl-4 border-l-2 border-gold/20">
        <p className="text-pearl/90 text-sm md:text-base leading-relaxed whitespace-pre-line">
          {insight}
        </p>
      </div>

      {/* Decorative bottom */}
      <div
        className="absolute bottom-0 right-0 w-32 h-32 opacity-5"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
