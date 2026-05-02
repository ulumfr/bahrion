"use client";

import { useActionState } from "react";
import { analyzeMarket } from "@/app/actions";
import { AnalysisResult } from "@/lib/types";
import Dashboard from "./Dashboard";
import LoadingState from "./LoadingState";

const EXAMPLE_QUERIES = [
  "AI stocks 2026",
  "Bitcoin outlook",
  "Gold market",
  "Tech sector trends",
  "Emerging markets",
];

export default function QueryInput() {
  const [state, formAction, isPending] = useActionState<
    AnalysisResult | null,
    FormData
  >(analyzeMarket, null);

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-4">
      {/* Input Card */}
      <div
        className="glass-card-gold p-6 md:p-8 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        <form action={formAction} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-mist text-lg">
                🔍
              </span>
              <input
                type="text"
                name="query"
                id="market-query-input"
                placeholder="Enter a market topic to navigate..."
                disabled={isPending}
                autoComplete="off"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-surface border border-border
                           text-pearl placeholder:text-mist/50 text-base
                           focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30
                           transition-all duration-300 disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              id="analyze-button"
              disabled={isPending}
              className="btn-gold px-6 py-3.5 rounded-xl text-base flex items-center justify-center gap-2
                         min-w-[180px] whitespace-nowrap"
            >
              {isPending ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-abyss/30 border-t-abyss rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <span>⚓</span>
                  Analyze Navigation
                </>
              )}
            </button>
          </div>

          {/* Example queries */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-mist/60 text-sm mr-1">💡 Try:</span>
            {EXAMPLE_QUERIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={(e) => {
                  const input = document.getElementById("market-query-input") as HTMLInputElement;
                  if (input) {
                    input.value = q;
                    // Auto-submit the form
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
                disabled={isPending}
                className="text-xs px-3 py-1.5 rounded-full border border-border text-mist
                           hover:border-gold/40 hover:text-gold transition-all duration-200
                           disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Error Display */}
      {state && !state.success && state.error && (
        <div
          className="mt-6 glass-card border-storm/30 p-4 text-center animate-fade-in-up"
        >
          <p className="text-storm text-sm">⚠️ {state.error}</p>
        </div>
      )}

      {/* Loading State */}
      {isPending && (
        <div className="mt-10">
          <LoadingState />
        </div>
      )}

      {/* Results Dashboard */}
      {state?.success && state.data && !isPending && (
        <div className="mt-10">
          <Dashboard data={state.data} />
        </div>
      )}
    </div>
  );
}
