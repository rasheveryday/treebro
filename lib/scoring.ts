// Calibration scoring logic: Sharp / Scared / Reckless evaluation
export type Verdict = 'SHARP' | 'SCARED' | 'RECKLESS';

export interface RoundResult {
  roundNumber: number;
  trueProb: number;
  userBid: number;
  userAsk: number;
  verdict: Verdict;
  feedback: string;
  confidence: number;
}

export interface SessionStats {
  totalRounds: number;
  sharp: number;
  scared: number;
  reckless: number;
  sharpPercent: number;
  scaredPercent: number;
  recklessPercent: number;
}

/**
 * Evaluate a user's bid/ask against the true probability.
 * Returns verdict (Sharp/Scared/Reckless) + aggressive feedback.
 */
export function evaluateRound(
  trueProb: number,
  userBid: number,
  userAsk: number
): RoundResult {
  const spread = userAsk - userBid;

  // Decision rules from design doc

  // RECKLESS: spread ≤2 OR bid > ask OR true prob falls outside [bid, ask]
  if (
    spread <= 2 ||
    userBid > userAsk ||
    trueProb < userBid ||
    trueProb > userAsk
  ) {
    let feedback = 'Reckless.';
    if (userBid > userAsk) {
      feedback = "Bid > Ask. You broke the market.";
    } else if (spread <= 2) {
      feedback = `${spread}-point spread is arbitrage. You made an error.`;
    } else if (trueProb < userBid || trueProb > userAsk) {
      feedback = `True prob is ${trueProb}, but you quoted ${userBid}-${userAsk}. Completely wrong.`;
    }
    return {
      roundNumber: 0,
      trueProb,
      userBid,
      userAsk,
      verdict: 'RECKLESS',
      feedback,
      confidence: 1,
    };
  }

  // SCARED: spread ≥15 OR either bid/ask is >10 points away from true prob
  const distFromProb = Math.max(
    Math.abs(userBid - trueProb),
    Math.abs(userAsk - trueProb)
  );
  if (spread >= 15 || distFromProb > 10) {
    const feedback =
      spread >= 15
        ? `${spread}-point gap on ${trueProb}% prob? You're useless as a market maker.`
        : `You're too far from true probability. Market maker rejects you.`;
    return {
      roundNumber: 0,
      trueProb,
      userBid,
      userAsk,
      verdict: 'SCARED',
      feedback,
      confidence: 0.8,
    };
  }

  // SHARP: spread 4-6 AND bid/ask within ±3 of true prob
  if (spread >= 4 && spread <= 6 && distFromProb <= 3) {
    return {
      roundNumber: 0,
      trueProb,
      userBid,
      userAsk,
      verdict: 'SHARP',
      feedback: `Tight ${spread}-point spread. Market maker thinking.`,
      confidence: 1,
    };
  }

  // Default: neither perfectly sharp nor scared — treat as mediocre SCARED
  return {
    roundNumber: 0,
    trueProb,
    userBid,
    userAsk,
    verdict: 'SCARED',
    feedback: `Spread too wide for ${trueProb}% probability. Tighten up.`,
    confidence: 0.7,
  };
}

/**
 * Calculate session statistics from all rounds.
 */
export function calculateSessionStats(results: RoundResult[]): SessionStats {
  const counts = {
    sharp: results.filter((r) => r.verdict === 'SHARP').length,
    scared: results.filter((r) => r.verdict === 'SCARED').length,
    reckless: results.filter((r) => r.verdict === 'RECKLESS').length,
  };

  const totalRounds = results.length || 1;

  return {
    totalRounds,
    sharp: counts.sharp,
    scared: counts.scared,
    reckless: counts.reckless,
    sharpPercent: Math.round((counts.sharp / totalRounds) * 100),
    scaredPercent: Math.round((counts.scared / totalRounds) * 100),
    recklessPercent: Math.round((counts.reckless / totalRounds) * 100),
  };
}

/**
 * Parse user input string "bid X, ask Y" or "X Y" into numeric bid/ask.
 */
export function parseUserInput(input: string): { bid: number; ask: number; isValid: boolean; error?: string } {
  if (!input || input.trim().length === 0) {
    return { bid: 0, ask: 0, isValid: false, error: 'Please enter bid and ask.' };
  }

  // Try "bid X, ask Y" format
  let match = input.match(/bid\s*(\d+)\s*,?\s*ask\s*(\d+)/i);
  if (match) {
    const bid = parseInt(match[1], 10);
    const ask = parseInt(match[2], 10);
    return validateBidAsk(bid, ask);
  }

  // Try "X Y" format
  match = input.match(/^(\d+)\s+(\d+)$/);
  if (match) {
    const bid = parseInt(match[1], 10);
    const ask = parseInt(match[2], 10);
    return validateBidAsk(bid, ask);
  }

  return {
    bid: 0,
    ask: 0,
    isValid: false,
    error: 'Format: "bid 57, ask 62" or "57 62"',
  };
}

function validateBidAsk(bid: number, ask: number): { bid: number; ask: number; isValid: boolean; error?: string } {
  if (bid < 0 || ask < 0) {
    return { bid, ask, isValid: false, error: 'Bid and ask must be non-negative.' };
  }
  if (bid > 100 || ask > 100) {
    return { bid, ask, isValid: false, error: 'Bid and ask must be 0-100.' };
  }
  return { bid, ask, isValid: true };
}
