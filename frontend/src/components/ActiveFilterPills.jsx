import React from 'react';
import { X } from 'lucide-react';

export default function ActiveFilterPills({
  filters,
  priceRangeBounds,
  onRemoveCategory,
  onResetPrice,
  onResetRating,
  onClearSearch,
  onResetAll
}) {
  const isPriceCustom =
    (filters.minPrice !== null && filters.minPrice > priceRangeBounds.min) ||
    (filters.maxPrice !== null && filters.maxPrice < priceRangeBounds.max);

  const hasAnyFilter =
    filters.categories.length > 0 ||
    isPriceCustom ||
    (filters.minRating && filters.minRating > 0) ||
    Boolean(filters.search);

  if (!hasAnyFilter) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1 pb-3">
      <span className="text-xs font-semibold text-slate-400 mr-1">Active filters:</span>

      {/* Category Pills */}
      {filters.categories.map((cat) => (
        <span
          key={cat}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200"
        >
          <span>{cat}</span>
          <button
            type="button"
            onClick={() => onRemoveCategory(cat)}
            className="hover:text-indigo-950 transition-colors"
            title={`Remove ${cat}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {/* Price Pill */}
      {isPriceCustom && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span>${filters.minPrice || priceRangeBounds.min} - ${filters.maxPrice || priceRangeBounds.max}</span>
          <button
            type="button"
            onClick={onResetPrice}
            className="hover:text-emerald-950 transition-colors"
            title="Reset price range"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Rating Pill */}
      {filters.minRating > 0 && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <span>★ {filters.minRating}+ Stars</span>
          <button
            type="button"
            onClick={onResetRating}
            className="hover:text-amber-950 transition-colors"
            title="Reset rating"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Search Pill */}
      {filters.search && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
          <span>Keyword: "{filters.search}"</span>
          <button
            type="button"
            onClick={onClearSearch}
            className="hover:text-sky-950 transition-colors"
            title="Clear keyword search"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Clear All Shortcut */}
      <button
        type="button"
        onClick={onResetAll}
        className="text-xs font-semibold text-rose-600 hover:text-rose-800 underline decoration-dotted ml-2"
      >
        Clear all
      </button>
    </div>
  );
}
