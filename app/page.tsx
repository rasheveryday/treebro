import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
      <div className="max-w-lg mx-auto text-center space-y-8 px-6">
        <div>
          <h1 className="text-5xl font-black mb-4">Treebro</h1>
          <p className="text-xl text-slate-300 font-light">
            The brutal quant betting simulator. Break your freeze before it breaks you.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4 text-left">
          <h2 className="text-lg font-bold">What you get:</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="flex gap-3">
              <span className="text-green-400 font-bold flex-shrink-0">✓</span>
              <span>15-second countdown timers that force Bayesian recalibration under pressure</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-400 font-bold flex-shrink-0">✓</span>
              <span>Aggressive AI feedback on calibration errors (Sharp / Scared / Reckless)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-400 font-bold flex-shrink-0">✓</span>
              <span>5 scenarios per gauntlet with mid-round shocks that test your nerve</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-400 font-bold flex-shrink-0">✓</span>
              <span>Brutal summary report analyzing your patterns across the session</span>
            </li>
          </ul>
        </div>

        <div className="bg-orange-900 border border-orange-700 rounded-lg p-4 text-sm">
          <p className="text-orange-100">
            <span className="font-bold">⚠ Warning:</span> This is not a game. Designed to trigger the same panic you'll feel in the real loop. Use it.
          </p>
        </div>

        <Link href="/session">
          <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold">
            Start 15-Minute Betting Gauntlet
          </Button>
        </Link>

        <p className="text-xs text-slate-400">
          Ready to break your anxiety? Your real interview is soon. Every session counts.
        </p>
      </div>
    </main>
  );
}
