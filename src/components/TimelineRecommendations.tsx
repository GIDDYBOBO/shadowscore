import React from 'react';
import { PlusCircle, MinusCircle, CheckCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import type { WalletProfile } from '../types/reputation';

interface TimelineRecommendationsProps {
  wallet: WalletProfile;
  onCompleteTask: (taskId: string) => void;
}

export const TimelineRecommendations: React.FC<TimelineRecommendationsProps> = ({ wallet, onCompleteTask }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 mb-4 font-sans">
      {/* Reputation Timeline */}
      <div className="glass-card rounded-xl p-3.5 sm:p-4 border border-dark-border shadow-card">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-bold text-white text-xs sm:text-sm">Reputation Timeline</h3>
          <span className="text-[10px] text-slate-400">On-Chain Event Log</span>
        </div>

        <div className="space-y-2">
          {(wallet.timeline || []).map((event) => (
            <div key={event.id} className="flex items-start space-x-2.5 p-2.5 rounded-lg bg-dark-800/50 border border-dark-border/60">
              <div className={`p-1.5 rounded-md text-[10px] font-bold shrink-0 font-mono ${
                event.change > 0
                  ? 'bg-brand-green/15 text-brand-green border border-brand-green/30'
                  : 'bg-brand-danger/15 text-brand-danger border border-brand-danger/30'
              }`}>
                {event.change > 0 ? `+${event.change}` : event.change}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-white truncate">{event.title}</span>
                  <span className="text-[9px] text-slate-500 font-mono">{event.date}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations Checklist */}
      <div className="glass-card rounded-xl p-3.5 sm:p-4 border border-dark-border shadow-card flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
              AI Recommendations
            </h3>
            <span className="text-[10px] text-brand-cyan font-medium">To Improve Score</span>
          </div>

          <div className="space-y-2">
            {(wallet.recommendations || []).map((rec) => (
              <div
                key={rec.id}
                className={`p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                  rec.completed
                    ? 'bg-dark-900/40 border-dark-border/40 opacity-60'
                    : 'bg-dark-800/60 border-dark-border hover:border-brand-cyan/40'
                }`}
              >
                <div className="space-y-0.5 max-w-[70%]">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-bold text-brand-green font-mono">+{rec.impactPoints} pts</span>
                    <span className="text-[11px] font-semibold text-white truncate">{rec.title}</span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-medium block">Category: {rec.category}</span>
                </div>

                <button
                  disabled={rec.completed}
                  onClick={() => onCompleteTask(rec.id)}
                  className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center space-x-1 transition-all ${
                    rec.completed
                      ? 'bg-brand-green/20 text-brand-green border border-brand-green/30 cursor-default'
                      : 'bg-brand-blue hover:bg-blue-600 text-white shadow-glow-blue/20'
                  }`}
                >
                  {rec.completed ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      <span>Done</span>
                    </>
                  ) : (
                    <>
                      <span>{rec.actionLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-dark-border/60 flex items-center justify-between text-[10px] text-slate-400">
          <div className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Autonomous Risk Engine Active</span>
          </div>
          <span className="font-mono text-brand-cyan">100% On-Chain</span>
        </div>
      </div>
    </div>
  );
};
