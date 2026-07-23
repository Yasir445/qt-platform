import type { PrismaClient } from "@prisma/client";

// ---------- small helpers for building Tiptap JSON without repetitive object literals ----------
const p = (text: string) => ({ type: "paragraph", content: [{ type: "text", text }] });
const h = (text: string) => ({ type: "heading", content: [{ type: "text", text }] });
const bullets = (items: string[]) => ({
  type: "bulletList",
  content: items.map((text) => ({
    type: "listItem",
    content: [{ type: "paragraph", content: [{ type: "text", text }] }],
  })),
});
const doc = (...content: object[]) => ({ type: "doc", content });

export const categories = [
  { name: "Core Concepts", slug: "core-concepts" },
  { name: "Time Framework", slug: "time-framework" },
  { name: "Economic Calendar", slug: "economic-calendar" },
];

interface ArticleSeed {
  title: string;
  slug: string;
  summary: string;
  category: string;
  content: object;
  related?: string[];
}

export const articles: ArticleSeed[] = [
  {
    title: "What is Quarterly Theory?",
    slug: "what-is-quarterly-theory",
    summary: "The foundational framework: price moves through four repeating phases on every timeframe.",
    category: "core-concepts",
    content: doc(
      p("Quarterly Theory (QT) is a framework for understanding how institutional players — banks, hedge funds, and market makers — deliver price in a structured, repeating 4-phase cycle."),
      p("Rather than viewing the market as random, QT teaches that price always moves through four defined phases on every timeframe: Accumulation, Manipulation, Distribution, and Reversal."),
      h("Core insight"),
      p("The market is not random. It follows a predictable algorithm (IPDA) designed to take liquidity from retail traders before delivering price to its true destination."),
      h("Why it works"),
      p("Most retail traders fail because they trade manipulation as if it is the real move. QT gives you a map — when you know which quarter you are in, you know whether the current move is real or a trap.")
    ),
    related: ["true-open", "smt", "ipda"],
  },
  {
    title: "True Open",
    slug: "true-open",
    summary: "The Q2 opening price — the most important level in QT, invalid without SSMT confirmation.",
    category: "core-concepts",
    content: doc(
      p("The True Open is the opening price of Q2 in any cycle. It is the most important price level in QT. It marks where manipulation begins."),
      p("After a break above True Open (with SSMT), it acts as support. After a break below (with SSMT), it acts as resistance."),
      h("Key rules"),
      bullets([
        "True Open is INVALID without SSMT confirmation",
        "Break above True Open + SSMT → True Open becomes support",
        "Break below True Open + SSMT → True Open becomes resistance",
        "Buy below TWO True Opens — Sell above TWO True Opens",
      ])
    ),
    related: ["ssmt", "what-is-quarterly-theory"],
  },
  {
    title: "SMT — Smart Money Technique",
    slug: "smt",
    summary: "A divergence between two correlated assets at a key swing high or low.",
    category: "core-concepts",
    content: doc(
      p("SMT is a divergence between two correlated assets at a key swing high or low. When Asset A makes a new high/low but Asset B does not, that is SMT."),
      p("It signals the move is not genuine and a reversal or manipulation is in play."),
      h("Example"),
      p("EURUSD makes a new low but GBPUSD does not make a new low at the same time — bearish SMT on GBPUSD, suggesting the EURUSD low was a liquidity grab.")
    ),
    related: ["ssmt", "what-is-quarterly-theory"],
  },
  {
    title: "SSMT (Sequential SMT)",
    slug: "ssmt",
    summary: "SMT divergence across two non-consecutive quarters — the foundation of everything in QT.",
    category: "core-concepts",
    content: doc(
      p("SSMT is the foundation of everything in QT. It is an SMT divergence that occurs across two non-consecutive quarters of the same cycle."),
      p("SSMT confirms institutional manipulation has occurred and the real move is about to begin. Without SSMT: no valid trade, no valid breaker, no valid FVG."),
      h("Key rules"),
      bullets([
        "SSMT = SMT divergence across NON-CONSECUTIVE quarters",
        "INVALID in consecutive quarters: Q1→Q2, Q2→Q3, Mon→Tue",
        "Valid: Mon→Wed | Tue→Thu | Asian→NY | Q1→Q3 | Q2→Q4 | Q3→Q1 | Q4→Q2",
        "LTF SSMT opposing HTF SSMT = Market Structure Shift (MSS)",
      ])
    ),
    related: ["smt", "true-open", "tpd", "magneto-effect"],
  },
  {
    title: "TPD — Three Candle Price Divergence",
    slug: "tpd",
    summary: "A 3-candle structural crack in correlation — heavier confirmation than single-candle SMT.",
    category: "core-concepts",
    content: doc(
      p("TPD is a 3-candle structural crack in correlation between two correlated assets at a swing high or low. Unlike SMT (single candle), TPD shows sustained divergence across three candles."),
      h("Key rules"),
      bullets([
        "Reversion Level = CISD of TPD on lower timeframe → entry zone",
        "TPD before news → trade in the direction of the TPD/SSMT",
        "SMT Skip: HTF SMT + TPD → skip one cycle level",
        "Power of 9: 8AM TPD → M5 90-min SMT entry",
      ])
    ),
    related: ["ssmt", "psp"],
  },
  {
    title: "PSP — Power Spike Pattern",
    slug: "psp",
    summary: "A large wick with a small body — institutional absorption of liquidity.",
    category: "core-concepts",
    content: doc(
      p("PSP is a candle with a large wick and a small body. It indicates price aggressively moved in one direction (the wick) but was rejected and closed near the open."),
      bullets([
        "Large wick + small body = institutional rejection/absorption",
        "PSP + FVG same candle = Precision Gap (highest probability)",
        "PSP + normal SMT = elevates to SSMT",
        "Real PSPs are fractal — 1H PSP contains M15 PSPs inside",
      ])
    ),
    related: ["ssmt", "tpd"],
  },
  {
    title: "CIC — Correlation Imbalance Crack",
    slug: "cic",
    summary: "When both correlated assets consolidate and only one breaks the range.",
    category: "core-concepts",
    content: doc(
      p("CIC occurs when both correlated assets are consolidating and one breaks the high/low of that consolidation while the other does not. The breaking asset leads direction."),
      h("Example"),
      p("ES and NQ both consolidate. NQ takes out the high. ES does not — NQ is leading bullish.")
    ),
    related: ["smt"],
  },
  {
    title: "Magneto Effect",
    slug: "magneto-effect",
    summary: "When a new SSMT cancels an old one, the old level becomes a liquidity magnet.",
    category: "core-concepts",
    content: doc(
      p("When a new SSMT cancels an existing SSMT, the old SSMT level becomes a liquidity magnet — price will be drawn back to it. The old level becomes a DOL (Draw on Liquidity)."),
      h("Example"),
      p("Bearish SSMT Q1–Q2. Then Bullish SSMT Q3–Q4 cancels it. The original bearish SSMT low becomes a magnet — price will seek that level.")
    ),
    related: ["ssmt"],
  },
  {
    title: "IPDA — Interbank Price Delivery Algorithm",
    slug: "ipda",
    summary: "The algorithm behind QT: Consolidation → Expansion → Retracement → Reversal.",
    category: "core-concepts",
    content: doc(
      p("IPDA is the algorithm institutions use to deliver price. It operates in four phases and is the engine behind QT."),
      bullets([
        "FVGs = retracement levels",
        "Order Blocks = expansion zones",
        "Highs and Lows = reversal targets",
      ])
    ),
    related: ["what-is-quarterly-theory"],
  },
  {
    title: "AMD / XAMD Framework",
    slug: "amd-xamd",
    summary: "Accumulation-Manipulation-Distribution, and its extended form XAMD.",
    category: "core-concepts",
    content: doc(
      p("SSMT Q1–Q2 = Real AMD (Q2=manipulation, Q3=distribution). Asian–London SSMT = AMDX. PM–Asian SSMT = XAMD."),
      bullets([
        "Q2 highs/lows are most important — Q2 = manipulation phase",
        "Q2 creates cycle high/low → price expands more in Q3",
        "Q1 expands → Q2 consolidates",
      ])
    ),
    related: ["ssmt", "what-is-quarterly-theory"],
  },
  {
    title: "Kill Zones",
    slug: "kill-zones",
    summary: "The highest-probability time windows — led by NY Open 9:00–10:30 (Q3 of Q3 of Q3).",
    category: "time-framework",
    content: doc(
      p("Kill zones are specific windows where institutional activity peaks and the highest-probability setups form."),
      bullets([
        "NY Open 9:00–10:30 — Q3 of Q3 of Q3, the single highest probability window in QT",
        "London Open 3:00–5:00 — key SSMT and manipulation zone",
        "9:30 candle — on no-news days, often creates SSMT or TPD",
        "Avoid: NY PM 13:00–16:30 and lunch 12:00–13:30",
      ])
    ),
    related: ["what-is-quarterly-theory"],
  },
];

export const jems: { number: number; title: string; content: object }[] = [
  { number: 1, title: "SSMT Not Consecutive Quarters", content: doc(bullets(["Will NOT form in two consecutive quarters", "Valid: Mon→Wed, Tue→Thu, Asian→NY, Q1→Q3, Q2→Q4", "INVALID: Mon→Tue, Wed→Thu, Q1→Q2, Q2→Q3"])) },
  { number: 2, title: "SMT Validates Key Levels", content: doc(p("SMT validates a key level — no SMT means the level is less significant.")) },
  { number: 3, title: "Reversal = SSMT Q3–Q4", content: doc(p("To pick reversals: look for SSMT between Q3 and Q4.")) },
  { number: 4, title: "LTF vs HTF SSMT = MSS", content: doc(p("LTF SSMT opposing HTF SSMT = Market Structure Shift.")) },
  { number: 5, title: "Best Trade: 9:00–10:30 (Q3 of Q3)", content: doc(bullets(["9:00–10:30 = Q3 of Q3 of Q3 — single highest probability window", "Daily SSMT + M15 FVG inside this window = premium setup", "M5 SSMT Q2–Q3 with PSP + long above True Open = ~1:3RR"])) },
  { number: 6, title: "True Open as S/R After Break", content: doc(bullets(["Break above True Open + SSMT → True Open = support", "Break below True Open + SSMT → True Open = resistance"])) },
  { number: 7, title: "LTF Confirms HTF", content: doc(p("Always need LTF SSMT to confirm HTF SSMT before entry.")) },
  { number: 8, title: "Manipulation Confirmed by SSMT", content: doc(p("Manipulation is always confirmed by SSMT.")) },
  { number: 9, title: "SSMT Near High-Impact News", content: doc(p("Price creates SSMT near high-impact news events — news is a kill zone for SSMT.")) },
  { number: 11, title: "Real Breaker Requires SSMT", content: doc(bullets(["A breaker is NOT real without SSMT", "No SSMT = no valid breaker, no valid FVG, no valid OB"])) },
  { number: 14, title: "SSMT Q1–Q2 = Real AMD", content: doc(bullets(["SSMT Q1–Q2 = Real AMD: Q2=manipulation, Q3=distribution", "Asian–London SSMT = AMDX | PM–Asian SSMT = XAMD"])) },
  { number: 15, title: "Q2 of Q2 + Q3 of Q3 = Highest Probability", content: doc(p("SSMT between Q2 of Q2 AND Q3 of Q3 = highest probability setup in all of QT.")) },
  { number: 17, title: "FVG/OB Only Valid With SSMT", content: doc(p("FVG, OB, BB — only valid if SSMT is present. Without SSMT they're meaningless.")) },
  { number: 20, title: "Three SSMTs = Almost Impossible to Lose", content: doc(p("3 SSMTs in your favor = almost impossible to lose. — Daye")) },
  { number: 27, title: "One Shot One Kill", content: doc(p("One Shot One Kill = Two-stage SSMT: Weekly SSMT + Daily SSMT.")) },
  { number: 33, title: "Time Validates SSMT", content: doc(bullets(["Right narrative AND right time required — time validates SSMT", "Without time alignment, other SSMTs will not work"])) },
  { number: 41, title: "Priority Order", content: doc(p("HTF SSMT > PSP > LTF SSMT — always follow this priority.")) },
  { number: 61, title: "Nested FVG = High Probability", content: doc(p("1H FVG inside Daily FVG = high probability (fractal to all timeframes).")) },
  { number: 81, title: "The Cheat Code Setup", content: doc(bullets(["Monthly SSMT Q2–Q3 + 90min SSMT Q2–Q3", "High-impact news at 2PM + price below True Open", "Below all True Opens (Monthly/Weekly/Daily/90min) + below news open", "Real Breaker + M5 BPR inside NWOG = The Cheat Code (80–90% win rate)"])) },
  { number: 83, title: "HTF Narrative Required — Always", content: doc(bullets(["Do NOT rely on LTF SSMT alone — you will fail without HTF confirmation", "Always find HTF SSMT + Narrative first, then drill down to LTF"])) },
];

/** Shared seed logic — called by both the CLI script (prisma/seed.ts) and the
 * one-tap web trigger (api/admin/seed) so there's a single source of truth. */
export async function runSeed(prisma: PrismaClient) {
  for (const c of categories) {
    await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c });
  }

  for (const a of articles) {
    const category = await prisma.category.findUnique({ where: { slug: a.category } });
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: { title: a.title, summary: a.summary, content: a.content, categoryId: category?.id, status: "PUBLISHED" },
      create: { title: a.title, slug: a.slug, summary: a.summary, content: a.content, categoryId: category?.id, status: "PUBLISHED" },
    });
  }

  for (const a of articles) {
    if (!a.related?.length) continue;
    await prisma.article.update({
      where: { slug: a.slug },
      data: { relatedArticles: { connect: a.related.map((slug) => ({ slug })) } },
    });
  }

  for (const jem of jems) {
    await prisma.jem.upsert({
      where: { number: jem.number },
      update: { title: jem.title, content: jem.content },
      create: jem,
    });
  }

  return { categories: categories.length, articles: articles.length, jems: jems.length };
}
