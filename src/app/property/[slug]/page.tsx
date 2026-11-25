"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  ShieldCheck,
  Phone,
  Mail,
  Heart,
  Share2,
  Compass,
  Building,
  CheckCircle2,
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { MainHeader } from "@/components/common/MainHeader";
import { MainFooter } from "@/components/common/MainFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ScheduleVisitModal } from "@/components/property/ScheduleVisitModal";
import { ContactSellerModal } from "@/components/property/ContactSellerModal";
import { MOCK_PROPERTIES } from "@/services/mock/properties.data";
import { useAuthStore } from "@/store/authStore";
import { formatArea } from "@/utils/formatters";

export default function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const property = MOCK_PROPERTIES.find((p) => p.slug === slug || p.id === slug);

  if (!property) {
    notFound();
  }

  const { savedPropertyIds, toggleSaveProperty } = useAuthStore();
  const isSaved = savedPropertyIds.includes(property.id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const similarProperties = MOCK_PROPERTIES.filter(
    (p) => p.id !== property.id && (p.purpose === property.purpose || p.category === property.category)
  ).slice(0, 3);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50">
      <MainHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 min-w-0">
        {/* Breadcrumb & Navigation Back */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-stone-500 flex items-center gap-1.5 sm:gap-2 min-w-0">
            <Link href="/" className="hover:text-gpe-forest shrink-0">
              Home
            </Link>
            <span className="shrink-0">&bull;</span>
            <Link href={`/${property.purpose}`} className="hover:text-gpe-forest capitalize shrink-0">
              {property.purpose}
            </Link>
            <span className="shrink-0">&bull;</span>
            <span className="text-stone-800 font-medium truncate max-w-[140px] sm:max-w-xs">{property.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700 shadow-xs transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? "Link Copied!" : "Share"}</span>
            </button>
            <button
              onClick={() => toggleSaveProperty(property.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border bg-white text-xs font-semibold shadow-xs transition ${
                isSaved
                  ? "border-rose-200 text-rose-600 bg-rose-50/50"
                  : "border-stone-200 text-stone-700 hover:text-rose-600"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-rose-600" : ""}`} />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>

        {/* Gallery Section */}
        <section className="space-y-3">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-xl bg-stone-900">
            <Image
              src={property.images[activeImageIndex] || property.images[0]}
              alt={property.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Left/Right Carousel Controls */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIndex((idx) =>
                      idx === 0 ? property.images.length - 1 : idx - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-stone-900 flex items-center justify-center shadow-lg transition backdrop-blur-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((idx) =>
                      idx === property.images.length - 1 ? 0 : idx + 1
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-stone-900 flex items-center justify-center shadow-lg transition backdrop-blur-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image Counter Badge */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
              {activeImageIndex + 1} / {property.images.length} Photos
            </div>
          </div>

          {/* Thumbnails Row */}
          {property.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {property.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                    activeImageIndex === index
                      ? "border-gpe-forest ring-2 ring-emerald-400"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Main Content Layout: Details (8 cols) + Sticky Seller Card (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Property Full Details */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8 min-w-0">
            {/* Header Info */}
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {property.verificationStatus === "verified" && (
                  <Badge variant="verified" className="flex items-center gap-1.5 px-3 py-1 text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>RERA Verified Listing</span>
                  </Badge>
                )}
                <Badge variant="luxury">{property.status}</Badge>
                <Badge variant="secondary">{property.category}</Badge>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {property.title}
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gpe-emerald shrink-0" />
                  <span>{property.location.address}, {property.location.locality}, {property.location.city} - {property.location.pincode}</span>
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-150 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                    All-Inclusive Price
                  </span>
                  <div className="text-3xl font-extrabold text-gpe-forest">
                    {property.pricing.displayPrice}
                  </div>
                </div>
                {property.pricing.pricePerSqFt && (
                  <div className="text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                      Price per Sq.Ft.
                    </span>
                    <span className="text-base font-bold text-stone-800">
                      ₹{property.pricing.pricePerSqFt.toLocaleString("en-IN")} / sq.ft.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-stone-900">Key Specifications</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <Bed className="w-5 h-5 text-gpe-emerald mb-2" />
                  <span className="text-[11px] text-stone-400 font-semibold block uppercase">Bedrooms</span>
                  <span className="text-sm font-bold text-stone-800">
                    {property.details.bhk > 0 ? `${property.details.bhk} BHK` : "Commercial"}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <Bath className="w-5 h-5 text-gpe-emerald mb-2" />
                  <span className="text-[11px] text-stone-400 font-semibold block uppercase">Bathrooms</span>
                  <span className="text-sm font-bold text-stone-800">{property.details.bathrooms}</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <Maximize2 className="w-5 h-5 text-gpe-emerald mb-2" />
                  <span className="text-[11px] text-stone-400 font-semibold block uppercase">Carpet Area</span>
                  <span className="text-sm font-bold text-stone-800">{formatArea(property.details.carpetArea)}</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <Building className="w-5 h-5 text-gpe-emerald mb-2" />
                  <span className="text-[11px] text-stone-400 font-semibold block uppercase">Floor Details</span>
                  <span className="text-sm font-bold text-stone-800">{property.details.floor} of {property.details.totalFloors}</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <Compass className="w-5 h-5 text-gpe-emerald mb-2" />
                  <span className="text-[11px] text-stone-400 font-semibold block uppercase">Facing</span>
                  <span className="text-sm font-bold text-stone-800">{property.details.facing || "North"}</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <Calendar className="w-5 h-5 text-gpe-emerald mb-2" />
                  <span className="text-[11px] text-stone-400 font-semibold block uppercase">Property Age</span>
                  <span className="text-sm font-bold text-stone-800">{property.details.propertyAge || "New"}</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <Sparkles className="w-5 h-5 text-gpe-emerald mb-2" />
                  <span className="text-[11px] text-stone-400 font-semibold block uppercase">Furnishing</span>
                  <span className="text-sm font-bold text-stone-800">{property.details.furnishing}</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <ShieldCheck className="w-5 h-5 text-gpe-emerald mb-2" />
                  <span className="text-[11px] text-stone-400 font-semibold block uppercase">Parking</span>
                  <span className="text-sm font-bold text-stone-800">{property.details.parkingAvailable}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-stone-900">About this Property</h3>
              <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-stone-900">World-Class Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-stone-150 bg-stone-50/50 text-xs font-semibold text-stone-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gpe-emerald shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal & RERA Disclosures */}
            <div className="bg-emerald-50/50 rounded-3xl border border-emerald-100 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2 text-gpe-forest font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Verified Legal & Regulatory Disclosures</span>
              </div>
              <p className="text-xs text-emerald-950/80 leading-relaxed">
                This asset has been audited by Guardian PropertyExpert compliance team. The land title is non-encumbered and all sanctioned building layout approvals have been authenticated.
              </p>
              {property.details.reraId && (
                <div className="inline-block px-3 py-1.5 rounded-lg bg-white border border-emerald-200 text-xs font-bold text-emerald-900">
                  RERA Registration: {property.details.reraId}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Seller & Action Card */}
          <aside className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-xl space-y-6">
              {/* Seller Profile */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-stone-100">
                <div className="w-14 h-14 rounded-2xl bg-gpe-forest text-emerald-300 font-bold text-xl flex items-center justify-center shrink-0">
                  {property.seller.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-gpe-emerald font-bold uppercase tracking-wider block">
                    Verified {property.seller.type}
                  </span>
                  <h4 className="text-base font-bold text-stone-900 truncate">
                    {property.seller.name}
                  </h4>
                  {property.seller.companyName && (
                    <p className="text-xs text-stone-500 truncate">{property.seller.companyName}</p>
                  )}
                </div>
              </div>

              {/* Action CTAs */}
              <div className="space-y-3">
                <Button
                  onClick={() => setScheduleModalOpen(true)}
                  className="w-full h-12 text-sm font-bold shadow-md shadow-gpe-forest/20"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Schedule Private Site Visit</span>
                </Button>

                <Button
                  onClick={() => setContactModalOpen(true)}
                  variant="outline"
                  className="w-full h-12 text-sm font-bold border-gpe-forest text-gpe-forest hover:bg-emerald-50"
                >
                  <Phone className="w-4 h-4 mr-2 text-gpe-emerald" />
                  <span>Contact Seller Directly</span>
                </Button>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 text-xs text-stone-500 space-y-1">
                <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Buyer Assurance Program</span>
                </div>
                <p className="text-[11px]">Zero hidden fees. Transparent legal title verified by Guardian Advisory.</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <section className="pt-12 border-t border-stone-200">
            <h3 className="text-xl font-extrabold text-stone-900 tracking-tight mb-6">
              Similar Verified Properties
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Interactive Action Modals */}
      <ScheduleVisitModal
        property={property}
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />
      <ContactSellerModal
        property={property}
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      <MainFooter />
    </div>
  );
}
