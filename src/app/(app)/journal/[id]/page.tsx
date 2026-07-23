import { notFound } from "next/navigation";
import { Topbar } from "@/components/layout/Topbar";
import { CloseTradeControl, DeleteTradeButton } from "@/components/journal/CloseTradeControl";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

export default async function JournalDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  const entry = await prisma.journalEntry.findUnique({ where: { id: params.id } });

  if (!entry || entry.userId !== userId) notFound();

  const fields: { key: string; value: string; mono?: boolean }[] = [
    { key: "Date", value: new Date(entry.date).toLocaleString() },
    { key: "Instrument", value: entry.instrument },
    { key: "Direction", value: entry.direction },
    { key: "Session", value: entry.session ?? "—" },
    { key: "Kill Zone", value: entry.killZone ?? "—" },
    { key: "Quarter", value: entry.quarterCycle ?? "—" },
    { key: "Entry", value: entry.entry.toString(), mono: true },
    { key: "Stop", value: entry.stop.toString(), mono: true },
    { key: "Target", value: entry.target?.toString() ?? "—", mono: true },
    { key: "Confidence", value: entry.confidence ? `${entry.confidence}/10` : "—" },
    { key: "Discipline", value: entry.disciplineScore ? `${entry.disciplineScore}/10` : "—" },
  ];

  return (
    <>
      <Topbar title={`${entry.instrument} — ${entry.direction === "LONG" ? "Long" : "Short"}`} />
      <div className="space-y-4 p-4 sm:p-6">
        <div className="glass-card p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", entry.direction === "LONG" ? "bg-signal-up" : "bg-signal-down")} />
              <span className="text-sm font-semibold text-ink-primary">
                {entry.instrument} — {entry.direction === "LONG" ? "Long" : "Short"}
              </span>
              <span className="rounded-full border border-base-border px-2.5 py-0.5 text-[10px] text-ink-secondary">
                {entry.result}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {entry.rMultiple !== null && (
                <span className={cn("font-mono text-sm font-semibold", entry.rMultiple >= 0 ? "text-signal-up" : "text-signal-down")}>
                  {entry.rMultiple >= 0 ? "+" : ""}
                  {entry.rMultiple.toFixed(2)}R
                </span>
              )}
              <DeleteTradeButton id={entry.id} />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              {fields.map((f) => (
                <div key={f.key} className="flex justify-between border-b border-base-border py-2 text-sm last:border-none">
                  <span className="text-ink-tertiary">{f.key}</span>
                  <span className={f.mono ? "font-mono" : ""}>{f.value}</span>
                </div>
              ))}
            </div>

            <div>
              <div className="label-eyebrow mb-2">Confluence</div>
              <div className="mb-5 flex gap-2">
                <span className={cn("rounded-full px-2.5 py-1 text-xs", entry.ssmtPresent ? "bg-signal-up/15 text-signal-up" : "bg-ink-tertiary/15 text-ink-tertiary")}>
                  SSMT {entry.ssmtPresent ? "✓" : "✗"}
                </span>
                <span className={cn("rounded-full px-2.5 py-1 text-xs", entry.tpdPresent ? "bg-signal-up/15 text-signal-up" : "bg-ink-tertiary/15 text-ink-tertiary")}>
                  TPD {entry.tpdPresent ? "✓" : "✗"}
                </span>
                <span className={cn("rounded-full px-2.5 py-1 text-xs", entry.pspPresent ? "bg-signal-up/15 text-signal-up" : "bg-ink-tertiary/15 text-ink-tertiary")}>
                  PSP {entry.pspPresent ? "✓" : "✗"}
                </span>
              </div>

              {entry.narrative && (
                <>
                  <div className="label-eyebrow mb-2">Narrative</div>
                  <p className="mb-4 text-sm leading-relaxed text-ink-secondary">{entry.narrative}</p>
                </>
              )}
            </div>
          </div>
        </div>

        <CloseTradeControl id={entry.id} currentResult={entry.result} />
      </div>
    </>
  );
}
