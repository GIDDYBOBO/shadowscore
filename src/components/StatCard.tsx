import React from 'react';
import { ArrowLeftRight, Coins, Image, DollarSign } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBgColor: string;
  iconColor: string;
  sparklineColor: string;
  sparklinePath: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBgColor,
  iconColor,
  sparklineColor,
  sparklinePath,
}) => {
  return (
    <div className="glass-card glass-card-hover rounded-xl p-3 sm:p-3.5 flex flex-col justify-between relative overflow-hidden border border-dark-border shadow-card">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-semibold text-slate-400">{title}</span>
        <div className={`w-6 h-6 rounded-md ${iconBgColor} flex items-center justify-center ${iconColor}`}>
          <Icon className="w-3 h-3" />
        </div>
      </div>

      <div className="flex items-end justify-between mt-0.5">
        <div>
          <div className="text-base sm:text-lg font-black text-white tracking-tight font-mono">
            {value}
          </div>
          {subtitle && (
            <span className="text-[9px] text-slate-400 font-medium block">{subtitle}</span>
          )}
        </div>

        {/* Inline SVG Sparkline */}
        <svg className="w-12 h-6 text-current shrink-0" viewBox="0 0 60 25" fill="none">
          <path
            d={sparklinePath}
            stroke={sparklineColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};
