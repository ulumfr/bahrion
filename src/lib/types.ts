// ═══════════════════════════════════════════════════
// BAHRION — Core Type Definitions
// ═══════════════════════════════════════════════════

/** Market weather condition */
export type MarketCondition = "clear" | "storm" | "fog";

/** Market trajectory direction */
export type MarketDirection = "bullish" | "bearish" | "neutral";

/** Risk assessment level */
export type RiskLevel = "low" | "medium" | "high";

/** An individual market signal indicator */
export interface MarketSignal {
  icon: string;
  label: string;
  description: string;
}

/** Structured AI analysis output from Captain Bahrion */
export interface MarketAnalysis {
  condition: MarketCondition;
  direction: MarketDirection;
  riskLevel: RiskLevel;
  captainInsight: string;
  signals: MarketSignal[];
  strategy: string[];
  summary: string;
  confidence: number;
}

/** Server Action response wrapper */
export interface AnalysisResult {
  success: boolean;
  data?: MarketAnalysis;
  error?: string;
}

/** Condition display configuration */
export interface ConditionConfig {
  label: string;
  emoji: string;
  description: string;
  colorClass: string;
  glowClass: string;
  bgClass: string;
}

/** Direction display configuration */
export interface DirectionConfig {
  label: string;
  emoji: string;
  description: string;
  colorClass: string;
}

/** Risk display configuration */
export interface RiskConfig {
  label: string;
  emoji: string;
  description: string;
  colorClass: string;
  percentage: number;
}

// ═══════════════════════════════════════════════════
// Display Config Maps
// ═══════════════════════════════════════════════════

export const CONDITION_MAP: Record<MarketCondition, ConditionConfig> = {
  clear: {
    label: "Clear Sky",
    emoji: "🌤",
    description: "Favorable conditions ahead",
    colorClass: "text-clear",
    glowClass: "glow-clear",
    bgClass: "bg-clear-bg",
  },
  storm: {
    label: "Storm",
    emoji: "⛈",
    description: "High turbulence detected",
    colorClass: "text-storm",
    glowClass: "glow-storm",
    bgClass: "bg-storm-bg",
  },
  fog: {
    label: "Fog",
    emoji: "🌫",
    description: "Low visibility — proceed with caution",
    colorClass: "text-fog",
    glowClass: "glow-fog",
    bgClass: "bg-fog-bg",
  },
};

export const DIRECTION_MAP: Record<MarketDirection, DirectionConfig> = {
  bullish: {
    label: "Bullish",
    emoji: "↗️",
    description: "Upward momentum detected",
    colorClass: "text-bullish",
  },
  bearish: {
    label: "Bearish",
    emoji: "↘️",
    description: "Downward pressure observed",
    colorClass: "text-bearish",
  },
  neutral: {
    label: "Neutral",
    emoji: "➡️",
    description: "Sideways drift — no clear trend",
    colorClass: "text-neutral",
  },
};

export const RISK_MAP: Record<RiskLevel, RiskConfig> = {
  low: {
    label: "Low Risk",
    emoji: "🛡️",
    description: "Safe waters",
    colorClass: "text-clear",
    percentage: 25,
  },
  medium: {
    label: "Medium Risk",
    emoji: "⚠️",
    description: "Moderate caution advised",
    colorClass: "text-fog",
    percentage: 55,
  },
  high: {
    label: "High Risk",
    emoji: "🔴",
    description: "Dangerous currents ahead",
    colorClass: "text-storm",
    percentage: 85,
  },
};
