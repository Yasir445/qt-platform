/**
 * The nested Notion-style page tree (folders, sub-pages) isn't built yet —
 * only the one kanban page below is real. Previously this component showed
 * fake folders/pages that looked clickable but went nowhere. Showing the
 * true state instead of a mockup.
 */
export function PageTree() {
  return (
    <div className="glass-card p-4">
      <div className="label-eyebrow mb-2 px-1">Pages</div>
      <div className="flex items-center gap-2 rounded-lg bg-accent-blue/10 px-2.5 py-1.5 text-sm text-ink-primary">
        <span>📋</span>
        Kill Zone Backtests
        <span className="ml-auto rounded-full bg-signal-up/15 px-2 py-0.5 text-[10px] text-signal-up">
          Live below
        </span>
      </div>
      <p className="mt-2 px-2.5 text-xs text-ink-tertiary">
        Nested pages &amp; folders are the next thing to build here — this is your one real page for now.
      </p>
    </div>
  );
}
