import React from 'react';
import { DashboardPreview } from './landing/DashboardPreview';
import { DemoBanner } from './landing/DemoBanner';
import { ShieldCheck, Cpu, ArrowRight, Zap, CheckCircle2, ChevronRight, Lock, Globe, FileText, ExternalLink } from 'lucide-react';

interface LandingPageProps {
  onLaunchDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchDashboard }) => {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#111827,#05070A_60%)] text-white font-sans selection:bg-brand-cyan selection:text-dark-900">
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#05070A]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">  
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onLaunchDashboard}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-purple p-[1.5px]">
              <div className="w-full h-full bg-[#05070A] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-sky text-xl">S</span>
              </div>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight font-mono">
              Shadow<span className="text-brand-cyan">Score</span>
            </h1>
          </div>

          <div className="hidden gap-8 text-xs font-semibold text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-brand-cyan">
              Features
            </a>
            <a href="#how" className="transition hover:text-brand-cyan">
              How It Works
            </a>
            <a href="#security" className="transition hover:text-brand-cyan">
              Security & Revoke
            </a>
            <a href="#faq" className="transition hover:text-brand-cyan">
              FAQ
            </a>
          </div>

          <button
            onClick={onLaunchDashboard}
            className="rounded-xl bg-brand-cyan hover:bg-cyan-400 px-6 py-2.5 text-xs font-extrabold text-dark-900 transition shadow-glow-cyan/20 flex items-center space-x-2"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-8 py-24 text-center">
        <span className="rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-2 text-xs font-mono font-bold text-brand-cyan shadow-glow-cyan/10">
          ✨ AI-Powered Web3 Reputation & Telemetry Platform
        </span>

        <h1 className="mt-8 max-w-5xl text-5xl md:text-6xl font-black leading-tight tracking-tight">
          Build Your
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-sky to-brand-purple">
            {" "}Blockchain Reputation{" "}
          </span>
          <br />
          With Artificial Intelligence
        </h1>

        <p className="mt-8 max-w-3xl text-base md:text-lg leading-relaxed text-slate-300">
          Analyze Ethereum, Solana, and EVM wallets using AI. Discover your trust score, security risk factors, wallet intelligence, and portfolio insights in seconds.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <button
            onClick={onLaunchDashboard}
            className="rounded-xl bg-brand-cyan hover:bg-cyan-400 px-8 py-4 text-sm font-extrabold text-dark-900 transition shadow-glow-cyan/30 flex items-center space-x-2"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href="#demo"
            className="rounded-xl border border-brand-cyan/40 bg-dark-800/60 px-8 py-4 text-sm font-extrabold text-brand-cyan transition hover:bg-brand-cyan/10"
          >
            View Live Terminal Demo
          </a>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="mx-auto grid max-w-7xl gap-6 px-8 md:grid-cols-2 lg:grid-cols-4 font-mono">
        {[
          ["1M+", "Wallets Audited"],
          ["99.9%", "AI Security Accuracy"],
          ["6+", "Supported Blockchains"],
          ["24/7", "Real-Time Telemetry"],
        ].map(([number, label]) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-[#11151D] p-8 text-center transition hover:-translate-y-1 hover:border-brand-cyan/40 shadow-xl"
          >
            <h2 className="text-4xl font-black text-brand-cyan">
              {number}
            </h2>
            <p className="mt-2 text-xs font-semibold text-slate-400">
              {label}
            </p>
          </div>
        ))}
      </section>

      {/* ================= DASHBOARD PREVIEW ================= */}
      <DashboardPreview onLaunchDashboard={onLaunchDashboard} />

      {/* ================= DEMO BANNER & SECURITY DISCLOSURE ================= */}
      <DemoBanner onLaunchDashboard={onLaunchDashboard} />

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="mx-auto mt-32 max-w-7xl px-8"
      >
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold font-mono text-brand-cyan uppercase tracking-wider bg-brand-cyan/15 px-3 py-1 rounded-full border border-brand-cyan/30">
            Core Protocol Features
          </span>
          <h2 className="text-4xl font-extrabold text-white">
            Powerful Web3 Intelligence
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "AI Reputation Engine", desc: "Computes trust scores based on wallet age, transaction quality, and contract interaction patterns." },
            { title: "Wallet Security Scanner", desc: "Audits unverified token approvals, honeypot contracts, and phishing Permit2 signatures in real time." },
            { title: "Solana & EVM Support", desc: "Native multi-chain telemetry tracking Ethereum, Base, Solana, Arbitrum, Polygon, and Sepolia testnets." },
            { title: "Risk Detection & Revoke", desc: "Highlights active vs passive contract permissions and guides step-by-step transaction revocations." },
            { title: "Portfolio Analytics", desc: "Real-time P&L valuation, token balances, and Etherscan/Solscan staked asset indexers." },
            { title: "Shadow AI Co-pilot", desc: "Dynamic floating AI assistant providing personalized security advice and on-chain intelligence." },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-[#11151D] p-6 transition hover:-translate-y-1 hover:border-brand-cyan/40 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {feature.title}
              </h3>
              <p className="text-xs leading-relaxed text-slate-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how"
        className="mx-auto mt-32 max-w-7xl px-8"
      >
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold font-mono text-brand-cyan uppercase tracking-wider bg-brand-cyan/15 px-3 py-1 rounded-full border border-brand-cyan/30">
            Step-by-Step Walkthrough
          </span>
          <h2 className="text-4xl font-extrabold text-white">
            How It Works
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 font-mono">
          {[
            { step: "Connect Wallet", desc: "Authorize Rabby, MetaMask, Coinbase, or Solana Phantom wallet in read-only mode." },
            { step: "AI Scans Wallet", desc: "ShadowGuard AI parses historical transactions, approvals, and portfolio telemetry." },
            { step: "Generate Badge", desc: "Claim your dynamic Soulbound Reputation NFT badge (A+ to F risk levels)." },
            { step: "Revoke & Protect", desc: "Disconnect session and revoke active contract allowances (ensuring ≥ $2 gas fee)." },
          ].map((item, index) => (
            <div
              key={item.step}
              className="rounded-2xl border border-white/10 bg-[#11151D] p-6 text-center transition hover:-translate-y-1 hover:border-brand-cyan/40 space-y-4"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-cyan text-dark-900 text-xl font-black shadow-glow-cyan/20">
                {index + 1}
              </div>
              <h3 className="text-sm font-bold text-white">
                {item.step}
              </h3>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section
        id="faq"
        className="mx-auto mt-32 max-w-4xl px-8 pb-24"
      >
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold font-mono text-brand-cyan uppercase tracking-wider bg-brand-cyan/15 px-3 py-1 rounded-full border border-brand-cyan/30">
            Got Questions?
          </span>
          <h2 className="text-4xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#11151D] p-6 space-y-2">
            <h3 className="font-bold text-white text-sm">
              Is my wallet safe when connecting to ShadowScore AI?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Yes. ShadowScore operates strictly on public read-only blockchain information. It never asks for approval to transfer funds or access private keys.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#11151D] p-6 space-y-2">
            <h3 className="font-bold text-white text-sm">
              Do I sign transactions?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Only when you explicitly initiate a contract revocation to remove an unverified approval on your wallet. For standard reputation auditing, zero transaction signatures are required.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#11151D] p-6 space-y-2">
            <h3 className="font-bold text-white text-sm">
              Why should I revoke permissions after getting my reputation badge?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Web3 security best practices dictate that users should regularly prune dormant contract approvals. Having a small gas balance (≥ $2 Base ETH or L1 ETH) ensures you can clear unverified spender allowances anytime.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#11151D] p-6 space-y-2">
            <h3 className="font-bold text-white text-sm">
              Which blockchains are supported?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Ethereum Mainnet, Solana Mainnet, Base, Arbitrum One, Polygon, and Sepolia Testnet.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-12 text-center text-slate-400 font-mono text-xs space-y-4 bg-[#05070A]">      
        <p className="text-xl font-black text-white font-mono">
          Shadow<span className="text-brand-cyan">Score</span> AI
        </p>

        <p className="text-slate-400">
          AI-Powered Web3 Reputation & Multichain Telemetry Platform
        </p>

        <div className="flex items-center justify-center space-x-6 pt-2">
          <a
            href="https://github.com/GIDDYBOBO/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-cyan hover:underline flex items-center gap-1"
          >
            <span>GitHub Profile</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-600">•</span>
          <a
            href="https://x.com/bade_bunmi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-cyan hover:underline flex items-center gap-1"
          >
            <span>X / Twitter</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-600">•</span>
          <a
            href="https://www.linkedin.com/in/gideon-oluwatomilola-585b92384/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-cyan hover:underline flex items-center gap-1"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <p className="pt-4 text-[11px] text-slate-500">
          © 2026 ShadowScore AI. Built for the Agentic AI believers.
        </p>
      </footer>
    </main>
  );
};
