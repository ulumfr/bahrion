export default function LoadingState() {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      {/* Loading message */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 glass-card px-6 py-3">
          <span className="text-2xl animate-float">⚓</span>
          <p className="text-gold text-sm tracking-wide">
            Captain is analyzing the waters...
          </p>
        </div>
      </div>

      {/* Skeleton Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card p-5 space-y-3">
            <div className="w-12 h-12 rounded-xl animate-shimmer" />
            <div className="h-4 w-20 rounded animate-shimmer" />
            <div className="h-3 w-32 rounded animate-shimmer" />
          </div>
        ))}
      </div>

      {/* Skeleton Insight */}
      <div className="glass-card p-6 mb-6 space-y-3">
        <div className="h-4 w-40 rounded animate-shimmer" />
        <div className="h-3 w-full rounded animate-shimmer" />
        <div className="h-3 w-5/6 rounded animate-shimmer" />
        <div className="h-3 w-4/6 rounded animate-shimmer" />
      </div>

      {/* Skeleton Bottom Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="glass-card p-5 space-y-3">
            <div className="h-4 w-24 rounded animate-shimmer" />
            <div className="h-3 w-full rounded animate-shimmer" />
            <div className="h-3 w-3/4 rounded animate-shimmer" />
            <div className="h-3 w-5/6 rounded animate-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}
