import React, { useState, useEffect } from 'react';
import { 
  ArrowLeftRight, 
  Layers, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Filter, 
  Zap, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react';
import { 
  liveTransactionStreamService, 
  type LiveStreamTxItem 
} from '../../../backend/src/services/LiveTransactionStreamService';

export const DexScreenerTxFeed: React.FC = () => {
  const [transactions, setTransactions] = useState<LiveStreamTxItem[]>([]);
  const [selectedChain, setSelectedChain] = useState<string>('All');
  const [newestId, setNewestId] = useState<string | null>(null);

  useEffect(() => {
    setTransactions(liveTransactionStreamService.getRecentTransactions(25));

    const unsubscribe = liveTransactionStreamService.subscribe((newTx) => {
      setNewestId(newTx.id);
      setTransactions((prev) => [newTx, ...prev.slice(0, 35)]);

      // Clear flash animation after 1.2s
      setTimeout(() => {
        setNewestId(null);
      }, 1200);
    });

    return () => unsubscribe();
  }, []);

  const chains = ['All', 'Ethereum', 'Base', 'Solana', 'Arbitrum', 'Polygon', 'BNB Chain'];

  const filteredTxs = selectedChain === 'All'
    ? transactions
    : transactions.filter((t) => t.chainName === selectedChain);

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center">
              <ArrowLeftRight className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white tracking-tight">DexScreener Live Transaction Stream</h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                  WebSocket Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                Real-time multi-chain swap routes, gas telemetry, protocols, and settlement statuses without page reloads.
              </p>
            </div>
          </div>

          {/* Chain Filters */}
          <div className="flex flex-wrap gap-1.5 bg-dark-900 p-1.5 rounded-2xl border border-dark-border">
            {chains.map((chain) => (
              <button
                key={chain}
                onClick={() => setSelectedChain(chain)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedChain === chain
                    ? 'bg-brand-cyan text-dark-900 font-bold shadow-glow-cyan/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {chain}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DexScreener Live Stream Table */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border font-mono text-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark-border text-slate-400 text-[11px]">
                <th className="pb-3">Chain</th>
                <th className="pb-3">Protocol</th>
                <th className="pb-3">Token Pair</th>
                <th className="pb-3">Swap Route</th>
                <th className="pb-3">Wallet</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Value ($ USD)</th>
                <th className="pb-3">Gas (Gwei)</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 text-right">Tx Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/60">
              {filteredTxs.map((tx) => {
                const isNew = tx.id === newestId;
                const isSuccess = tx.status === 'SUCCESS';

                return (
                  <tr
                    key={tx.id}
                    className={`transition-all duration-300 ${
                      isNew 
                        ? 'bg-brand-cyan/25 text-white scale-[1.002]' 
                        : 'hover:bg-dark-800/50'
                    }`}
                  >
                    <td className="py-3.5">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                        {tx.chainName}
                      </span>
                    </td>

                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded bg-dark-700 text-brand-purple font-bold text-[11px]">
                        {tx.protocol}
                      </span>
                    </td>

                    <td className="py-3.5 font-bold text-white">
                      {tx.tokenSymbol}
                    </td>

                    <td className="py-3.5 text-brand-cyan font-semibold">
                      {tx.swapRoute}
                    </td>

                    <td className="py-3.5 text-slate-300">
                      {tx.walletAddress}
                    </td>

                    <td className="py-3.5 text-white font-semibold">
                      {tx.amount}
                    </td>

                    <td className="py-3.5 font-bold text-brand-green">
                      ${tx.usdValue.toLocaleString()}
                    </td>

                    <td className="py-3.5 text-slate-400">
                      {tx.gasGwei} Gwei
                    </td>

                    <td className="py-3.5 text-center">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1 ${
                        isSuccess 
                          ? 'bg-brand-green/20 text-brand-green border border-brand-green/30' 
                          : 'bg-brand-danger/20 text-brand-danger border border-brand-danger/30'
                      }`}>
                        {isSuccess ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {tx.status}
                      </span>
                    </td>

                    <td className="py-3.5 text-right">
                      <span className="text-brand-cyan font-bold hover:underline cursor-pointer inline-flex items-center gap-1">
                        {tx.txHash}
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
