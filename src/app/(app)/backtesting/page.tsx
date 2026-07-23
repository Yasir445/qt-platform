import { Topbar } from "@/components/layout/Topbar";
import { CandleChart } from "@/components/charts/CandleChart";

export default function BacktestingPage() {
  return (
    <>
      <Topbar title="Backtesting" />
      <div className="space-y-4 p-4 sm:p-6">
        <div className="glass-card flex flex-wrap items-center gap-3 p-4">
          <span className="rounded-full border border-base-border px-3 py-1 text-xs text-ink-secondary">EURUSD ▾</span>
          <span className="rounded-full border border-base-border px-3 py-1 text-xs text-ink-secondary">15m ▾</span>
          <span className="rounded-full border border-base-border px-3 py-1 text-xs text-ink-secondary">Jul 16, 2026 ▾</span>
          <button
            disabled
            title="Replay engine not built yet"
            className="ml-auto cursor-not-allowed rounded-lg bg-base-surface px-4 py-2 text-xs font-medium text-ink-disabled"
          >
            ▶ Start Replay (coming soon)
          </button>
        </div>

        <div className="glass-card p-4">
          <CandleChart
            count={40}
            seed={44}
            drift={0.05}
            height={230}
            annotations={[
              { index: 9, label: "SSMT", top: 8 },
              { index: 17, label: "Liquidity Sweep", top: 65 },
            ]}
            zones={[{ start: 24, end: 32, top: 20, bottom: 35 }]}
          />
          <div className="mt-4 flex items-center justify-center gap-4 text-xl text-ink-disabled">
            <span className="cursor-not-allowed" title="Replay not built yet">⏮</span>
            <span className="cursor-not-allowed" title="Replay not built yet">◀</span>
            <span className="cursor-not-allowed text-2xl" title="Replay not built yet">▶</span>
            <span className="cursor-not-allowed" title="Replay not built yet">▶</span>
            <span className="cursor-not-allowed" title="Replay not built yet">⏭</span>
            <span className="ml-2 font-mono text-xs text-ink-tertiary">10x</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass-card p-5">
            <div className="label-eyebrow mb-2">Backtest Notes</div>
            <p className="text-sm leading-relaxed text-ink-secondary">
              SSMT formed between Mon low and Wed low. Price swept liquidity below Q1
              low and reversed. TPD confirmed at the high. Took the short.
            </p>
          </div>
          <div className="glass-card p-5">
            <div className="label-eyebrow mb-3">Backtest Stats</div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-ink-tertiary">Trades</div>
                <div className="font-mono font-semibold">12</div>
              </div>
              <div>
                <div className="text-xs text-ink-tertiary">Win Rate</div>
                <div className="font-mono font-semibold text-signal-up">66.7%</div>
              </div>
              <div>
                <div className="text-xs text-ink-tertiary">Profit Factor</div>
                <div className="font-mono font-semibold">1.92</div>
              </div>
              <div>
                <div className="text-xs text-ink-tertiary">Avg R:R</div>
                <div className="font-mono font-semibold">2.35R</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
