import React from 'react';
import { Check } from 'lucide-react';

export default function CategoryFilter({ availableCategories = [], selectedCategories = [], onChange }) {
  const handleToggle = (categoryName) => {
    const isSelected = selectedCategories.includes(categoryName);
    let next;
    if (isSelected) {
      next = selectedCategories.filter((c) => c !== categoryName);
    } else {
      next = [...selectedCategories, categoryName];
    }
    onChange(next);
  };

  const handleSelectAll = () => {
    onChange(availableCategories.map((c) => c.name));
  };

  const handleClear = () => {
    onChange([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Categories ({selectedCategories.length > 0 ? `${selectedCategories.length} selected` : 'All'})
        </h3>
        {selectedCategories.length > 0 ? (
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            Clear
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-xs text-slate-400 hover:text-indigo-600 font-medium transition-colors"
          >
            Select All
          </button>
        )}
      </div>

      <div className="space-y-1.5">
        {availableCategories.map((cat) => {
          const isChecked = selectedCategories.includes(cat.name);
          return (
            <label
              key={cat.name}
              className={`group flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer select-none transition-all duration-150 ${
                isChecked
                  ? 'bg-indigo-50/80 text-indigo-950 font-medium ring-1 ring-indigo-200'
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors border ${
                    isChecked
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 bg-white group-hover:border-slate-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggle(cat.name)}
                    className="sr-only"
                  />
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-sm">{cat.name}</span>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isChecked
                    ? 'bg-indigo-100 text-indigo-700 font-semibold'
                    : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                }`}
              >
                {cat.count}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
