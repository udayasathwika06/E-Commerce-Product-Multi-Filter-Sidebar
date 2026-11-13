import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
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

  // Cart state
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('marketvibe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('marketvibe_favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Quick View Modal state
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Toast notification
  const [toast, setToast] = useState(null);
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('marketvibe_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('marketvibe_favs', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Could not save favorites', e);
    }
  }, [favorites]);

  // Catalog metadata (available categories, global min/max price in INR)
  const [metadata, setMetadata] = useState({
    categories: [],
    priceRange: { min: 299, max: 80000 },
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
  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

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

  // Cart actions
  const handleAddToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added "${product.name.slice(0, 24)}..." to cart!`);
    setIsCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const handleRemoveFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Wishlist toggle
  const handleToggleFavorite = useCallback((productId) => {
    setFavorites((prev) => {
      const isFav = prev.includes(productId);
      if (isFav) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist ❤️');
        return [...prev, productId];
      }
    });
  }, []);

  // Filter handlers
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
      sortBy: filters.sortBy
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

  const cartTotalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Top Header */}
      <Header
        searchQuery={filters.search}
        onSearchChange={handleSearchChange}
        totalProducts={totalProducts}
        matchedCount={matchedCount}
        onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
        cartCount={cartTotalQuantity}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={favorites.length}
        onOpenWishlist={() => {
          if (favorites.length === 0) {
            showToast('Your wishlist is empty. Tap any ❤️ to save items!');
          } else {
            showToast(`You have ${favorites.length} saved item(s) in wishlist!`);
          }
        }}
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
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </main>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isFavorite={quickViewProduct ? favorites.includes(quickViewProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-medium flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200 border border-slate-800">
          <span>{toast}</span>
        </div>
      )}

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 MARKETVIBE Inc. All rights reserved.</p>
          <p className="text-slate-400">High-Traffic E-Commerce Multi-Filter Platform</p>
        </div>
      </footer>
    </div>
  );
}
