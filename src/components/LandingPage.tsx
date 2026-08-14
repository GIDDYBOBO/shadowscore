import React, { useEffect, useRef, useState } from 'react';
import {
  ShieldCheck, Cpu, ArrowRight, Zap, CheckCircle2,
  Lock, Globe, FileText, TrendingUp, Wallet,
  BarChart3, Eye, Star, ChevronDown, Menu, X
} from 'lucide-react';

/* ─── SVG Brand Icons ─── */
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ─── Animated Score Ring ─── */
const AnimatedRing: React.FC = () => {
  const [score] = useState(84);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-36 h-36">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#1a2235" strokeWidth="10" />
        <circle
          cx="70" cy="70" r={radius} fill="none"
          stroke="url(#scoreGrad)" strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.5s ease' }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center z-10">
        <div className="text-3xl font-black text-white">{score}</div>
        <div className="text-[10px] font-bold text-brand-cyan tracking-widest uppercase">Score</div>
      </div>
    </div>
  );
};

/* ─── Mini Sparkline ─── */
const Sparkline: React.FC<{ color: string }> = ({ color }) => {
  const points = [20, 35, 28, 45, 38, 55, 48, 65, 58, 72, 68, 80];
  const max = Math.max(...points);
  const w = 80, h = 28;
  const pts = points.map((v, i) => `${(i / (points.length - 1)) * w},${h - (v / max) * h}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/* ─── Hero Dashboard Card ─── */
const HeroDashCard: React.FC = () => (
  <div className="relative w-full max-w-sm mx-auto lg:mx-0">
    {/* Glow behind card */}
    <div className="absolute -inset-6 bg-brand-cyan/10 rounded-3xl blur-2xl pointer-events-none" />

    <div className="relative rounded-2xl border border-white/10 bg-[#0D1117]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
          <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider">LIVE AUDIT</span>
        </div>
        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">● SECURE</span>
      </div>

      <div className="p-4 space-y-4">
        {/* Score row */}
        <div className="flex items-center gap-4">
          <AnimatedRing />
          <div className="space-y-2 flex-1">
            <div className="space-y-1">
              <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Wallet Grade</div>
              <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">A+</div>
            </div>
            <div className="space-y-1">
              <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Net Worth</div>
              <div className="text-sm font-black text-white">$48,230.12</div>
            </div>
            <div className="flex gap-1">
              {['ETH','SOL','BASE'].map(c => (
                <span key={c} className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Txns', value: '1,284', color: '#06B6D4' },
            { label: 'Approvals', value: '3 Active', color: '#F59E0B' },
            { label: 'Risk', value: 'Low', color: '#10B981' },
          ].map(s => (
            <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/8 p-2 text-center">
              <div className="text-[9px] text-slate-500 font-mono">{s.label}</div>
              <div className="text-[11px] font-bold mt-0.5" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Sparklines */}
        <div className="space-y-2">
          {[
            { label: 'Reputation History', color: '#06B6D4', change: '+12.4%' },
            { label: 'Portfolio P&L', color: '#10B981', change: '+8.7%' },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/8 px-3 py-2">
              <div>
                <div className="text-[9px] text-slate-500 font-mono">{s.label}</div>
                <div className="text-[10px] font-bold text-emerald-400">{s.change}</div>
              </div>
              <Sparkline color={s.color} />
            </div>
          ))}
        </div>

        {/* Action button */}
        <button className="w-full rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan py-2.5 text-[11px] font-extrabold text-dark-900 shadow-glow-cyan/20 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          Generate Reputation Badge
        </button>
      </div>
    </div>
  </div>
);

/* ─── Floating badge pill ─── */
const FloatingBadge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`absolute hidden lg:flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0D1117]/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-semibold text-slate-300 shadow-xl ${className}`}>
    {children}
  </div>
);

/* ─── Section label ─── */
const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block text-[11px] font-bold font-mono text-brand-cyan uppercase tracking-[0.15em] bg-brand-cyan/10 px-3.5 py-1.5 rounded-full border border-brand-cyan/25">
    {children}
  </span>
);

/* ─── Feature Card ─── */
const FeatureCard: React.FC<{ icon: React.ElementType; title: string; desc: string; accent: string }> = ({ icon: Icon, title, desc, accent }) => (
  <div className="group relative rounded-2xl border border-white/8 bg-[#0D1117] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/30 hover:bg-[#111827] overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border ${accent}`}>
      <Icon className="w-5 h-5" />
    </div>
    <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
    <p className="text-xs leading-relaxed text-slate-400">{desc}</p>
  </div>
);

/* ─── Step Card ─── */
const StepCard: React.FC<{ number: number; title: string; desc: string }> = ({ number, title, desc }) => (
  <div className="relative flex flex-col items-center text-center group">
    <div className="relative mb-5">
      <div className="absolute inset-0 rounded-full bg-brand-cyan/20 blur-md group-hover:bg-brand-cyan/40 transition-colors" />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan text-dark-900 text-lg font-black shadow-glow-cyan/30">
        {number}
      </div>
    </div>
    <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
    <p className="text-[11px] text-slate-400 leading-relaxed max-w-[180px]">{desc}</p>
  </div>
);

/* ─── FAQ Item ─── */
const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl border border-white/8 bg-[#0D1117] overflow-hidden cursor-pointer group"
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-center justify-between px-6 py-4 group-hover:bg-white/[0.02] transition-colors">
        <span className="text-sm font-semibold text-white">{q}</span>
        <ChevronDown className={`w-4 h-4 text-brand-cyan flex-shrink-0 ml-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </div>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-xs leading-relaxed text-slate-400 font-mono border-t border-white/8 pt-4">{a}</p>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   MAIN LANDING PAGE
═══════════════════════════════════════════════════ */
interface LandingPageProps {
  onLaunchDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchDashboard }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how', label: 'How It Works' },
    { href: '#security', label: 'Security' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <main className="min-h-screen bg-[#05070A] text-white font-sans selection:bg-brand-cyan selection:text-dark-900 overflow-x-hidden">

      {/* ── Ambient background glows ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-brand-cyan/5 blur-[120px]" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full bg-brand-blue/5 blur-[100px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ══════════ NAVBAR ══════════ */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-white/8 bg-[#05070A]/90 backdrop-blur-xl shadow-2xl' : 'bg-transparent'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onLaunchDashboard}>
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-purple blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-purple p-[1.5px]">
                <div className="w-full h-full bg-[#05070A] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-sky text-lg">S</span>
                </div>
              </div>
            </div>
            <span className="text-xl font-black text-white tracking-tight font-mono">
              Shadow<span className="text-brand-cyan">Score</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-xs font-semibold text-slate-400 hover:text-brand-cyan transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2">
              <a href="https://github.com/GIDDYBOBO/" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                <GitHubIcon />
              </a>
              <a href="https://x.com/bade_bunmi" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                <XIcon />
              </a>
              <a href="https://www.linkedin.com/in/gideon-oluwatomilola-585b92384/" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all">
                <LinkedInIcon />
              </a>
            </div>
            <button onClick={onLaunchDashboard}
              className="flex items-center gap-2 rounded-xl bg-brand-cyan hover:bg-cyan-400 px-5 py-2.5 text-xs font-extrabold text-dark-900 transition-all shadow-glow-cyan/20 hover:shadow-glow-cyan/40 hover:-translate-y-0.5">
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-400"
            onClick={() => setMobileMenuOpen(o => !o)}>
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/8 bg-[#05070A]/95 backdrop-blur-xl px-6 py-4 space-y-4">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="block text-sm font-semibold text-slate-300 hover:text-brand-cyan transition-colors py-1"
                onClick={() => setMobileMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <button onClick={onLaunchDashboard}
              className="w-full rounded-xl bg-brand-cyan py-3 text-sm font-extrabold text-dark-900">
              Launch Dashboard
            </button>
          </div>
        )}
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/25 bg-brand-cyan/8 px-4 py-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
              <span className="text-[11px] font-bold font-mono text-brand-cyan tracking-wider uppercase">AI-Powered Web3 Intelligence</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight">
                Build Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-sky to-brand-purple py-1">
                  Blockchain
                </span>
                Reputation
              </h1>
              <p className="text-base text-slate-400 leading-relaxed max-w-lg">
                The most advanced on-chain identity platform. Analyze Ethereum, Solana, and EVM wallets using AI — discover your trust score, security vulnerabilities, and portfolio insights in seconds.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={onLaunchDashboard}
                className="group flex items-center gap-2.5 rounded-xl bg-brand-cyan hover:bg-cyan-400 px-7 py-3.5 text-sm font-extrabold text-dark-900 transition-all shadow-glow-cyan/25 hover:shadow-glow-cyan/50 hover:-translate-y-0.5">
                <Zap className="w-4 h-4" />
                <span>Launch Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#features"
                className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5">
                <Eye className="w-4 h-4 text-brand-cyan" />
                <span>Explore Features</span>
              </a>
            </div>

            {/* Social proof strip */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-2">
                {['#06B6D4','#818CF8','#10B981','#F59E0B','#EF4444'].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#05070A] flex items-center justify-center text-[10px] font-black"
                    style={{ backgroundColor: c + '33', borderColor: c + '55', color: c }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-xs text-slate-400">
                <span className="text-white font-bold">1M+</span> wallets audited &nbsp;·&nbsp;
                <span className="text-emerald-400 font-bold">★ 4.9</span> rating
              </div>
            </div>

            {/* Social links row */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">Find us on</span>
              <div className="flex items-center gap-2">
                <a href="https://github.com/GIDDYBOBO/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] px-3 py-1.5 text-[11px] font-semibold text-slate-300 hover:text-white transition-all">
                  <GitHubIcon />
                  <span>GitHub</span>
                </a>
                <a href="https://x.com/bade_bunmi" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] px-3 py-1.5 text-[11px] font-semibold text-slate-300 hover:text-white transition-all">
                  <XIcon />
                  <span>X / Twitter</span>
                </a>
                <a href="https://www.linkedin.com/in/gideon-oluwatomilola-585b92384/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30 px-3 py-1.5 text-[11px] font-semibold text-slate-300 hover:text-[#0A66C2] transition-all">
                  <LinkedInIcon />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Dashboard card */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Floating badges */}
            <FloatingBadge className="-top-4 -left-4">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Read-Only. Non-Custodial.</span>
            </FloatingBadge>
            <FloatingBadge className="-bottom-4 -right-2">
              <TrendingUp className="w-3 h-3 text-brand-cyan" />
              <span>6 Blockchains Supported</span>
            </FloatingBadge>

            <HeroDashCard />
          </div>
        </div>
      </section>

      {/* ══════════ STATS BAND ══════════ */}
      <section className="relative border-y border-white/8 bg-[#080C12]/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: '1M+', label: 'Wallets Audited', icon: Wallet, color: 'text-brand-cyan' },
            { value: '99.9%', label: 'AI Accuracy Rate', icon: Cpu, color: 'text-brand-purple' },
            { value: '6+', label: 'Blockchains', icon: Globe, color: 'text-emerald-400' },
            { value: '24/7', label: 'Live Telemetry', icon: BarChart3, color: 'text-amber-400' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-4 group">
              <div className={`w-10 h-10 rounded-xl bg-white/[0.04] border border-white/8 flex items-center justify-center flex-shrink-0 group-hover:border-brand-cyan/30 transition-colors`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <div className={`text-2xl font-black ${s.color} font-mono leading-none`}>{s.value}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section id="features" className="mx-auto max-w-7xl px-6 lg:px-8 py-28">
        <div className="text-center space-y-4 mb-16">
          <SectionLabel>Core Protocol Features</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Powerful Web3 Intelligence</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">Everything you need to understand, protect, and grow your on-chain identity.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Star, title: 'AI Reputation Engine',
              desc: 'Computes trust scores based on wallet age, transaction quality, and contract interaction patterns.',
              accent: 'bg-brand-cyan/10 border-brand-cyan/25 text-brand-cyan',
            },
            {
              icon: ShieldCheck, title: 'Wallet Security Scanner',
              desc: 'Audits unverified token approvals, honeypot contracts, and phishing Permit2 signatures in real time.',
              accent: 'bg-emerald-400/10 border-emerald-400/25 text-emerald-400',
            },
            {
              icon: Globe, title: 'Solana & EVM Support',
              desc: 'Native multi-chain telemetry: Ethereum, Base, Solana, Arbitrum, Polygon, and Sepolia testnets.',
              accent: 'bg-brand-purple/10 border-brand-purple/25 text-brand-purple',
            },
            {
              icon: Lock, title: 'Risk Detection & Revoke',
              desc: 'Highlights active vs passive contract permissions and guides step-by-step revocations.',
              accent: 'bg-red-400/10 border-red-400/25 text-red-400',
            },
            {
              icon: TrendingUp, title: 'Portfolio Analytics',
              desc: 'Real-time P&L valuation, token balances, and Etherscan/Solscan staked asset indexers.',
              accent: 'bg-amber-400/10 border-amber-400/25 text-amber-400',
            },
            {
              icon: Cpu, title: 'Shadow AI Co-pilot',
              desc: 'Dynamic floating AI assistant providing personalized security advice and on-chain intelligence.',
              accent: 'bg-sky-400/10 border-sky-400/25 text-sky-400',
            },
          ].map(f => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} accent={f.accent} />
          ))}
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section id="how" className="relative bg-[#080C12]/60 py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <SectionLabel>Step-by-Step Walkthrough</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">How It Works</h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">Up and running in under 60 seconds. No sign-up required.</p>
          </div>

          <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Connector line */}
            <div className="absolute top-7 left-1/4 right-1/4 h-px bg-gradient-to-r from-brand-cyan/0 via-brand-cyan/30 to-brand-cyan/0 hidden lg:block" />

            {[
              { title: 'Connect Wallet', desc: 'Authorize Rabby, MetaMask, Coinbase, or Phantom in read-only mode. Zero funds access.' },
              { title: 'AI Scans Chain', desc: 'ShadowGuard AI parses historical txns, approvals, and portfolio telemetry.' },
              { title: 'Generate Badge', desc: 'Claim your dynamic Soulbound Reputation NFT badge (A+ to F risk levels).' },
              { title: 'Revoke & Protect', desc: 'Disconnect and revoke active contract allowances with a single click.' },
            ].map((item, i) => (
              <StepCard key={item.title} number={i + 1} title={item.title} desc={item.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SECURITY STRIP ══════════ */}
      <section id="security" className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-extrabold text-white mb-2">Your Security is Our Priority</h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
              ShadowScore operates strictly on <strong className="text-white">public, read-only blockchain data</strong>. We never request transaction signing, private keys, or fund transfers during reputation analysis. Your wallet stays completely in your control at all times.
            </p>
          </div>
          <button onClick={onLaunchDashboard}
            className="flex-shrink-0 flex items-center gap-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 px-6 py-3 text-sm font-extrabold text-dark-900 transition-all hover:-translate-y-0.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Audit My Wallet</span>
          </button>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 lg:px-8 pb-28">
        <div className="text-center space-y-4 mb-12">
          <SectionLabel>Got Questions?</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {[
            {
              q: 'Is my wallet safe when connecting to ShadowScore AI?',
              a: 'Yes. ShadowScore operates strictly on public read-only blockchain information. It never asks for approval to transfer funds or access private keys.',
            },
            {
              q: 'Do I need to sign any transactions?',
              a: 'Only when you explicitly initiate a contract revocation. For standard reputation auditing, zero transaction signatures are required.',
            },
            {
              q: 'Why should I revoke permissions after getting my badge?',
              a: 'Web3 best practice: regularly prune dormant contract approvals. Keep a small gas balance (≥ $2 ETH) so you can clear unverified spender allowances anytime.',
            },
            {
              q: 'Which blockchains are supported?',
              a: 'Ethereum Mainnet, Solana Mainnet, Base, Arbitrum One, Polygon, and Sepolia Testnet.',
            },
            {
              q: 'Is ShadowScore free to use?',
              a: 'Yes. Core reputation analysis, security scanning, and portfolio overview are completely free. Advanced audit exports and NFT badge minting may have nominal gas fees.',
            },
          ].map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* ══════════ CTA BAND ══════════ */}
      <section className="relative mx-6 lg:mx-auto max-w-7xl lg:px-8 mb-20">
        <div className="relative rounded-3xl overflow-hidden border border-white/10">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 via-brand-cyan/10 to-brand-purple/20" />
          <div className="absolute inset-0 bg-[#05070A]/60" />
          {/* Glow orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-32 bg-brand-cyan/15 blur-[80px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-brand-purple/15 blur-[80px] rounded-full" />

          <div className="relative z-10 flex flex-col items-center text-center px-8 py-16 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/25 bg-brand-cyan/8 px-4 py-1.5">
              <Zap className="w-3 h-3 text-brand-cyan" />
              <span className="text-[11px] font-bold font-mono text-brand-cyan uppercase tracking-wider">Start Free Today</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight max-w-2xl">
              Your On-Chain Identity<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">Starts Here</span>
            </h2>
            <p className="text-sm text-slate-400 max-w-lg">
              Join over 1 million wallets already audited. No sign-up. No gas required to start.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={onLaunchDashboard}
                className="flex items-center gap-2.5 rounded-xl bg-brand-cyan hover:bg-cyan-400 px-8 py-4 text-sm font-extrabold text-dark-900 transition-all shadow-glow-cyan/30 hover:shadow-glow-cyan/50 hover:-translate-y-0.5">
                <Wallet className="w-4 h-4" />
                <span>Launch Dashboard Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a href="https://github.com/GIDDYBOBO/shadowscore" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5">
                <GitHubIcon />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="border-t border-white/8 bg-[#030509]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center">
                  <span className="font-extrabold text-dark-900 text-sm">S</span>
                </div>
                <span className="text-lg font-black text-white font-mono">Shadow<span className="text-brand-cyan">Score</span></span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[220px]">
                AI-Powered Web3 Reputation & Multichain Telemetry Platform.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <a href="https://github.com/GIDDYBOBO/" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] transition-all" title="GitHub">
                  <GitHubIcon />
                </a>
                <a href="https://x.com/bade_bunmi" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] transition-all" title="X / Twitter">
                  <XIcon />
                </a>
                <a href="https://www.linkedin.com/in/gideon-oluwatomilola-585b92384/" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-500 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all" title="LinkedIn">
                  <LinkedInIcon />
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Platform</h4>
              <div className="space-y-2">
                {['Features', 'How It Works', 'Security', 'FAQ'].map(l => (
                  <a key={l} href={`#${l.toLowerCase().replace(' ', '')}`}
                    className="block text-xs text-slate-500 hover:text-brand-cyan transition-colors">{l}</a>
                ))}
              </div>
            </div>

            {/* Builder info */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Built By</h4>
              <div className="space-y-2 text-xs text-slate-500">
                <p>Gideon Oluwatomilola</p>
                <a href="https://github.com/GIDDYBOBO/shadowscore" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-brand-cyan hover:text-cyan-300 transition-colors font-mono">
                  <GitHubIcon />
                  <span>GIDDYBOBO/shadowscore</span>
                </a>
                <a href="https://x.com/bade_bunmi" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <XIcon />
                  <span>@bade_bunmi</span>
                </a>
                <a href="https://www.linkedin.com/in/gideon-oluwatomilola-585b92384/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#0A66C2] transition-colors">
                  <LinkedInIcon />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-slate-600">© 2026 ShadowScore AI. Built for the Agentic AI believers.</p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};
