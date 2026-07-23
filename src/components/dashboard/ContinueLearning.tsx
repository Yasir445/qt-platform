const lessons = [
  { title: "JEM 42 — Power of 9", progress: 75 },
  { title: "True Open Complete Guide", progress: 60 },
  { title: "SSMT Mastery", progress: 90 },
];

export function ContinueLearning() {
  return (
    <div className="glass-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-ink-primary">Continue Learning</h3>
      <div className="space-y-4">
        {lessons.map((l) => (
          <div key={l.title}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm text-ink-secondary">{l.title}</span>
              <span className="font-mono text-xs text-ink-tertiary">{l.progress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-deep">
              <div
                className="h-full rounded-full bg-grad-primary"
                style={{ width: `${l.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="mt-5 w-full rounded-lg bg-grad-primary py-2 text-xs font-medium text-white shadow-glow hover:brightness-110">
        Go to Learning
      </button>
    </div>
  );
}
