'use client';

export interface SessionTimerProps {
  timeRemaining: number;
  isActive: boolean;
}

export default function SessionTimer({ timeRemaining, isActive }: SessionTimerProps) {
  const displayTime = Math.max(0, Math.ceil(timeRemaining / 1000));
  const isWarning = displayTime <= 5 && timeRemaining > 0;
  const isExpired = timeRemaining <= 0;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={`text-6xl font-bold tabular-nums ${
          isExpired
            ? 'text-red-600'
            : isWarning
              ? 'text-orange-500 animate-pulse'
              : 'text-slate-800'
        }`}
      >
        {displayTime}
      </div>
      <p className="text-sm text-slate-600">seconds remaining</p>
      {isExpired && (
        <p className="text-red-600 font-semibold animate-pulse">Time up!</p>
      )}
    </div>
  );
}
