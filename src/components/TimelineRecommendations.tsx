import React from 'react';
import { PlusCircle, MinusCircle, CheckCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import type { WalletProfile } from '../types/reputation';

interface TimelineRecommendationsProps {
  wallet: WalletProfile;
  onCompleteTask: (taskId: string) => void;
}

export const TimelineRecommendations: React.FC<TimelineRecommendationsProps> = ({ wallet, onCompleteTask }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Reputation Timeline */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white text-base">Reputation Timeline</h3>
          <span className="text-xs text-slate-400">On-Chain Event Log</span>
        </div>

        <div className="space-y-4">
          {wallet.timeline.map((event) => (
            <div key={event.id} className="flex items-start space-x-3.5 p-3 rounded-2xl bg-dark-800/50 border border-dark-border/60">
              <div className={`p-2 rounded-xl text-xs font-bold shrink-0 ${
                event.change > 0
                  ? 'bg-brand-green/15 text-brand-green border border-brand-green/30'
                  : 'bg-brand-danger/15 text-brand-danger border border-brand-danger/30'
              }`}>
                {event.change > 0 ? `+${event.change}` : event.change}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white truncate">{event.title}</span>
                  <span className="text-[10px] text-slate-500">{event.date}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations Checklist */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              AI Recommendations
            </h3>
            <span className="text-xs text-brand-cyan font-medium">To Improve Score</span>
          </div>

          <div className="space-y-3">
            {wallet.recommendations.map((rec) => (
              <div
                key={rec.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  rec.completed
                    ? 'bg-dark-900/40 border-dark-border/40 opacity-60'
                    : 'bg-dark-800/80 border-dark-border hover:border-brand-cyan/40'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-semibold ${rec.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                      {rec.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-brand-cyan/15 text-brand-cyan font-bold">
                      +{rec.impactPoints} pts
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">{rec.category} Optimization</span>
                </div>

                {rec.completed ? (
                  <span className="text-xs text-brand-green font-semibold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Completed
                  </span>
                ) : (
                  <button
                    onClick={() => onCompleteTask(rec.id)}
                    className="px-3 py-1.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white text-xs font-semibold transition-all shadow-glow-blue/20"
                  >
                    {rec.actionLabel}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
