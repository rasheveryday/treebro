'use client';

import { useSession } from 'next-auth/react';
import { AuthButton } from '@/components/auth-button';
import { LoginModal } from '@/components/login-modal';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function HomeContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (searchParams?.get('auth') === 'required') {
      setShowLoginModal(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#dde4dd] font-sans overflow-x-hidden">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-[#3c4a42]">
        <div className="flex justify-between items-center px-10 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-10">
            <span className="font-bold text-2xl tracking-tight text-[#4edea3]">TREEBRO</span>

            {/* Level Selector */}
            <div className="hidden xl:flex items-center bg-[#161d19] border border-[#3c4a42] rounded p-1">
              <button className="px-3 py-1 text-xs uppercase font-mono text-[#bbcabf] hover:text-[#4edea3] transition-colors">L5: INTERN</button>
              <div className="w-px h-4 bg-[#3c4a42] mx-1"></div>
              <button className="px-3 py-1 text-xs uppercase font-mono text-[#4edea3] bg-[#242c27] rounded">L6: JUNIOR</button>
              <div className="w-px h-4 bg-[#3c4a42] mx-1"></div>
              <button className="px-3 py-1 text-xs uppercase font-mono text-[#bbcabf] hover:text-[#4edea3] transition-colors">L7: SENIOR</button>
              <div className="w-px h-4 bg-[#3c4a42] mx-1"></div>
              <button className="px-3 py-1 text-xs uppercase font-mono text-[#bbcabf] hover:text-[#4edea3] transition-colors">L8: LEAD</button>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-[#bbcabf] font-medium hover:text-[#4edea3] transition text-xs uppercase font-mono">CURRICULUM</a>
              <a href="#" className="text-[#4edea3] font-bold border-b-2 border-[#4edea3] pb-1 text-xs uppercase font-mono">SIMULATOR</a>
              <a href="#" className="text-[#bbcabf] font-medium hover:text-[#4edea3] transition text-xs uppercase font-mono">PRICING</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden lg:block text-[#bbcabf] hover:text-[#4edea3] font-mono text-xs transition-all">Sign in with Google to Track Edge</button>
            <AuthButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-24 px-10 max-w-4xl">
        <div className="inline-block px-3 py-1 border border-[#4edea3]/30 rounded mb-8 bg-[#4edea3]/5">
          <span className="text-[#4edea3] font-mono text-xs uppercase tracking-widest">System: Operational // High Frequency Training Active</span>
        </div>
        <h1 className="font-bold text-6xl md:text-8xl mb-10 leading-tight tracking-tight text-[#dde4dd]">
          Treebro. Break your freeze before it breaks you.
        </h1>
        <p className="text-[#bbcabf] text-lg max-w-2xl mb-12 leading-relaxed opacity-80">
          The high-stakes simulator for quantitative researchers. 10,000+ stochastic scenarios. 0% room for hesitation. Designed for those aiming at Citadel, Jane Street, and the elite 1%.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-[#4edea3] text-[#003824] px-10 py-4 font-bold text-xs uppercase rounded hover:brightness-110 laser-glow transition-all">
            START THE GAUNTLET
          </button>
          <button className="border border-[#3c4a42] text-[#dde4dd] px-10 py-4 font-bold text-xs uppercase rounded hover:bg-[#161d19] transition-all">
            VIEW TERMINAL SPECS
          </button>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-container py-12 border-y border-[#3c4a42] bg-[#161d19]/30">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-16 px-8">
            <span className="font-mono text-xs text-[#bbcabf] opacity-40 uppercase">JANE STREET</span>
            <span className="font-mono text-xs text-[#bbcabf] opacity-40 uppercase">CITADEL</span>
            <span className="font-mono text-xs text-[#bbcabf] opacity-40 uppercase">OPTIVER</span>
            <span className="font-mono text-xs text-[#bbcabf] opacity-40 uppercase">SIG</span>
            <span className="font-mono text-xs text-[#bbcabf] opacity-40 uppercase">GOLDMAN SACHS</span>
            <span className="font-mono text-xs text-[#bbcabf] opacity-40 uppercase">UBS</span>
            <span className="font-mono text-xs text-[#bbcabf] opacity-40 uppercase">ROBINHOOD</span>
          </div>
          <div className="flex items-center gap-16 px-8">
            <span className="font-mono text-xs text-[#bbcabf] opacity-40 uppercase">JANE STREET</span>
            <span className="font-mono text-xs text-[#bbcabf] opacity-40 uppercase">CITADEL</span>
            <span className="font-mono text-xs text-[#bbcabf] opacity-40 uppercase">OPTIVER</span>
            <span className="font-mono text-xs text-[#bbcabf] opacity-40 uppercase">SIG</span>
            <span className="font-mono text-xs text-[#bbcabf] opacity-40 uppercase">GOLDMAN SACHS</span>
            <span className="font-mono text-xs text-[#bbcabf] opacity-40 uppercase">UBS</span>
            <span className="font-mono text-xs text-[#bbcabf] opacity-40 uppercase">ROBINHOOD</span>
          </div>
        </div>
      </div>

      {/* Track Selection */}
      <section className="py-32 px-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="font-bold text-4xl mb-3 text-[#dde4dd]">Select Your Track</h2>
            <p className="text-[#bbcabf] font-mono text-xs opacity-70 uppercase tracking-widest">Volatility: High // Sanity: Low</p>
          </div>
          <div className="hidden lg:block h-px flex-grow mx-16 bg-[#3c4a42] opacity-30"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-card p-10 group cursor-pointer">
            <div className="mb-14 flex justify-between items-start">
              <span className="text-[#4edea3] text-5xl">⚡</span>
              <span className="font-mono text-[#4edea3] text-xs opacity-70 uppercase">VOL: MEDIUM</span>
            </div>
            <h3 className="font-semibold text-2xl mb-6 text-[#dde4dd]">Quant/IB Internship Blitz</h3>
            <p className="text-[#bbcabf] text-base mb-10 leading-relaxed">Rapid-fire probability, expected value, and market-making drills. Build the foundation for summer analyst success.</p>
            <div className="flex items-center gap-3 text-[#4edea3] font-mono text-xs uppercase group-hover:gap-5 transition-all">
              INITIALIZE SESSION →
            </div>
          </div>

          {/* Card 2 - Active */}
          <div className="glass-card active-track p-10 group cursor-pointer relative overflow-hidden bg-[#1a211d]/20">
            <div className="absolute top-0 right-0">
              <div className="bg-[#4edea3] text-[#003824] text-[10px] px-4 py-1 font-bold tracking-widest uppercase">MOST SIMULATED</div>
            </div>
            <div className="mb-14 flex justify-between items-start">
              <span className="text-[#4edea3] text-5xl">📊</span>
              <span className="font-mono text-[#4edea3] text-xs uppercase">VOL: HIGH</span>
            </div>
            <h3 className="font-semibold text-2xl mb-6 text-white">Full-Time Gauntlet</h3>
            <p className="text-[#bbcabf] text-base mb-10 leading-relaxed">Bayesian updates, macro shocks, and stochastic calculus under pressure. Designed for the experienced researcher.</p>
            <div className="flex items-center gap-3 text-[#4edea3] font-mono text-xs uppercase group-hover:gap-5 transition-all">
              INITIALIZE SESSION →
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-10 group cursor-pointer border-[#ffb4ab]/20 hover:border-[#ffb4ab]/50">
            <div className="mb-14 flex justify-between items-start">
              <span className="text-[#ffb4ab] text-5xl">⚠️</span>
              <span className="font-mono text-[#ffb4ab] text-xs opacity-70 uppercase">VOL: CATASTROPHIC</span>
            </div>
            <h3 className="font-semibold text-2xl mb-6 text-[#dde4dd]">12-Day Custom Panic</h3>
            <p className="text-[#bbcabf] text-base mb-10 leading-relaxed">Max stress. 10s timers. Non-stop adversarial questioning. The ultimate crucible for elite firm finalists.</p>
            <div className="flex items-center gap-3 text-[#ffb4ab] font-mono text-xs uppercase group-hover:gap-5 transition-all">
              ENTER PURGATORY 💀
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-32 bg-[#0e1511] border-y border-[#3c4a42] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#4edea3_0%,transparent_70%)]"></div>
        <div className="px-10 max-w-7xl mx-auto relative z-10">
          <h2 className="font-bold text-4xl mb-20 text-center text-[#dde4dd]">Protocol Roadmap</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-between items-stretch">
            {[
              { num: '01', title: 'Phase 01: Fluid Mechanics', desc: 'Mastering the mental speed required for basic market-making games.' },
              { num: '02', title: 'Phase 02: Information Shocks', desc: 'Dynamic updates. How do you adjust your priors when the interviewer drops a bomb?' },
              { num: '03', title: 'Phase 03: AI Breakdown', desc: 'Adversarial LLMs trained on actual Quant floor transcripts dismantle your logic.' },
            ].map((phase) => (
              <div key={phase.num} className="flex-1 glass-card p-8 bg-[#161d19]/40">
                <div className="w-12 h-12 bg-[#4edea3]/10 border border-[#4edea3]/30 text-[#4edea3] flex items-center justify-center font-mono mb-8 text-xl font-bold">{phase.num}</div>
                <h4 className="font-semibold text-xl text-[#dde4dd] mb-4">{phase.title}</h4>
                <p className="text-[#bbcabf] text-base leading-relaxed opacity-80">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-16 border-t border-[#3c4a42] bg-[#09090b]">
        <div className="flex flex-col md:flex-row justify-between items-start px-10 max-w-7xl mx-auto">
          <div className="mb-10 md:mb-0">
            <span className="font-bold text-2xl text-[#4edea3] block mb-6">TREEBRO</span>
            <p className="font-mono text-xs text-[#bbcabf]/60 max-w-xs leading-relaxed uppercase tracking-wider">
              © 2024 TREEBRO QUANTITATIVE SYSTEMS. HIGH FREQUENCY PREP FOR HIGH FREQUENCY ROLES.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-12">
            {[
              { title: 'SYSTEM', links: ['TERMINAL', 'SIMULATOR'] },
              { title: 'RESOURCES', links: ['DOCS', 'CURRICULUM'] },
              { title: 'LEGAL', links: ['PRIVACY', 'SECURITY'] },
              { title: 'NETWORK', links: ['STATUS', 'X / TWITTER'] },
            ].map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <span className="text-xs font-bold text-[#dde4dd] tracking-widest mb-2">{col.title}</span>
                {col.links.map((link) => (
                  <a key={link} href="#" className="font-mono text-xs text-[#bbcabf] hover:text-[#4edea3] transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090b]" />}>
      <HomeContent />
    </Suspense>
  );
}
