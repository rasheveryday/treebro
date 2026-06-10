'use client';

import { useState, useEffect, useCallback } from 'react';
import SessionTimer from '@/components/SessionTimer';
import RoundDisplay from '@/components/RoundDisplay';
import FeedbackCard from '@/components/FeedbackCard';
import SessionSummary from '@/components/SessionSummary';
import { evaluateRound, calculateSessionStats, parseUserInput, RoundResult, Verdict, SessionStats } from '@/lib/scoring';
import { getRandomScenario, calculateTrueProb, Scenario } from '@/data/scenarios';

const ROUND_TIME = 15000; // 15 seconds
const TOTAL_ROUNDS = 5;

type SessionState = 'playing' | 'finished';

export default function SessionPage() {
  const [sessionState, setSessionState] = useState<SessionState>('playing');
  const [currentRound, setCurrentRound] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(ROUND_TIME);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [bid, setBid] = useState('');
  const [ask, setAsk] = useState('');
  const [roundResults, setRoundResults] = useState<RoundResult[]>([]);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isPostShock, setIsPostShock] = useState(false);
  const [brutaulSummary, setBrutalSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  // Initialize session
  useEffect(() => {
    setScenario(getRandomScenario());
  }, []);

  // Timer countdown
  useEffect(() => {
    if (sessionState !== 'playing' || !scenario) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          // Auto-fail: time's up, treat as scared
          handleAutoFail();
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [sessionState, scenario]);

  const handleAutoFail = useCallback(() => {
    if (scenario && roundResults.length < TOTAL_ROUNDS) {
      const red = isPostShock && scenario.shockNewRed ? scenario.shockNewRed : scenario.initialRed;
      const blue = isPostShock && scenario.shockNewBlue ? scenario.shockNewBlue : scenario.initialBlue;
      const trueProb = calculateTrueProb(red, blue);

      const result: RoundResult = {
        roundNumber: currentRound,
        trueProb,
        userBid: 0,
        userAsk: 0,
        verdict: 'SCARED',
        feedback: 'Time up. You froze.',
        confidence: 1,
      };

      completeRound(result);
    }
  }, [scenario, roundResults.length, currentRound, isPostShock]);

  const handleSubmit = useCallback(() => {
    if (!scenario) return;

    const parsed = parseUserInput(`${bid} ${ask}`);
    if (!parsed.isValid) {
      setFeedback(parsed.error || 'Invalid input');
      setShowFeedback(true);
      return;
    }

    const red = isPostShock && scenario.shockNewRed ? scenario.shockNewRed : scenario.initialRed;
    const blue = isPostShock && scenario.shockNewBlue ? scenario.shockNewBlue : scenario.initialBlue;
    const trueProb = calculateTrueProb(red, blue);

    const result = evaluateRound(trueProb, parsed.bid, parsed.ask);
    result.roundNumber = currentRound;
    result.trueProb = trueProb;

    completeRound(result);
  }, [bid, ask, scenario, currentRound, isPostShock]);

  const completeRound = (result: RoundResult) => {
    setVerdict(result.verdict);
    setFeedback(result.feedback);
    setShowFeedback(true);

    const newResults = [...roundResults, result];
    setRoundResults(newResults);

    // Check if session is complete
    if (newResults.length >= TOTAL_ROUNDS) {
      setTimeout(() => {
        setSessionState('finished');
        fetchBrutalSummary(newResults);
      }, 2000);
    } else {
      // Advance to next round after a short delay
      setTimeout(() => {
        setCurrentRound((prev) => prev + 1);
        setTimeRemaining(ROUND_TIME);
        setBid('');
        setAsk('');
        setVerdict(null);
        setFeedback('');
        setShowFeedback(false);
        setIsPostShock(false);

        // Check for shock in new round
        if (scenario && scenario.shockRound === currentRound + 1) {
          setIsPostShock(true);
        }
      }, 2000);
    }
  };

  const fetchBrutalSummary = async (results: RoundResult[]) => {
    setIsLoadingSummary(true);
    try {
      const response = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ results }),
      });

      if (response.ok) {
        const data = await response.json();
        setBrutalSummary(data.summary || 'Summary generation failed.');
      } else {
        setBrutalSummary('Could not generate summary. But you now know your weaknesses.');
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
      setBrutalSummary('Network error. Summary will load when available.');
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const handlePlayAgain = () => {
    setSessionState('playing');
    setCurrentRound(1);
    setTimeRemaining(ROUND_TIME);
    setScenario(getRandomScenario());
    setBid('');
    setAsk('');
    setRoundResults([]);
    setVerdict(null);
    setFeedback('');
    setShowFeedback(false);
    setIsPostShock(false);
    setBrutalSummary(null);
  };

  if (!scenario) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">Loading session...</p>
      </main>
    );
  }

  const isShockRound = scenario.shockRound > 0 && currentRound === scenario.shockRound;
  const stats = calculateSessionStats(roundResults);

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {sessionState === 'playing' ? (
          <div className="space-y-8">
            {/* Timer */}
            <div className="flex justify-center">
              <SessionTimer timeRemaining={timeRemaining} isActive={sessionState === 'playing'} />
            </div>

            {/* Round Display */}
            <RoundDisplay
              roundNumber={currentRound}
              scenario={scenario}
              isShockRound={isShockRound}
              isPostShock={isPostShock}
              bid={bid}
              ask={ask}
              onBidChange={setBid}
              onAskChange={setAsk}
              onSubmit={handleSubmit}
              isDisabled={showFeedback || timeRemaining <= 0}
            />

            {/* Feedback */}
            {showFeedback && (
              <FeedbackCard verdict={verdict} feedback={feedback} show={showFeedback} />
            )}

            {/* Progress */}
            <div className="text-center text-sm text-slate-600">
              Round {currentRound} of {TOTAL_ROUNDS}
            </div>
          </div>
        ) : (
          <SessionSummary stats={stats} brutualSummary={brutaulSummary} isLoadingSummary={isLoadingSummary} onPlayAgain={handlePlayAgain} />
        )}
      </div>
    </main>
  );
}
