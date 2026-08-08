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
    <div className="glass-card glass-card-hover rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-400">{title}</span>
        <div className={`w-8 h-8 rounded-xl ${iconBgColor} flex items-center justify-center ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-end justify-between mt-1">
        <div>
          <div className="text-2xl font-extrabold text-white tracking-tight">
            {value}
          </div>
          {subtitle && (
            <span className="text-[11px] text-slate-400 font-medium">{subtitle}</span>
          )}
        </div>

        {/* Inline SVG Sparkline */}
        <svg className="w-16 h-8 text-current shrink-0" viewBox="0 0 60 25" fill="none">
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
