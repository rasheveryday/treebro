<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>TREEBRO | Quantitative Finance Interview Simulator</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
<style>
        body {
            background-color: #09090b; /* Deep Dark Zinc 950 */
            color: #dde4dd;
            font-family: 'Inter', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .font-mono-data { font-family: 'JetBrains Mono', monospace; }
        .font-display-lg { font-family: 'Inter', sans-serif; font-weight: 700; letter-spacing: -0.05em; }
        
        .glass-card {
            background: rgba(26, 33, 29, 0.4);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(60, 74, 66, 0.3);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-card:hover {
            border-color: rgba(78, 222, 163, 0.5);
            box-shadow: 0 0 20px rgba(78, 222, 163, 0.1);
        }

        .active-track {
            border-color: rgba(78, 222, 163, 0.6);
            box-shadow: 0 0 30px rgba(78, 222, 163, 0.15);
        }

        .marquee-container {
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }

        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        .animate-marquee {
            animation: marquee 40s linear infinite;
        }

        .laser-glow {
            box-shadow: 0 0 15px rgba(78, 222, 163, 0.4);
        }

        .terminal-cursor::after {
            content: '_';
            animation: blink 1s step-end infinite;
        }

        @keyframes blink {
            50% { opacity: 0; }
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                "surface": "#0e1511",
                "surface-dim": "#0e1511",
                "surface-bright": "#343b36",
                "surface-container-lowest": "#09100c",
                "surface-container-low": "#161d19",
                "surface-container": "#1a211d",
                "surface-container-high": "#242c27",
                "surface-container-highest": "#2f3632",
                "on-surface": "#dde4dd",
                "on-surface-variant": "#bbcabf",
                "outline": "#86948a",
                "outline-variant": "#3c4a42",
                "primary": "#4edea3",
                "on-primary": "#003824",
                "primary-container": "#10b981",
                "on-primary-container": "#00422b",
                "secondary": "#c6c5cf",
                "on-secondary": "#2f3038",
                "error": "#ffb4ab",
                "on-error": "#690005",
                "background": "#09090b"
              },
              "borderRadius": {
                "DEFAULT": "0.125rem",
                "lg": "0.25rem",
                "xl": "0.5rem",
                "full": "9999px"
              },
              "spacing": {
                "margin-desktop": "40px",
                "unit": "4px",
                "margin-mobile": "16px",
                "gutter": "24px",
                "container-max": "1440px"
              },
              "fontFamily": {
                "mono-data": ["JetBrains Mono"],
                "display-lg": ["Inter"],
                "label-caps": ["JetBrains Mono"],
                "headline-sm": ["Inter"],
                "body-lg": ["Inter"],
                "headline-md": ["Inter"],
                "body-md": ["Inter"]
              },
              "fontSize": {
                "mono-data": ["14px", {"lineHeight": "1.4", "letterSpacing": "0em", "fontWeight": "500"}],
                "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.05em", "fontWeight": "700"}],
                "label-caps": ["12px", {"lineHeight": "1", "letterSpacing": "0.1em", "fontWeight": "700"}],
                "headline-sm": ["24px", {"lineHeight": "1.3", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                "body-lg": ["18px", {"lineHeight": "1.6", "letterSpacing": "-0.01em", "fontWeight": "400"}],
                "headline-md": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.03em", "fontWeight": "600"}],
                "body-md": ["16px", {"lineHeight": "1.5", "letterSpacing": "-0.01em", "fontWeight": "400"}]
              }
            }
          }
        }
    </script>
</head>
<body class="bg-background overflow-x-hidden">
<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant">
<div class="flex justify-between items-center px-margin-desktop py-3 max-w-container-max mx-auto">
<div class="flex items-center gap-10">
<span class="font-display-lg text-headline-sm tracking-tighter text-primary">TREEBRO</span>
<!-- Level Selector (New Functional Improvement) -->
<div class="hidden xl:flex items-center bg-surface-container-low border border-outline-variant rounded-sm p-1">
<button class="px-3 py-1 text-label-caps font-mono-data text-on-surface-variant hover:text-primary transition-colors">L5: INTERN</button>
<div class="w-[1px] h-4 bg-outline-variant mx-1"></div>
<button class="px-3 py-1 text-label-caps font-mono-data text-primary bg-surface-container-high rounded-sm">L6: JUNIOR</button>
<div class="w-[1px] h-4 bg-outline-variant mx-1"></div>
<button class="px-3 py-1 text-label-caps font-mono-data text-on-surface-variant hover:text-primary transition-colors">L7: SENIOR</button>
<div class="w-[1px] h-4 bg-outline-variant mx-1"></div>
<button class="px-3 py-1 text-label-caps font-mono-data text-on-surface-variant hover:text-primary transition-colors">L8: LEAD</button>
</div>
<div class="hidden md:flex items-center gap-6">
<a class="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 font-label-caps text-label-caps" href="#">CURRICULUM</a>
<a class="text-primary font-bold border-b-2 border-primary pb-1 font-label-caps text-label-caps" href="#">SIMULATOR</a>
<a class="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 font-label-caps text-label-caps" href="#">PRICING</a>
</div>
</div>
<div class="flex items-center gap-4">
<button class="hidden lg:block text-on-surface-variant hover:text-primary font-mono-data text-[12px] transition-all">Sign in with Google to Track Edge</button>
<button class="bg-primary text-on-primary px-5 py-2 rounded-sm font-label-caps text-label-caps hover:brightness-110 transition-all">
                Launch Gauntlet
            </button>
</div>
</div>
</nav>
<!-- Hero Section -->
<section class="relative pt-44 pb-24 px-margin-desktop max-w-container-max mx-auto">
<div class="max-w-4xl">
<div class="inline-block px-3 py-1 border border-primary/30 rounded-sm mb-8 bg-primary/5">
<span class="text-primary font-mono-data text-label-caps terminal-cursor uppercase tracking-widest">System: Operational // High Frequency Training Active</span>
</div>
<h1 class="font-display-lg text-6xl md:text-8xl mb-10 leading-[1.05] tracking-tighter text-on-surface">
            Treebro. Break your freeze before it breaks you.
        </h1>
<p class="text-on-surface-variant text-body-lg max-w-2xl mb-12 leading-relaxed opacity-80">
            The high-stakes simulator for quantitative researchers. 10,000+ stochastic scenarios. 0% room for hesitation. Designed for those aiming at Citadel, Jane Street, and the elite 1%.
        </p>
<div class="flex flex-wrap gap-4">
<button class="bg-primary text-on-primary px-10 py-4 font-label-caps text-label-caps rounded-sm hover:brightness-110 laser-glow transition-all">
                START THE GAUNTLET
            </button>
<button class="border border-outline-variant text-on-surface px-10 py-4 font-label-caps text-label-caps rounded-sm hover:bg-surface-container-low transition-all">
                VIEW TERMINAL SPECS
            </button>
</div>
</div>
</section>
<!-- Infinite Marquee -->
<div class="marquee-container py-12 border-y border-outline-variant bg-surface-container-low/30">
<div class="flex whitespace-nowrap animate-marquee">
<div class="flex items-center gap-16 px-8">
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">JANE STREET</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">CITADEL</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">OPTIVER</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">SIG</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">GOLDMAN SACHS</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">UBS</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">ROBINHOOD</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">SNAPCHAT</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">STRIPE</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">NVIDIA</span>
</div>
<div class="flex items-center gap-16 px-8">
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">JANE STREET</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">CITADEL</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">OPTIVER</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">SIG</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">GOLDMAN SACHS</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">UBS</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">ROBINHOOD</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">SNAPCHAT</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">STRIPE</span>
<span class="font-mono-data text-on-surface-variant text-label-caps opacity-40">NVIDIA</span>
</div>
</div>
</div>
<!-- Track Selection Grid -->
<section class="py-32 px-margin-desktop max-w-container-max mx-auto">
<div class="flex items-center justify-between mb-16">
<div>
<h2 class="font-display-lg text-headline-md mb-3">Select Your Track</h2>
<p class="text-on-surface-variant font-mono-data text-mono-data opacity-70 uppercase tracking-widest">Volatility: High // Sanity: Low</p>
</div>
<div class="hidden lg:block h-[1px] flex-grow mx-16 bg-outline-variant opacity-30"></div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<!-- Card 1 -->
<div class="glass-card p-10 group cursor-pointer">
<div class="mb-14 flex justify-between items-start">
<span class="material-symbols-outlined text-primary text-5xl">bolt</span>
<span class="font-mono-data text-primary text-label-caps opacity-70">VOL: MEDIUM</span>
</div>
<h3 class="font-headline-sm mb-6">Quant/IB Internship Blitz</h3>
<p class="text-on-surface-variant text-body-md mb-10 leading-relaxed">Rapid-fire probability, expected value, and market-making drills. Build the foundation for summer analyst success.</p>
<div class="flex items-center gap-3 text-primary font-label-caps text-label-caps group-hover:gap-5 transition-all">
                INITIALIZE SESSION <span class="material-symbols-outlined text-sm">arrow_forward</span>
</div>
</div>
<!-- Card 2: Active Track with Glow -->
<div class="glass-card active-track p-10 group cursor-pointer relative overflow-hidden bg-surface-container/20">
<div class="absolute top-0 right-0">
<div class="bg-primary text-on-primary text-[10px] px-4 py-1 font-bold tracking-widest uppercase">MOST SIMULATED</div>
</div>
<div class="mb-14 flex justify-between items-start">
<span class="material-symbols-outlined text-primary text-5xl" style="font-variation-settings: 'FILL' 1">query_stats</span>
<span class="font-mono-data text-primary text-label-caps">VOL: HIGH</span>
</div>
<h3 class="font-headline-sm mb-6 text-white">Full-Time Gauntlet</h3>
<p class="text-on-surface-variant text-body-md mb-10 leading-relaxed">Bayesian updates, macro shocks, and stochastic calculus under pressure. Designed for the experienced researcher.</p>
<div class="flex items-center gap-3 text-primary font-label-caps text-label-caps group-hover:gap-5 transition-all">
                INITIALIZE SESSION <span class="material-symbols-outlined text-sm">arrow_forward</span>
</div>
</div>
<!-- Card 3 -->
<div class="glass-card p-10 group cursor-pointer border-error/20 hover:border-error/50">
<div class="mb-14 flex justify-between items-start">
<span class="material-symbols-outlined text-error text-5xl">warning</span>
<span class="font-mono-data text-error text-label-caps opacity-70">VOL: CATASTROPHIC</span>
</div>
<h3 class="font-headline-sm mb-6">12-Day Custom Panic</h3>
<p class="text-on-surface-variant text-body-md mb-10 leading-relaxed">Max stress. 10s timers. Non-stop adversarial questioning. The ultimate crucible for elite firm finalists.</p>
<div class="flex items-center gap-3 text-error font-label-caps text-label-caps group-hover:gap-5 transition-all">
                ENTER PURGATORY <span class="material-symbols-outlined text-sm">skull</span>
</div>
</div>
</div>
</section>
<!-- Roadmap Section -->
<section class="py-32 bg-surface-container-lowest border-y border-outline-variant relative overflow-hidden">
<!-- Subtle Background Element -->
<div class="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style="background-image: radial-gradient(circle at 50% 50%, #4edea3 0%, transparent 70%);"></div>
<div class="px-margin-desktop max-w-container-max mx-auto relative z-10">
<h2 class="font-display-lg text-headline-md mb-20 text-center tracking-tight">Protocol Roadmap</h2>
<div class="relative flex flex-col md:flex-row gap-8 justify-between items-stretch">
<!-- Phase 1 -->
<div class="flex-1 glass-card p-8 bg-surface-container-low/40">
<div class="w-12 h-12 bg-primary/10 border border-primary/30 text-primary flex items-center justify-center font-mono-data mb-8 text-xl">01</div>
<h4 class="font-headline-sm text-on-surface mb-4">Phase 01: Fluid Mechanics</h4>
<p class="text-on-surface-variant text-body-md leading-relaxed opacity-80">Mastering the mental speed required for basic market-making games. Eliminating the 'uhms' and 'ahs' from your technical delivery.</p>
</div>
<!-- Phase 2 -->
<div class="flex-1 glass-card p-8 bg-surface-container-low/40">
<div class="w-12 h-12 bg-primary/10 border border-primary/30 text-primary flex items-center justify-center font-mono-data mb-8 text-xl">02</div>
<h4 class="font-headline-sm text-on-surface mb-4">Phase 02: Information Shocks</h4>
<p class="text-on-surface-variant text-body-md leading-relaxed opacity-80">Dynamic updates. How do you adjust your priors when the interviewer drops a 'What if...?' bomb mid-calculation?</p>
</div>
<!-- Phase 3 -->
<div class="flex-1 glass-card p-8 bg-primary/5 active-track">
<div class="w-12 h-12 bg-primary text-on-primary flex items-center justify-center font-mono-data mb-8 text-xl shadow-[0_0_15px_rgba(78,222,163,0.3)]">03</div>
<h4 class="font-headline-sm text-primary mb-4">Phase 03: AI Breakdown</h4>
<p class="text-on-surface-variant text-body-md leading-relaxed">Adversarial LLMs trained on actual Quant floor transcripts dismantle your logic. Pure cognitive survival at scale.</p>
</div>
</div>
</div>
</section>
<!-- Data Visualization Component (Mock Terminal) -->
<section class="py-32 px-margin-desktop max-w-container-max mx-auto">
<div class="glass-card overflow-hidden rounded-sm border-outline-variant/50">
<div class="bg-surface-container-high/80 px-6 py-3 flex items-center justify-between border-b border-outline-variant">
<div class="flex items-center gap-5">
<div class="flex gap-2">
<div class="w-3 h-3 rounded-full bg-error/40"></div>
<div class="w-3 h-3 rounded-full bg-secondary/40"></div>
<div class="w-3 h-3 rounded-full bg-primary/40"></div>
</div>
<span class="font-mono-data text-[11px] tracking-[0.2em] text-on-surface-variant/60 uppercase">CORE-SIMULATOR // V4.0.2-BETA</span>
</div>
<div class="flex items-center gap-4">
<div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
<span class="font-mono-data text-[11px] text-primary">SESSION_L6_STABLE</span>
</div>
</div>
<div class="p-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
<div class="space-y-8">
<div class="space-y-3">
<div class="flex justify-between items-end">
<p class="font-mono-data text-primary text-label-caps">PROBABILITY_MATRIX_GENERATED</p>
<span class="font-mono-data text-[10px] text-on-surface-variant">75%</span>
</div>
<div class="h-1 w-full bg-surface-container-highest">
<div class="h-full bg-primary w-3/4 transition-all duration-1000 ease-out"></div>
</div>
</div>
<div class="space-y-3">
<div class="flex justify-between items-end">
<p class="font-mono-data text-primary text-label-caps">STOCHASTIC_ENGINE_SYNCED</p>
<span class="font-mono-data text-[10px] text-on-surface-variant">100%</span>
</div>
<div class="h-1 w-full bg-surface-container-highest">
<div class="h-full bg-primary w-full transition-all duration-1000 ease-out"></div>
</div>
</div>
<div class="space-y-3">
<div class="flex justify-between items-end">
<p class="font-mono-data text-error text-label-caps">COGNITIVE_LOAD_WARNING</p>
<span class="font-mono-data text-[10px] text-error">CRITICAL</span>
</div>
<div class="h-1 w-full bg-surface-container-highest">
<div class="h-full bg-error w-1/3 transition-all duration-1000 ease-out"></div>
</div>
</div>
<div class="pt-8">
<div class="relative group">
<img alt="Trading Dashboard Visualization" class="w-full h-56 object-cover rounded-sm border border-outline-variant grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXbNo49x5KknxhM_5qVOBbPlGH4C1w_PI04HhJG0gkoNe9YGrxpxX3mjHayUPTibBdk_HiGWZTXX7Wvrj5UxC7eXP49ZFAL5d6ZZqX-VgdfJfWlzwzlVaG2c6u2hkNctR-9Utn6MF5HzxLswO1p6Cn9YnhotdrG-GTfUVxuu8ORrJJji4wSSrofbox8vfODe84txG8IKI-uuIsgkaQeK_y3NhcYp5aF8aqBiZuOqJY7Bgp-qmLB5FBhyZ5dUNnzeNsjKeIpBZIebw"/>
<div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
</div>
</div>
</div>
<div class="font-mono-data text-mono-data text-on-surface-variant space-y-6">
<div class="p-6 bg-surface-container-lowest/80 border border-outline-variant/20 rounded-sm text-[13px] leading-relaxed">
<span class="text-primary font-bold">[SYSTEM]</span> Initializing Quant-Gauntlet 2024.1...<br/>
<span class="text-primary font-bold">[SYSTEM]</span> Fetching volatility surfaces for J-Street Prep...<br/>
<span class="text-primary font-bold">[SYSTEM]</span> Loading firm-specific Bayesian trick questions...<br/>
<br/>
<span class="text-secondary font-semibold">SIMULATOR:</span> You have a bag with 100 coins. 1 is double-headed. You flip a coin 10 times and get 10 heads. What is the probability you picked the double-headed coin? <br/>
<br/>
<span class="text-primary border border-primary/20 bg-primary/5 px-2 py-0.5">[TIME REMAINING: 07s]</span><br/>
<br/>
<span class="text-on-surface">INPUT &gt;</span> <span class="terminal-cursor text-primary"></span>
</div>
<div class="flex justify-end gap-6">
<button class="text-on-surface-variant text-[11px] font-mono-data hover:text-primary transition-colors uppercase tracking-widest">Toggle Debug</button>
<button class="text-primary text-[11px] font-mono-data hover:underline uppercase tracking-widest">Run Diagnostics</button>
</div>
</div>
</div>
</div>
</section>
<!-- Footer -->
<footer class="w-full py-16 border-t border-outline-variant bg-background">
<div class="flex flex-col md:flex-row justify-between items-start px-margin-desktop max-w-container-max mx-auto">
<div class="mb-10 md:mb-0">
<span class="font-display-lg text-headline-sm text-primary block mb-6">TREEBRO</span>
<p class="font-mono-data text-[11px] text-on-surface-variant/60 max-w-xs leading-relaxed uppercase tracking-wider">
                © 2024 TREEBRO QUANTITATIVE SYSTEMS.<br/>HIGH FREQUENCY PREP FOR HIGH FREQUENCY ROLES.
            </p>
</div>
<div class="grid grid-cols-2 sm:grid-cols-4 gap-12">
<div class="flex flex-col gap-4">
<span class="text-[11px] font-bold text-on-surface tracking-[0.2em] mb-2">SYSTEM</span>
<a class="font-mono-data text-[12px] text-on-surface-variant hover:text-primary transition-colors" href="#">TERMINAL</a>
<a class="font-mono-data text-[12px] text-on-surface-variant hover:text-primary transition-colors" href="#">SIMULATOR</a>
</div>
<div class="flex flex-col gap-4">
<span class="text-[11px] font-bold text-on-surface tracking-[0.2em] mb-2">RESOURCES</span>
<a class="font-mono-data text-[12px] text-on-surface-variant hover:text-primary transition-colors" href="#">DOCS</a>
<a class="font-mono-data text-[12px] text-on-surface-variant hover:text-primary transition-colors" href="#">CURRICULUM</a>
</div>
<div class="flex flex-col gap-4">
<span class="text-[11px] font-bold text-on-surface tracking-[0.2em] mb-2">LEGAL</span>
<a class="font-mono-data text-[12px] text-on-surface-variant hover:text-primary transition-colors" href="#">PRIVACY</a>
<a class="font-mono-data text-[12px] text-on-surface-variant hover:text-primary transition-colors" href="#">SECURITY</a>
</div>
<div class="flex flex-col gap-4">
<span class="text-[11px] font-bold text-on-surface tracking-[0.2em] mb-2">NETWORK</span>
<a class="font-mono-data text-[12px] text-on-surface-variant hover:text-primary transition-colors" href="#">STATUS</a>
<a class="font-mono-data text-[12px] text-on-surface-variant hover:text-primary transition-colors" href="#">X / TWITTER</a>
</div>
</div>
</div>
</footer>
<script>
    // Micro-interactions for button pressure
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mousedown', () => button.style.transform = 'scale(0.97)');
        button.addEventListener('mouseup', () => button.style.transform = 'scale(1)');
        button.addEventListener('mouseleave', () => button.style.transform = 'scale(1)');
    });

    // Simple typing effect simulation for the terminal
    const cursor = document.querySelector('.terminal-cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 530);
    }
</script>
</body></html>
