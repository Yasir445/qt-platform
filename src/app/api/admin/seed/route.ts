import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runSeed } from "@/lib/seed-data";

/**
 * Visit this URL once in your browser (with the secret) to populate the
 * Knowledge Base and JEM Library on the live database — no Termux, no
 * npm install needed. Safe to run more than once; every write is an upsert.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");

  if (!process.env.SEED_SECRET || key !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const counts = await runSeed(prisma);
  return NextResponse.json({ success: true, ...counts });
}
