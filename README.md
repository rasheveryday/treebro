# Treebro

The brutal quant betting simulator. Break your freeze before it breaks you.

## What is Treebro?

Treebro is a high-pressure interview prep tool for quant traders and developers. It simulates the psychological panic of live betting games under time pressure—the exact condition that causes top candidates to freeze during real interviews at Tier-1 funds.

**The Problem:** Candidates can solve probability problems perfectly on paper. But when an interviewer aggressively pushes back and conditions shift every 5 seconds, they panic. LeetCode doesn't teach that. Human mocks cost $150-300 per session.

**The Solution:** 15-second countdown timers, mid-round shocks (Bayesian updates), and aggressive AI feedback that exposes calibration errors in real time. Practice the panic before it costs you the offer.

## Features

- **15-Second Countdown Timers** — Forced time pressure that triggers real anxiety
- **Bid/Ask Market Making** — Quote spreads on ball compositions, get instant feedback (Sharp / Scared / Reckless)
- **Mid-Round Shocks** — Conditions change mid-game; tests if you can recalibrate under pressure
- **Aggressive Feedback** — "You're paralyzed." "That's arbitrage, you made an error." Not a game.
- **Brutal Summary Report** — Claude AI analyzes your patterns and tells you exactly where you froze
- **Unlimited Practice** — Run as many gauntlets as you need before your real loop

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click "Start 15-Minute Betting Gauntlet"

### Deploy to Vercel

1. Go to https://vercel.com/new
2. Import this repository: `https://github.com/rasheveryday/treebro`
3. Add environment variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `[your Claude API key]`
4. Click Deploy → Live in ~2 minutes

## How It Works

Each gauntlet is 5 rounds:

1. **See scenario:** "Bag: 3 Red, 2 Blue. Quote your bid/ask."
2. **Type answer:** "bid 57, ask 62"
3. **Get feedback instantly:** "Sharp—5-point spread, market maker thinking."
4. **Mid-round shock (round 3):** "I drew a Red ball and discarded it. New bid/ask?"
5. **Session summary:** Your stats + brutal AI critique of your patterns

## Project Structure

```
treebro/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── session/page.tsx            # Game loop (core)
│   └── api/summary/route.ts        # Claude API integration
├── components/                     # React components (Timer, RoundDisplay, Feedback, Summary)
├── data/scenarios.ts               # 10 hardcoded betting scenarios
├── lib/scoring.ts                  # Sharp/Scared/Reckless decision logic
└── package.json
```

## Environment Variables

Required for deployment:

- `ANTHROPIC_API_KEY` — Claude API key for brutal summary generation

Get one at: https://console.anthropic.com/

## Tech Stack

- **Next.js 14** — React framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **shadcn/ui** — UI components
- **Anthropic SDK** — Claude API integration

## The Science

The panic you feel in Treebro is real. It's designed to trigger the exact psychological state you'll face in a live interview:

- **Time pressure** → Forces snap decisions, exposes hesitation
- **Bayesian shocks** → Tests if you can recalibrate instead of freezing
- **Aggressive feedback** → Mimics a brutal interviewer pushing back
- **Immediate scoring** → Binary verdict (Sharp/Scared/Reckless) with no ambiguity

## Disclaimer

This tool is brutal by design. It's not meant to be fun. It's meant to make you uncomfortable enough that the real interview feels easier by comparison.

Use it.

---

**Built for quant candidates who are serious about their offer.**

For questions or feedback, open an issue on GitHub.
