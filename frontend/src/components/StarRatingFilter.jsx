import React from 'react';
import { Star } from 'lucide-react';

export default function StarRatingFilter({ currentRating, onChange }) {
  const ratingOptions = [
    { value: 5, label: '5.0 Stars only' },
    { value: 4, label: '4.0 Stars & above' },
    { value: 3, label: '3.0 Stars & above' },
    { value: 2, label: '2.0 Stars & above' },
    { value: 1, label: '1.0 Star & above' },
    { value: 0, label: 'All Ratings' }
  ];

  const handleSelect = (val) => {
    onChange(val === currentRating ? 0 : val);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Minimum Rating
        </h3>
        {currentRating > 0 && (
          <button
            type="button"
            onClick={() => onChange(0)}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-1.5" role="radiogroup" aria-label="Minimum Star Rating">
        {ratingOptions.map((opt) => {
          const isSelected =
            (opt.value === 0 && (!currentRating || currentRating === 0)) ||
            currentRating === opt.value;

          return (
            <label
              key={opt.value}
              className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer select-none transition-all duration-150 ${
                isSelected
                  ? 'bg-amber-50/90 text-amber-950 font-medium ring-1 ring-amber-300'
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="minStarRating"
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => handleSelect(opt.value)}
                  className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                />

                <div className="flex items-center gap-1.5">
                  {opt.value > 0 ? (
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= opt.value
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200 fill-slate-100'
                          }`}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs font-medium text-slate-500">Any</span>
                  )}
                  <span className="text-xs ml-1">{opt.label}</span>
                </div>
              </div>

              {opt.value > 0 && (
                <span className="text-[11px] font-bold text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded">
                  {opt.value}★+
                </span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
