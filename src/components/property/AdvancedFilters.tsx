"use client";

import React from "react";
import { Filter, RotateCcw, Check, ShieldCheck, IndianRupee } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";
import { PropertyCategory, FurnishingStatus } from "@/types/property.types";
import { Button } from "@/components/ui/button";

const BHK_OPTIONS = [1, 2, 3, 4, 5];
const FURNISHING_OPTIONS: FurnishingStatus[] = ["Fully Furnished", "Semi-Furnished", "Unfurnished"];

export function AdvancedFilters({ className = "" }: { className?: string }) {
  const {
    categories,
    toggleCategory,
    bhk,
    toggleBhk,
    furnishing,
    toggleFurnishing,
    verificationOnly,
    setVerificationOnly,
    readyToMoveOnly,
    setReadyToMoveOnly,
    resetFilters,
  } = useFilterStore();

  const availableCategories: PropertyCategory[] = [
    "Apartment",
    "Villa",
    "Independent House",
    "Plot",
    "Office Space",
    "Shop",
  ];

  return (
    <div className={`bg-white rounded-2xl border border-stone-200/90 p-5 shadow-sm space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-base">
          <Filter className="w-4 h-4 text-gpe-forest" />
          <span>Filters</span>
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-gpe-forest transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Verification & Ready to Move Toggles */}
      <div className="space-y-2.5">
        <label className="flex items-center gap-2.5 cursor-pointer p-2.5 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition">
          <input
            type="checkbox"
            checked={verificationOnly}
            onChange={(e) => setVerificationOnly(e.target.checked)}
            className="w-4 h-4 text-gpe-emerald rounded focus:ring-gpe-emerald"
          />
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-950">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Properties Only</span>
          </div>
        </label>

        <label className="flex items-center gap-2.5 cursor-pointer p-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 transition">
          <input
            type="checkbox"
            checked={readyToMoveOnly}
            onChange={(e) => setReadyToMoveOnly(e.target.checked)}
            className="w-4 h-4 text-gpe-emerald rounded focus:ring-gpe-emerald"
          />
          <span className="text-xs font-semibold text-stone-800">Ready to Move</span>
        </label>
      </div>

      {/* BHK Selection */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
          Number of Bedrooms (BHK)
        </span>
        <div className="grid grid-cols-5 gap-1.5">
          {BHK_OPTIONS.map((num) => {
            const isSelected = bhk.includes(num);
            return (
              <button
                key={num}
                type="button"
                onClick={() => toggleBhk(num)}
                className={`h-9 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                  isSelected
                    ? "bg-gpe-forest text-white shadow-sm"
                    : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                }`}
              >
                {num === 5 ? "5+" : `${num}BHK`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Property Category */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
          Property Type
        </span>
        <div className="space-y-1.5">
          {availableCategories.map((cat) => {
            const isSelected = categories.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                  isSelected
                    ? "bg-emerald-50 text-gpe-forest font-bold border border-emerald-200"
                    : "hover:bg-stone-50 text-stone-700"
                }`}
              >
                <span>{cat}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-gpe-emerald" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Furnishing Status */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
          Furnishing
        </span>
        <div className="space-y-1.5">
          {FURNISHING_OPTIONS.map((f) => {
            const isSelected = furnishing.includes(f);
            return (
              <button
                key={f}
                type="button"
                onClick={() => toggleFurnishing(f)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                  isSelected
                    ? "bg-emerald-50 text-gpe-forest font-bold border border-emerald-200"
                    : "hover:bg-stone-50 text-stone-700"
                }`}
              >
                <span>{f}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-gpe-emerald" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
