'use client';

import { Button } from '@/components/ui/button';
import { SessionStats } from '@/lib/scoring';

export interface SessionSummaryProps {
  stats: SessionStats;
  brutualSummary: string | null;
  isLoadingSummary: boolean;
  onPlayAgain: () => void;
}

export default function SessionSummary({
  stats,
  brutualSummary,
  isLoadingSummary,
  onPlayAgain,
}: SessionSummaryProps) {
  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      {/* Score Summary */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Session Complete</h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded border border-green-200">
            <p className="text-3xl font-bold text-green-700">{stats.sharpPercent}%</p>
            <p className="text-sm text-green-800 font-medium">Sharp</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded border border-orange-200">
            <p className="text-3xl font-bold text-orange-700">{stats.scaredPercent}%</p>
            <p className="text-sm text-orange-800 font-medium">Scared</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded border border-red-200">
            <p className="text-3xl font-bold text-red-700">{stats.recklessPercent}%</p>
            <p className="text-sm text-red-800 font-medium">Reckless</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 text-center">
          {stats.sharp}/{stats.totalRounds} rounds sharp · {stats.scared}/{stats.totalRounds} scared ·{' '}
          {stats.reckless}/{stats.totalRounds} reckless
        </p>
      </div>

      {/* Brutal Summary Report */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Brutal Summary Report</h3>
        {isLoadingSummary ? (
          <div className="text-center py-4">
            <p className="text-slate-600">Generating your summary...</p>
            <div className="mt-2 w-8 h-8 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto"></div>
          </div>
        ) : brutualSummary ? (
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{brutualSummary}</div>
        ) : (
          <p className="text-sm text-slate-600">Summary will appear here.</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={onPlayAgain}
          size="lg"
          className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
        >
          Run Another Gauntlet
        </Button>
      </div>

      <p className="text-xs text-slate-500 text-center">
        Your session has been logged. Practice as much as you need before your real loop.
      </p>
    </div>
  );
}
