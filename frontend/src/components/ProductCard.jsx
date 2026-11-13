import React, { useState } from 'react';
import { Star, CheckCircle, ShoppingBag } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setAdded(true);
    if (onAddToCart) {
      onAddToCart(product);
    }
    setTimeout(() => setAdded(false), 1200);
  };

  // Render 5 stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-0.5" title={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= fullStars || (star === fullStars + 1 && hasHalf);
          return (
            <Star
              key={star}
              className={`w-3.5 h-3.5 ${
                isFilled
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-slate-200 fill-slate-100'
              }`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 flex flex-col overflow-hidden relative">
      {/* Category Pill Tag */}
      <div className="absolute top-3 left-3 z-10">
        <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-700 rounded-lg shadow-sm border border-slate-200/50">
          {product.category}
        </span>
      </div>

      {/* Image Thumbnail */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-slate-200/70 animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Star Rating Display */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              {renderStars(product.rating)}
              <span className="font-bold text-slate-800">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-slate-400">
              ({product.reviewCount ? product.reviewCount.toLocaleString() : 0})
            </span>
          </div>

          {/* Item Name */}
          <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h4>

          {/* Description Snippet */}
          {product.description && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Footer: Price Tag and Action */}
        <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Price
            </span>
            <span className="text-lg font-black text-slate-900 tracking-tight">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
              added
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-200'
                : 'bg-slate-900 hover:bg-indigo-600 text-white shadow-sm hover:shadow-indigo-200'
            }`}
          >
            {added ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
