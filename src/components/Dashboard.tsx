import { MarketAnalysis } from "@/lib/types";
import ConditionCard from "./ConditionCard";
import DirectionCard from "./DirectionCard";
import RiskMeter from "./RiskMeter";
import CaptainInsight from "./CaptainInsight";
import SignalList from "./SignalList";
import StrategyPanel from "./StrategyPanel";

interface Props {
  data: MarketAnalysis;
}

export default function Dashboard({ data }: Props) {
  return (
    <div className="w-full stagger-children" id="analysis-dashboard">
      {/* Summary bar */}
      <div className="glass-card p-4 mb-6 text-center">
        <p className="text-foam text-sm md:text-base">
          <span className="text-gold font-semibold">📋 Summary:</span>{" "}
          {data.summary}
        </p>
      </div>

      {/* Top row: Condition / Direction / Risk */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <ConditionCard condition={data.condition} />
        <DirectionCard direction={data.direction} />
        <RiskMeter riskLevel={data.riskLevel} confidence={data.confidence} />
      </div>

      {/* Captain's Insight (full width) */}
      <div className="mb-6">
        <CaptainInsight insight={data.captainInsight} />
      </div>

      {/* Bottom row: Signals / Strategy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <SignalList signals={data.signals} />
        <StrategyPanel strategies={data.strategy} />
      </div>
    </div>
  );
}
