export function WelcomeBanner({ name }: { name: string }) {
  return (
    <div className="glass-card relative overflow-hidden p-6">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-grad-radial-glow blur-2xl" />
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xl font-semibold text-ink-primary">
            Welcome back, {name} <span className="ml-1">👑</span>
          </div>
          <p className="mt-1 text-sm italic text-ink-secondary">
            &ldquo;Discipline in the cycle, patience in the process. Profits are
            the result.&rdquo;
          </p>
        </div>
        <div className="rounded-xl border border-base-border bg-base-deep px-4 py-3 text-right">
          <div className="text-xs text-ink-tertiary">Premium Plan renews on</div>
          <div className="text-sm font-medium text-ink-primary">July 18, 2025</div>
          <button className="mt-1 text-xs font-medium text-accent-blueLight hover:underline">
            View Plan
          </button>
        </div>
      </div>
    </div>
  );
}
