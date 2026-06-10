'use client';

import { Button } from '@/components/ui/button';
import { Scenario, calculateTrueProb } from '@/data/scenarios';

export interface RoundDisplayProps {
  roundNumber: number;
  scenario: Scenario;
  isShockRound: boolean;
  isPostShock: boolean;
  bid: string;
  ask: string;
  onBidChange: (value: string) => void;
  onAskChange: (value: string) => void;
  onSubmit: () => void;
  isDisabled: boolean;
}

export default function RoundDisplay({
  roundNumber,
  scenario,
  isShockRound,
  isPostShock,
  bid,
  ask,
  onBidChange,
  onAskChange,
  onSubmit,
  isDisabled,
}: RoundDisplayProps) {
  const red = isPostShock && scenario.shockNewRed !== undefined ? scenario.shockNewRed : scenario.initialRed;
  const blue = isPostShock && scenario.shockNewBlue !== undefined ? scenario.shockNewBlue : scenario.initialBlue;
  const trueProb = calculateTrueProb(red, blue);

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <p className="text-sm text-slate-600 mb-2">Round {roundNumber}</p>

        {isShockRound && !isPostShock && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm font-semibold text-yellow-900">⚡ Shock incoming</p>
          </div>
        )}

        {isPostShock && (
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded">
            <p className="text-sm font-semibold text-orange-900">{scenario.shockText}</p>
          </div>
        )}

        <p className="text-base mb-3">
          Bag: <span className="font-bold">{red}R, {blue}B</span> (${scenario.capital.toLocaleString()})
        </p>
        <p className="text-sm text-slate-700">Quote your bid/ask.</p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Bid</label>
          <input
            type="text"
            value={bid}
            onChange={(e) => onBidChange(e.target.value)}
            disabled={isDisabled}
            placeholder="e.g., 57"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 disabled:bg-slate-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Ask</label>
          <input
            type="text"
            value={ask}
            onChange={(e) => onAskChange(e.target.value)}
            disabled={isDisabled}
            placeholder="e.g., 62"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 disabled:bg-slate-100"
          />
        </div>
      </div>

      <Button
        onClick={onSubmit}
        disabled={isDisabled}
        size="lg"
        className="w-full bg-slate-900 hover:bg-slate-800 text-white"
      >
        Submit
      </Button>
    </div>
  );
}
