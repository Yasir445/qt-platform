import { Search, Bell, Crown } from "lucide-react";

export function Topbar({ title }: { title: string }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-base-border bg-base-void/80 px-6 backdrop-blur-xl">
      <h1 className="text-lg font-semibold text-ink-primary">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-tertiary" />
          <input
            type="text"
            placeholder="Search anything..."
            className="h-9 w-64 rounded-lg border border-base-border bg-base-surface pl-9 pr-3 text-sm text-ink-primary placeholder:text-ink-tertiary focus:border-accent-blue/50 focus:outline-none"
          />
        </div>

        <button
          aria-label="Premium plan"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-signal-gold/30 bg-signal-gold/10 text-signal-gold"
        >
          <Crown className="h-4 w-4" />
        </button>

        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-base-border bg-base-surface text-ink-secondary hover:text-ink-primary"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-signal-down" />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-grad-primary text-xs font-semibold text-white">
          YA
        </div>
      </div>
    </header>
  );
}
