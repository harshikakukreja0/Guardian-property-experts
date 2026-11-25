import { create } from "zustand";
import { PropertyCategory, PropertyPurpose, FurnishingStatus } from "@/types/property.types";

interface FilterState {
  purpose: PropertyPurpose;
  city: string;
  locality: string;
  categories: PropertyCategory[];
  minPrice: number;
  maxPrice: number;
  bhk: number[];
  furnishing: FurnishingStatus[];
  verificationOnly: boolean;
  readyToMoveOnly: boolean;
  sortBy: "price-asc" | "price-desc" | "latest" | "popular" | "relevance";
  viewMode: "list" | "map";

  setPurpose: (purpose: PropertyPurpose) => void;
  setCity: (city: string) => void;
  setLocality: (locality: string) => void;
  toggleCategory: (category: PropertyCategory) => void;
  setPriceRange: (min: number, max: number) => void;
  toggleBhk: (bhk: number) => void;
  toggleFurnishing: (f: FurnishingStatus) => void;
  setVerificationOnly: (v: boolean) => void;
  setReadyToMoveOnly: (v: boolean) => void;
  setSortBy: (sort: FilterState["sortBy"]) => void;
  setViewMode: (mode: "list" | "map") => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  purpose: "buy",
  city: "All Cities",
  locality: "",
  categories: [],
  minPrice: 0,
  maxPrice: 500000000,
  bhk: [],
  furnishing: [],
  verificationOnly: false,
  readyToMoveOnly: false,
  sortBy: "relevance",
  viewMode: "list",

  setPurpose: (purpose) => set({ purpose }),
  setCity: (city) => set({ city }),
  setLocality: (locality) => set({ locality }),
  toggleCategory: (cat) =>
    set((state) => ({
      categories: state.categories.includes(cat)
        ? state.categories.filter((c) => c !== cat)
        : [...state.categories, cat],
    })),
  setPriceRange: (min, max) => set({ minPrice: min, maxPrice: max }),
  toggleBhk: (bhkNum) =>
    set((state) => ({
      bhk: state.bhk.includes(bhkNum)
        ? state.bhk.filter((b) => b !== bhkNum)
        : [...state.bhk, bhkNum],
    })),
  toggleFurnishing: (f) =>
    set((state) => ({
      furnishing: state.furnishing.includes(f)
        ? state.furnishing.filter((item) => item !== f)
        : [...state.furnishing, f],
    })),
  setVerificationOnly: (v) => set({ verificationOnly: v }),
  setReadyToMoveOnly: (v) => set({ readyToMoveOnly: v }),
  setSortBy: (sortBy) => set({ sortBy }),
  setViewMode: (viewMode) => set({ viewMode }),
  resetFilters: () =>
    set({
      city: "All Cities",
      locality: "",
      categories: [],
      minPrice: 0,
      maxPrice: 500000000,
      bhk: [],
      furnishing: [],
      verificationOnly: false,
      readyToMoveOnly: false,
      sortBy: "relevance",
      viewMode: "list",
    }),
}));
