import { cn } from "@/lib/utils";

const markets = [
  { symbol: "EURUSD", price: "1.08745", change: "+0.24%", up: true },
  { symbol: "GBPUSD", price: "1.26543", change: "-0.15%", up: false },
  { symbol: "XAUUSD", price: "2,378.65", change: "+0.78%", up: true },
  { symbol: "BTCUSD", price: "66,543.21", change: "+1.24%", up: true },
];

export function MarketOverview() {
  return (
    <div className="glass-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink-primary">Today&rsquo;s Market Overview</h3>
        <span className="text-xs text-ink-tertiary">Friday, 16 May 2025</span>
      </div>
      <div className="space-y-3">
        {markets.map((m) => (
          <div key={m.symbol} className="flex items-center justify-between">
            <span className="text-sm text-ink-secondary">{m.symbol}</span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-ink-primary">{m.price}</span>
              <span
                className={cn(
                  "font-mono text-xs",
                  m.up ? "text-signal-up" : "text-signal-down"
                )}
              >
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full rounded-lg border border-base-border py-2 text-xs font-medium text-ink-secondary hover:bg-base-raised hover:text-ink-primary">
        View All Markets
      </button>
    </div>
  );
}
