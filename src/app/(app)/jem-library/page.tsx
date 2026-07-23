import { Topbar } from "@/components/layout/Topbar";
import { TiptapContent } from "@/components/knowledge/TiptapContent";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function JemLibraryPage() {
  const jems = await prisma.jem.findMany({ orderBy: { number: "asc" } });

  return (
    <>
      <Topbar title="JEM Library" />
      <div className="space-y-4 p-4 sm:p-6">
        <p className="text-xs text-ink-tertiary">
          {jems.length} JEMs seeded from the Jacob Mentorship series (numbering has gaps in the
          source material — 18, 23, 25, 35, 45, 51, 66, 78, 82 aren&rsquo;t assigned).
        </p>

        <div className="space-y-3">
          {jems.map((jem) => (
            <div key={jem.id} className="glass-card p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-accent-blue/15 px-2.5 py-0.5 font-mono text-xs font-semibold text-accent-blueLight">
                  JEM {jem.number}
                </span>
                <h3 className="text-sm font-semibold text-ink-primary">{jem.title}</h3>
              </div>
              <TiptapContent content={jem.content} />
            </div>
          ))}
        </div>

        {jems.length === 0 && (
          <div className="glass-card p-6 text-center text-sm text-ink-tertiary">
            No JEMs seeded yet — run{" "}
            <code className="rounded bg-base-surface px-1.5 py-0.5">npm run db:seed</code> after
            your first deploy.
          </div>
        )}
      </div>
    </>
  );
}
