"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Building2,
  TrendingUp,
  Award,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Star,
  ChevronRight,
  Calculator,
  Coins,
  FileText,
  Home,
  Check,
  Phone,
} from "lucide-react";
import { MainHeader } from "@/components/common/MainHeader";
import { MainFooter } from "@/components/common/MainFooter";
import { SearchBar } from "@/components/common/SearchBar";
import { PropertyCard } from "@/components/property/PropertyCard";
import { FeaturedPropertyCard } from "@/components/property/FeaturedPropertyCard";
import { ProjectCard } from "@/components/project/ProjectCard";
import { BuilderCard } from "@/components/project/BuilderCard";
import { Button } from "@/components/ui/button";
import { useFilterStore } from "@/store/filterStore";
import { MOCK_PROPERTIES } from "@/services/mock/properties.data";
import { MOCK_PROJECTS, MOCK_BUILDERS } from "@/services/mock/projects.data";

export default function HomePage() {
  const { city } = useFilterStore();
  const activeCity = city && city !== "All Cities" ? city : "Mumbai";

  const [propertyFilter, setPropertyFilter] = useState<"all" | "buy" | "rent" | "commercial">("all");

  const filteredProperties = MOCK_PROPERTIES.filter((p) => {
    if (propertyFilter === "all") return true;
    return p.purpose === propertyFilter;
  });

  const featuredProperties = MOCK_PROPERTIES.filter((p) => p.isFeatured);
  const trendingProjects = MOCK_PROJECTS.slice(0, 3);
  const topBuilders = MOCK_BUILDERS.slice(0, 4);

  // EMI Calculator State (matching the Home Loan Assistant calculation engine)
  const [loanAmount, setLoanAmount] = useState(15000000); // 1.5 Cr
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  // Calculate EMI
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const popularLocalities = [
    { name: "Worli Sea Face", city: "Mumbai", count: "142 Properties", avgPrice: "₹45,000 / sq.ft", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80", growth: "+14.2% YoY" },
    { name: "Golf Course Road", city: "Gurugram", count: "98 Properties", avgPrice: "₹28,500 / sq.ft", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80", growth: "+18.6% YoY" },
    { name: "Indiranagar & Lavelle", city: "Bangalore", count: "86 Properties", avgPrice: "₹22,000 / sq.ft", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80", growth: "+11.4% YoY" },
    { name: "Powai & Hiranandani", city: "Mumbai", count: "115 Properties", avgPrice: "₹26,000 / sq.ft", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80", growth: "+12.8% YoY" },
  ];

  const curatedCollections = [
    {
      title: "Waterfront Residences",
      subtitle: "Unobstructed Arabian Sea & Lake Panoramas",
      count: "38 Residences",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      link: "/buy?category=Apartment",
    },
    {
      title: "Luxury Villas",
      subtitle: "Living on Championship 18-Hole Greens & Private Estates",
      count: "24 Estates",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      link: "/buy?category=Villa",
    },
    {
      title: "Grade A Commercial Spaces",
      subtitle: "LEED Platinum Corporate Headquarters & Retail Hubs",
      count: "52 Office Floors",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      link: "/commercial",
    },
  ];

  const testimonials = [
    {
      name: "Harishchandra Singhania",
      role: "Managing Director, Singhania Industrial Holdings",
      text: "Guardian Property Experts made our acquisition of the Worli sea-facing sky villa completely transparent. The title clearance, confidential negotiation, and concierge site tour were flawless.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Dr. Priyamvada Birla",
      role: "Healthcare Entrepreneur & Angel Investor",
      text: "The dedicated CRM and legal diligence team verified all municipal approvals before we made the booking for our Nandi Hills estate. Highest caliber real estate service in India.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50">
      <MainHeader />

      <main className="flex-1">
        {/* ── 1. HERO SECTION (MINIMAL, CENTER-ALIGNED, HOUSING.COM REFERENCE) ── */}
        <section
          className="relative min-h-[580px] sm:min-h-[640px] flex flex-col justify-center items-center overflow-hidden px-4 pt-28 sm:pt-36 pb-20 sm:pb-24 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/guardian-hero-estate.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Subtle natural daylight overlay across the hero */}
          <div className="absolute inset-0 bg-white/20 backdrop-brightness-95 pointer-events-none" />

          {/* Hero Content: Center-Aligned, Clean Minimal Single-Line Title */}
          <div className="relative z-10 w-full max-w-5xl mx-auto space-y-5 text-center">
            {/* Minimal Single-Line Heading (Housing.com Style) */}
            <div className="space-y-1.5 max-w-3xl mx-auto px-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#1a2b1f] drop-shadow-xs">
                Houses &amp; Properties in {activeCity}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-stone-700/90">
                Verified Listings &bull; RERA Audited &bull; Zero Brokerage Options
              </p>
            </div>

            {/* Search Bar Component (Centered & Fully Responsive) */}
            <div className="w-full">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* ── 2. THREE IMPORTANT FINANCIAL & DOCUMENTATION SERVICES CARD ── */}
        <section className="max-w-5xl mx-auto px-4 -mt-10 sm:-mt-12 relative z-30">
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-[0_15px_50px_-12px_rgba(0,0,0,0.12)] border border-[#E5EAE5] grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-[#E5EAE5]">
            {/* Service 1: Stamp Duty Calculator */}
            <Link
              href="/services/stamp-duty"
              className="flex items-center justify-between px-2 sm:px-6 group hover:opacity-95 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#F0F7F0] border border-emerald-100 flex items-center justify-center text-[#064B25] shrink-0 group-hover:scale-105 transition-transform">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#202820] group-hover:text-[#064B25] transition">
                    Stamp Duty Calculator
                  </h3>
                  <p className="text-[11px] text-stone-500 font-medium">State charges &amp; registration</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-stone-200 group-hover:border-[#064B25] group-hover:bg-[#F0F7F0] flex items-center justify-center text-stone-500 group-hover:text-[#064B25] transition shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Service 2: Home Loan Assistant */}
            <Link
              href="/services/home-loan"
              className="flex items-center justify-between px-2 sm:px-6 group hover:opacity-95 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#F0F7F0] border border-emerald-100 flex items-center justify-center text-[#064B25] shrink-0 group-hover:scale-105 transition-transform">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#202820] group-hover:text-[#064B25] transition">
                    Home Loan Assistant
                  </h3>
                  <p className="text-[11px] text-stone-500 font-medium">Affordability &amp; EMI calculation</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-stone-200 group-hover:border-[#064B25] group-hover:bg-[#F0F7F0] flex items-center justify-center text-stone-500 group-hover:text-[#064B25] transition shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Service 3: Agreement Generation */}
            <Link
              href="/services/agreements"
              className="flex items-center justify-between px-2 sm:px-6 group hover:opacity-95 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#F0F7F0] border border-emerald-100 flex items-center justify-center text-[#064B25] shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#202820] group-hover:text-[#064B25] transition">
                    Agreement Generation
                  </h3>
                  <p className="text-[11px] text-stone-500 font-medium">Rent, lease &amp; sale contracts</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-stone-200 group-hover:border-[#064B25] group-hover:bg-[#F0F7F0] flex items-center justify-center text-stone-500 group-hover:text-[#064B25] transition shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </section>

        {/* ── 3. TRUST & STATISTICS STRIP (MATCHES REFERENCE DESIGN) ── */}
        <section className="max-w-5xl mx-auto px-4 mt-8 relative z-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 py-4 px-6 rounded-2xl bg-[#F0F7F0]/80 border border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-[#064B25] shrink-0 shadow-2xs">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black text-[#003D1C] block leading-tight">14,850+</span>
                <span className="text-[11px] text-stone-600 font-bold">Verified Properties</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-[#064B25] shrink-0 shadow-2xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black text-[#003D1C] block leading-tight">100%</span>
                <span className="text-[11px] text-stone-600 font-bold">RERA Audited</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-[#064B25] shrink-0 shadow-2xs">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black text-[#003D1C] block leading-tight">₹850+ Cr</span>
                <span className="text-[11px] text-stone-600 font-bold">Assets Transacted</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-[#064B25] shrink-0 shadow-2xs">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black text-[#003D1C] block leading-tight">8 Roles</span>
                <span className="text-[11px] text-stone-600 font-bold">Unified Portal</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. EXPLORE PREMIUM PROPERTIES WITH FILTERS ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-[#064B25] uppercase tracking-wider mb-1.5">
                <Sparkles className="w-4 h-4 text-[#65B52E]" />
                <span>Verified Marketplace</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#202820] tracking-tight">
                Explore Premium Properties
              </h2>
            </div>

            {/* Filter Tabs: All, Buy, Rent, Commercial */}
            <div className="flex items-center p-1 rounded-2xl bg-white border border-[#E5EAE5] shadow-xs">
              {[
                { id: "all", label: "All Properties" },
                { id: "buy", label: "For Sale" },
                { id: "rent", label: "For Rent" },
                { id: "commercial", label: "Commercial" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setPropertyFilter(f.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    propertyFilter === f.id
                      ? "bg-[#064B25] text-white shadow-xs"
                      : "text-stone-600 hover:text-[#064B25]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.slice(0, 6).map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/buy">
              <Button variant="outline" className="border-[#064B25] text-[#064B25] font-bold px-8 h-12 rounded-full hover:bg-[#F0F7F0]">
                <span>View All Properties</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </section>

        {/* ── 5. CURATED ARCHITECTURAL COLLECTIONS ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#E5EAE5]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-[#064B25] uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-[#65B52E]" />
                <span>Handcrafted Selections</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                Curated Architectural Collections
              </h2>
            </div>
            <Link
              href="/buy"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#064B25] hover:text-[#65B52E] transition"
            >
              <span>Explore All Luxury Collections</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {curatedCollections.map((col) => (
              <Link
                key={col.title}
                href={col.link}
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone-900 shadow-md hover:shadow-2xl transition-all duration-300 border border-stone-200 hover:border-[#65B52E]"
              >
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.75]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-[#003D1C]/80 backdrop-blur-md text-emerald-300 text-xs font-black border border-emerald-400/40">
                    {col.count}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <h3 className="text-xl font-bold group-hover:text-emerald-300 transition leading-tight">
                    {col.title}
                  </h3>
                  <p className="text-xs text-stone-300">{col.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 6. HIGH-GROWTH NEIGHBORHOODS ── */}
        <section className="bg-stone-100/60 py-20 border-y border-[#E5EAE5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-black text-[#064B25] uppercase tracking-wider mb-2">
                  <Compass className="w-4 h-4 text-[#65B52E]" />
                  <span>Investment Hotspots</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  Explore High-Growth Neighborhoods
                </h2>
              </div>
              <Link
                href="/buy"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#064B25] hover:text-[#65B52E] transition"
              >
                <span>View All 30+ Localities</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularLocalities.map((loc) => (
                <Link
                  key={loc.name}
                  href={`/buy?locality=${encodeURIComponent(loc.name)}`}
                  className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-stone-900 shadow-md hover:shadow-2xl transition-all duration-300 border border-stone-200 hover:border-[#65B52E]"
                >
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.7]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#65B52E] text-white text-[10px] font-black shadow-md">
                      <TrendingUp className="w-3 h-3 text-white" />
                      {loc.growth}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[11px] text-emerald-300 font-bold uppercase tracking-wider block mb-1">
                      {loc.city}
                    </span>
                    <h3 className="text-lg font-bold leading-tight group-hover:text-emerald-200 transition">
                      {loc.name}
                    </h3>
                    <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between text-xs text-stone-300">
                      <span>{loc.count}</span>
                      <span className="font-semibold">{loc.avgPrice}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. INTERACTIVE HOME LOAN & INVESTMENT EMI HIGHLIGHT ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="rounded-3xl bg-gradient-to-br from-[#003D1C] via-[#064B25] to-[#00280D] text-white p-8 sm:p-12 shadow-2xl border border-emerald-400/20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 text-xs font-black border border-emerald-400/30">
                  <Calculator className="w-4 h-4 text-[#65B52E]" />
                  <span>Financial Intelligence</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                  Calculate Your Home Loan &amp; Investment EMI
                </h2>

                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-light">
                  Plan your real estate purchase with competitive bank rates from HDFC, SBI, ICICI, and Kotak Mahindra. Connect with Guardian mortgage advisors.
                </p>

                {/* Range Sliders */}
                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-emerald-200">Loan Amount</span>
                      <span className="text-[#65B52E] text-sm font-black">₹{(loanAmount / 10000000).toFixed(2)} Cr</span>
                    </div>
                    <input
                      type="range"
                      min={2000000}
                      max={100000000}
                      step={500000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-[#65B52E]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-emerald-200">Interest Rate (% p.a.)</span>
                      <span className="text-[#65B52E] text-sm font-black">{interestRate}%</span>
                    </div>
                    <input
                      type="range"
                      min={7.5}
                      max={13}
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-[#65B52E]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-emerald-200">Tenure (Years)</span>
                      <span className="text-[#65B52E] text-sm font-black">{tenureYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      step={1}
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-[#65B52E]"
                    />
                  </div>
                </div>
              </div>

              {/* EMI Output Card */}
              <div className="lg:col-span-6 bg-black/40 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="text-center pb-6 border-b border-white/10">
                  <span className="text-xs uppercase font-black tracking-widest text-[#65B52E]">
                    Estimated Monthly EMI
                  </span>
                  <div className="text-3xl sm:text-5xl font-black text-white mt-1">
                    ₹{emi.toLocaleString("en-IN")}
                  </div>
                  <span className="text-[11px] text-stone-300">per month</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3.5 rounded-2xl bg-[#00280D]/80 border border-white/10">
                    <span className="text-[11px] text-stone-300 block font-semibold">Total Principal</span>
                    <span className="text-sm font-bold text-white">₹{(loanAmount / 10000000).toFixed(2)} Cr</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#00280D]/80 border border-white/10">
                    <span className="text-[11px] text-stone-300 block font-semibold">Total Interest Payable</span>
                    <span className="text-sm font-bold text-[#65B52E]">₹{(totalInterest / 10000000).toFixed(2)} Cr</span>
                  </div>
                </div>

                <Link href="/services/home-loan" className="block pt-2">
                  <Button className="w-full bg-[#064B25] hover:bg-[#003D1C] text-white font-bold h-12 rounded-2xl shadow-xl flex items-center justify-center gap-2 border border-emerald-400/40">
                    <span>Get Instant Home Loan Assistance</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. TRENDING NEW RESIDENTIAL LAUNCHES ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[#E5EAE5]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-[#064B25] uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4 text-[#65B52E]" />
                <span>Premier Masterplans</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                Trending New Residential Launches
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#064B25] hover:text-[#65B52E] transition"
            >
              <span>Explore All Projects</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingProjects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        </section>

        {/* ── 9. VERIFIED BUILDERS ── */}
        <section className="bg-stone-100/70 py-20 border-y border-[#E5EAE5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-black text-[#064B25] uppercase tracking-wider">
                India&apos;s Leading Developers
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-1">
                A-Grade Verified Builders
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                Collaborating with developers who uphold uncompromising construction standards, RERA compliance, and on-time delivery records.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topBuilders.map((builder) => (
                <BuilderCard key={builder.id} builder={builder} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 10. CUSTOMER TESTIMONIALS ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 text-xs font-black text-[#064B25] uppercase tracking-wider mb-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Verified Feedback</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Trusted by Homebuyers, Investors &amp; Property Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="group p-8 rounded-3xl bg-white border border-[#E5EAE5] shadow-xs hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] hover:border-stone-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={44}
                    height={44}
                    className="rounded-full object-cover ring-2 ring-stone-100 group-hover:ring-[#064B25]/20 transition-all"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#202820] group-hover:text-[#064B25] transition-colors">{t.name}</h4>
                    <p className="text-[11px] text-stone-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 11. ULTRA-PREMIUM FINAL CTA SECTION ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#00220e] via-[#003819] to-[#014a22] text-white py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/40">
          {/* Ambient Lighting Orbs & Grid Pattern */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-[450px] h-[450px] bg-[#65B52E]/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.04] pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#85E347] text-xs font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#85E347] animate-pulse" />
              <span>Direct Property Owner &amp; Builder Network</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Looking to Sell, Rent or Showcase <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-emerald-200 via-white to-[#85E347] bg-clip-text text-transparent">
                  Your Premium Property?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
                Publish directly to verified investors and HNIs across India. Get free listing assistance, high-visibility buyer matches, and expert legal contract drafting included.
              </p>
            </div>

            {/* 3 Key Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto pt-2">
              <div className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/10 text-emerald-100 text-xs font-medium shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#85E347] shrink-0" />
                <span>Zero Hidden Brokerage</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/10 text-emerald-100 text-xs font-medium shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#85E347] shrink-0" />
                <span>100% Verified Buyer Pool</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/10 text-emerald-100 text-xs font-medium shadow-sm">
                <Building2 className="w-4 h-4 text-[#85E347] shrink-0" />
                <span>Free Legal Contract Drafting</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <Link href="/submit-property" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-[#65B52E] to-[#4fa01e] hover:from-[#579f26] hover:to-[#438a19] text-white font-extrabold px-8 h-12 rounded-full text-sm sm:text-base shadow-lg shadow-[#65B52E]/30 hover:shadow-[#65B52E]/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5">
                  <span>Post Your Property (Free)</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/auth/register?role=builder" className="w-full sm:w-auto">
                <Button variant="glass" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold px-8 h-12 rounded-full text-sm sm:text-base backdrop-blur-md shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-200" />
                  <span>Register as Builder / Dealer</span>
                </Button>
              </Link>
            </div>

            {/* Subtle Trust Counter */}
            <p className="text-[11px] sm:text-xs text-emerald-200/60 font-medium pt-2">
              ✨ Trusted by 12,000+ Property Owners, Top Developers &amp; HNIs across Mumbai, Delhi NCR, Bangalore &amp; Pune
            </p>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
}
