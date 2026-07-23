export function QuickNotes() {
  return (
    <div className="glass-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-ink-primary">Quick Notes</h3>
      <p className="text-sm leading-relaxed text-ink-secondary">
        Markets respect liquidity, manipulate retail, then deliver in the true
        direction. Always wait for SSMT + TPD confirmation before entry.
      </p>
      <p className="mt-3 text-right text-xs italic text-ink-tertiary">— Yasir Ali</p>
      <button className="mt-4 w-full rounded-lg border border-base-border py-2 text-xs font-medium text-ink-secondary hover:bg-base-raised hover:text-ink-primary">
        Edit Note
      </button>
    </div>
  );
}
