"use client";

import { useState, useTransition } from "react";
import { addKanbanCard, deleteKanbanCard, moveKanbanCard } from "@/lib/actions/research";

interface Block {
  id: string;
  column: string | null;
  content: unknown;
}

const COLUMNS = [
  { key: "todo", label: "To Study" },
  { key: "in_progress", label: "In Progress" },
  { key: "done", label: "Validated" },
] as const;

function nextColumn(current: string): string | null {
  const idx = COLUMNS.findIndex((c) => c.key === current);
  return idx >= 0 && idx < COLUMNS.length - 1 ? COLUMNS[idx + 1].key : null;
}

export function KanbanBoard({ pageId, blocks }: { pageId: string; blocks: Block[] }) {
  const [isPending, startTransition] = useTransition();
  const [newCardText, setNewCardText] = useState<Record<string, string>>({});

  const byColumn = (col: string) => blocks.filter((b) => b.column === col);

  return (
    <div className="flex gap-3.5 overflow-x-auto pb-1">
      {COLUMNS.map((col) => (
        <div key={col.key} className="w-56 shrink-0 rounded-xl border border-base-border bg-base-deep p-3">
          <div className="mb-2.5 flex items-center justify-between text-xs font-semibold text-ink-secondary">
            {col.label}
            <span className="rounded-full bg-base-surface px-1.5 py-0.5 text-[10px] text-ink-tertiary">
              {byColumn(col.key).length}
            </span>
          </div>

          {byColumn(col.key).map((block) => {
            const content = block.content as { title?: string; tag?: string };
            const target = nextColumn(col.key);
            return (
              <div key={block.id} className="mb-2 rounded-lg border border-base-border bg-base-surface p-2.5 text-xs text-ink-primary">
                <div>{content.title}</div>
                {content.tag && (
                  <span className="mt-1.5 inline-block rounded-full bg-ink-tertiary/20 px-1.5 py-0.5 text-[10px] text-ink-secondary">
                    {content.tag}
                  </span>
                )}
                <div className="mt-2 flex items-center gap-2">
                  {target && (
                    <button
                      disabled={isPending}
                      onClick={() => startTransition(() => moveKanbanCard(block.id, target))}
                      className="text-[10px] text-accent-blueLight hover:underline disabled:opacity-50"
                    >
                      Move →
                    </button>
                  )}
                  <button
                    disabled={isPending}
                    onClick={() => startTransition(() => deleteKanbanCard(block.id))}
                    className="text-[10px] text-ink-tertiary hover:text-signal-down disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const text = newCardText[col.key]?.trim();
              if (!text) return;
              startTransition(() => addKanbanCard(pageId, col.key, text));
              setNewCardText((s) => ({ ...s, [col.key]: "" }));
            }}
          >
            <input
              value={newCardText[col.key] ?? ""}
              onChange={(e) => setNewCardText((s) => ({ ...s, [col.key]: e.target.value }))}
              placeholder="+ Add card"
              className="w-full rounded-lg border border-transparent bg-transparent px-1 py-1.5 text-xs text-ink-secondary placeholder:text-ink-tertiary focus:border-base-borderLight focus:bg-base-surface focus:outline-none"
            />
          </form>
        </div>
      ))}
    </div>
  );
}
