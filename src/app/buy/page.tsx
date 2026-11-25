"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MainHeader } from "@/components/common/MainHeader";
import { MainFooter } from "@/components/common/MainFooter";
import { AdvancedFilters } from "@/components/property/AdvancedFilters";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyMap } from "@/components/property/PropertyMap";
import { SortDropdown } from "@/components/property/SortDropdown";
import { ListingHeading } from "@/components/common/ListingHeading";
import { useFilterStore } from "@/store/filterStore";
import { MOCK_PROPERTIES } from "@/services/mock/properties.data";
import { LayoutGrid, Map, ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BuyPage() {
  const {
    city,
    locality,
    categories,
    minPrice,
    maxPrice,
    bhk,
    furnishing,
    verificationOnly,
    readyToMoveOnly,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
  } = useFilterStore();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProperties = useMemo(() => {
    let list = MOCK_PROPERTIES.filter((p) => p.purpose === "buy");

    if (city && city !== "All Cities") {
      list = list.filter((p) => p.location.city.toLowerCase() === city.toLowerCase());
    }

    if (locality) {
      list = list.filter(
        (p) =>
          p.location.locality.toLowerCase().includes(locality.toLowerCase()) ||
          p.title.toLowerCase().includes(locality.toLowerCase())
      );
    }

    if (categories.length > 0) {
      list = list.filter((p) => categories.includes(p.category));
    }

    if (minPrice > 0) {
      list = list.filter((p) => p.pricing.price >= minPrice);
    }

    if (maxPrice < 500000000) {
      list = list.filter((p) => p.pricing.price <= maxPrice);
    }

    if (bhk.length > 0) {
      list = list.filter((p) => bhk.includes(p.details.bhk));
    }

    if (furnishing.length > 0) {
      list = list.filter((p) => furnishing.includes(p.details.furnishing));
    }

    if (verificationOnly) {
      list = list.filter((p) => p.verificationStatus === "verified");
    }

    if (readyToMoveOnly) {
      list = list.filter((p) => p.status === "Ready to Move");
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.pricing.price - b.pricing.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.pricing.price - a.pricing.price);
    } else if (sortBy === "latest") {
      list.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    } else if (sortBy === "popular") {
      list.sort((a, b) => b.viewsCount - a.viewsCount);
    }

    return list;
  }, [
    city,
    locality,
    categories,
    minPrice,
    maxPrice,
    bhk,
    furnishing,
    verificationOnly,
    readyToMoveOnly,
    sortBy,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50">
      <MainHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-8 min-w-0">
        <ListingHeading
          className="mb-6"
          breadcrumbs={[
            { label: "Home", href: "/" },
            {
              label: `Properties for Sale${city !== "All Cities" ? ` • in ${city}` : ""}`,
            },
          ]}
          title={`Properties for Sale ${
            city !== "All Cities" ? `in ${city}` : "Across India"
          }`}
          description={`Showing ${filteredProperties.length} verified residential properties and luxury estates.`}
        />

        {/* Filter and View Controls Bar */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-3 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700"
          >
            <SlidersHorizontal className="w-4 h-4 text-gpe-forest" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <SortDropdown
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: "relevance", label: "Most Relevant" },
              { value: "latest", label: "Newly Listed" },
              { value: "price-asc", label: "Price: Low to High" },
              { value: "price-desc", label: "Price: High to Low" },
              { value: "popular", label: "Most Popular" },
            ]}
          />

          {/* List vs Map View Toggle */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl max-w-full">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === "list" ? "bg-white text-gpe-forest shadow-xs font-bold" : "text-stone-600"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
              <span>List View</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === "map" ? "bg-white text-gpe-forest shadow-xs font-bold" : "text-stone-600"
              }`}
            >
              <Map className="w-3.5 h-3.5 shrink-0" />
              <span>Map View</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Filters Sidebar + Results List/Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28">
            <AdvancedFilters />
          </aside>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div className="fixed inset-0 bg-black/60" onClick={() => setMobileFilterOpen(false)} />
              <div className="relative w-80 max-w-[85vw] h-full bg-white p-4 overflow-y-auto z-10 shadow-2xl">
                <AdvancedFilters />
                <Button onClick={() => setMobileFilterOpen(false)} className="w-full mt-4">
                  Apply Filters
                </Button>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <section className="lg:col-span-9 space-y-6 min-w-0 w-full">
            {viewMode === "map" ? (
              <PropertyMap properties={filteredProperties} />
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-gpe-emerald mx-auto flex items-center justify-center font-bold text-xl">
                  🏡
                </div>
                <h3 className="text-lg font-bold text-stone-900">No Properties Found</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  We couldn&apos;t find any verified listings matching your specific filter criteria. Try resetting the filters or selecting another city.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
