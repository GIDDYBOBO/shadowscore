import React from 'react';

export type SubCategoryFilter = 
  | 'Social'
  | 'Markets'
  | 'DAO & Governance'
  | 'Security'
  | 'Risk & Yields'
  | 'Legal'
  | 'Advanced Reports';

interface SubCategoryBarProps {
  selectedCategory: SubCategoryFilter;
  onSelectCategory: (cat: SubCategoryFilter) => void;
}

export const SubCategoryBar: React.FC<SubCategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories: SubCategoryFilter[] = [
    'Social',
    'Markets',
    'DAO & Governance',
    'Security',
    'Risk & Yields',
    'Legal',
    'Advanced Reports',
  ];

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-6 no-scrollbar font-sans">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              isActive
                ? 'bg-white text-dark-900 shadow-md font-bold'
                : 'bg-dark-800/80 hover:bg-dark-700 text-slate-300 border border-dark-border'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
