import React from 'react';
import type { ReputationBreakdownItem } from '../types/reputation';

interface ReputationBreakdownProps {
  breakdown: ReputationBreakdownItem[];
}

export const ReputationBreakdown: React.FC<ReputationBreakdownProps> = ({ breakdown }) => {
  return (
    <div className="glass-card rounded-3xl p-6 h-full flex flex-col justify-between">
      <h3 className="font-bold text-white text-base mb-4">Reputation Breakdown</h3>

      <div className="space-y-4 my-auto">
        {breakdown.map((item) => (
          <div key={item.category} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-300">{item.category}</span>
              <span className="text-white font-extrabold">{item.score}</span>
            </div>
            <div className="h-2.5 w-full bg-dark-800 rounded-full overflow-hidden p-0.5 border border-dark-border/40">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
                style={{
                  width: `${item.score}%`,
                  backgroundColor: item.color,
                  boxShadow: `0 0 10px ${item.color}80`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
