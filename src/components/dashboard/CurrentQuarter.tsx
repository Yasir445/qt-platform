const stages = [
  { label: "Q1", sub: "Accumulation", active: false },
  { label: "Q2", sub: "Manipulation", active: true },
  { label: "Q3", sub: "Distribution", active: false },
  { label: "Q4", sub: "Reversal", active: false },
];

export function CurrentQuarter() {
  return (
    <div className="glass-card p-5">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink-primary">Current Quarter (Weekly)</h3>
      </div>
      <p className="mb-4 text-xs text-ink-tertiary">You are in Q2 — Manipulation</p>

      <div className="relative flex items-center justify-between px-2">
        <div className="absolute left-2 right-2 top-3 h-px bg-base-borderLight" />
        {stages.map((s) => (
          <div key={s.label} className="relative z-10 flex flex-col items-center gap-1.5">
            <div
              className={`h-2.5 w-2.5 rounded-full border-2 ${
                s.active
                  ? "border-accent-blue bg-accent-blue shadow-glow"
                  : "border-base-borderLight bg-base-surface"
              }`}
            />
            <span className={`text-xs font-medium ${s.active ? "text-accent-blueLight" : "text-ink-tertiary"}`}>
              {s.label}
            </span>
            <span className="text-[10px] text-ink-tertiary">{s.sub}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-base-border pt-3">
        <div>
          <div className="text-[10px] text-ink-tertiary">True Open</div>
          <div className="font-mono text-sm text-ink-primary">1.06215</div>
        </div>
        <button className="text-xs font-medium text-accent-blueLight hover:underline">
          View Cycle
        </button>
      </div>
    </div>
  );
}
