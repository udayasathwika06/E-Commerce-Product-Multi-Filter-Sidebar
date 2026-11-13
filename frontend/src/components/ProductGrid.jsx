import React from 'react';
import ProductCard from './ProductCard';
import SortDropdown from './SortDropdown';
import EmptyState from './EmptyState';
import ActiveFilterPills from './ActiveFilterPills';

export default function ProductGrid({
  products,
  loading,
  totalProducts,
  matchedCount,
  sortBy,
  onSortChange,
  filters,
  priceRangeBounds,
  onResetFilters,
  onRemoveCategory,
  onResetPrice,
  onResetRating,
  onClearSearch,
  onAddToCart
}) {
  return (
    <section className="flex-1 min-w-0" aria-label="Product Catalog">
      {/* Grid Controls Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Marketplace Catalog</h1>
            <p className="text-xs text-slate-500">
              Showing <span className="font-semibold text-slate-800">{matchedCount}</span> of{' '}
              <span className="font-semibold text-slate-800">{totalProducts}</span> products
              {loading && <span className="ml-2 text-indigo-600 animate-pulse font-medium">Updating...</span>}
            </p>
          </div>

          {/* Top Right "Sort By" Dropdown Menu */}
          <div className="self-end sm:self-center">
            <SortDropdown sortBy={sortBy} onChange={onSortChange} />
          </div>
        </div>

        {/* Active Filter Badges */}
        <ActiveFilterPills
          filters={filters}
          priceRangeBounds={priceRangeBounds}
          onRemoveCategory={onRemoveCategory}
          onResetPrice={onResetPrice}
          onResetRating={onResetRating}
          onClearSearch={onClearSearch}
          onResetAll={onResetFilters}
        />
      </div>

      {/* Main Content: Loading / Empty / Product Grid */}
      {loading && products.length === 0 ? (
        // Skeleton loader
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3 animate-pulse">
              <div className="aspect-[4/3] bg-slate-200 rounded-xl" />
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : matchedCount === 0 ? (
        // Zero Match Screen: Catalog grid disappears and renders Empty State
        <EmptyState onResetFilters={onResetFilters} />
      ) : (
        // Dynamic Product Inventory Grid
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity duration-150 ${loading ? 'opacity-70' : 'opacity-100'}`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </section>
  );
}
