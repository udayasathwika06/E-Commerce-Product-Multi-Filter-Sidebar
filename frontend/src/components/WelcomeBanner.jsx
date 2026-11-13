import React from 'react';
import { Sparkles, Zap, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

export default function WelcomeBanner({ onSelectCategory, selectedCategories = [] }) {
  const quickCategories = [
    { name: 'Electronics', icon: '🎧' },
    { name: 'Apparel', icon: '👕' },
    { name: 'Footwear', icon: '👟' },
    { name: 'Accessories', icon: '⌚' },
    { name: 'Home & Kitchen', icon: '☕' },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 mb-8 shadow-xl shadow-indigo-950/10 border border-slate-800">
      {/* Decorative ambient glowing gradient orbs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Side: Headline & Mission */}
        <div className="max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Curated Marketplace Collection</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Discover Quality Essentials, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300">
              Filtered to Your Exact Taste.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Sift through our catalog with interactive dual price bounds, multi-category selection, and verified customer ratings with instant real-time feedback.
          </p>

          {/* Value perks bar */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Free Delivery in India</span>
            </div>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Instant Server Filtering</span>
            </div>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>100% Genuine Products</span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Category Shortcuts */}
        <div className="lg:w-80 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-200 mb-2.5">
            Quick Browse Categories
          </div>
          <div className="grid grid-cols-2 gap-2">
            {quickCategories.map((cat) => {
              const isSelected = selectedCategories.includes(cat.name);
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => onSelectCategory(cat.name)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-1 ring-white/20'
                      : 'bg-white/5 hover:bg-white/15 text-slate-200'
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span className="truncate">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
