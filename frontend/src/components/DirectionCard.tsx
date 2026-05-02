import { MarketDirection, DIRECTION_MAP } from "@/lib/types";

interface Props {
  direction: MarketDirection;
}

export default function DirectionCard({ direction }: Props) {
  const config = DIRECTION_MAP[direction];

  return (
    <div
      className="glass-card p-5 text-center transition-all duration-500 hover:scale-[1.02]"
      id="direction-card"
    >
      {/* Compass indicator */}
      <div className="relative w-16 h-16 mx-auto mb-3">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-border" />
        {/* Inner glow */}
        <div
          className={`absolute inset-1 rounded-full border border-current opacity-30 ${config.colorClass}`}
        />
        {/* Direction emoji */}
        <div className="absolute inset-0 flex items-center justify-center text-3xl">
          {config.emoji}
        </div>
      </div>

      {/* Label */}
      <h3
        className="text-xs uppercase tracking-[0.2em] text-mist mb-1"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Direction
      </h3>
      <p className={`text-xl font-bold ${config.colorClass}`}>
        {config.label}
      </p>

      {/* Description */}
      <p className="text-mist text-xs mt-2">{config.description}</p>
    </div>
  );
}
