import { MarketCondition, CONDITION_MAP } from "@/lib/types";

interface Props {
  condition: MarketCondition;
}

export default function ConditionCard({ condition }: Props) {
  const config = CONDITION_MAP[condition];

  return (
    <div
      className={`glass-card p-5 text-center transition-all duration-500 hover:scale-[1.02] ${config.glowClass}`}
      id="condition-card"
    >
      {/* Icon */}
      <div className="text-5xl mb-3 animate-float">{config.emoji}</div>

      {/* Label */}
      <h3
        className="text-xs uppercase tracking-[0.2em] text-mist mb-1"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Condition
      </h3>
      <p className={`text-xl font-bold ${config.colorClass}`}>{config.label}</p>

      {/* Description */}
      <p className="text-mist text-xs mt-2">{config.description}</p>
    </div>
  );
}
