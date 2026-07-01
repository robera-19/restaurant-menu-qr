import React from 'react';

const CategoryFilter = ({ categories, activeId, onSelect }) => {
  return (
    <div className="flex gap-3 overflow-x-auto px-6 py-2 no-scrollbar">
      <button
        onClick={() => onSelect('all')}
        className={`
          px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all
          ${
            activeId === 'all'
              ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
              : 'bg-slate-100 text-slate-400'
          }
        `}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`
            px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all
            ${
              activeId === cat.id
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                : 'bg-slate-100 text-slate-400'
            }
          `}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
