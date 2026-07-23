# QT Platform — Phase 0 + Full Page Set

The foundation of the Quarterly Theory operating system: design system, landing
page, and every major page from the HTML prototype, now built as real Next.js
routes. This matches your existing GitHub → Neon → Vercel, mobile-only deploy
workflow.

## What's in this build

- ✅ Design tokens (Tailwind config) matching the dark navy / electric blue /
  glassmorphism direction
- ✅ Landing page: navbar + hero with the animated Quarter Wheel signature element
- ✅ Working auth: signup, login, credentials + optional Google, RBAC middleware
- ✅ Dashboard — welcome banner, stat cards, market overview, news, current
  quarter, journal preview, learning progress, quick notes
- ✅ Knowledge Base — SSMT article page with working tabs (Overview / Examples /
  Rules / Notes / Related) and the Q1/Q3 divergence mini-charts
- ✅ Economic Calendar — day-grouped events + News Bias Builder slider
- ✅ Trade Journal — full trade detail view with checklist and chart thumbnail
- ✅ Backtesting — replay chart with SSMT/Liquidity Sweep annotations + FVG zone,
  playback controls, stats
- ✅ TradingView-style page — annotated chart (SSMT, True Open line, FVG zone) +
  positions table
- ✅ Research Workspace — page tree + a working kanban board *(New in v2 — see
  plan §4A: this will move to the real block-based `ResearchPage`/`ResearchBlock`
  schema once wired to the database)*
- ✅ Settings — profile, working 2FA toggle, device list with revoke button,
  billing summary *(New in v2 — see plan §4A)*
- ✅ Full Prisma schema — every model from the implementation plan (including v2
  additions), so later phases never need a breaking migration
- ✅ Shared `CandleChart` component — dependency-free, deterministic candlestick
  rendering with annotation/zone overlays. This is the same visual approach
  Lightweight Charts will use in production (plan §2A) — swapping in real data
  later doesn't require redesigning these pages.

## What's NOT wired to real data yet (by design)

Every page above renders with realistic static content, same as the HTML
prototype — none of it reads from the database yet. That's next:

- Stripe checkout/webhook/billing portal
- Real Economic Calendar API sync (provider TBD — plan §2A)
- Journal/Research CRUD actually hitting the database
- AI Assistant (RAG over the knowledge base)

## Setup

1. **Clone into your repo:**
   ```bash
   # copy these files into your qt-platform repo, then:
   npm install
   ```

2. **Set up Neon database:**
   - Create a Neon project (or reuse your TradePulse one with a new database)
   - Copy `.env.example` to `.env` and fill in `DATABASE_URL`

3. **Push the schema:**
   ```bash
   npm run db:push
   ```

4. **Generate an Auth secret:**
   ```bash
   openssl rand -base64 32
   # paste into AUTH_SECRET in .env
   ```

5. **Google OAuth (optional for now):**
   - Create credentials at console.cloud.google.com → fill `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
   - Skip this and only use email/password if you want to launch faster

6. **Run locally:**
   ```bash
   npm run dev
   ```

7. **Deploy:**
   - Push to GitHub
   - Import into Vercel (same as TradePulse)
   - Add all `.env` vars to Vercel project settings
   - Add `DATABASE_URL` pointing at your Neon production branch

## Next step

Once this is live and every page looks right on your phone, tell Claude to
wire the Journal and Research pages to real database reads/writes, and start
the Stripe subscription flow.
