'use client';

import { Verdict } from '@/lib/scoring';

export interface FeedbackCardProps {
  verdict: Verdict | null;
  feedback: string;
  show: boolean;
}

export default function FeedbackCard({ verdict, feedback, show }: FeedbackCardProps) {
  if (!show || !verdict) return null;

  const verdictColor = {
    SHARP: 'bg-green-50 border-green-200 text-green-900',
    SCARED: 'bg-orange-50 border-orange-200 text-orange-900',
    RECKLESS: 'bg-red-50 border-red-200 text-red-900',
  };

  const verdictBadge = {
    SHARP: 'bg-green-100 text-green-800',
    SCARED: 'bg-orange-100 text-orange-800',
    RECKLESS: 'bg-red-100 text-red-800',
  };

  const icon = {
    SHARP: '✓',
    SCARED: '!',
    RECKLESS: '✗',
  };

  return (
    <div className={`border rounded-lg p-4 ${verdictColor[verdict]}`}>
      <div className="flex items-start gap-3">
        <div className={`inline-block px-3 py-1 rounded text-sm font-semibold ${verdictBadge[verdict]}`}>
          {icon[verdict]} {verdict}
        </div>
        <p className="text-sm font-medium leading-relaxed">{feedback}</p>
      </div>
    </div>
  );
}
