import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Area, AreaChart } from 'recharts';
import type { HistoryPoint } from '../types/reputation';
import { ChevronDown } from 'lucide-react';

interface ReputationChartProps {
  data: HistoryPoint[];
}

export const ReputationChart: React.FC<ReputationChartProps> = ({ data }) => {
  const [range, setRange] = useState('6 Months');

  return (
    <div className="glass-card rounded-3xl p-6 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white text-base">Reputation Over Time</h3>
        <div className="relative">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="appearance-none bg-dark-800 border border-dark-border rounded-xl px-3 py-1.5 pr-8 text-xs font-semibold text-slate-300 focus:outline-none focus:border-brand-cyan/50 cursor-pointer"
          >
            <option value="6 Months">6 Months</option>
            <option value="3 Months">3 Months</option>
            <option value="1 Year">1 Year</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Chart Area */}
      <div className="w-full h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="reputationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              domain={[40, 100]}
              ticks={[50, 75, 100]}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-dark-800 border border-dark-border p-2.5 rounded-xl shadow-xl text-xs">
                      <p className="text-slate-400 font-medium">{payload[0].payload.date}</p>
                      <p className="text-brand-cyan font-bold text-sm">
                        Score: {payload[0].value} / 100
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#00F0FF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#reputationGradient)"
              dot={{ r: 4, fill: '#00F0FF', stroke: '#0B0E14', strokeWidth: 2 }}
              activeDot={{ r: 7, fill: '#00F0FF', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
