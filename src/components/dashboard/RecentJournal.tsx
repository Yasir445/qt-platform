import { cn } from "@/lib/utils";

const entries = [
  { pair: "EURUSD Short Trade", date: "16 May 2025", result: "+1.2R", up: true },
  { pair: "XAUUSD Buy Trade", date: "15 May 2025", result: "+2.3R", up: true },
  { pair: "GBPUSD Analysis", date: "14 May 2025", result: "-0.5R", up: false },
];

export function RecentJournal() {
  return (
    <div className="glass-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-ink-primary">Recent Journal Entries</h3>
      <div className="space-y-3">
        {entries.map((e) => (
          <div key={e.pair} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className={cn("h-2 w-2 rounded-full", e.up ? "bg-signal-up" : "bg-signal-down")} />
              <div>
                <div className="text-sm text-ink-primary">{e.pair}</div>
                <div className="text-xs text-ink-tertiary">{e.date}</div>
              </div>
            </div>
            <span className={cn("font-mono text-sm", e.up ? "text-signal-up" : "text-signal-down")}>
              {e.result}
            </span>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full rounded-lg border border-base-border py-2 text-xs font-medium text-ink-secondary hover:bg-base-raised hover:text-ink-primary">
        View All Journals
      </button>
    </div>
  );
}
