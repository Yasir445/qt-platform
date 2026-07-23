"use client";

import { motion } from "framer-motion";

const quarters = [
  { id: "Q1", label: "ACCUMULATION", position: "top-left" as const },
  { id: "Q2", label: "MANIPULATION", position: "top-right" as const },
  { id: "Q4", label: "REVERSAL", position: "bottom-left" as const },
  { id: "Q3", label: "DISTRIBUTION", position: "bottom-right" as const },
];

const positionClasses: Record<string, string> = {
  "top-left": "top-[14%] left-[14%] text-right items-end",
  "top-right": "top-[14%] right-[14%] text-left items-start",
  "bottom-left": "bottom-[14%] left-[14%] text-right items-end",
  "bottom-right": "bottom-[14%] right-[14%] text-left items-start",
};

/**
 * The signature element of the platform: a live representation of the four-phase
 * cycle that every timeframe in QT reduces to. This is not decoration — the glow
 * on Q2 reflects the actual current quarter of the weekly cycle, wired later to
 * real session/time data.
 */
export function QuarterWheel({ activeQuarter = "Q2" }: { activeQuarter?: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]">
      {/* ambient glow behind the wheel */}
      <div className="absolute inset-0 -z-10 rounded-full bg-grad-radial-glow blur-2xl" />

      {/* rotating hairline ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-base-borderLight/60"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(59,111,246,0.35) 15%, transparent 30%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      {/* main circle */}
      <div className="absolute inset-[6%] rounded-full border border-base-border bg-base-surface/60 backdrop-blur-sm">
        {/* cross divider */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-base-borderLight to-transparent" />
        <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-base-borderLight to-transparent" />

        {quarters.map((q) => {
          const isActive = q.id === activeQuarter;
          return (
            <div
              key={q.id}
              className={`absolute flex w-[36%] flex-col ${positionClasses[q.position]}`}
            >
              <span
                className={`font-mono text-3xl font-bold tracking-tight ${
                  isActive ? "text-accent-blueLight" : "text-ink-secondary"
                }`}
              >
                {q.id}
              </span>
              <span className="label-eyebrow mt-1">{q.label}</span>
            </div>
          );
        })}

        {/* center hub */}
        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent-blue/40 bg-base-deep shadow-glow">
          <span className="bg-grad-primary bg-clip-text font-mono text-xl font-bold text-transparent">
            QT
          </span>
        </div>
      </div>

      {/* floating annotation tags — reflect real QT concepts, not filler labels */}
      <div className="absolute -left-2 top-[8%] rounded-lg border border-base-border bg-base-surface/90 px-2.5 py-1 text-xs text-ink-secondary shadow-card backdrop-blur-md">
        True Open
      </div>
      <div className="absolute -right-2 bottom-[36%] rounded-lg border border-accent-blue/30 bg-base-surface/90 px-2.5 py-1 text-xs text-accent-blueLight shadow-card backdrop-blur-md">
        SSMT
      </div>
      <div className="absolute -right-4 top-[38%] rounded-lg border border-base-border bg-base-surface/90 px-2.5 py-1 text-xs text-ink-secondary shadow-card backdrop-blur-md">
        TPD
      </div>
    </div>
  );
}
