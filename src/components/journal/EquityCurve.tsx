interface EntryForCurve {
  rMultiple: number | null;
  result: string;
  date: Date;
}

/**
 * Real equity curve: takes actual closed JournalEntry rows, sums rMultiple
 * cumulatively in date order, and draws it. No mock data — if there are no
 * closed trades yet, it says so instead of faking a line.
 */
export function EquityCurve({ entries }: { entries: EntryForCurve[] }) {
  const closed = entries
    .filter((e) => e.result !== "OPEN" && e.rMultiple !== null)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  if (closed.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-base-border text-sm text-ink-tertiary">
        No closed trades yet — the curve fills in as you log results.
      </div>
    );
  }

  let running = 0;
  const points = closed.map((e) => {
    running += e.rMultiple ?? 0;
    return running;
  });
  points.unshift(0);

  const max = Math.max(...points, 0);
  const min = Math.min(...points, 0);
  const range = max - min || 1;
  const width = 100;
  const height = 100;

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((p - min) / range) * height;
    return `${x},${y}`;
  });

  const totalR = points[points.length - 1];
  const isPositive = totalR >= 0;

  return (
    <div>
      <div className="mb-3 flex items-baseline gap-2">
        <span className={`font-mono text-2xl font-semibold ${isPositive ? "text-signal-up" : "text-signal-down"}`}>
          {isPositive ? "+" : ""}
          {totalR.toFixed(2)}R
        </span>
        <span className="text-xs text-ink-tertiary">total, {closed.length} closed trades</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-40 w-full">
        <line
          x1="0"
          x2={width}
          y1={height - ((0 - min) / range) * height}
          y2={height - ((0 - min) / range) * height}
          stroke="currentColor"
          className="text-base-borderLight"
          strokeWidth="0.5"
          strokeDasharray="2,2"
        />
        <polyline
          points={coords.join(" ")}
          fill="none"
          stroke="currentColor"
          className={isPositive ? "text-signal-up" : "text-signal-down"}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
