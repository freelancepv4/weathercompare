export function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <div className="skeleton h-48 w-full rounded-xl3 sm:h-56" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton h-24 rounded-xl2" />
        ))}
      </div>
      <div className="skeleton h-40 w-full rounded-xl3" />
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-28 w-20 shrink-0 rounded-xl2" />
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton({ className = "h-32" }: { className?: string }) {
  return <div className={`skeleton w-full rounded-xl2 ${className}`} aria-busy="true" />;
}
