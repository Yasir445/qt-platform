import { Topbar } from "@/components/layout/Topbar";

const days = [
  {
    label: "MON 20 JUL",
    events: [{ time: "All Day", flag: "🇺🇸", title: "Bank Holiday", impact: "low" as const }],
  },
  {
    label: "TUE 21 JUL",
    events: [
      { time: "8:30 AM", flag: "🇺🇸", title: "CPI m/m", impact: "high" as const },
      { time: "8:30 AM", flag: "🇺🇸", title: "Core CPI m/m", impact: "high" as const },
    ],
  },
  {
    label: "WED 22 JUL",
    events: [
      { time: "8:30 AM", flag: "🇺🇸", title: "PPI m/m", impact: "medium" as const },
      { time: "2:00 PM", flag: "🇺🇸", title: "Fed Chair Powell Speaks", impact: "high" as const },
    ],
  },
  {
    label: "THU 23 JUL",
    events: [{ time: "8:30 AM", flag: "🇺🇸", title: "Retail Sales m/m", impact: "medium" as const }],
  },
  {
    label: "FRI 24 JUL",
    events: [
      { time: "8:30 AM", flag: "🇺🇸", title: "Building Permits", impact: "medium" as const },
      { time: "10:00 AM", flag: "🇺🇸", title: "UoM Consumer Sentiment", impact: "high" as const },
    ],
  },
];

const impactStyles = {
  high: "bg-signal-down/15 text-signal-down",
  medium: "bg-signal-warn/15 text-signal-warn",
  low: "bg-ink-tertiary/20 text-ink-secondary",
};

export default function EconomicCalendarPage() {
  return (
    <>
      <Topbar title="Economic Calendar" />
      <div className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-base-border px-3 py-1 text-xs text-ink-secondary">
            📅 Jul 20 – Jul 24, 2026
          </span>
          <span className="rounded-full border border-base-border px-3 py-1 text-xs text-ink-secondary">Filter ▾</span>
          <span className="rounded-full border border-base-border px-3 py-1 text-xs text-ink-secondary">Currency ▾</span>
          <span className="rounded-full border border-base-border px-3 py-1 text-xs text-ink-secondary">Impact ▾</span>
        </div>

        <div className="glass-card p-5">
          {days.map((day) => (
            <div key={day.label} className="mb-5 last:mb-0">
              <div className="label-eyebrow mb-2">{day.label}</div>
              {day.events.map((e) => (
                <div
                  key={e.title}
                  className="flex items-center justify-between border-b border-base-border py-2 text-sm last:border-none"
                >
                  <span className="text-ink-secondary">
                    {e.time} {e.flag} {e.title}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${impactStyles[e.impact]}`}>
                    {e.impact === "high" ? "High" : e.impact === "medium" ? "Medium" : "Low"}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-ink-primary">News Bias Builder</h3>
          <p className="mb-3 text-xs text-ink-tertiary">
            Overall Bias: <span className="text-signal-up">Bullish</span> · Points: 7
          </p>
          <input
            type="range"
            min={-10}
            max={10}
            defaultValue={7}
            className="w-full accent-accent-blue"
          />
          <div className="mt-1 flex justify-between text-[10px] text-ink-tertiary">
            <span>-10</span>
            <span>0</span>
            <span>+10</span>
          </div>
          <button className="mt-4 w-full rounded-lg border border-base-border py-2 text-xs font-medium text-ink-secondary hover:bg-base-raised hover:text-ink-primary">
            View Full Analysis →
          </button>
        </div>

        <p className="text-center text-xs text-ink-tertiary">
          Live event data pending a calendar API connection (implementation plan §2A). Shown here as a working preview with fixed dates.
        </p>
      </div>
    </>
  );
}
