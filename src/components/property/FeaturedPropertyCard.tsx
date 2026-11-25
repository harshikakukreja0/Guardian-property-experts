"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Bed, Bath, Maximize2, ShieldCheck, ArrowRight, Heart, Sparkles } from "lucide-react";
import { PropertyItem } from "@/types/property.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { formatArea } from "@/utils/formatters";

export function FeaturedPropertyCard({ property }: { property: PropertyItem }) {
  const { savedPropertyIds, toggleSaveProperty } = useAuthStore();
  const isSaved = savedPropertyIds.includes(property.id);

  return (
    <div className="group rounded-3xl bg-white border border-stone-200/90 hover:border-[#65B32E] shadow-xl hover:shadow-[0_25px_60px_rgba(0,60,20,0.18)] transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
      {/* Visual Image Section */}
      <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[440px] overflow-hidden bg-stone-950">
        <Image
          src={property.images[0] || "/images/architecture.jpg"}
          alt={property.title}
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#003C14] to-[#65B32E] text-white font-black uppercase tracking-wider text-[11px] shadow-lg border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Featured Spotlight</span>
          </div>
          <Badge variant="luxury">{property.status}</Badge>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleSaveProperty(property.id);
          }}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur-md flex items-center justify-center shadow-lg transition ${
            isSaved ? "text-rose-600" : "text-stone-700 hover:text-rose-600"
          }`}
          title={isSaved ? "Remove from saved" : "Save property"}
        >
          <Heart className={`w-5 h-5 ${isSaved ? "fill-rose-600" : ""}`} />
        </button>

        <div className="absolute bottom-5 left-5 right-5 text-white">
          <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold mb-1">
            <MapPin className="w-4 h-4 text-[#65B32E]" />
            <span>
              {property.location.locality}, {property.location.city}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow">
            {property.title}
          </h3>
        </div>
      </div>

      {/* Narrative & Specifications Section */}
      <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider">
                All-Inclusive Price
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#003C14]">
                {property.pricing.displayPrice}
              </div>
            </div>
            {property.verificationStatus === "verified" && (
              <div className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-emerald-50 border border-[#65B32E]/40 text-[#004614] text-xs font-black">
                <ShieldCheck className="w-4 h-4 text-[#65B32E]" />
                <span>RERA VERIFIED</span>
              </div>
            )}
          </div>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
            {property.description}
          </p>

          {/* Quick Specifications */}
          <div className="grid grid-cols-3 gap-3 py-4 border-y border-stone-100 text-stone-800 text-xs font-bold">
            <div className="flex flex-col">
              <span className="text-[10px] text-stone-400 uppercase font-semibold">BHK</span>
              <span className="flex items-center gap-1 mt-0.5 text-sm font-extrabold text-[#003C14]">
                <Bed className="w-4 h-4 text-[#65B32E]" />
                {property.details.bhk} BHK
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-stone-400 uppercase font-semibold">Carpet Area</span>
              <span className="flex items-center gap-1 mt-0.5 text-sm font-extrabold text-[#003C14]">
                <Maximize2 className="w-4 h-4 text-[#65B32E]" />
                {formatArea(property.details.carpetArea)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-stone-400 uppercase font-semibold">Furnishing</span>
              <span className="mt-0.5 truncate text-xs font-bold text-stone-700">{property.details.furnishing}</span>
            </div>
          </div>

          {/* Amenities Highlights */}
          <div className="flex flex-wrap gap-1.5">
            {property.amenities.slice(0, 4).map((a) => (
              <span
                key={a}
                className="text-[11px] bg-emerald-50 text-[#004614] font-bold px-2.5 py-1 rounded-lg border border-[#65B32E]/20"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Action Link in Logo Gradient */}
        <div className="pt-6">
          <Link href={`/property/${property.slug}`} className="block">
            <Button className="w-full flex items-center justify-center gap-2 font-bold text-sm h-12 shadow-lg">
              <span>Explore Complete Residence</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
