const news = [
  { title: "USD CPI m/m", time: "8:30 AM", impact: "High" },
  { title: "USD PPI m/m", time: "8:30 AM", impact: "High" },
  { title: "Fed Chair Powell Speaks", time: "2:00 PM", impact: "High" },
];

export function UpcomingNews() {
  return (
    <div className="glass-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink-primary">Upcoming High Impact News</h3>
        <span className="text-xs text-ink-tertiary">Sept 2025</span>
      </div>
      <div className="space-y-3">
        {news.map((n) => (
          <div key={n.title} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-down" />
              <span className="text-sm text-ink-secondary">{n.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-ink-tertiary">{n.time}</span>
              <span className="rounded-full bg-signal-down/15 px-2 py-0.5 text-[10px] font-medium text-signal-down">
                {n.impact}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full rounded-lg border border-base-border py-2 text-xs font-medium text-ink-secondary hover:bg-base-raised hover:text-ink-primary">
        View Economic Calendar
      </button>
    </div>
  );
}
