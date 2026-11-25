"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  MapPin,
  PlusCircle,
  Menu,
  X,
  Layers,
  Heart,
  LogOut,
  Building2,
  Home,
  Briefcase,
  Calculator,
  Coins,
  FileText,
  ShieldCheck,
  TrendingUp,
  Newspaper,
  BookOpen,
  Globe2,
  ArrowRight,
  Sparkles,
  Check,
  LogIn,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useFilterStore } from "@/store/filterStore";
import { UserRole } from "@/types/user.types";

const ROLE_DASHBOARD_ROUTES: Record<UserRole, string> = {
  "super-admin": "/dashboard/super-admin",
  operations: "/dashboard/operations",
  "sales-crm": "/dashboard/sales-crm",
  broker: "/dashboard/broker",
  builder: "/dashboard/builder",
  owner: "/dashboard/owner",
  customer: "/dashboard/customer",
  support: "/dashboard/support",
};

const ROLES_LIST: { role: UserRole; label: string; icon: string }[] = [
  { role: "super-admin", label: "Super Admin", icon: "👑" },
  { role: "operations", label: "Operations Admin", icon: "⚙️" },
  { role: "sales-crm", label: "Sales / CRM", icon: "📈" },
  { role: "broker", label: "Broker Partner", icon: "💼" },
  { role: "builder", label: "Builder / Developer", icon: "🏗️" },
  { role: "owner", label: "Property Owner", icon: "🏡" },
  { role: "customer", label: "Buyer / Customer", icon: "👤" },
  { role: "support", label: "Support & Verification", icon: "🎧" },
];

const CITIES = [
  "Mumbai",
  "Delhi NCR",
  "Bangalore",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Gurugram",
  "Noida",
];

export function MainHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, switchRole, savedPropertyIds } = useAuthStore();
  const { city, setCity } = useFilterStore();

  const isHomePage = pathname === "/";

  // Dynamic Scroll State Detection (optimized for smooth responsiveness without jank)
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cityMenuOpen, setCityMenuOpen] = useState(false);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active city fallback to Mumbai
  const selectedCity = city && city !== "All Cities" ? city : "Mumbai";

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setUserMenuOpen(false);
    router.push(ROLE_DASHBOARD_ROUTES[role]);
  };

  const handleCitySelect = (c: string) => {
    setCity(c);
    setCityMenuOpen(false);
    if (!isHomePage) {
      router.push(`/buy?city=${encodeURIComponent(c)}`);
    }
  };

  const handleMouseEnterDropdown = (key: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  // Determine header background
  const isSolid = !isHomePage || isScrolled;

  // Reusable Pill Class for Navbar Items (Clean, Minimal & Responsive)
  const getPillClass = (isActive: boolean = false) => {
    if (isSolid) {
      return isActive
        ? "bg-[#064B25] text-white shadow-xs font-bold"
        : "text-[#202820] hover:text-[#064B25] hover:bg-[#F0F7F0] font-semibold";
    }
    return isActive
      ? "bg-[#064B25] text-white shadow-sm border border-[#064B25] font-extrabold"
      : "bg-white/85 hover:bg-white text-[#202820] hover:text-[#064B25] shadow-xs border border-white/70 backdrop-blur-md font-semibold";
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-200 ease-out border-0 ${
          isSolid
            ? "bg-white/95 backdrop-blur-md shadow-[0_4px_25px_-5px_rgba(0,0,0,0.06)] py-2 sm:py-2.5"
            : "bg-transparent py-2.5 sm:py-3.5 shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 min-[360px]:px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-1.5 sm:gap-3">
          {/* ── 1. LEFT: Brand Logo with Soft Frosted Gradient Pill (Snug & Fitted) ── */}
          <Link href="/" className="flex items-center group shrink-0" title="Guardian Property Experts Home">
            <div className="relative inline-flex items-center px-2 min-[360px]:px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-white/95 via-white/90 to-white/85 backdrop-blur-md shadow-xs border border-white/80 transition-transform duration-150 group-hover:scale-[1.02]">
              <div className="relative h-6 min-[360px]:h-7 sm:h-8 w-[82px] min-[360px]:w-[105px] sm:w-[118px]">
                <Image
                  src="/logo/guardian-logo-tight.png"
                  alt="Guardian Property Experts"
                  fill
                  sizes="(max-width: 360px) 82px, (max-width: 640px) 105px, 118px"
                  className="object-contain object-center"
                  priority
                />
              </div>
            </div>
          </Link>

          {/* ── 2. CENTER: Clean & Minimal Navigation (Streamlined to prevent overflow) ── */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {/* Buy Dropdown Pill */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterDropdown("buy")}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                type="button"
                onClick={() => router.push("/buy")}
                className={`flex items-center gap-1 px-2.5 py-1 xl:px-3 xl:py-1.5 rounded-full text-xs xl:text-sm transition-all duration-150 cursor-pointer ${getPillClass(
                  pathname?.startsWith("/buy") || activeDropdown === "buy"
                )}`}
              >
                <span>Buy</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {activeDropdown === "buy" && (
                <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl border border-[#E5EAE5] shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-black text-[#064B25] uppercase tracking-wider border-b border-stone-100 flex items-center justify-between">
                    <span>Buy Residential</span>
                    <span className="text-stone-400 font-normal">in {selectedCity}</span>
                  </div>
                  <div className="py-1 space-y-0.5">
                    {[
                      { title: "Ready to Move Apartments", desc: "Immediate possession, verified titles", href: "/buy?status=ready" },
                      { title: "Owner Listings (Zero Brokerage)", desc: "Direct from verified homeowners", href: "/buy?owner=true" },
                      { title: "Luxury Villas & Estates", desc: "Gated communities & private golf villas", href: "/buy?category=Villa" },
                      { title: "Affordable & Budget Homes", desc: "Starting under ₹60 Lakhs", href: "/buy?maxPrice=6000000" },
                      { title: "New Builder Launches", desc: "Pre-launch discounts & RERA vetted", href: "/projects" },
                    ].map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-2.5 py-1.5 rounded-xl hover:bg-[#F0F7F0] transition group"
                      >
                        <div className="text-xs font-bold text-[#202820] group-hover:text-[#064B25]">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">{item.desc}</div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-1.5 pt-1.5 border-t border-stone-100">
                    <Link
                      href="/buy"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center justify-between text-xs font-bold text-[#064B25] hover:underline px-2 py-0.5"
                    >
                      <span>Explore properties in {selectedCity}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Rent Dropdown Pill */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterDropdown("rent")}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                type="button"
                onClick={() => router.push("/rent")}
                className={`flex items-center gap-1 px-2.5 py-1 xl:px-3 xl:py-1.5 rounded-full text-xs xl:text-sm transition-all duration-150 cursor-pointer ${getPillClass(
                  pathname?.startsWith("/rent") || activeDropdown === "rent"
                )}`}
              >
                <span>Rent</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {activeDropdown === "rent" && (
                <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl border border-[#E5EAE5] shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-black text-[#064B25] uppercase tracking-wider border-b border-stone-100 flex items-center justify-between">
                    <span>Rent Residential</span>
                    <span className="text-stone-400 font-normal">in {selectedCity}</span>
                  </div>
                  <div className="py-1 space-y-0.5">
                    {[
                      { title: "Verified Owner Rentals", desc: "Zero brokerage, direct owner contact", href: "/rent?owner=true" },
                      { title: "Fully Furnished Homes", desc: "Move-in ready with premium interiors", href: "/rent?furnished=true" },
                      { title: "Studio & 1 BHK Rentals", desc: "Ideal for working professionals", href: "/rent?bhk=1" },
                      { title: "Gated Family Societies", desc: "24/7 security & amenities", href: "/rent?bhk=2,3" },
                    ].map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-2.5 py-1.5 rounded-xl hover:bg-[#F0F7F0] transition group"
                      >
                        <div className="text-xs font-bold text-[#202820] group-hover:text-[#064B25]">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">{item.desc}</div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-1.5 pt-1.5 border-t border-stone-100">
                    <Link
                      href="/rent"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center justify-between text-xs font-bold text-[#064B25] hover:underline px-2 py-0.5"
                    >
                      <span>Explore rentals in {selectedCity}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Commercial Dropdown Pill */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterDropdown("commercial")}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                type="button"
                onClick={() => router.push("/commercial")}
                className={`flex items-center gap-1 px-2.5 py-1 xl:px-3 xl:py-1.5 rounded-full text-xs xl:text-sm transition-all duration-150 cursor-pointer ${getPillClass(
                  pathname?.startsWith("/commercial") || activeDropdown === "commercial"
                )}`}
              >
                <span>Commercial</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {activeDropdown === "commercial" && (
                <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl border border-[#E5EAE5] shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-black text-[#064B25] uppercase tracking-wider border-b border-stone-100">
                    Commercial Properties
                  </div>
                  <div className="py-1 space-y-0.5">
                    {[
                      { title: "Grade-A Office Spaces", desc: "LEED certified corporate IT parks", href: "/commercial?category=Office%20Space" },
                      { title: "Co-Working & Flexible Hubs", desc: "Plug & play managed desks", href: "/commercial?type=coworking" },
                      { title: "Retail Shops & High-Street", desc: "Prime footfall locations & malls", href: "/commercial?category=Shop" },
                      { title: "Warehousing & Logistics", desc: "Industrial corridors & transport hubs", href: "/commercial?type=warehouse" },
                    ].map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-2.5 py-1.5 rounded-xl hover:bg-[#F0F7F0] transition group"
                      >
                        <div className="text-xs font-bold text-[#202820] group-hover:text-[#064B25]">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">{item.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Projects Pill */}
            <Link
              href="/projects"
              className={`px-2.5 py-1 xl:px-3 xl:py-1.5 rounded-full text-xs xl:text-sm transition-all duration-150 ${getPillClass(
                pathname?.startsWith("/projects")
              )}`}
            >
              Projects
            </Link>

            {/* Builders Pill (Visible on xl screens to maintain compact layout) */}
            <Link
              href="/builders"
              className={`hidden xl:inline-block px-3 py-1.5 rounded-full text-xs xl:text-sm transition-all duration-150 ${getPillClass(
                pathname?.startsWith("/builders")
              )}`}
            >
              Builders
            </Link>

            {/* Services Dropdown Pill */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterDropdown("services")}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                type="button"
                className={`flex items-center gap-1 px-2.5 py-1 xl:px-3 xl:py-1.5 rounded-full text-xs xl:text-sm transition-all duration-150 cursor-pointer ${getPillClass(
                  pathname?.startsWith("/services") || activeDropdown === "services"
                )}`}
              >
                <span>Services</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {activeDropdown === "services" && (
                <div className="absolute top-full right-0 xl:left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl border border-[#E5EAE5] shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 max-w-[calc(100vw-2rem)]">
                  <div className="px-3 py-1.5 text-[10px] font-black text-[#064B25] uppercase tracking-wider border-b border-stone-100">
                    Advisory &amp; Documentation Tools
                  </div>
                  <div className="py-1 space-y-0.5">
                    {[
                      {
                        title: "Stamp Duty Calculator",
                        href: "/services/stamp-duty",
                        desc: "State registration charges & legal slabs",
                        icon: "⚖️",
                      },
                      {
                        title: "Home Loan Assistant",
                        href: "/services/home-loan",
                        desc: "Estimate EMIs & compare bank interest rates",
                        icon: "🏦",
                      },
                      {
                        title: "Agreement Generation",
                        href: "/services/agreements",
                        desc: "Digital rental & sale deed drafts",
                        icon: "📄",
                      },
                    ].map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F0F7F0] transition group"
                      >
                        <span className="text-base p-1 rounded-lg bg-stone-50 group-hover:bg-white">{s.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-[#202820] group-hover:text-[#064B25]">
                            {s.title}
                          </div>
                          <div className="text-[11px] text-stone-500 line-clamp-1">{s.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* News & Insights Dropdown Pill (Right-aligned to ALWAYS stay inside viewport) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterDropdown("insights")}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                type="button"
                onClick={() => router.push("/news")}
                className={`flex items-center gap-1 px-2.5 py-1 xl:px-3 xl:py-1.5 rounded-full text-xs xl:text-sm transition-all duration-150 cursor-pointer ${getPillClass(
                  pathname?.startsWith("/news") || activeDropdown === "insights"
                )}`}
              >
                <span>Insights</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {activeDropdown === "insights" && (
                <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl border border-[#E5EAE5] shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 max-w-[calc(100vw-2rem)]">
                  <div className="px-3 py-1.5 text-[10px] font-black text-[#064B25] uppercase tracking-wider border-b border-stone-100 flex items-center justify-between">
                    <span>Market Intelligence &amp; News</span>
                    <span className="text-xs">📰</span>
                  </div>
                  <div className="py-1 space-y-0.5">
                    {[
                      {
                        title: "Real Estate Market Trends",
                        desc: "Quarterly price appreciation & supply analysis",
                        href: "/news?category=trends",
                        icon: "📈",
                      },
                      {
                        title: "City Price Index & Forecast",
                        desc: "Micro-market price per sq.ft benchmarks",
                        href: "/news?category=price-index",
                        icon: "🏷️",
                      },
                      {
                        title: "RERA & Legal Advisory",
                        desc: "Title clearance, RERA rulings & builder audits",
                        href: "/news?category=rera",
                        icon: "⚖️",
                      },
                      {
                        title: "NRI Investment Desk",
                        desc: "FEMA compliance, taxation & NRI assets",
                        href: "/news?category=nri",
                        icon: "🌐",
                      },
                      {
                        title: "Home Buyer Guides & Tax",
                        desc: "Section 54 tax exemptions & smart home buying",
                        href: "/news?category=guides",
                        icon: "📘",
                      },
                    ].map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2 p-2 rounded-xl hover:bg-[#F0F7F0] transition group"
                      >
                        <span className="text-sm p-1 rounded-lg bg-stone-50 group-hover:bg-white shrink-0">
                          {item.icon}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-[#202820] group-hover:text-[#064B25]">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-stone-500 line-clamp-1">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-1.5 pt-1.5 border-t border-stone-100">
                    <Link
                      href="/news"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center justify-between text-xs font-bold text-[#064B25] hover:underline px-2 py-0.5"
                    >
                      <span>Read all real estate insights</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* ── 3. RIGHT: City Selector + Post Property + User Auth & Account (Desktop lg+) ── */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
            {/* Location Selection Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCityMenuOpen(!cityMenuOpen)}
                className={`flex items-center gap-1 px-2.5 py-1 xl:px-3 xl:py-1.5 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer ${
                  isSolid
                    ? "bg-stone-50 hover:bg-[#F0F7F0] text-stone-800 border border-stone-200"
                    : "bg-white/85 hover:bg-white text-stone-800 border border-white/70 shadow-xs backdrop-blur-md"
                }`}
                title="Select City"
              >
                <MapPin className="w-3 h-3 text-[#064B25]" />
                <span className="text-stone-900 font-extrabold max-w-[80px] truncate">{selectedCity}</span>
                <ChevronDown className="w-2.5 h-2.5 text-stone-400" />
              </button>

              {cityMenuOpen && (
                <div
                  className="absolute top-full mt-2 right-0 w-44 bg-white rounded-2xl border border-[#E5EAE5] shadow-2xl py-1.5 z-50 text-xs animate-in fade-in duration-150"
                  onMouseLeave={() => setCityMenuOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] font-black text-stone-400 uppercase tracking-wider border-b border-stone-100">
                    Select Target City
                  </div>
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => handleCitySelect(c)}
                      className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-[#F0F7F0] transition ${
                        selectedCity === c ? "text-[#064B25] font-black bg-[#F0F7F0]" : "text-stone-700 font-medium"
                      }`}
                    >
                      <span>{c}</span>
                      {selectedCity === c && <Check className="w-3 h-3 text-[#064B25]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Post Property Pill Button */}
            <Link href="/submit-property">
              <button
                type="button"
                className={`border border-[#064B25] text-[#064B25] font-bold px-2.5 py-1 xl:px-3.5 xl:py-1.5 rounded-full text-xs flex items-center gap-1.5 transition cursor-pointer ${
                  isSolid
                    ? "bg-white hover:bg-[#F0F7F0]"
                    : "bg-white/85 hover:bg-white backdrop-blur-md shadow-xs"
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#064B25]" />
                <span className="hidden md:inline">Post Property</span>
                <span className="md:hidden">Post</span>
                <span className="text-[9px] bg-[#064B25] text-white px-1.5 py-0.5 rounded-full font-black">
                  FREE
                </span>
              </button>
            </Link>

            {/* ── User Auth / Login / Sign Out Button & Dropdown (Fully Visible & Practical) ── */}
            <div className="relative">
              {isAuthenticated && user ? (
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 xl:px-3 xl:py-1.5 rounded-full font-bold text-xs shadow-xs transition cursor-pointer ${
                    isSolid
                      ? "bg-[#F0F7F0] text-[#064B25] border border-stone-200"
                      : "bg-white/85 text-[#064B25] border border-white/70 backdrop-blur-md hover:bg-white"
                  }`}
                  aria-label="User Account Menu"
                >
                  <span className="text-xs">👤</span>
                  <span className="max-w-[70px] truncate text-stone-800 font-bold">{user.name.split(" ")[0]}</span>
                  <ChevronDown className="w-3 h-3 text-stone-400" />
                </button>
              ) : (
                <Link href="/auth/login">
                  <button
                    type="button"
                    className="flex items-center gap-1 px-3 py-1 xl:px-3.5 xl:py-1.5 rounded-full font-bold text-xs bg-[#064B25] hover:bg-[#003D1C] text-white shadow-xs transition cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Log In</span>
                  </button>
                </Link>
              )}

              {/* User Account / Profile Dropdown with Logout & Dashboard */}
              {userMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#E5EAE5] shadow-2xl p-2.5 z-50 animate-in fade-in duration-150 max-w-[calc(100vw-2rem)]"
                  onMouseLeave={() => setUserMenuOpen(false)}
                >
                  {isAuthenticated && user ? (
                    <>
                      <div className="px-3 py-2 border-b border-stone-100">
                        <p className="text-xs font-bold text-stone-900">{user.name}</p>
                        <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="text-[10px] font-black uppercase text-[#064B25] bg-[#F0F7F0] px-2 py-0.5 rounded-full border border-emerald-100">
                            {user.role}
                          </span>
                        </div>
                      </div>

                      <div className="py-1">
                        <Link
                          href={ROLE_DASHBOARD_ROUTES[user.role] || "/dashboard/customer"}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-[#F0F7F0] hover:text-[#064B25] rounded-xl"
                        >
                          <Layers className="w-4 h-4 text-[#064B25]" />
                          <span>{user.role.toUpperCase()} Workspace</span>
                        </Link>

                        <Link
                          href="/dashboard/customer"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 rounded-xl"
                        >
                          <Heart className="w-4 h-4 text-rose-500" />
                          <span>Saved Properties ({savedPropertyIds.length})</span>
                        </Link>
                      </div>

                      {/* Quick Role Switcher for Testing All 8 Dashboards */}
                      <div className="pt-2 border-t border-stone-100">
                        <div className="px-3 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                          Quick Role Switcher
                        </div>
                        <div className="max-h-36 overflow-y-auto space-y-0.5">
                          {ROLES_LIST.map((r) => (
                            <button
                              key={r.role}
                              type="button"
                              onClick={() => handleRoleSelect(r.role)}
                              className={`w-full flex items-center justify-between px-2.5 py-1 text-xs rounded-lg transition ${
                                user?.role === r.role
                                  ? "bg-[#064B25] text-white font-bold"
                                  : "hover:bg-[#F0F7F0] text-stone-700"
                              }`}
                            >
                              <span className="flex items-center gap-1.5">
                                <span>{r.icon}</span>
                                <span>{r.label}</span>
                              </span>
                              {user?.role === r.role && <span className="text-[9px] bg-white/20 px-1 py-0.5 rounded">Active</span>}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sign Out Action Button */}
                      <div className="pt-1.5 mt-1.5 border-t border-stone-100">
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setUserMenuOpen(false);
                            router.push("/");
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer transition"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-2 space-y-2">
                      <p className="text-xs font-bold text-stone-900">Guardian Property Experts</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Link href="/auth/login" onClick={() => setUserMenuOpen(false)}>
                          <Button variant="outline" size="sm" className="w-full text-xs">Log In</Button>
                        </Link>
                        <Link href="/auth/register" onClick={() => setUserMenuOpen(false)}>
                          <Button size="sm" className="w-full text-xs bg-[#064B25] hover:bg-[#003D1C]">Register</Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── 4. MOBILE / TABLET TOGGLE (<1024px) ── */}
          <div className="flex lg:hidden items-center gap-1 min-[360px]:gap-1.5 shrink-0">
            {/* Mobile City Selector with working dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCityMenuOpen(!cityMenuOpen);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1 px-2 min-[360px]:px-2.5 py-1 rounded-full bg-white/90 border border-stone-200 text-[11px] min-[360px]:text-xs font-bold text-stone-800 shadow-2xs"
                title="Select City"
              >
                <MapPin className="w-3 h-3 text-[#064B25] shrink-0" />
                <span className="max-w-[48px] min-[360px]:max-w-[70px] truncate">{selectedCity}</span>
              </button>

              {cityMenuOpen && (
                <div className="absolute top-full mt-2 right-0 w-44 max-w-[calc(100vw-1rem)] bg-white rounded-2xl border border-[#E5EAE5] shadow-2xl py-1.5 z-50 text-xs animate-in fade-in duration-150">
                  <div className="px-3 py-1 text-[10px] font-black text-stone-400 uppercase tracking-wider border-b border-stone-100">
                    Select Target City
                  </div>
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => handleCitySelect(c)}
                      className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-[#F0F7F0] transition ${
                        selectedCity === c ? "text-[#064B25] font-black bg-[#F0F7F0]" : "text-stone-700 font-medium"
                      }`}
                    >
                      <span>{c}</span>
                      {selectedCity === c && <Check className="w-3 h-3 text-[#064B25]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/submit-property">
              <Button size="sm" variant="outline" className="text-[11px] min-[360px]:text-xs px-2 min-[360px]:px-2.5 py-1 h-7 font-bold border-[#064B25] text-[#064B25] rounded-full bg-white/90 whitespace-nowrap">
                <span className="hidden min-[340px]:inline">Post Free</span>
                <span className="min-[340px]:hidden">Post</span>
              </Button>
            </Link>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setCityMenuOpen(false);
              }}
              className="p-1.5 rounded-xl bg-white/85 backdrop-blur-md text-stone-700 hover:bg-stone-100 transition cursor-pointer shrink-0 shadow-2xs"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 min-[360px]:w-5 min-[360px]:h-5" /> : <Menu className="w-4 h-4 min-[360px]:w-5 min-[360px]:h-5" />}
            </button>
          </div>
        </div>

        {/* ── 5. MOBILE MENU DRAWER (With Full Navigation, Services, Role Switcher & Auth) ── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3.5 shadow-xl border-t border-stone-100 animate-in fade-in max-h-[85vh] overflow-y-auto">
            {/* User Auth Banner in Mobile Drawer */}
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              {isAuthenticated && user ? (
                <div className="flex items-center justify-between w-full">
                  <div>
                    <div className="text-xs font-bold text-stone-900">{user.name}</div>
                    <div className="text-[10px] text-stone-500">{user.email} ({user.role})</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      router.push("/");
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:bg-rose-100/50 px-2.5 py-1 rounded-lg"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-stone-700">Account Access</span>
                  <div className="flex items-center gap-2">
                    <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button size="sm" variant="outline" className="text-xs h-8">Log In</Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button size="sm" className="text-xs h-8 bg-[#064B25] hover:bg-[#003D1C]">Register</Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* City Selector in Mobile */}
            <div>
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 px-1">Target City</div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {CITIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      handleCitySelect(c);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition ${
                      selectedCity === c ? "bg-[#064B25] text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Grid */}
            <div>
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 px-1">Navigation</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Buy Properties", href: "/buy" },
                  { label: "Rent Homes", href: "/rent" },
                  { label: "Commercial", href: "/commercial" },
                  { label: "New Projects", href: "/projects" },
                  { label: "Top Builders", href: "/builders" },
                  { label: "Insights & News", href: "/news" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-stone-100 hover:bg-[#F0F7F0] text-stone-800 text-xs font-bold"
                  >
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Services Links */}
            <div className="pt-2 border-t border-stone-100 space-y-1">
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-1">Financial &amp; Legal Tools</div>
              {[
                { title: "Stamp Duty Calculator", href: "/services/stamp-duty", icon: "⚖️" },
                { title: "Home Loan Assistant", href: "/services/home-loan", icon: "🏦" },
                { title: "Agreement Generation", href: "/services/agreements", icon: "📄" },
                { title: "Market Intelligence", href: "/news", icon: "📈" },
              ].map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-[#F0F7F0] text-xs font-bold text-[#202820]"
                >
                  <span>{s.icon}</span>
                  <span>{s.title}</span>
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
              <Link href="/submit-property" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button className="w-full bg-[#064B25] hover:bg-[#003D1C] text-white font-bold h-10 text-xs rounded-xl">
                  Post Free Property Ad
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for non-home pages so content doesn't tuck under the fixed navbar */}
      {!isHomePage && <div className="h-16 sm:h-18" />}
    </>
  );
}
