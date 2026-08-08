import React from 'react';
import type { ReputationBreakdownItem } from '../types/reputation';

interface ReputationBreakdownProps {
  breakdown?: ReputationBreakdownItem[];
}

export const ReputationBreakdown: React.FC<ReputationBreakdownProps> = ({ breakdown = [] }) => {
  const safeBreakdown = breakdown && breakdown.length > 0 ? breakdown : [
    { category: 'Security & Approvals', score: 92, maxScore: 100, color: '#00F0FF' },
    { category: 'DeFi Activity', score: 84, maxScore: 100, color: '#00FF66' },
    { category: 'NFT & Digital Assets', score: 78, maxScore: 100, color: '#8B5CF6' },
    { category: 'Governance & DAO', score: 75, maxScore: 100, color: '#F59E0B' },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl border border-dark-border">
      <h3 className="font-bold text-white text-base mb-4 font-mono">Reputation Breakdown</h3>

      <div className="space-y-4 my-auto">
        {safeBreakdown.map((item, idx) => {
          const color = item.color || (idx === 0 ? '#00F0FF' : idx === 1 ? '#00FF66' : idx === 2 ? '#8B5CF6' : '#F59E0B');
          return (
            <div key={item.category || idx} className="space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-300">{item.category}</span>
                <span className="text-white font-extrabold">{item.score} / {item.maxScore || 100}</span>
              </div>
              <div className="h-2.5 w-full bg-dark-900 rounded-full overflow-hidden p-0.5 border border-dark-border/60">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${Math.min(100, Math.max(5, item.score))}%`,
                    backgroundColor: color,
                    boxShadow: `0 0 12px ${color}80`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
