import { Topbar } from "@/components/layout/Topbar";
import { PageTree } from "@/components/research/PageTree";
import { KanbanBoard } from "@/components/research/KanbanBoard";
import { getOrCreateDefaultKanbanPage } from "@/lib/actions/research";
import { auth } from "@/lib/auth";

export default async function ResearchPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    return (
      <>
        <Topbar title="Research Workspace" />
        <div className="p-6 text-sm text-ink-secondary">Log in to use your research workspace.</div>
      </>
    );
  }

  const kanbanPage = await getOrCreateDefaultKanbanPage(userId);

  return (
    <>
      <Topbar title="Research Workspace" />
      <div className="space-y-4 p-4 sm:p-6">
        <PageTree />

        <div className="glass-card p-5">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-base">{kanbanPage.icon}</span>
            <h2 className="text-base font-semibold text-ink-primary">{kanbanPage.title}</h2>
          </div>
          <p className="mb-4 text-xs text-ink-tertiary">
            Research page · Kanban view · cards persist for real — add, move, delete
          </p>
          <KanbanBoard pageId={kanbanPage.id} blocks={kanbanPage.blocks} />
        </div>

        <p className="text-center text-xs text-ink-tertiary">
          Whiteboard / mind-map view still deliberately not built — Phase 5 in the plan doc.
        </p>
      </div>
    </>
  );
}
