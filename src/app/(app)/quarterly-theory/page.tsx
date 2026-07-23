import Link from "next/link";
import { Topbar } from "@/components/layout/Topbar";
import { prisma } from "@/lib/prisma";

// This page reads live content from the database and isn't user-specific,
// so Next.js has no automatic signal to treat it as dynamic (unlike Journal/
// Research, which read the session). Without this, Next.js tries to bake it
// into static HTML at build time, which means every deploy would need to
// reach the database mid-build — fragile, and also means new admin-edited
// articles wouldn't show up without a full redeploy. Rendering fresh per
// request is the correct choice here.
export const dynamic = "force-dynamic";

export default async function QuarterlyTheoryIndexPage() {
  const categories = await prisma.category.findMany({
    include: {
      articles: {
        where: { status: "PUBLISHED" },
        orderBy: { title: "asc" },
      },
    },
    orderBy: { order: "asc" },
  });

  const total = categories.reduce((sum, c) => sum + c.articles.length, 0);

  return (
    <>
      <Topbar title="Quarterly Theory" />
      <div className="space-y-4 p-4 sm:p-6">
        <p className="text-xs text-ink-tertiary">
          {total} article{total === 1 ? "" : "s"} · seeded from your QT Master Reference — extend
          <code className="mx-1 rounded bg-base-surface px-1.5 py-0.5">prisma/seed.ts</code>
          to add more.
        </p>

        {categories.map(
          (cat) =>
            cat.articles.length > 0 && (
              <div key={cat.id} className="glass-card p-5">
                <h2 className="mb-3 text-sm font-semibold text-ink-primary">{cat.name}</h2>
                <div className="divide-y divide-base-border">
                  {cat.articles.map((a) => (
                    <Link
                      key={a.id}
                      href={`/quarterly-theory/${a.slug}`}
                      className="block py-3 hover:opacity-80"
                    >
                      <div className="text-sm text-ink-primary">{a.title}</div>
                      {a.summary && <div className="mt-0.5 text-xs text-ink-tertiary">{a.summary}</div>}
                    </Link>
                  ))}
                </div>
              </div>
            )
        )}

        {total === 0 && (
          <div className="glass-card p-6 text-center text-sm text-ink-tertiary">
            No articles seeded yet — run <code className="rounded bg-base-surface px-1.5 py-0.5">npm run db:seed</code> after your first deploy.
          </div>
        )}
      </div>
    </>
  );
}
