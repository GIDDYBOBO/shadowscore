import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowLeftRight, 
  ShieldAlert, 
  Settings, 
  SunMoon,
  LineChart,
  Scale,
  FileText
} from 'lucide-react';

export type NavTab = 
  | 'overview' 
  | 'portfolio' 
  | 'markets' 
  | 'social' 
  | 'transactions' 
  | 'insights' 
  | 'security' 
  | 'employer' 
  | 'legal' 
  | 'advanced' 
  | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenAiAssistant: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'markets', label: 'ShadowScore Terminal', icon: LineChart, badge: 'Live' },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'security', label: 'Security & Revoke', icon: ShieldAlert, badge: 'Active' },
    { id: 'legal', label: 'Legal & Documentation', icon: Scale },
    { id: 'advanced', label: 'Advanced Full Audit', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0B0E14] border-r border-dark-border flex flex-col justify-between p-4 h-screen sticky top-0 z-30 shrink-0 font-sans">
      <div>
        <div className="flex items-center space-x-3 px-2 py-3 mb-4">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-purple p-[1.5px]">
            <div className="w-full h-full bg-[#0B0E14] rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-sky text-xl">S</span>
            </div>
          </div>
          <div>
            <div className="font-bold text-lg text-white tracking-wide flex items-center gap-1.5 font-mono">
              ShadowScore
            </div>
            <p className="text-xs text-slate-400 font-medium">AI Reputation Engine</p>
          </div>
        </div>

        {/* Navigation Items (Strict 8 items) */}
        <nav className="space-y-1 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-blue/15 text-brand-cyan border border-brand-cyan/25 shadow-glow-cyan/20 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-dark-700/50'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-cyan' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-semibold ${
                    item.badge.includes('Active') 
                      ? 'bg-brand-danger/20 text-brand-danger border border-brand-danger/30' 
                      : 'bg-brand-cyan/20 text-brand-cyan'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Theme Switcher Toggle */}
      <div className="pt-3 border-t border-dark-border">
        <div className="flex items-center justify-between px-3 py-2 bg-dark-700/40 rounded-xl text-xs font-medium text-slate-400">
          <div className="flex items-center space-x-2">
            <SunMoon className="w-4 h-4 text-brand-cyan" />
            <span>{darkMode ? 'Dark Mode' : 'Light Mode (Cream)'}</span>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-9 h-4.5 flex items-center rounded-full p-0.5 transition-colors ${
              darkMode ? 'bg-brand-cyan' : 'bg-brand-blue'
            }`}
          >
            <div
              className={`bg-dark-900 w-3.5 h-3.5 rounded-full shadow-md transform transition-transform ${
                darkMode ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </aside>
  );
};
