import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Activity, 
  Layers, 
  ArrowLeftRight, 
  ShieldAlert, 
  CheckCircle2, 
  RefreshCw, 
  Zap, 
  Database, 
  Globe, 
  Lock, 
  ExternalLink 
} from 'lucide-react';
import { 
  indexerService, 
  SUPPORTED_INDEXER_CHAINS 
} from '../services/indexerService';
import { 
  pgDatabase, 
  type IndexedBlockRecord, 
  type DecodedTxRecord, 
  type DexSwapRecord, 
  type ApprovalEventRecord 
} from '../services/pgDatabaseService';

export const BlockchainIndexerConsole: React.FC = () => {
  const [blocks, setBlocks] = useState<IndexedBlockRecord[]>([]);
  const [transactions, setTransactions] = useState<DecodedTxRecord[]>([]);
  const [swaps, setSwaps] = useState<DexSwapRecord[]>([]);
  const [approvals, setApprovals] = useState<ApprovalEventRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'blocks' | 'txs' | 'swaps' | 'approvals'>('blocks');

  // Load initial database records & subscribe to live WebSocket block stream
  useEffect(() => {
    setBlocks(pgDatabase.getLatestBlocks(15));
    setTransactions(pgDatabase.getLatestDecodedTxs(15));
    setSwaps(pgDatabase.getLatestSwaps(15));
    setApprovals(pgDatabase.getLatestApprovals(15));

    // Live subscription callbacks
    const unsubBlock = indexerService.subscribeToBlockFeed((newBlock) => {
      setBlocks((prev) => [newBlock, ...prev.slice(0, 25)]);
    });

    const unsubTx = indexerService.subscribeToTxFeed((newTx) => {
      setTransactions((prev) => [newTx, ...prev.slice(0, 25)]);
    });

    const unsubSwap = indexerService.subscribeToSwapFeed((newSwap) => {
      setSwaps((prev) => [newSwap, ...prev.slice(0, 25)]);
    });

    const unsubAppr = indexerService.subscribeToApprovalFeed((newAppr) => {
      setApprovals((prev) => [newAppr, ...prev.slice(0, 25)]);
    });

    return () => {
      unsubBlock();
      unsubTx();
      unsubSwap();
      unsubAppr();
    };
  }, []);

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white tracking-tight">Real-Time Blockchain Indexing Engine</h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                  Live WebSocket Stream
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                Decodes block transactions, ERC-20/NFT transfers, DEX swaps, and unverified contract approvals into PostgreSQL in real time.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 font-mono">
            <span className="text-xs text-slate-400">PostgreSQL Schema Status:</span>
            <span className="text-xs font-bold text-brand-cyan px-3 py-1 bg-dark-900 border border-dark-border rounded-xl flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-brand-cyan" />
              Connected (7 Chains)
            </span>
          </div>
        </div>

        {/* 7 Supported Chain Status Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mt-4 pt-4 border-t border-dark-border/60 font-mono text-[11px]">
          {SUPPORTED_INDEXER_CHAINS.map((chain) => (
            <div key={chain.name} className="p-2.5 rounded-xl bg-dark-900/90 border border-dark-border space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{chain.name}</span>
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Block Time:</span>
                <span className="text-brand-cyan font-bold">{(chain.blockTimeMs / 1000).toFixed(1)}s</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indexer Stream Controls & Category Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-dark-900 p-2 rounded-2xl border border-dark-border">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'blocks', label: 'Indexed Blocks', count: blocks.length },
            { id: 'txs', label: 'Decoded Transactions', count: transactions.length },
            { id: 'swaps', label: 'DEX Swaps', count: swaps.length },
            { id: 'approvals', label: 'Approval Events', count: approvals.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-brand-cyan text-dark-900 font-bold shadow-glow-cyan/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-dark-800 font-mono">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <span className="text-[11px] text-slate-400 font-mono pr-2">
          ⚡ Auto-Indexing • 0 Page Refreshes Required
        </span>
      </div>

      {/* 1. Indexed Blocks Table */}
      {activeTab === 'blocks' && (
        <div className="glass-card rounded-3xl p-6 border border-dark-border font-mono text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-dark-border text-slate-400 text-[11px]">
                  <th className="pb-3">Block #</th>
                  <th className="pb-3">Chain</th>
                  <th className="pb-3">Block Hash</th>
                  <th className="pb-3">Transactions</th>
                  <th className="pb-3">Gas (Gwei)</th>
                  <th className="pb-3 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/60">
                {blocks.map((blk) => (
                  <tr key={blk.id} className="hover:bg-dark-800/50 transition-colors">
                    <td className="py-3 font-bold text-brand-cyan">#{blk.blockNumber}</td>
                    <td className="py-3 text-white font-bold">{blk.chainName}</td>
                    <td className="py-3 text-slate-400">{blk.blockHash}</td>
                    <td className="py-3 text-white">{blk.txCount} txs</td>
                    <td className="py-3 text-slate-300">{blk.gasUsedGwei} Gwei</td>
                    <td className="py-3 text-right text-slate-400">{blk.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Decoded Transactions Table */}
      {activeTab === 'txs' && (
        <div className="glass-card rounded-3xl p-6 border border-dark-border font-mono text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-dark-border text-slate-400 text-[11px]">
                  <th className="pb-3">Tx Hash</th>
                  <th className="pb-3">Chain</th>
                  <th className="pb-3">From ➔ To</th>
                  <th className="pb-3">Tx Type</th>
                  <th className="pb-3">Value ($ USD)</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/60">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-dark-800/50 transition-colors">
                    <td className="py-3 font-bold text-brand-cyan">{tx.txHash}</td>
                    <td className="py-3 text-white font-bold">{tx.chainName}</td>
                    <td className="py-3 text-slate-300">{tx.fromAddress} ➔ {tx.toAddress}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded bg-dark-700 text-slate-200 font-bold">
                        {tx.txType}
                      </span>
                    </td>
                    <td className="py-3 text-brand-green font-bold">${tx.valueUsd.toFixed(2)}</td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 rounded bg-brand-green/20 text-brand-green font-bold">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. DEX Swaps Table */}
      {activeTab === 'swaps' && (
        <div className="glass-card rounded-3xl p-6 border border-dark-border font-mono text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-dark-border text-slate-400 text-[11px]">
                  <th className="pb-3">DEX Router</th>
                  <th className="pb-3">Chain</th>
                  <th className="pb-3">Token Swap Pair</th>
                  <th className="pb-3">Trader Address</th>
                  <th className="pb-3 text-right">Swap Volume ($ USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/60">
                {swaps.map((s) => (
                  <tr key={s.id} className="hover:bg-dark-800/50 transition-colors">
                    <td className="py-3 font-bold text-brand-purple">{s.dexName}</td>
                    <td className="py-3 text-white font-bold">{s.chainName}</td>
                    <td className="py-3 text-brand-cyan font-bold">
                      {s.amountIn} {s.tokenInSymbol} ➔ {s.amountOut} {s.tokenOutSymbol}
                    </td>
                    <td className="py-3 text-slate-400">{s.traderAddress}</td>
                    <td className="py-3 text-right text-brand-green font-bold">${s.amountUsd.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Approval Events Table */}
      {activeTab === 'approvals' && (
        <div className="glass-card rounded-3xl p-6 border border-dark-border font-mono text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-dark-border text-slate-400 text-[11px]">
                  <th className="pb-3">Spender Contract</th>
                  <th className="pb-3">Chain</th>
                  <th className="pb-3">Token Approved</th>
                  <th className="pb-3">Allowance Amount</th>
                  <th className="pb-3 text-right">Risk Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/60">
                {approvals.map((appr) => (
                  <tr key={appr.id} className="hover:bg-dark-800/50 transition-colors">
                    <td className="py-3 font-bold text-amber-400">{appr.spenderName} ({appr.spenderAddress})</td>
                    <td className="py-3 text-white font-bold">{appr.chainName}</td>
                    <td className="py-3 text-brand-cyan font-bold">{appr.tokenSymbol}</td>
                    <td className="py-3 text-slate-300">
                      {appr.isUnlimited ? (
                        <span className="text-brand-danger font-bold">Unlimited (2^256-1)</span>
                      ) : (
                        appr.allowanceAmount
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <span className={`px-2.5 py-0.5 rounded font-bold ${
                        appr.riskScore >= 70
                          ? 'bg-brand-danger/20 text-brand-danger border border-brand-danger/30'
                          : 'bg-brand-green/20 text-brand-green border border-brand-green/30'
                      }`}>
                        Risk {appr.riskScore}/100
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
