"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireUserId() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) throw new Error("Not authenticated");
  return userId;
}

/**
 * Every user gets one default kanban ResearchPage lazily on first visit —
 * this is what the Research page reads from and writes to. Real page
 * creation/nesting (the broader Notion-style tree) is the next increment;
 * this makes the one page shown in the prototype actually persist.
 */
export async function getOrCreateDefaultKanbanPage(userId: string) {
  const existing = await prisma.researchPage.findFirst({
    where: { userId, type: "KANBAN", title: "Kill Zone Backtests" },
    include: { blocks: { orderBy: { position: "asc" } } },
  });
  if (existing) return existing;

  const created = await prisma.researchPage.create({
    data: {
      userId,
      title: "Kill Zone Backtests",
      icon: "📋",
      type: "KANBAN",
      blocks: {
        create: [
          { type: "kanban_card", column: "todo", position: 0, content: { title: "London Q2–Q3 SSMT sample", tag: "Weekly" } },
          { type: "kanban_card", column: "todo", position: 1, content: { title: "CPI-Thursday reversal sample size", tag: "News" } },
          { type: "kanban_card", column: "in_progress", position: 0, content: { title: "Q3ofQ3ofQ3 win rate, last 60 days", tag: "Active" } },
          { type: "kanban_card", column: "done", position: 0, content: { title: "Monthly SSMT + 4H PSP → HOTW/LOTW", tag: "Confirmed" } },
        ],
      },
    },
    include: { blocks: { orderBy: { position: "asc" } } },
  });
  return created;
}

export async function addKanbanCard(pageId: string, column: string, title: string) {
  const userId = await requireUserId();
  const page = await prisma.researchPage.findUnique({ where: { id: pageId } });
  if (!page || page.userId !== userId) throw new Error("Not found");

  const count = await prisma.researchBlock.count({ where: { pageId, column } });
  await prisma.researchBlock.create({
    data: { pageId, type: "kanban_card", column, position: count, content: { title, tag: "New" } },
  });
  revalidatePath("/research");
}

export async function moveKanbanCard(blockId: string, newColumn: string) {
  const userId = await requireUserId();
  const block = await prisma.researchBlock.findUnique({ where: { id: blockId }, include: { page: true } });
  if (!block || block.page.userId !== userId) throw new Error("Not found");

  const count = await prisma.researchBlock.count({ where: { pageId: block.pageId, column: newColumn } });
  await prisma.researchBlock.update({
    where: { id: blockId },
    data: { column: newColumn, position: count },
  });
  revalidatePath("/research");
}

export async function deleteKanbanCard(blockId: string) {
  const userId = await requireUserId();
  const block = await prisma.researchBlock.findUnique({ where: { id: blockId }, include: { page: true } });
  if (!block || block.page.userId !== userId) throw new Error("Not found");

  await prisma.researchBlock.delete({ where: { id: blockId } });
  revalidatePath("/research");
}
