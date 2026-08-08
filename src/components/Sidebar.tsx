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
  FileText,
  X
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
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  isMobileOpen = false,
  onCloseMobile,
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
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-30 h-screen w-64 bg-[#0B0E14] border-r border-dark-border flex flex-col justify-between p-4 font-sans transition-transform duration-300 ease-in-out shrink-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo & Brand + Mobile Close Button */}
          <div className="flex items-center justify-between px-2 py-3 mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-purple p-[1.5px] shadow-glow-cyan/20">
                <div className="w-full h-full bg-[#0B0E14] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-sky text-lg">S</span>
                </div>
              </div>
              <div>
                <div className="font-bold text-base text-white tracking-wide flex items-center gap-1.5 font-mono">
                  ShadowScore
                </div>
                <p className="text-[10px] text-slate-400 font-medium">AI Reputation Engine</p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-xl bg-dark-900 text-slate-400 hover:text-white lg:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-glow-blue/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-dark-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer: Theme Toggle & AI Status */}
        <div className="pt-3 border-t border-dark-border space-y-2">
          <div className="flex items-center justify-between px-2 py-1.5 bg-dark-900/90 rounded-xl border border-dark-border text-xs">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <SunMoon className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Theme</span>
            </span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-2.5 py-1 rounded-lg bg-dark-800 text-[10px] font-bold text-white hover:bg-brand-cyan hover:text-dark-900 transition-all font-mono"
            >
              {darkMode ? 'Dark' : 'Light'}
            </button>
          </div>

          <div className="text-[10px] text-slate-500 font-mono text-center">
            v2.4 Production • Multi-Chain Active
          </div>
        </div>
      </aside>
    </>
  );
};
