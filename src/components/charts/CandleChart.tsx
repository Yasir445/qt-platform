"use client";

interface Annotation {
  index: number;
  label: string;
  top?: number;
}

interface Zone {
  start: number;
  end: number;
  top?: number;
  bottom?: number;
}

interface CandleChartProps {
  count: number;
  seed: number;
  drift?: number;
  height?: number;
  annotations?: Annotation[];
  zones?: Zone[];
  trueOpenLevel?: number;
}

interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
}

/**
 * Deterministic pseudo-random generator so the same seed always renders the
 * same chart (useful for a consistent-looking demo across reloads).
 */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateCandles(n: number, seed: number, drift = 0): Candle[] {
  const rand = mulberry32(seed);
  let level = 50;
  const candles: Candle[] = [];
  for (let i = 0; i < n; i++) {
    const open = level;
    const change = (rand() - 0.5) * 8 + drift;
    const close = open + change;
    const high = Math.max(open, close) + rand() * 4;
    const low = Math.min(open, close) - rand() * 4;
    candles.push({ open, close, high, low });
    level = close;
  }
  return candles;
}

/**
 * Visual-approximation candlestick chart — no external charting library.
 * This deliberately mirrors the production plan in the implementation doc
 * (§2A): Lightweight Charts will replace this once a real data feed and
 * paywall-safe charting library are wired in during Phase 3. Until then,
 * this same annotation-overlay technique (SSMT markers, FVG zones, True
 * Open lines drawn on top of candles) is what production will look like.
 */
export function CandleChart({
  count,
  seed,
  drift = 0,
  height = 200,
  annotations = [],
  zones = [],
  trueOpenLevel,
}: CandleChartProps) {
  const candles = generateCandles(count, seed, drift);
  const highs = candles.map((c) => c.high);
  const lows = candles.map((c) => c.low);
  const max = Math.max(...highs);
  const min = Math.min(...lows);
  const range = max - min || 1;
  const widthPct = 100 / count;

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg border border-base-border bg-base-deep"
      style={{ height }}
    >
      {zones.map((z, i) => (
        <div
          key={`zone-${i}`}
          className="absolute rounded border border-dashed border-accent-purple/45 bg-accent-purple/15"
          style={{
            left: `${z.start * widthPct}%`,
            width: `${(z.end - z.start) * widthPct}%`,
            top: `${z.top ?? 10}%`,
            bottom: `${z.bottom ?? 30}%`,
          }}
        />
      ))}

      {candles.map((c, i) => {
        const isUp = c.close >= c.open;
        const color = isUp ? "bg-signal-up" : "bg-signal-down";
        const bodyTopPct = 100 - ((Math.max(c.open, c.close) - min) / range) * 100;
        const bodyBottomPct = 100 - ((Math.min(c.open, c.close) - min) / range) * 100;
        const wickTopPct = 100 - ((c.high - min) / range) * 100;
        const wickBottomPct = 100 - ((c.low - min) / range) * 100;
        return (
          <div
            key={i}
            className="absolute top-0 h-full"
            style={{ left: `${i * widthPct}%`, width: `${widthPct}%` }}
          >
            <div
              className={`absolute left-1/2 -translate-x-1/2 opacity-65 ${color}`}
              style={{
                top: `${wickTopPct}%`,
                height: `${Math.max(wickBottomPct - wickTopPct, 1)}%`,
                width: 1,
              }}
            />
            <div
              className={`absolute left-[15%] w-[70%] rounded-sm ${color}`}
              style={{
                top: `${bodyTopPct}%`,
                height: `${Math.max(bodyBottomPct - bodyTopPct, 2)}%`,
              }}
            />
          </div>
        );
      })}

      {annotations.map((a, i) => (
        <div
          key={`ann-${i}`}
          className="absolute -translate-x-1/2 whitespace-nowrap rounded-md border border-accent-blue bg-base-surface/95 px-1.5 py-0.5 text-[10px] text-accent-blueLight"
          style={{ left: `${a.index * widthPct}%`, top: `${a.top ?? 8}%` }}
        >
          {a.label}
        </div>
      ))}

      {trueOpenLevel !== undefined && (
        <div
          className="absolute left-0 right-0 border-t border-dashed border-ink-tertiary/50"
          style={{ top: `${100 - ((trueOpenLevel - min) / range) * 100}%` }}
        >
          <span className="absolute right-0 -top-3.5 bg-base-deep px-1 text-[9px] text-ink-tertiary">
            True Open
          </span>
        </div>
      )}
    </div>
  );
}
