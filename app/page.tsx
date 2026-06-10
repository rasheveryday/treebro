'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Zap, Brain, Target } from 'lucide-react';

type InterviewTrack = 'intern' | 'fulltime' | 'blitz' | null;

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState<InterviewTrack>(null);
  const [showModal, setShowModal] = useState(false);

  const tracks = [
    {
      id: 'intern',
      title: 'Quant Trading Intern',
      subtitle: 'Foundation Level',
      description: 'Master probability fundamentals and basic spread calibration.',
      specs: ['15-second timers', '4-point spreads', 'Light Bayesian shocks'],
      intensity: 'Moderate',
      icon: Target,
    },
    {
      id: 'fulltime',
      title: 'Full-Time Trader Gauntlet',
      subtitle: 'Advanced',
      description: 'Heavy Bayesian updates and aggressive multi-round shocks.',
      specs: ['15-second timers', '2-6 point spreads', 'Mid-round condition shifts'],
      intensity: 'Aggressive',
      icon: Brain,
    },
    {
      id: 'blitz',
      title: "Alex's 12-Day Blitz",
      subtitle: 'Elite Preparation',
      description: 'Maximum panic. Brutal AI feedback. Real interview simulation.',
      specs: ['10-second timers', 'Constant shocks', 'Ruthless AI critique'],
      intensity: 'Extreme',
      icon: Zap,
    },
  ];

  const quants = ['Jane Street', 'Citadel', 'Optiver', 'SIG', 'Jump Trading'];

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-slate-900 to-zinc-950 text-white overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Logo & Tagline */}
          <div className="text-center space-y-6 mb-16">
            <div className="inline-block">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="w-8 h-8 text-green-400" />
                <h1 className="text-6xl font-black bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Treebro
                </h1>
              </div>
              <p className="text-sm font-semibold text-green-400 tracking-widest uppercase">
                Elite Quant Interview Simulator
              </p>
            </div>

            <p className="text-2xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed">
              Break your freeze before the real loop breaks your offer. The brutal simulator that top quant traders use to prepare for Tier-1 funds.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-sm text-slate-300">
                ✓ Real-time pressure simulation
              </div>
              <div className="px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-sm text-slate-300">
                ✓ AI-powered feedback
              </div>
              <div className="px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-sm text-slate-300">
                ✓ Bayesian update testing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Carousel */}
      <section className="relative py-12 px-6 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm text-slate-400 mb-8 tracking-widest uppercase">
            Trusted by candidates interviewing at:
          </p>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            {quants.map((firm) => (
              <div key={firm} className="text-center">
                <p className="text-sm font-semibold text-slate-300 hover:text-green-400 transition">
                  {firm}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview Tracks */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choose Your Gauntlet</h2>
            <p className="text-slate-400 text-lg">Select the interview level that matches your target role and experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tracks.map((track) => {
              const Icon = track.icon;
              return (
                <button
                  key={track.id}
                  onClick={() => {
                    setSelectedTrack(track.id as InterviewTrack);
                    setShowModal(true);
                  }}
                  className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 text-left ${
                    selectedTrack === track.id
                      ? 'border-green-400 bg-gradient-to-br from-green-900/30 to-slate-900/30 shadow-lg shadow-green-500/20'
                      : 'border-slate-700 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">{track.subtitle}</p>
                      <h3 className="text-xl font-bold">{track.title}</h3>
                    </div>
                    <Icon className={`w-5 h-5 transition-colors ${selectedTrack === track.id ? 'text-green-400' : 'text-slate-500 group-hover:text-slate-400'}`} />
                  </div>

                  <p className="text-sm text-slate-300 mb-6">{track.description}</p>

                  <div className="space-y-2 mb-6">
                    {track.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-1 h-1 bg-green-400 rounded-full" />
                        {spec}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${
                      track.intensity === 'Extreme' ? 'text-red-400' : track.intensity === 'Aggressive' ? 'text-orange-400' : 'text-blue-400'
                    }`}>
                      {track.intensity}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bootcamp Roadmap */}
      <section className="relative py-20 px-6 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Your Bootcamp Journey</h2>
            <p className="text-slate-400 text-lg">Master the psychology of live betting in three phases.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                phase: 'Phase 1',
                title: 'Fluid Mechanics',
                description: 'Learn probability fundamentals. Master bid/ask calibration. Build confidence under basic time pressure.',
                color: 'blue',
              },
              {
                phase: 'Phase 2',
                title: 'Information Shocks',
                description: 'Handle mid-round condition changes. Test Bayesian reasoning. Learn to recalibrate, not freeze.',
                color: 'purple',
              },
              {
                phase: 'Phase 3',
                title: 'Brutal AI Breakdown',
                description: 'Face the harshest feedback. Analyze your patterns. Lock in your edge before the real loop.',
                color: 'red',
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className={`h-1 bg-gradient-to-r from-${item.color}-500/20 to-transparent absolute -top-8 left-0 right-0`} />
                <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                  <p className={`text-xs font-bold uppercase tracking-widest text-${item.color}-400 mb-2`}>{item.phase}</p>
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-slate-700 rounded-2xl p-12 space-y-6">
            <h2 className="text-3xl font-bold">Ready to Break Your Freeze?</h2>
            <p className="text-slate-300 text-lg">
              Your real interview is coming. Every minute of deliberate practice now determines whether you stay calm under pressure or panic and blow a $200k+ offer.
            </p>

            {!showModal ? (
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 font-bold text-white transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
              >
                Start Training Now
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <Link href={`/session?track=${selectedTrack || 'fulltime'}`}>
                <Button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 font-bold text-white transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50">
                  Enter Gauntlet
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            )}

            <p className="text-xs text-slate-400 pt-4">
              No signup required. Start immediately. Your progress resets each session (MVP). Premium progress tracking coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Confirm Your Choice</h3>
              <p className="text-slate-400">
                You selected <span className="text-green-400 font-semibold">{tracks.find((t) => t.id === selectedTrack)?.title}</span>
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <p className="text-sm text-slate-300">
                {tracks.find((t) => t.id === selectedTrack)?.description}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition font-semibold"
              >
                Change
              </button>
              <Link href={`/session?track=${selectedTrack || 'fulltime'}`} className="flex-1">
                <button className="w-full px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition">
                  Start Gauntlet
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
