import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistProducts = [],
  onRemoveFavorite,
  onAddToCart,
  onClearWishlist
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-rose-50/40">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-200">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Your Wishlist</h2>
                <p className="text-xs text-slate-500">
                  {wishlistProducts.length} {wishlistProducts.length === 1 ? 'saved item' : 'saved items'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {wishlistProducts.length > 0 && (
                <button
                  type="button"
                  onClick={onClearWishlist}
                  className="text-xs text-slate-400 hover:text-rose-600 transition-colors font-medium px-2 py-1 rounded"
                >
                  Clear all
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-500 transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No liked products yet</h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Tap the ❤️ heart icon on any product to save it here for later!
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-indigo-600 transition-colors shadow-sm"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              wishlistProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm transition-all"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-slate-100 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveFavorite(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-900 line-clamp-1 mt-1">
                        {item.name}
                      </h4>
                      <p className="text-xs font-black text-slate-900 mt-0.5">
                        ₹{Number(item.price).toLocaleString('en-IN')}
                      </p>
                    </div>

                    {/* Move to Cart Action */}
                    <div className="mt-2 pt-2 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-[11px] text-amber-500 font-bold">
                        ★ {item.rating}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart(item);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold shadow-sm transition-all active:scale-95"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
