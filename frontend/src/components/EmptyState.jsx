import React from 'react';
import { PackageSearch, RotateCcw } from 'lucide-react';

export default function EmptyState({ onResetFilters }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-xl mx-auto my-8 shadow-sm">
      <div className="w-20 h-20 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-5 text-indigo-600 shadow-inner">
        <PackageSearch className="w-10 h-10" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">
        No items match your criteria.
      </h3>

      <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
        Your current combination of categories, price range, and star rating is too restrictive. Try loosening one or more filters or reset to view our full collection.
      </p>

      <button
        type="button"
        onClick={onResetFilters}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-200 transition-all active:scale-95"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Reset filters</span>
      </button>
    </div>
  );
}

