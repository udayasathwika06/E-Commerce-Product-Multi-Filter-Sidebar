import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import { fetchFilteredProducts, fetchInventoryMetadata } from './services/api';

const DEFAULT_FILTERS = {
  categories: [],
  minPrice: null,
  maxPrice: null,
  minRating: 0,
  sortBy: 'featured',
  search: ''
};

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Catalog metadata (available categories, global min/max price)
  const [metadata, setMetadata] = useState({
    categories: [],
    priceRange: { min: 0, max: 1000 },
    totalProducts: 0
  });

  const abortControllerRef = useRef(null);

  // 1. Initial metadata fetch
  useEffect(() => {
    let mounted = true;
    fetchInventoryMetadata()
      .then((meta) => {
        if (mounted && meta) {
          setMetadata(meta);
          setTotalProducts(meta.totalProducts);
        }
      })
      .catch((err) => {
        console.error('Error fetching initial metadata:', err);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // 2. Fetch products whenever any filter or sorting criteria changes
  // Server-side filtering logic ensures all business logic stays on the backend
  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    // Debounce slightly if user is dragging slider or typing fast
    const timer = setTimeout(() => {
      fetchFilteredProducts(filters, controller.signal)
        .then((data) => {
          setProducts(data.products || []);
          setMatchedCount(data.matchedCount || 0);
          if (data.total) setTotalProducts(data.total);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            console.error('Failed to load products:', err);
            setError(err.message);
            setLoading(false);
          }
        });
    }, 120);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [filters]);

  // Compute number of active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.categories && filters.categories.length > 0) count += filters.categories.length;
    if (
      (filters.minPrice !== null && filters.minPrice > metadata.priceRange.min) ||
      (filters.maxPrice !== null && filters.maxPrice < metadata.priceRange.max)
    ) {
      count += 1;
    }
    if (filters.minRating && filters.minRating > 0) count += 1;
    if (filters.search && filters.search.trim()) count += 1;
    return count;
  }, [filters, metadata.priceRange]);

  // Handlers for instant filter updates
  const handleCategoryChange = useCallback((newCategories) => {
    setFilters((prev) => ({ ...prev, categories: newCategories }));
  }, []);

  const handlePriceChange = useCallback((min, max) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  }, []);

  const handleRatingChange = useCallback((rating) => {
    setFilters((prev) => ({ ...prev, minRating: rating }));
  }, []);

  const handleSortChange = useCallback((sortBy) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const handleSearchChange = useCallback((search) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      ...DEFAULT_FILTERS,
      sortBy: filters.sortBy // keep user's chosen sort preference
    });
  }, [filters.sortBy]);

  const handleRemoveCategory = useCallback((catName) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== catName)
    }));
  }, []);

  const handleResetPrice = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: null,
      maxPrice: null
    }));
  }, []);

  const handleResetRating = useCallback(() => {
    setFilters((prev) => ({ ...prev, minRating: 0 }));
  }, []);

  const handleClearSearch = useCallback(() => {
    setFilters((prev) => ({ ...prev, search: '' }));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Top Header */}
      <Header
        searchQuery={filters.search}
        onSearchChange={handleSearchChange}
        totalProducts={totalProducts}
        matchedCount={matchedCount}
        onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
      />

      {/* Main Layout: Sticky Sidebar + Dynamic Inventory Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center justify-between">
            <span>Unable to connect to filtering server: {error}</span>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold underline underline-offset-2"
            >
              Retry
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sticky Left Sidebar */}
          <Sidebar
            availableCategories={metadata.categories}
            priceRangeBounds={metadata.priceRange}
            filters={filters}
            activeFilterCount={activeFilterCount}
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            onRatingChange={handleRatingChange}
            onResetFilters={handleResetFilters}
            isOpenMobile={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />

          {/* Dynamic Product Inventory Grid */}
          <ProductGrid
            products={products}
            loading={loading}
            totalProducts={totalProducts}
            matchedCount={matchedCount}
            sortBy={filters.sortBy}
            onSortChange={handleSortChange}
            filters={filters}
            priceRangeBounds={metadata.priceRange}
            onResetFilters={handleResetFilters}
            onRemoveCategory={handleRemoveCategory}
            onResetPrice={handleResetPrice}
            onResetRating={handleResetRating}
            onClearSearch={handleClearSearch}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 MARKETVIBE Inc. Server-driven combinatorial multi-filter architecture.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              REST API Server: Port 5000
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Client: Port 3000
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
