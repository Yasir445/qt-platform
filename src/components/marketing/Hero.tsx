import Link from "next/link";
import { BarChart3, BookOpen, Layers, Sparkles } from "lucide-react";
import { QuarterWheel } from "./QuarterWheel";

const stats = [
  { icon: BookOpen, value: "80+", label: "JEM Lessons" },
  { icon: Layers, value: "500+", label: "Knowledge Pages" },
  { icon: Sparkles, value: "Premium", label: "Trading Tools" },
  { icon: BarChart3, value: "All-in-One", label: "Trading OS" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="animate-rise-in">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-signal-gold/30 bg-signal-gold/10 px-3 py-1.5 text-xs font-medium text-signal-gold">
            <Sparkles className="h-3.5 w-3.5" />
            MASTER THE MARKET CYCLE
          </div>

          <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-ink-primary lg:text-6xl">
            The Ultimate
            <br />
            <span className="bg-grad-primary bg-clip-text text-transparent">
              Quarterly Theory
            </span>
            <br />
            Trading Platform
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-secondary">
            Learn. Research. Journal. Backtest. Everything you need to master
            institutional price delivery and become a profitable trader.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-grad-primary px-6 text-base font-medium text-white shadow-glow transition-all duration-150 hover:brightness-110"
            >
              Start 7-Day Free Trial
            </Link>
            <Link
              href="#features"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-base-borderLight bg-base-surface px-6 text-base font-medium text-ink-primary transition-all duration-150 hover:bg-base-raised"
            >
              Explore Features
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <stat.icon className="h-5 w-5 text-accent-blueLight" />
                <div className="text-lg font-semibold text-ink-primary">{stat.value}</div>
                <div className="text-xs text-ink-tertiary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-rise-in [animation-delay:150ms]">
          <QuarterWheel activeQuarter="Q2" />
        </div>
      </div>
    </section>
  );
}
