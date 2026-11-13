import React from 'react';
import { Filter, RotateCcw, X } from 'lucide-react';
import CategoryFilter from './CategoryFilter';
import DualPriceSlider from './DualPriceSlider';
import StarRatingFilter from './StarRatingFilter';

export default function Sidebar({
  availableCategories,
  priceRangeBounds,
  filters,
  activeFilterCount,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onResetFilters,
  isOpenMobile,
  onCloseMobile
}) {
  const content = (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-6">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-tight">Filters</h2>
            <p className="text-[11px] text-slate-400">Refine catalog instantly</p>
          </div>
        </div>

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-lg transition-colors"
            title="Reset all filters to base inventory"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset ({activeFilterCount})</span>
          </button>
        )}
      </div>

      {/* 1) Category Checklist Group */}
      <section aria-labelledby="category-filter-heading">
        <CategoryFilter
          availableCategories={availableCategories}
          selectedCategories={filters.categories}
          onChange={onCategoryChange}
        />
      </section>

      <hr className="border-slate-100" />

      {/* 2) Dual-point Price Range Slider Track */}
      <section aria-labelledby="price-filter-heading">
        <DualPriceSlider
          minBound={priceRangeBounds.min}
          maxBound={priceRangeBounds.max}
          currentMin={filters.minPrice}
          currentMax={filters.maxPrice}
          onChange={onPriceChange}
        />
      </section>

      <hr className="border-slate-100" />

      {/* 3) Minimum Star Rating Radio Group */}
      <section aria-labelledby="rating-filter-heading">
        <StarRatingFilter
          currentRating={filters.minRating}
          onChange={onRatingChange}
        />
      </section>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-20">
          {content}
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col p-4 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-3 border-b">
              <span className="font-bold text-slate-900">Filter Products</span>
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
