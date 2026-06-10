'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type InterviewTrack = 'intern' | 'fulltime' | 'blitz' | null;

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState<InterviewTrack>(null);
  const [showModal, setShowModal] = useState(false);

  const tracks = [
    {
      id: 'intern',
      title: 'Quant Trading Intern',
      subtitle: 'Foundation',
      description: 'Master probability fundamentals and basic spread calibration under controlled pressure.',
      specs: ['15s countdown', '4-6pt spreads', 'Light shocks'],
    },
    {
      id: 'fulltime',
      title: 'Full-Time Trader',
      subtitle: 'Professional',
      description: 'Advanced Bayesian reasoning with aggressive multi-round condition shifts and live feedback.',
      specs: ['15s countdown', '2-6pt spreads', 'Adaptive shocks'],
    },
    {
      id: 'blitz',
      title: 'Alex\'s 12-Day Blitz',
      subtitle: 'Elite',
      description: 'Maximum pressure simulation. Constant shocks. Ruthless AI feedback. Real interview prep.',
      specs: ['10s countdown', 'Micro-spreads', 'Relentless shocks'],
    },
  ];

  const quants = ['Jane Street', 'Citadel', 'Optiver', 'SIG', 'Jump Trading'];

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black text-zinc-100 overflow-hidden">
      {/* Subtle accent gradients */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-[140px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-400 font-sans">
              Treebro
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/80">
              Quant Interview Simulator
            </p>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl font-medium tracking-wide text-zinc-200 max-w-2xl mx-auto leading-relaxed">
            Break your freeze before it breaks your $200k+ offer. The brutal AI simulator that top quantitative traders use to master live interview pressure.
          </p>

          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {['Real-time pressure', 'Bayesian updates', 'AI feedback'].map((prop) => (
              <div
                key={prop}
                className="px-3 py-1 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 font-mono text-xs uppercase tracking-widest text-emerald-400/60 hover:text-emerald-400/100 transition-colors"
              >
                ✓ {prop}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quant Firms Marquee */}
      <section className="relative py-12 px-6 border-y border-zinc-800/40">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500/60 text-center mb-8">
            Trusted by candidates at
          </p>
          <div className="flex justify-center items-center gap-16 flex-wrap">
            {quants.map((firm) => (
              <p
                key={firm}
                className="font-mono tracking-wider text-sm font-semibold opacity-70 hover:opacity-100 transition-opacity duration-300 text-zinc-500"
              >
                {firm}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Interview Tracks Selection */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-5xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-400">
              Choose Your Challenge
            </h2>
            <p className="font-medium tracking-wide text-zinc-300">
              Select the interview level that matches your target role.
            </p>
          </div>

          {/* Tracks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => {
                  setSelectedTrack(track.id as InterviewTrack);
                  setShowModal(true);
                }}
                className={`group relative text-left p-8 rounded-xl border transition-all duration-300 ${
                  selectedTrack === track.id
                    ? 'bg-zinc-900/60 backdrop-blur-md border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                    : 'bg-zinc-900/50 backdrop-blur-md border-zinc-800/80 hover:border-zinc-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)]'
                }`}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-emerald-500/10 to-transparent" />

                <div className="relative space-y-4">
                  {/* Label */}
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/60 font-semibold">
                      {track.subtitle}
                    </p>
                    <ChevronRight className={`w-4 h-4 transition-colors ${selectedTrack === track.id ? 'text-emerald-400' : 'text-zinc-600 group-hover:text-zinc-500'}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold tracking-tight text-zinc-50">{track.title}</h3>

                  {/* Description */}
                  <p className="text-sm font-medium tracking-wide text-zinc-300 leading-relaxed">{track.description}</p>

                  {/* Specs */}
                  <div className="space-y-2 pt-2">
                    {track.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                        <div className="w-1 h-1 bg-emerald-400/60 rounded-full" />
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bootcamp Roadmap */}
      <section className="relative py-24 px-6 border-y border-zinc-800/40">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-5xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-400">
              Your Training Arc
            </h2>
            <p className="font-medium tracking-wide text-zinc-300">
              Master the psychology of live betting in three phases.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                phase: '01',
                title: 'Fluid Mechanics',
                description: 'Learn probability fundamentals. Master bid/ask calibration. Build confidence under time pressure.',
              },
              {
                phase: '02',
                title: 'Information Shocks',
                description: 'Handle mid-round condition changes. Test Bayesian reasoning. Learn to recalibrate, not panic.',
              },
              {
                phase: '03',
                title: 'Brutal AI Breakdown',
                description: 'Face ruthless feedback. Analyze your patterns. Lock in your edge before the real loop.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative p-8 rounded-xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 space-y-4 group"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-2xl font-extrabold text-emerald-400/60 group-hover:text-emerald-400/100 transition-colors">
                    {item.phase}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent" />
                </div>

                <h3 className="text-xl font-extrabold tracking-tight text-zinc-50">{item.title}</h3>
                <p className="text-sm font-medium tracking-wide text-zinc-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-xl p-12 bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 space-y-6 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-50">Ready to break your freeze?</h2>
            <p className="font-medium tracking-wide text-zinc-300 text-lg">
              Your real interview is coming. Every session now determines whether you stay calm or panic and blow the offer.
            </p>

            {!showModal ? (
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 font-semibold text-white tracking-wide transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
              >
                Start Gauntlet
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <Link href={`/session?track=${selectedTrack || 'fulltime'}`}>
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 font-semibold text-white tracking-wide transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50">
                  Enter Challenge
                  <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
            )}

            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500/60 pt-4">
              No signup required. Start immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="relative w-full max-w-md rounded-xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 p-8 space-y-6">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              ✕
            </button>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold tracking-tight text-zinc-50">Confirm selection</h3>
              <p className="font-medium tracking-wide text-zinc-400">
                {tracks.find((t) => t.id === selectedTrack)?.title}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
              <p className="text-sm font-medium tracking-wide text-zinc-300">
                {tracks.find((t) => t.id === selectedTrack)?.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 font-semibold tracking-wide transition-colors"
              >
                Change
              </button>
              <Link href={`/session?track=${selectedTrack || 'fulltime'}`} className="flex-1">
                <button className="w-full px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold tracking-wide transition-colors">
                  Start
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
