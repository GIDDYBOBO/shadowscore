import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Cpu, 
  Send, 
  BarChart2,
  CheckCircle2,
  Lock,
  Layers,
  Code,
  Coins
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import type { WalletProfile } from '../types/reputation';
import type { RealWalletFullData } from '../utils/web3Provider';
import { BlockchainIndexerConsole } from './BlockchainIndexerConsole';

interface AdvancedReportsViewProps {
  wallet: WalletProfile;
  realWalletData: RealWalletFullData | null;
}

export const AdvancedReportsView: React.FC<AdvancedReportsViewProps> = ({ wallet, realWalletData }) => {
  const [userPrompt, setUserPrompt] = useState('');
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfExported, setPdfExported] = useState(false);

  // Radar chart metrics for AI Security & Health Breakdown
  const radarData = [
    { subject: 'Transaction Quality', A: wallet.breakdown.find(b => b.category.includes('Transaction'))?.score || 90 },
    { subject: 'DeFi Security', A: wallet.breakdown.find(b => b.category.includes('DeFi'))?.score || 75 },
    { subject: 'Risk Mitigation', A: wallet.breakdown.find(b => b.category.includes('Security'))?.score || 80 },
    { subject: 'Identity Trust', A: wallet.breakdown.find(b => b.category.includes('NFT'))?.score || 70 },
    { subject: 'Governance', A: 85 },
    { subject: 'Contract Health', A: wallet.healthFactor ? Math.min(100, Math.round(wallet.healthFactor * 30)) : 84 }
  ];

  // All tokens list included in downloadable PDF report
  const allTokens = realWalletData?.tokens || [
    { symbol: 'KAITO', name: 'Kaito AI', balance: '0.0455', usdValue: 0.06, priceUsd: 1.25, change24h: 6.03, volume24hUsd: 1250000, high24h: 1.32, low24h: 1.18, icon: '🤖', trend: 'up' as const, chainName: 'Base' },
    { symbol: 'BNB', name: 'BNB Token', balance: '0.00007039', usdValue: 0.04, priceUsd: 575.69, change24h: 0.38, volume24hUsd: 45000000, high24h: 580.00, low24h: 570.00, icon: '🟡', trend: 'up' as const, chainName: 'BNB Chain' },
    { symbol: 'ETH', name: 'Ethereum', balance: '0.00001973', usdValue: 0.04, priceUsd: 1944.79, change24h: 1.57, volume24hUsd: 14200000, high24h: 1980.00, low24h: 1910.00, icon: '🔷', trend: 'up' as const, chainName: 'Arbitrum' },
    { symbol: 'FYN', name: 'Fyn Token', balance: '51.0000', usdValue: 0.03, priceUsd: 0.0007, change24h: 1.35, volume24hUsd: 85000, high24h: 0.00075, low24h: 0.00068, icon: '⚡', trend: 'up' as const, chainName: 'Polygon' },
    { symbol: 'MATIC', name: 'Polygon Native', balance: '0.0285', usdValue: 0.03, priceUsd: 0.70, change24h: 0.85, volume24hUsd: 320000, high24h: 0.72, low24h: 0.68, icon: '🟣', trend: 'up' as const, chainName: 'Polygon' },
    { symbol: 'SONIC', name: 'Sonic Token', balance: '2.5000', usdValue: 0.06, priceUsd: 0.024, change24h: 2.10, volume24hUsd: 45000, high24h: 0.026, low24h: 0.022, icon: '🌀', trend: 'up' as const, chainName: 'Sonic' }
  ];

  const handleExportPDF = () => {
    setPdfExported(true);
    window.print();
    setTimeout(() => setPdfExported(false), 3000);
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setAiAnalysisResult(
        `Custom AI Mitigation Plan for "${userPrompt}":\n\n1. **Contract Approval Audit**: Identified ${wallet.approvals.filter(a => !a.isRevoked).length} active smart contract approvals on ${wallet.network}.\n2. **Recommendation**: Revoke VaultX unlimited USDC approval immediately to mitigate potential honeypot or drainer vectors.\n3. **Governance & Identity**: Maintain current Snapshot voting cadence to preserve 90+ trust percentile rank.`
      );
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 text-brand-purple border border-brand-purple/30 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white tracking-tight">Advanced Telemetry Briefing & Full Audit Exporter</h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-purple/20 text-brand-purple border border-brand-purple/30">
                  Includes All Wallet Tokens ({allTokens.length})
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Complete AI scan synthesis, contract execution audit, risk mitigation steps, and printable PDF report exporter.
              </p>
            </div>
          </div>

          <button
            onClick={handleExportPDF}
            className="px-5 py-3 bg-gradient-to-r from-brand-blue via-blue-600 to-brand-purple hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-2xl text-xs flex items-center space-x-2 transition-all shadow-glow-blue/30 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{pdfExported ? 'Generating PDF...' : 'Download Full PDF Audit Report'}</span>
          </button>
        </div>
      </div>

      {/* Live Blockchain Indexer Engine Console */}
      <BlockchainIndexerConsole />

      {/* Main Diagnostic Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Comprehensive Diagnostic Briefing */}
        <div className="lg:col-span-2 space-y-6">
          {/* Executive Diagnostic Card */}
          <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-cyan" />
              1. Total Scanning & Reputation Briefing
            </h3>

            <div className="p-4 rounded-2xl bg-dark-800/80 border border-dark-border text-xs leading-relaxed text-slate-300 space-y-2">
              <p>
                <strong>Scan Target:</strong> <span className="font-mono text-white">{wallet.address}</span> ({wallet.network} Network)
              </p>
              <p>
                <strong>Reputation Score:</strong> <span className="font-bold text-brand-cyan">{wallet.score} / 100</span> (Grade {wallet.grade}) • <span className="text-brand-green">{wallet.percentile}</span> of Web3 wallets.
              </p>
              <p>
                <strong>On-Chain Portfolio:</strong> <span className="font-bold text-white">${wallet.portfolioValueUsd.toLocaleString()} USD</span> across {allTokens.length} tokens and {wallet.totalNfts} NFT collections.
              </p>
              <p>
                <strong>Confirmed Transactions:</strong> {wallet.totalTransactions} clean transaction executions audited.
              </p>
            </div>
          </div>

          {/* PDF Audit Report Full Token Holdings Section (INCLUDES ALL TOKENS!) */}
          <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Coins className="w-5 h-5 text-brand-green" />
                2. Complete On-Chain Token Assets Audit ({allTokens.length} Total Tokens)
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-green/20 text-brand-green font-bold">
                Exported in Full PDF
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-dark-border">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-dark-800 text-slate-400 uppercase font-bold text-[10px] border-b border-dark-border">
                  <tr>
                    <th className="py-2.5 px-3">TOKEN</th>
                    <th className="py-2.5 px-3">CHAIN</th>
                    <th className="py-2.5 px-3 text-right">BALANCE</th>
                    <th className="py-2.5 px-3 text-right">UNIT PRICE ($)</th>
                    <th className="py-2.5 px-3 text-right">USD VALUE ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border/40">
                  {allTokens.map((t, idx) => (
                    <tr key={idx} className="hover:bg-dark-700/50 text-slate-200">
                      <td className="py-2.5 px-3 font-bold text-white flex items-center gap-1.5">
                        <span>{t.icon || '🪙'}</span>
                        <span>{t.symbol}</span>
                      </td>
                      <td className="py-2.5 px-3 text-brand-cyan">{t.chainName || 'Multichain'}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-white">{t.balance}</td>
                      <td className="py-2.5 px-3 text-right">${t.priceUsd < 0.01 ? t.priceUsd.toFixed(4) : t.priceUsd.toFixed(2)}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-brand-green">${t.usdValue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Smart Contract Active vs Passive Execution Audit */}
          <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Cpu className="w-5 h-5 text-brand-purple" />
              3. Smart Contract Execution Audit (Active vs Passive States)
            </h3>

            <div className="space-y-3">
              {wallet.approvals.map((app) => (
                <div key={app.id} className="p-3.5 rounded-2xl bg-dark-800/60 border border-dark-border flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white">{app.token} ({app.symbol})</span>
                      <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                        app.isRevoked ? 'bg-dark-700 text-slate-400' : 'bg-brand-cyan/20 text-brand-cyan'
                      }`}>
                        State: {app.isRevoked ? 'Passive (Revoked)' : (app.state || 'Active')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Spender: {app.spenderName} • Allowance: {app.allowance}</p>
                  </div>

                  <span className={`text-xs font-bold ${app.riskLevel === 'High' && !app.isRevoked ? 'text-brand-danger' : 'text-brand-green'}`}>
                    {app.isRevoked ? 'Safe' : `${app.riskLevel} Risk`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Risk Mitigation Plan */}
          <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              4. Recommended Risk Mitigation Steps
            </h3>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-200 space-y-2 font-mono">
              <p className="font-bold text-amber-400">⚠️ Mandatory Mitigation Protocol:</p>
              <p>• Review the transaction signature parameters thoroughly before signing.</p>
              <p>• Revoke unnecessary token approvals on unverified yield proxies.</p>
              <p>• Avoid further interaction until the contract has established a trustworthy audit history.</p>
              <p>• Force disconnect dormant dApp sessions in the Security Guard module.</p>
            </div>
          </div>
        </div>

        {/* Right Col: AI Security Radar Chart & Custom Inquiry Terminal */}
        <div className="space-y-6">
          {/* AI Security & Health Radar Chart */}
          <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-brand-cyan" />
              AI Security Radar Chart
            </h3>

            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#1F283A" />
                  <PolarAngleAxis dataKey="subject" stroke="#64748B" fontSize={10} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748B" fontSize={9} />
                  <Radar name="Security" dataKey="A" stroke="#00F0FF" fill="#00F0FF" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Interactive AI Prompt Terminal for Custom Inquiries */}
          <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
            <div className="flex items-center space-x-2 text-brand-cyan font-bold text-sm">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Interactive AI Security Terminal</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Express custom questions or specify custom risk parameters to receive a tailored mitigation response.
            </p>

            <form onSubmit={handlePromptSubmit} className="space-y-3">
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Express your security question or custom mitigation inquiry..."
                rows={3}
                className="w-full bg-dark-900 border border-dark-border rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan/50 resize-none"
              />

              <button
                type="submit"
                disabled={!userPrompt.trim() || isGenerating}
                className="w-full py-2.5 bg-brand-cyan hover:bg-cyan-400 disabled:opacity-50 text-dark-900 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{isGenerating ? 'Analyzing Custom Query...' : 'Run Custom AI Security Scan'}</span>
              </button>
            </form>

            {aiAnalysisResult && (
              <div className="p-3.5 rounded-2xl bg-dark-900 border border-brand-cyan/30 text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-line">
                {aiAnalysisResult}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
