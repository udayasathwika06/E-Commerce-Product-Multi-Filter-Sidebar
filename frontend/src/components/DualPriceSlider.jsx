import React, { useId } from 'react';

export default function DualPriceSlider({
  minBound = 0,
  maxBound = 1000,
  currentMin,
  currentMax,
  onChange
}) {
  const minSliderId = useId();
  const maxSliderId = useId();

  // Fallbacks if bounds are null
  const effectiveMin = currentMin !== null && currentMin !== undefined ? currentMin : minBound;
  const effectiveMax = currentMax !== null && currentMax !== undefined ? currentMax : maxBound;

  const minPercent = Math.max(0, Math.min(100, ((effectiveMin - minBound) / (maxBound - minBound)) * 100));
  const maxPercent = Math.max(0, Math.min(100, ((effectiveMax - minBound) / (maxBound - minBound)) * 100));

  const handleMinSliderChange = (e) => {
    const value = Math.min(Number(e.target.value), effectiveMax - 1);
    onChange(value, effectiveMax);
  };

  const handleMaxSliderChange = (e) => {
    const value = Math.max(Number(e.target.value), effectiveMin + 1);
    onChange(effectiveMin, value);
  };

  const handleMinInputChange = (e) => {
    const val = e.target.value === '' ? minBound : Number(e.target.value);
    if (!isNaN(val)) {
      const clamped = Math.max(minBound, Math.min(val, effectiveMax));
      onChange(clamped, effectiveMax);
    }
  };

  const handleMaxInputChange = (e) => {
    const val = e.target.value === '' ? maxBound : Number(e.target.value);
    if (!isNaN(val)) {
      const clamped = Math.min(maxBound, Math.max(val, effectiveMin));
      onChange(effectiveMin, clamped);
    }
  };

  const handlePreset = (min, max) => {
    onChange(min, max);
  };

  const handleResetPrice = () => {
    onChange(minBound, maxBound);
  };

  const isCustomPrice = effectiveMin > minBound || effectiveMax < maxBound;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Price Range
        </h3>
        {isCustomPrice && (
          <button
            type="button"
            onClick={handleResetPrice}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* Dual Slider Track */}
      <div className="pt-2 px-1">
        <div className="relative h-6 flex items-center">
          {/* Base Track */}
          <div className="absolute w-full h-2 bg-slate-200 rounded-full" />

          {/* Active Highlighted Range Bar */}
          <div
            className="absolute h-2 bg-indigo-600 rounded-full transition-all duration-75"
            style={{
              left: `${minPercent}%`,
              width: `${Math.max(0, maxPercent - minPercent)}%`
            }}
          />

          {/* Dual Range Native Inputs */}
          <input
            id={minSliderId}
            type="range"
            min={minBound}
            max={maxBound}
            step={5}
            value={effectiveMin}
            onChange={handleMinSliderChange}
            aria-label="Minimum price"
            className="absolute w-full h-2 opacity-0 cursor-pointer pointer-events-auto z-20"
          />
          <input
            id={maxSliderId}
            type="range"
            min={minBound}
            max={maxBound}
            step={5}
            value={effectiveMax}
            onChange={handleMaxSliderChange}
            aria-label="Maximum price"
            className="absolute w-full h-2 opacity-0 cursor-pointer pointer-events-auto z-20"
          />

          {/* Visual Custom Slider Thumbs */}
          <div
            className="absolute w-5 h-5 bg-white border-2 border-indigo-600 rounded-full shadow-md -translate-x-1/2 pointer-events-none z-10 transition-transform hover:scale-110 flex items-center justify-center"
            style={{ left: `${minPercent}%` }}
          >
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
          </div>
          <div
            className="absolute w-5 h-5 bg-white border-2 border-indigo-600 rounded-full shadow-md -translate-x-1/2 pointer-events-none z-10 transition-transform hover:scale-110 flex items-center justify-center"
            style={{ left: `${maxPercent}%` }}
          >
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
          </div>
        </div>
      </div>

      {/* Numerical Bounds Input Boxes */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Min Price
          </label>
          <div className="relative rounded-xl border border-slate-200 bg-white focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
              $
            </span>
            <input
              type="number"
              value={effectiveMin}
              min={minBound}
              max={effectiveMax}
              onChange={handleMinInputChange}
              className="w-full pl-7 pr-2 py-1.5 text-xs font-medium text-slate-800 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Max Price
          </label>
          <div className="relative rounded-xl border border-slate-200 bg-white focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
              $
            </span>
            <input
              type="number"
              value={effectiveMax}
              min={effectiveMin}
              max={maxBound}
              onChange={handleMaxInputChange}
              className="w-full pl-7 pr-2 py-1.5 text-xs font-medium text-slate-800 bg-transparent focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Quick Price Preset Chips */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {[
          { label: 'All', min: minBound, max: maxBound },
          { label: '< $50', min: minBound, max: 50 },
          { label: '$50-$150', min: 50, max: 150 },
          { label: '$150-$500', min: 150, max: 500 },
          { label: '$500+', min: 500, max: maxBound }
        ].map((preset) => {
          const isActive = effectiveMin === preset.min && effectiveMax === preset.max;
          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => handlePreset(preset.min, preset.max)}
              className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
