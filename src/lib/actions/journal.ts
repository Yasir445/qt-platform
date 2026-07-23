"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TradeDirection, TradeResult } from "@prisma/client";

async function requireUserId() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) throw new Error("Not authenticated");
  return userId;
}

export interface CreateJournalEntryInput {
  date: string; // ISO date string from the form
  instrument: string;
  direction: TradeDirection;
  entry: number;
  stop: number;
  target?: number;
  riskAmount?: number;
  session?: string;
  killZone?: string;
  quarterCycle?: string;
  ssmtPresent: boolean;
  tpdPresent: boolean;
  pspPresent: boolean;
  narrative?: string;
  confidence?: number;
  disciplineScore?: number;
  emotion?: string;
}

export async function createJournalEntry(input: CreateJournalEntryInput) {
  const userId = await requireUserId();

  await prisma.journalEntry.create({
    data: {
      userId,
      date: new Date(input.date),
      instrument: input.instrument,
      direction: input.direction,
      entry: input.entry,
      stop: input.stop,
      target: input.target,
      riskAmount: input.riskAmount,
      session: input.session,
      killZone: input.killZone,
      quarterCycle: input.quarterCycle,
      ssmtPresent: input.ssmtPresent,
      tpdPresent: input.tpdPresent,
      pspPresent: input.pspPresent,
      narrative: input.narrative,
      confidence: input.confidence,
      disciplineScore: input.disciplineScore,
      emotion: input.emotion,
      result: TradeResult.OPEN,
    },
  });

  revalidatePath("/journal");
}

/**
 * Closes a trade: sets the result and the R-multiple. This is what makes the
 * equity curve move — rMultiple is what EquityCurve.tsx sums cumulatively.
 */
export async function closeJournalEntry(id: string, result: TradeResult, rMultiple: number) {
  const userId = await requireUserId();

  const entry = await prisma.journalEntry.findUnique({ where: { id } });
  if (!entry || entry.userId !== userId) throw new Error("Not found");

  await prisma.journalEntry.update({
    where: { id },
    data: { result, rMultiple },
  });

  revalidatePath("/journal");
  revalidatePath(`/journal/${id}`);
}

export async function deleteJournalEntry(id: string) {
  const userId = await requireUserId();

  const entry = await prisma.journalEntry.findUnique({ where: { id } });
  if (!entry || entry.userId !== userId) throw new Error("Not found");

  await prisma.journalEntry.delete({ where: { id } });

  revalidatePath("/journal");
}
