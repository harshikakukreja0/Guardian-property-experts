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
  Phone,
  Eye,
  CheckCircle,
  Share2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { PropertyItem } from "@/types/property.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { formatArea } from "@/utils/formatters";
import { ScheduleVisitModal } from "./ScheduleVisitModal";

export function PropertyCard({ property }: { property: PropertyItem }) {
  const { savedPropertyIds, toggleSaveProperty } = useAuthStore();
  const isSaved = savedPropertyIds.includes(property.id);
  const [copied, setCopied] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/property/${property.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveProperty(property.id);
  };

  return (
    <>
      <div className="group rounded-3xl bg-white border border-stone-200 hover:border-[#65B32E] shadow-sm hover:shadow-[0_20px_50px_rgba(0,60,20,0.14)] transition-all duration-300 overflow-hidden flex flex-col justify-between">
        {/* Property Image & Overlays */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
          <Image
            src={property.images[0] || "/images/architecture.jpg"}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 flex-wrap">
              {property.verificationStatus === "verified" && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#003C14] to-[#16852C] text-white text-[11px] font-black shadow-md backdrop-blur-md border border-[#65B32E]/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#65B32E]" />
                  <span>RERA VERIFIED</span>
                </div>
              )}
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                {property.status}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleShare}
                className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-[#004614] backdrop-blur-md flex items-center justify-center shadow-md transition"
                title="Share listing"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleSave}
                className={`w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-md flex items-center justify-center shadow-md transition ${
                  isSaved ? "text-rose-600" : "text-stone-700 hover:text-rose-600"
                }`}
                title={isSaved ? "Remove from saved" : "Save property"}
              >
                <Heart className={`w-4 h-4 ${isSaved ? "fill-rose-600" : ""}`} />
              </button>
            </div>
          </div>

          {/* Bottom Image Overlay: Price & Category */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white">
            <div>
              <div className="text-2xl font-black tracking-tight text-white drop-shadow-md">
                {property.pricing.displayPrice}
              </div>
              {property.pricing.pricePerSqFt && (
                <div className="text-[11px] text-[#86efac] font-bold drop-shadow">
                  ₹{property.pricing.pricePerSqFt.toLocaleString("en-IN")}/sq.ft.
                </div>
              )}
            </div>
            <span className="text-[11px] bg-[#002D0F]/70 backdrop-blur-md border border-[#65B32E]/40 px-2.5 py-0.5 rounded-full text-white font-bold">
              {property.category}
            </span>
          </div>
        </div>

        {/* Property Details Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            {/* Locality */}
            <div className="flex items-center gap-1 text-xs text-stone-500 font-bold truncate">
              <MapPin className="w-3.5 h-3.5 text-[#004614] shrink-0" />
              <span className="truncate">
                {property.location.locality}, {property.location.city}
              </span>
            </div>

            {/* Title */}
            <Link href={`/property/${property.slug}`}>
              <h3 className="text-base font-bold text-stone-900 group-hover:text-[#004614] line-clamp-1 transition leading-snug">
                {property.title}
              </h3>
            </Link>

            {/* Subtitle */}
            <p className="text-xs text-stone-500 line-clamp-1 font-normal">
              {property.tagline}
            </p>
          </div>

          {/* Key Metrics: BHK, Bath, Area */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-stone-800 text-xs font-bold">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#004614] flex items-center justify-center shrink-0">
                <Bed className="w-3.5 h-3.5" />
              </div>
              <span>{property.details.bhk > 0 ? `${property.details.bhk} BHK` : "Comm"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#004614] flex items-center justify-center shrink-0">
                <Bath className="w-3.5 h-3.5" />
              </div>
              <span>{property.details.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#004614] flex items-center justify-center shrink-0">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">{formatArea(property.details.carpetArea)}</span>
            </div>
          </div>

          {/* Seller Tag & Action Buttons */}
          <div className="pt-1 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 truncate">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#003C14] to-[#16852C] text-white flex items-center justify-center text-xs font-bold shrink-0">
                {property.seller.name.charAt(0)}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-stone-900 truncate">
                  {property.seller.companyName || property.seller.name}
                </span>
                <span className="text-[10px] text-[#004614] font-black uppercase tracking-wide">
                  {property.seller.type}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setScheduleModalOpen(true)}
                className="p-2 rounded-xl bg-emerald-50 hover:bg-[#65B32E]/20 text-[#004614] transition"
                title="Schedule Tour"
              >
                <Calendar className="w-4 h-4" />
              </button>
              <Link href={`/property/${property.slug}`}>
                <Button size="sm" variant="default" className="text-xs px-3.5 py-1.5 h-9 font-bold rounded-xl shadow-xs">
                  View Home
                </Button>
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
