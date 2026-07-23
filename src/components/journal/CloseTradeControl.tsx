"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { closeJournalEntry, deleteJournalEntry } from "@/lib/actions/journal";
import { TradeResult } from "@prisma/client";

export function CloseTradeControl({ id, currentResult }: { id: string; currentResult: string }) {
  const [rMultiple, setRMultiple] = useState("");
  const [isPending, startTransition] = useTransition();

  if (currentResult !== "OPEN") return null;

  function submit(result: typeof TradeResult.WIN | typeof TradeResult.LOSS | typeof TradeResult.BREAKEVEN) {
    const value = parseFloat(rMultiple || "0");
    startTransition(async () => {
      await closeJournalEntry(id, result, result === TradeResult.LOSS ? -Math.abs(value) : Math.abs(value));
    });
  }

  return (
    <div className="glass-card p-4">
      <div className="mb-2 text-xs font-semibold text-ink-tertiary">CLOSE TRADE</div>
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="number"
          step="any"
          placeholder="R multiple"
          value={rMultiple}
          onChange={(e) => setRMultiple(e.target.value)}
          className="h-9 w-28 rounded-lg border border-base-border bg-base-deep px-3 text-sm text-ink-primary focus:border-accent-blue/50 focus:outline-none"
        />
        <button
          disabled={isPending}
          onClick={() => submit(TradeResult.WIN)}
          className="rounded-lg bg-signal-up/15 px-3 py-2 text-xs font-medium text-signal-up disabled:opacity-50"
        >
          Win
        </button>
        <button
          disabled={isPending}
          onClick={() => submit(TradeResult.LOSS)}
          className="rounded-lg bg-signal-down/15 px-3 py-2 text-xs font-medium text-signal-down disabled:opacity-50"
        >
          Loss
        </button>
        <button
          disabled={isPending}
          onClick={() => submit(TradeResult.BREAKEVEN)}
          className="rounded-lg border border-base-border px-3 py-2 text-xs font-medium text-ink-secondary disabled:opacity-50"
        >
          Breakeven
        </button>
      </div>
    </div>
  );
}

export function DeleteTradeButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (!confirm("Delete this trade? This can't be undone.")) return;
        startTransition(async () => {
          await deleteJournalEntry(id);
          router.push("/journal");
        });
      }}
      className="text-xs text-ink-tertiary hover:text-signal-down disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete trade"}
    </button>
  );
}
