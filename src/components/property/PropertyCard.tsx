"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { PropertyItem } from "@/types/property.types";
import { useAuthStore } from "@/store/authStore";
import { formatArea } from "@/utils/formatters";
import { ScheduleVisitModal } from "./ScheduleVisitModal";

export function PropertyCard({ property }: { property: PropertyItem }) {
  const { savedPropertyIds, toggleSaveProperty } = useAuthStore();
  const isSaved = savedPropertyIds.includes(property.id);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveProperty(property.id);
  };

  return (
    <>
      <div className="group w-full max-w-full min-w-0 rounded-3xl bg-white border border-stone-200/80 hover:border-[#064B25]/40 shadow-xs hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between">
        {/* 1. Clean Visual Header (Minimal Overlays) */}
        <Link href={`/property/${property.slug}`} className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 block">
          <Image
            src={property.images[0] || "/images/architecture.jpg"}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none" />

          {/* Top Left: Single Verified Pill */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            {property.verificationStatus === "verified" && (
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#064B25] text-[10px] font-bold shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16803B]" />
                <span>RERA Verified</span>
              </div>
            )}
          </div>

          {/* Top Right: Save Heart Button */}
          <button
            type="button"
            onClick={handleSave}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-md flex items-center justify-center shadow-xs transition cursor-pointer ${
              isSaved ? "text-rose-600" : "text-stone-600 hover:text-rose-600"
            }`}
            title={isSaved ? "Remove from saved" : "Save property"}
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-rose-600" : ""}`} />
          </button>

          {/* Bottom Left: Subtle Status Tag */}
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-0.5 rounded-full bg-black/55 backdrop-blur-md text-white text-[10px] font-semibold tracking-wide">
              {property.status}
            </span>
          </div>
        </Link>

        {/* 2. Spacious & Minimal Card Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 min-w-0">
          <div className="space-y-1.5 min-w-0">
            {/* Price & Category Row */}
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex flex-wrap items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-[#064B25]">
                  {property.pricing.displayPrice}
                </span>
                {property.pricing.pricePerSqFt && (
                  <span className="text-[11px] text-stone-400 font-medium">
                    ₹{property.pricing.pricePerSqFt.toLocaleString("en-IN")}/sq.ft
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full shrink-0">
                {property.category}
              </span>
            </div>

            {/* Title */}
            <Link href={`/property/${property.slug}`}>
              <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-[#064B25] line-clamp-1 transition-colors leading-snug">
                {property.title}
              </h3>
            </Link>

            {/* Locality */}
            <div className="flex items-center gap-1 text-xs text-stone-500 font-medium min-w-0">
              <MapPin className="w-3.5 h-3.5 text-[#064B25] shrink-0" />
              <span className="truncate">
                {property.location.locality}, {property.location.city}
              </span>
            </div>
          </div>

          {/* Clean Inline Specs (Zero Truncation) */}
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 py-2.5 border-y border-stone-100 text-xs font-semibold text-stone-700">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-[#064B25] shrink-0" />
              <span>{property.details.bhk > 0 ? `${property.details.bhk} BHK` : "Commercial"}</span>
            </div>
            <span className="text-stone-300 hidden min-[340px]:inline">&bull;</span>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-[#064B25] shrink-0" />
              <span>{property.details.bathrooms} Baths</span>
            </div>
            <span className="text-stone-300 hidden min-[340px]:inline">&bull;</span>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#064B25] shrink-0" />
              <span>{formatArea(property.details.carpetArea)}</span>
            </div>
          </div>

          {/* Minimal Footer: Seller Info & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-stone-800 truncate">
                {property.seller.companyName || property.seller.name}
              </p>
              <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">
                {property.seller.type}
              </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setScheduleModalOpen(true)}
                className="p-2 rounded-full bg-stone-50 hover:bg-[#F0F7F0] text-stone-600 hover:text-[#064B25] transition cursor-pointer"
                title="Schedule Tour"
              >
                <Calendar className="w-4 h-4" />
              </button>
              <Link href={`/property/${property.slug}`}>
                <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#064B25] hover:bg-[#003D1C] text-white text-xs font-bold transition shadow-xs">
                  View Home
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ScheduleVisitModal
        property={property}
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />
    </>
  );
}
