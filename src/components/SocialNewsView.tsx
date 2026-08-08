import React, { useState, useEffect } from 'react';
import { Newspaper, Sparkles, TrendingUp, AlertTriangle, X, BookOpen, ExternalLink, Filter, BarChart2, Clock, RefreshCw, Eye, Radio } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import type { SocialNewsItem } from '../types/reputation';
import { fetchRealTimeLunarCrushArticles } from '../services/lunarCrushService';

export const SocialNewsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeStory, setActiveStory] = useState<SocialNewsItem | null>(null);
  const [hoveredStory, setHoveredStory] = useState<SocialNewsItem | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [stories, setStories] = useState<SocialNewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString());

  const loadNews = async (showSpinner: boolean = true) => {
    if (showSpinner) setLoading(true);
    try {
      const data = await fetchRealTimeLunarCrushArticles();
      setStories(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (e) {
    } finally {
      if (showSpinner) setLoading(false);
    }
  };

  // Auto-refresh news every 20 seconds continuously
  useEffect(() => {
    loadNews(true);

    const interval = setInterval(() => {
      loadNews(false);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const categories = ['All', 'Crypto', 'Stocks', 'Tech & Startups', 'Security Alerts'];

  const filteredStories = selectedCategory === 'All'
    ? stories
    : stories.filter(s => s.category === selectedCategory);

  const handleMouseMove = (e: React.MouseEvent, story: SocialNewsItem) => {
    setHoveredStory(story);
    setHoverPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredStory(null);
  };

  return (
    <div className="space-y-6 font-sans relative">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center font-bold">
              <Newspaper className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-extrabold text-white tracking-tight">ShadowScore Live Social & Breaking News</h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                  Live Stream (Updated {lastUpdated})
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Auto-updating market sentiment, breaking news (CoinDesk, Cointelegraph, Bloomberg), hover previews, and on-chain impact charts.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1 bg-dark-900 p-1.5 rounded-2xl border border-dark-border">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-brand-cyan text-dark-900 font-bold shadow-glow-cyan/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Manual Refresh Button */}
            <button
              onClick={() => loadNews(true)}
              className="p-2.5 bg-dark-900 hover:bg-dark-800 border border-dark-border rounded-xl text-brand-cyan hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono font-bold shrink-0"
              title="Refresh News Feed Now"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-green' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            onClick={() => setActiveStory(story)}
            onMouseMove={(e) => handleMouseMove(e, story)}
            onMouseLeave={handleMouseLeave}
            className="p-5 rounded-2xl bg-dark-900/90 border border-dark-border hover:border-brand-cyan/60 transition-all cursor-pointer space-y-3 group shadow-card hover:shadow-glow-cyan/10"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-lg bg-dark-800 text-[10px] font-bold text-brand-cyan border border-brand-cyan/20">
                {story.category}
              </span>
              <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono">
                <Clock className="w-3 h-3 text-slate-500" />
                <span className="text-brand-green font-semibold">{story.timestamp}</span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors leading-snug line-clamp-2">
              {story.title}
            </h3>

            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {story.summary}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-dark-border/40 text-[10px]">
              <span className="text-slate-500 font-mono">Source: <strong className="text-slate-300">{story.source}</strong></span>
              <span className={`font-bold px-2 py-0.5 rounded ${
                story.impactScore === 'Bullish'
                  ? 'bg-brand-green/20 text-brand-green'
                  : story.impactScore === 'Critical Alert'
                  ? 'bg-brand-danger/20 text-brand-danger'
                  : 'bg-brand-purple/20 text-brand-purple'
              }`}>
                {story.impactScore}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Hover Teaser Preview */}
      {hoveredStory && !activeStory && (
        <div
          style={{
            position: 'fixed',
            left: `${Math.min(hoverPos.x + 15, window.innerWidth - 340)}px`,
            top: `${Math.min(hoverPos.y + 15, window.innerHeight - 200)}px`,
            pointerEvents: 'none',
            zIndex: 50
          }}
          className="w-80 p-4 rounded-2xl bg-dark-950/95 border border-brand-cyan/40 shadow-2xl backdrop-blur-xl space-y-2.5 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold text-brand-cyan">{hoveredStory.category}</span>
            <span className="text-slate-400">{hoveredStory.readTime}</span>
          </div>
          <h4 className="text-xs font-bold text-white line-clamp-2">{hoveredStory.title}</h4>
          <p className="text-[11px] text-slate-300 line-clamp-3">{hoveredStory.summary}</p>
          <div className="text-[10px] text-brand-cyan font-bold flex items-center gap-1">
            <Eye className="w-3 h-3" /> Click to read full article & on-chain analysis
          </div>
        </div>
      )}

      {/* Full Article Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-dark-900 border border-dark-border rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl no-scrollbar">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-xl bg-brand-cyan/20 text-brand-cyan font-bold text-xs">
                  {activeStory.category}
                </span>
                <span className="text-xs text-slate-400">{activeStory.timestamp}</span>
              </div>
              <button
                onClick={() => setActiveStory(null)}
                className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white leading-tight">
                {activeStory.title}
              </h2>
              <div className="flex items-center space-x-4 mt-2 text-xs text-slate-400">
                <span>By <strong>{activeStory.author}</strong></span>
                <span>•</span>
                <span>{activeStory.source}</span>
                <span>•</span>
                <span>{activeStory.readTime}</span>
              </div>
            </div>

            {/* Impact Chart */}
            {activeStory.chartData && (
              <div className="p-4 rounded-2xl bg-dark-950 border border-dark-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <BarChart2 className="w-4 h-4 text-brand-cyan" />
                    {activeStory.chartTitle || 'Telemetry Trend'}
                  </span>
                  <span className="text-brand-green font-bold">{activeStory.impactScore}</span>
                </div>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activeStory.chartData}>
                      <defs>
                        <linearGradient id="newsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                      <YAxis stroke="#64748b" fontSize={10} hide />
                      <Tooltip contentStyle={{ backgroundColor: '#0B0E14', border: '1px solid #1E293B', borderRadius: '8px', fontSize: '10px' }} />
                      <Area type="monotone" dataKey="value" stroke="#00E5FF" strokeWidth={2} fill="url(#newsGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-invert max-w-none text-xs leading-relaxed text-slate-300 space-y-4 whitespace-pre-line font-sans">
              {activeStory.content}
            </div>

            {/* References */}
            {activeStory.references && (
              <div className="p-4 rounded-2xl bg-dark-950 border border-dark-border space-y-2">
                <span className="text-xs font-bold text-white block">Verified On-Chain Citations & Data Sources:</span>
                <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1">
                  {activeStory.references.map((ref, idx) => (
                    <li key={idx}>{ref}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
