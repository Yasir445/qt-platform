import { Topbar } from "@/components/layout/Topbar";
import { CandleChart } from "@/components/charts/CandleChart";

const timeframes = ["15m", "1H", "4H", "D", "W"];
const ranges = ["1D", "5D", "1M", "3M", "6M", "YTD", "1Y", "All"];

export default function TradingViewPage() {
  return (
    <>
      <Topbar title="TradingView" />
      <div className="space-y-4 p-4 sm:p-6">
        <div className="glass-card p-4">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-base-border px-3 py-1 text-xs text-ink-secondary">🔍 EURUSD</span>
            <div className="ml-auto flex gap-1 text-[11px] text-ink-tertiary">
              {timeframes.map((tf, i) => (
                <span key={tf} className={`rounded px-2 py-1 ${i === 0 ? "bg-base-surface text-ink-primary" : ""}`}>
                  {tf}
                </span>
              ))}
            </div>
          </div>

          <CandleChart
            count={52}
            seed={77}
            drift={0.15}
            height={260}
            annotations={[{ index: 14, label: "SSMT", top: 10 }]}
            zones={[{ start: 30, end: 38, top: 15, bottom: 40 }]}
            trueOpenLevel={52}
          />

          <div className="mt-3 flex justify-center gap-3 text-[11px] text-ink-tertiary">
            {ranges.map((r) => (
              <span key={r} className={r === "YTD" ? "text-accent-blueLight" : ""}>
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="mb-4 flex gap-5 overflow-x-auto border-b border-base-border text-sm">
            <span className="shrink-0 border-b-2 border-accent-blue pb-2 text-ink-primary">Positions</span>
            <span className="shrink-0 pb-2 text-ink-tertiary">Orders</span>
            <span className="shrink-0 pb-2 text-ink-tertiary">History</span>
            <span className="shrink-0 pb-2 text-ink-tertiary">Account Summary</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-ink-secondary">
              <thead className="text-ink-tertiary">
                <tr className="text-left">
                  <th className="pb-2 pr-4">Symbol</th>
                  <th className="pb-2 pr-4">Side</th>
                  <th className="pb-2 pr-4">Size</th>
                  <th className="pb-2 pr-4">Entry</th>
                  <th className="pb-2 pr-4">Current</th>
                  <th className="pb-2 pr-4">PnL</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-base-border">
                  <td className="py-2 pr-4 font-mono">EURUSD</td>
                  <td className="py-2 pr-4 text-signal-down">Short</td>
                  <td className="py-2 pr-4">0.50</td>
                  <td className="py-2 pr-4 font-mono">1.08745</td>
                  <td className="py-2 pr-4 font-mono">1.08945</td>
                  <td className="py-2 pr-4 font-mono text-signal-down">-0.8R</td>
                  <td className="py-2">Closed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
