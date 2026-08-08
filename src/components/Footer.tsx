import React from 'react';
import { Globe, MessageSquare, ExternalLink, ShieldCheck, Share2, Heart, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 pt-8 pb-6 border-t border-dark-border/80 bg-[#0B0E14] text-xs font-sans">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        {/* Left Side: Brand & Security Disclosures */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 font-mono text-sm font-bold text-white">
            <span className="text-brand-cyan">ShadowScore</span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400 font-normal">Autonomous Web3 Reputation Engine</span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            Optimized for Cloudflare Edge Infrastructure • MiCA Non-Custodial Compliant Software
          </p>
        </div>

        {/* Right Side: Real User Social Accounts Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400 font-mono">
          <a
            href="https://github.com/GIDDYBOBO/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 hover:text-white border border-dark-border transition-all"
          >
            <Code className="w-3.5 h-3.5 text-brand-cyan" />
            <span>GitHub (GIDDYBOBO)</span>
          </a>

          <a
            href="https://x.com/bade_bunmi"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 hover:text-white border border-dark-border transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-brand-sky" />
            <span>X (@bade_bunmi)</span>
          </a>

          <a
            href="https://www.linkedin.com/in/gideon-oluwatomilola-585b92384/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 hover:text-white border border-dark-border transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-blue-500" />
            <span>LinkedIn (Gideon Oluwatomilola)</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
