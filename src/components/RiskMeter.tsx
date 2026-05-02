import { RiskLevel, RISK_MAP } from "@/lib/types";

interface Props {
  riskLevel: RiskLevel;
  confidence: number;
}

export default function RiskMeter({ riskLevel, confidence }: Props) {
  const config = RISK_MAP[riskLevel];

  // Calculate needle rotation: 0% = -90deg (left), 100% = 90deg (right)
  const rotation = -90 + (config.percentage / 100) * 180;

  return (
    <div
      className="glass-card p-5 text-center transition-all duration-500 hover:scale-[1.02]"
      id="risk-card"
    >
      {/* Gauge */}
      <div className="relative w-28 h-16 mx-auto mb-3 overflow-hidden">
        {/* Semicircle background */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full"
          style={{
            background: `conic-gradient(
              from 180deg,
              #4ecdc4 0deg,
              #ffd93d 90deg,
              #ff6b6b 180deg,
              transparent 180deg
            )`,
            opacity: 0.25,
          }}
        />

        {/* Inner mask */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-deep-ocean"
        />

        {/* Needle */}
        <div
          className="absolute bottom-0 left-1/2 origin-bottom transition-transform duration-1000 ease-out"
          style={{
            transform: `translateX(-50%) rotate(${rotation}deg)`,
            width: "2px",
            height: "48px",
            background: `linear-gradient(to top, var(--color-gold), transparent)`,
          }}
        />

        {/* Center dot */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-gold" />
      </div>

      {/* Label */}
      <h3
        className="text-xs uppercase tracking-[0.2em] text-mist mb-1"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Risk Level
      </h3>
      <p className={`text-xl font-bold ${config.colorClass}`}>
        {config.emoji} {config.label}
      </p>

      {/* Confidence */}
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-mist text-xs">
          Confidence:{" "}
          <span className="text-gold font-semibold">{confidence}%</span>
        </p>
        <div className="w-full h-1.5 bg-surface rounded-full mt-1.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-dim to-gold transition-all duration-1000 ease-out"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
    </div>
  );
}
