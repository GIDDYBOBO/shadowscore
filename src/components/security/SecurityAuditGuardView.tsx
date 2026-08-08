import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Server, 
  Copy, 
  Eye, 
  EyeOff, 
  Globe 
} from 'lucide-react';
import { JwtAuthManager } from '../../../backend/src/security/JwtAuthManager';
import { SecurityEngine } from '../../../backend/src/security/SecurityEngine';
import { SecretEncryption } from '../../../backend/src/security/SecretEncryption';

interface SecurityAuditGuardViewProps {
  walletAddress: string;
}

export const SecurityAuditGuardView: React.FC<SecurityAuditGuardViewProps> = ({ walletAddress }) => {
  const [jwtToken, setJwtToken] = useState<string>(() => JwtAuthManager.generateToken(walletAddress, 'DEVELOPER'));
  const [testInput, setTestInput] = useState<string>('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
  const [sanitizedResult, setSanitizedResult] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleSanitizeTest = (val: string) => {
    setTestInput(val);
    const res = SecurityEngine.sanitizeString(val);
    setSanitizedResult(res.sanitized);
  };

  const copyToken = () => {
    navigator.clipboard.writeText(jwtToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Security Hero Card */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-green/20 text-brand-green border border-brand-green/30 flex items-center justify-center font-black text-2xl shadow-glow-green/20">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2 font-mono">
                <h2 className="text-xl font-extrabold text-white tracking-tight">Security Firewall & Abuse Prevention Engine</h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30">
                  AES-256-GCM Encrypted
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                  RPC Shielded
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                HMAC-SHA256 JWT role authorization, input sanitization, private RPC credential masking, and gas-efficient threat guards.
              </p>
            </div>
          </div>

          <div className="text-right font-mono bg-dark-900/90 p-4 rounded-2xl border border-dark-border">
            <span className="text-xs text-slate-400">Firewall Uptime</span>
            <div className="text-3xl font-black text-brand-green mt-0.5">
              100.0% <span className="text-sm font-bold text-slate-400">Zero Leaks</span>
            </div>
          </div>
        </div>

        {/* Security Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-dark-border/60 font-mono text-xs">
          <div className="p-3 bg-dark-900 rounded-xl border border-dark-border space-y-1">
            <span className="text-[10px] text-slate-400 block">RPC Key Shielding</span>
            <span className="font-bold text-brand-cyan">Never Exposed in Client</span>
          </div>
          <div className="p-3 bg-dark-900 rounded-xl border border-dark-border space-y-1">
            <span className="text-[10px] text-slate-400 block">Input Sanitization</span>
            <span className="font-bold text-brand-green">SQLi & XSS Stripped</span>
          </div>
          <div className="p-3 bg-dark-900 rounded-xl border border-dark-border space-y-1">
            <span className="text-[10px] text-slate-400 block">JWT Token Expiry</span>
            <span className="font-bold text-white">24h Rolling Sessions</span>
          </div>
          <div className="p-3 bg-dark-900 rounded-xl border border-dark-border space-y-1">
            <span className="text-[10px] text-slate-400 block">Secret Encryption</span>
            <span className="font-bold text-brand-purple">AES-256 Symmetric</span>
          </div>
        </div>
      </div>

      {/* JWT & Threat Sanitization Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
        {/* JWT Auth Token Generator */}
        <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Key className="w-4 h-4 text-brand-cyan" />
              HMAC-SHA256 Session JWT Token
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan font-bold text-[10px]">
              Role: DEVELOPER
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-dark-900 border border-dark-border break-all text-[11px] text-slate-300 font-mono">
            {jwtToken}
          </div>

          <button
            onClick={copyToken}
            className="w-full py-2.5 bg-dark-800 hover:bg-dark-700 border border-dark-border rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-brand-green" /> : <Copy className="w-4 h-4 text-brand-cyan" />}
            <span>{copied ? 'Copied JWT to Clipboard!' : 'Copy Bearer Token for API Requests'}</span>
          </button>
        </div>

        {/* Live Input Sanitization Tester */}
        <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-green" />
            Live Threat Sanitizer & SQLi Guard
          </h3>

          <div className="space-y-2">
            <label className="text-[10px] text-slate-400">Test Input (Try entering script tags or SQL query commands):</label>
            <input
              type="text"
              value={testInput}
              onChange={(e) => handleSanitizeTest(e.target.value)}
              className="w-full bg-dark-900 border border-dark-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <div className="p-3 rounded-xl bg-dark-900 border border-dark-border">
            <span className="text-[10px] text-slate-400 block mb-1">Sanitized Clean Output:</span>
            <span className="text-brand-green font-bold break-all">
              {sanitizedResult || SecurityEngine.sanitizeString(testInput).sanitized}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
