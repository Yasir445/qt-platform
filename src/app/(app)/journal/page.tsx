import Link from "next/link";
import { Topbar } from "@/components/layout/Topbar";
import { EquityCurve } from "@/components/journal/EquityCurve";
import { NewTradeForm } from "@/components/journal/NewTradeForm";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

export default async function JournalPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  const entries = userId
    ? await prisma.journalEntry.findMany({
        where: { userId },
        orderBy: { date: "desc" },
      })
    : [];

  const closed = entries.filter((e) => e.result !== "OPEN");
  const wins = closed.filter((e) => e.result === "WIN");
  const winRate = closed.length > 0 ? (wins.length / closed.length) * 100 : null;

  return (
    <>
      <Topbar title="Trade Journal" />
      <div className="space-y-4 p-4 sm:p-6">
        {!userId && (
          <div className="glass-card p-4 text-sm text-ink-secondary">
            Log in to see your real journal entries.
          </div>
        )}

        <div className="glass-card p-5">
          <div className="mb-1 text-sm font-semibold text-ink-primary">Equity Curve</div>
          <EquityCurve entries={entries} />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="glass-card p-4">
            <div className="text-xs text-ink-tertiary">Total Trades</div>
            <div className="font-mono text-xl font-semibold">{entries.length}</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-xs text-ink-tertiary">Closed</div>
            <div className="font-mono text-xl font-semibold">{closed.length}</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-xs text-ink-tertiary">Win Rate</div>
            <div className="font-mono text-xl font-semibold text-signal-up">
              {winRate !== null ? `${winRate.toFixed(1)}%` : "—"}
            </div>
          </div>
        </div>

        <NewTradeForm />

        <div className="glass-card p-2">
          {entries.length === 0 ? (
            <div className="p-6 text-center text-sm text-ink-tertiary">
              No trades logged yet. Add your first one above.
            </div>
          ) : (
            entries.map((e) => (
              <Link
                key={e.id}
                href={`/journal/${e.id}`}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-sm hover:bg-base-raised"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      e.direction === "LONG" ? "bg-signal-up" : "bg-signal-down"
                    )}
                  />
                  <div>
                    <div className="text-ink-primary">
                      {e.instrument} {e.direction === "LONG" ? "Long" : "Short"}
                    </div>
                    <div className="text-xs text-ink-tertiary">
                      {new Date(e.date).toLocaleDateString()} · {e.result}
                    </div>
                  </div>
                </div>
                {e.rMultiple !== null && (
                  <span
                    className={cn(
                      "font-mono text-sm",
                      e.rMultiple >= 0 ? "text-signal-up" : "text-signal-down"
                    )}
                  >
                    {e.rMultiple >= 0 ? "+" : ""}
                    {e.rMultiple.toFixed(2)}R
                  </span>
                )}
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
