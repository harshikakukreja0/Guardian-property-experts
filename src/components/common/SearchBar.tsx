"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Building, IndianRupee, ChevronDown, Check } from "lucide-react";
import { PropertyPurpose, PropertyCategory } from "@/types/property.types";
import { useFilterStore } from "@/store/filterStore";

const PROPERTY_TYPES: PropertyCategory[] = [
  "Apartment",
  "Independent House",
  "Villa",
  "Plot",
  "Office Space",
  "Shop",
];

const BUDGET_OPTIONS = [
  { label: "Any Budget", min: 0, max: 500000000 },
  { label: "Under ₹1 Cr", min: 0, max: 10000000 },
  { label: "₹1 Cr - ₹3 Cr", min: 10000000, max: 30000000 },
  { label: "₹3 Cr - ₹7 Cr", min: 30000000, max: 70000000 },
  { label: "₹7 Cr - ₹15 Cr", min: 70000000, max: 150000000 },
  { label: "₹15 Cr+", min: 150000000, max: 1000000000 },
];

interface SearchPreset {
  label: string;
  city?: string;
  locality?: string;
  bhk?: number[];
  category?: PropertyCategory;
  maxPrice?: number;
  budgetIndex?: number;
  route?: string;
}

export function SearchBar({ className = "" }: { className?: string }) {
  const router = useRouter();
  const {
    purpose,
    setPurpose,
    city,
    locality,
    setLocality,
    categories,
    toggleCategory,
    setPriceRange,
    bhk,
    toggleBhk,
  } = useFilterStore();

  const activeCity = city && city !== "All Cities" ? city : "Mumbai";

  const popularSearchPresets: SearchPreset[] = [
    { label: `2 BHK in ${activeCity}`, city: activeCity, bhk: [2] },
    { label: `3 BHK in ${activeCity}`, city: activeCity, bhk: [3] },
    { label: "Luxury Villas", category: "Villa" },
    { label: "Under ₹1 Cr", maxPrice: 10000000, budgetIndex: 1 },
    { label: "New Launches", route: "/projects" },
  ];

  const [selectedBudgetIndex, setSelectedBudgetIndex] = useState(0);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [budgetDropdownOpen, setBudgetDropdownOpen] = useState(false);

  const handleSearch = () => {
    const route = purpose === "buy" ? "/buy" : purpose === "rent" ? "/rent" : "/commercial";
    const params = new URLSearchParams();
    if (activeCity) params.append("city", activeCity);
    if (locality) params.append("locality", locality);
    if (categories.length > 0) params.append("category", categories.join(","));
    if (selectedBudgetIndex > 0) {
      params.append("minPrice", BUDGET_OPTIONS[selectedBudgetIndex].min.toString());
      params.append("maxPrice", BUDGET_OPTIONS[selectedBudgetIndex].max.toString());
    }
    if (bhk.length > 0) {
      params.append("bhk", bhk.join(","));
    }

    router.push(`${route}?${params.toString()}`);
  };

  const handlePresetClick = (preset: typeof popularSearchPresets[0]) => {
    if (preset.route) {
      router.push(preset.route);
      return;
    }
    if (preset.locality) setLocality(preset.locality);
    if (preset.category) {
      if (!categories.includes(preset.category as PropertyCategory)) {
        toggleCategory(preset.category as PropertyCategory);
      }
    }
    if (preset.bhk && preset.bhk.length > 0) {
      preset.bhk.forEach((b) => {
        if (!bhk.includes(b)) toggleBhk(b);
      });
    }
    if (preset.budgetIndex !== undefined) {
      setSelectedBudgetIndex(preset.budgetIndex);
      setPriceRange(0, preset.maxPrice || 10000000);
    }
    handleSearch();
  };

  return (
    <div className={`w-full max-w-4xl mx-auto space-y-3.5 ${className}`}>
      {/* 1. Property Purpose Tabs (Buy / Rent / Commercial) - Centered & Aesthetic */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center p-1 bg-white/95 backdrop-blur-md rounded-full border border-stone-200/90 shadow-xs">
          {[
            { id: "buy", label: "Buy" },
            { id: "rent", label: "Rent" },
            { id: "commercial", label: "Commercial" },
          ].map((tab) => {
            const isActive = purpose === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPurpose(tab.id as PropertyPurpose)}
                className={`px-5 sm:px-7 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#064B25] text-white shadow-xs"
                    : "text-[#202820] hover:text-[#064B25]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Unified Search Panel (Fully Responsive Pill Bar) */}
      <div className="bg-white rounded-3xl lg:rounded-full p-2 sm:p-2.5 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.1)] border border-[#E5EAE5] flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
        {/* Locality, Project or Society Search Input */}
        <div className="relative flex-1 min-w-[200px] w-full">
          <div className="flex items-center px-4 py-2">
            <Search className="w-4 h-4 text-stone-400 shrink-0 mr-2.5" />
            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by locality, project or landmark (e.g. Bandra, Powai, Whitefield)"
              className="w-full h-8 bg-transparent text-xs sm:text-sm text-[#202820] placeholder:text-stone-400 font-medium focus:outline-none"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-8 bg-stone-200 shrink-0" />

        {/* Property Type Dropdown */}
        <div className="relative shrink-0 w-full lg:w-auto lg:min-w-[150px]">
          <button
            type="button"
            onClick={() => {
              setTypeDropdownOpen(!typeDropdownOpen);
              setBudgetDropdownOpen(false);
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 lg:py-3 text-xs sm:text-sm font-semibold text-[#202820] hover:text-[#064B25] transition cursor-pointer"
          >
            <span className="flex items-center gap-2 truncate">
              <Building className="w-4 h-4 text-[#064B25] shrink-0" />
              <span>{categories.length > 0 ? `${categories.length} Selected` : "Property Type"}</span>
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          </button>

          {typeDropdownOpen && (
            <div
              className="absolute left-0 lg:right-0 lg:left-auto mt-2 w-56 bg-white rounded-2xl border border-[#E5EAE5] shadow-2xl p-2 z-50 animate-in fade-in"
              onMouseLeave={() => setTypeDropdownOpen(false)}
            >
              <div className="text-[10px] font-black text-[#064B25] px-2 py-1 uppercase tracking-wider">
                Select Categories
              </div>
              {PROPERTY_TYPES.map((t) => {
                const isSelected = categories.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleCategory(t)}
                    className="w-full text-left px-2.5 py-1.5 text-xs rounded-xl flex items-center justify-between hover:bg-[#F0F7F0] transition"
                  >
                    <span className={isSelected ? "font-black text-[#064B25]" : "text-stone-700 font-medium"}>
                      {t}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#064B25]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-8 bg-stone-200 shrink-0" />

        {/* Budget Dropdown */}
        <div className="relative shrink-0 w-full lg:w-auto lg:min-w-[130px]">
          <button
            type="button"
            onClick={() => {
              setBudgetDropdownOpen(!budgetDropdownOpen);
              setTypeDropdownOpen(false);
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 lg:py-3 text-xs sm:text-sm font-semibold text-[#202820] hover:text-[#064B25] transition cursor-pointer"
          >
            <span className="flex items-center gap-1.5 truncate">
              <IndianRupee className="w-4 h-4 text-[#064B25] shrink-0" />
              <span>{BUDGET_OPTIONS[selectedBudgetIndex].label.replace("Any Budget", "Budget")}</span>
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          </button>

          {budgetDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-[#E5EAE5] shadow-2xl py-2 z-50 animate-in fade-in"
              onMouseLeave={() => setBudgetDropdownOpen(false)}
            >
              {BUDGET_OPTIONS.map((b, idx) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => {
                    setSelectedBudgetIndex(idx);
                    setPriceRange(b.min, b.max);
                    setBudgetDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center justify-between hover:bg-[#F0F7F0] ${
                    selectedBudgetIndex === idx ? "text-[#064B25] font-black bg-[#F0F7F0]" : "text-stone-700"
                  }`}
                >
                  <span>{b.label}</span>
                  {selectedBudgetIndex === idx && <Check className="w-3.5 h-3.5 text-[#064B25]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Green Search Pill CTA */}
        <div className="shrink-0 p-1 w-full lg:w-auto">
          <button
            type="button"
            onClick={handleSearch}
            className="w-full lg:w-auto h-11 sm:h-12 px-7 sm:px-8 rounded-full bg-[#064B25] hover:bg-[#003D1C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all duration-200 cursor-pointer active:scale-95"
            title="Search Verified Properties"
          >
            <Search className="w-4 h-4 text-white" />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* 3. Popular Searches Directly Underneath (Centered) */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
        <span className="font-bold text-stone-800 mr-1">Popular Searches:</span>
        {popularSearchPresets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => handlePresetClick(preset)}
            className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/95 hover:bg-white text-stone-700 hover:text-[#064B25] border border-stone-200/90 shadow-2xs font-semibold backdrop-blur-sm transition cursor-pointer text-xs"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
