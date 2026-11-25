"use client";

import React, { useState, useMemo } from "react";
import { MainHeader } from "@/components/common/MainHeader";
import { MainFooter } from "@/components/common/MainFooter";
import { AdvancedFilters } from "@/components/property/AdvancedFilters";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyMap } from "@/components/property/PropertyMap";
import { SortDropdown } from "@/components/property/SortDropdown";
import { useFilterStore } from "@/store/filterStore";
import { MOCK_PROPERTIES } from "@/services/mock/properties.data";
import { LayoutGrid, Map, ArrowUpDown, SlidersHorizontal, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommercialPage() {
  const {
    city,
    locality,
    categories,
    minPrice,
    maxPrice,
    verificationOnly,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
  } = useFilterStore();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProperties = useMemo(() => {
    let list = MOCK_PROPERTIES.filter((p) => p.purpose === "commercial");

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

    if (verificationOnly) {
      list = list.filter((p) => p.verificationStatus === "verified");
    }

    return list;
  }, [city, locality, categories, minPrice, maxPrice, verificationOnly, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50">
      <MainHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-8 min-w-0">
        <div className="mb-6 space-y-1">
          <div className="text-xs text-stone-500">
            Home &bull; Commercial Real Estate {city !== "All Cities" ? ` • in ${city}` : ""}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight break-words">
              Commercial Offices &amp; Retail Spaces {city !== "All Cities" ? `in ${city}` : "Across India"}
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              Grade A Tech Parks
            </span>
          </div>
          <p className="text-xs text-stone-500">
            Showing {filteredProperties.length} verified commercial office plates, corporate IT parks and high-street retail shops
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/90 p-3 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700"
          >
            <SlidersHorizontal className="w-4 h-4 text-gpe-forest" />
            <span>Filters</span>
          </button>

          <SortDropdown
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: "relevance", label: "Most Relevant" },
              { value: "latest", label: "Newly Listed" },
              { value: "price-asc", label: "Price: Low to High" },
              { value: "price-desc", label: "Price: High to Low" },
            ]}
          />

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <aside className="hidden lg:block lg:col-span-3 sticky top-28">
            <AdvancedFilters />
          </aside>

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
                  <Briefcase className="w-8 h-8 text-gpe-forest" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">No Commercial Spaces Found</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try broadening your location or budget parameters to explore available office towers.
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
