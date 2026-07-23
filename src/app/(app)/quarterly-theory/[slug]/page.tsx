import Link from "next/link";
import { notFound } from "next/navigation";
import { Topbar } from "@/components/layout/Topbar";
import { TiptapContent } from "@/components/knowledge/TiptapContent";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      relatedArticles: { select: { title: true, slug: true, summary: true } },
    },
  });

  if (!article || article.status !== "PUBLISHED") notFound();

  return (
    <>
      <Topbar title={article.title} />
      <div className="space-y-4 p-4 sm:p-6">
        <div className="text-xs text-ink-tertiary">
          <Link href="/quarterly-theory" className="hover:text-ink-secondary">
            Quarterly Theory
          </Link>
          {article.category && (
            <>
              {" > "}
              <span>{article.category.name}</span>
            </>
          )}
          {" > "}
          <span className="text-ink-secondary">{article.title}</span>
        </div>

        <div className="glass-card p-5 sm:p-6">
          <h1 className="mb-1 text-xl font-semibold text-ink-primary">{article.title}</h1>
          {article.summary && <p className="mb-5 text-sm text-ink-tertiary">{article.summary}</p>}

          <TiptapContent content={article.content} />

          {article.relatedArticles.length > 0 && (
            <div className="mt-6 border-t border-base-border pt-4">
              <div className="label-eyebrow mb-2">Related</div>
              <div className="flex flex-wrap gap-2">
                {article.relatedArticles.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/quarterly-theory/${r.slug}`}
                    className="rounded-full border border-base-border px-3 py-1 text-xs text-ink-secondary hover:border-accent-blue/40 hover:text-accent-blueLight"
                  >
                    {r.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
