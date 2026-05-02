import { MarketSignal } from "@/lib/types";

interface Props {
  signals: MarketSignal[];
}

export default function SignalList({ signals }: Props) {
  return (
    <div className="glass-card p-5 md:p-6" id="signals-panel">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">📡</span>
        <h3
          className="text-sm uppercase tracking-[0.15em] text-gold font-semibold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Market Signals
        </h3>
      </div>

      {/* Signals list */}
      <div className="space-y-3">
        {signals.map((signal, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-xl bg-surface/50 border border-border/50
                       hover:border-gold/20 transition-all duration-300 group"
          >
            {/* Icon */}
            <span className="text-xl flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
              {signal.icon}
            </span>

            {/* Content */}
            <div className="min-w-0">
              <p className="text-pearl text-sm font-medium">{signal.label}</p>
              <p className="text-mist text-xs mt-0.5 leading-relaxed">
                {signal.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
