import React from 'react';
import { 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Scale, 
  FileSearch,
  Sparkles
} from 'lucide-react';

export type SubCategoryFilter = 'Social' | 'Markets' | 'Security' | 'Legal' | 'Advanced Reports';

interface SubCategoryBarProps {
  selectedCategory: SubCategoryFilter;
  onSelectCategory: (cat: SubCategoryFilter) => void;
}

export const SubCategoryBar: React.FC<SubCategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories: { id: SubCategoryFilter; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'Social', label: 'Social & Feed', icon: Users, badge: 'Live News' },
    { id: 'Markets', label: 'ShadowScore Terminal', icon: TrendingUp, badge: 'Charts' },
    { id: 'Security', label: 'Security & Revoke', icon: ShieldCheck, badge: 'Zero Drainers' },
    { id: 'Legal', label: 'Legal & Docs', icon: Scale, badge: 'Terms' },
    { id: 'Advanced Reports', label: 'Advanced Audit', icon: FileSearch, badge: 'Deep Scan' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3.5 font-sans">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isSelected = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
              isSelected
                ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-glow-blue/20 font-bold border border-brand-cyan/40'
                : 'bg-dark-900/90 text-slate-400 hover:text-white hover:bg-dark-800 border border-dark-border'
            }`}
          >
            <Icon className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
            <span>{cat.label}</span>
            {cat.badge && (
              <span
                className={`text-[8px] font-bold px-1 py-0.2 rounded-full ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-dark-800 text-slate-400 border border-dark-border/60'
                }`}
              >
                {cat.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
