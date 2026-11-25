"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  TrendingUp,
  Newspaper,
  BookOpen,
  Scale,
  Globe2,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Building,
  Search,
  Share2,
} from "lucide-react";
import { MainHeader } from "@/components/common/MainHeader";
import { MainFooter } from "@/components/common/MainFooter";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  title: string;
  category: "trends" | "price-index" | "rera" | "nri" | "guides";
  categoryLabel: string;
  summary: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  image: string;
  featured?: boolean;
}

const INSIGHTS_ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "India Q4 Real Estate Index: Top 5 Micro-Markets Recording Over 14% Capital Appreciation",
    category: "trends",
    categoryLabel: "Market Trends",
    summary:
      "A comprehensive analysis of residential demand surge across Mumbai MMR, Gurugram Golf Course Ext., and North Bangalore driven by Grade-A developer deliveries and infrastructure connectivity.",
    date: "November 20, 2026",
    readTime: "6 min read",
    author: "Rohit Singhania",
    authorRole: "Head of Research, Guardian Advisory",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "art-2",
    title: "City Price Benchmarks 2026: Capital Values vs. Rental Yields Across 6 Key Metros",
    category: "price-index",
    categoryLabel: "City Price Index",
    summary:
      "Comparative metrics showing price per square foot across luxury and mid-segment enclaves in Mumbai, Delhi NCR, Bangalore, Pune, and Hyderabad.",
    date: "November 18, 2026",
    readTime: "5 min read",
    author: "Ananya Deshmukh",
    authorRole: "Senior Valuation Analyst",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "art-3",
    title: "Supreme Court & MahaRERA Guidelines: Mandatory 100% Escrow Accounts for Ongoing Projects",
    category: "rera",
    categoryLabel: "RERA & Legal",
    summary:
      "How recent regulatory tightening safeguards buyer capital against diversion, ensuring milestone-based disbursement for registered projects.",
    date: "November 14, 2026",
    readTime: "4 min read",
    author: "Adv. Vikram Mehra",
    authorRole: "Senior Legal Counsel",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "art-4",
    title: "NRI Real Estate Playbook: Repatriation Rules, NRE/NRO Accounts & FEMA Compliance",
    category: "nri",
    categoryLabel: "NRI Advisory",
    summary:
      "Clear guidance for Non-Resident Indians investing in Indian luxury homes, double taxation avoidance treaties (DTAA), and TDS on sale of immovable properties.",
    date: "November 10, 2026",
    readTime: "7 min read",
    author: "Siddharth Oberoi",
    authorRole: "Director - NRI Wealth Desk",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "art-5",
    title: "Section 54 & 54EC Guide: How to Save Capital Gains Tax on Selling Residential Property",
    category: "guides",
    categoryLabel: "Buying Guides",
    summary:
      "Step-by-step strategies for reinvesting real estate capital gains into new residential property or specified 54EC bonds within statutory timelines.",
    date: "November 08, 2026",
    readTime: "5 min read",
    author: "CA Rajeshwari K.",
    authorRole: "Tax & Estate Advisory",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "art-6",
    title: "Commercial Grade-A vs Co-Working: Where Are Institutional Investors Allocating Capital in 2027?",
    category: "trends",
    categoryLabel: "Market Trends",
    summary:
      "An in-depth look at REIT yields, corporate return-to-office mandates, and lease renewals in premier central business districts.",
    date: "November 04, 2026",
    readTime: "6 min read",
    author: "Rohit Singhania",
    authorRole: "Head of Research, Guardian Advisory",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
];

const CITY_PRICE_INDEX_DATA = [
  { city: "Mumbai", microMarket: "Worli & Lower Parel", avgRate: "₹45,500 / sq.ft", yoyGrowth: "+14.2%", yield: "3.4%", demand: "Very High" },
  { city: "Mumbai", microMarket: "Bandra West & Khar", avgRate: "₹52,000 / sq.ft", yoyGrowth: "+11.8%", yield: "3.1%", demand: "High" },
  { city: "Delhi NCR", microMarket: "Golf Course Ext., Gurugram", avgRate: "₹24,500 / sq.ft", yoyGrowth: "+18.6%", yield: "4.2%", demand: "Very High" },
  { city: "Delhi NCR", microMarket: "Sector 150, Noida", avgRate: "₹11,200 / sq.ft", yoyGrowth: "+16.4%", yield: "4.5%", demand: "High" },
  { city: "Bangalore", microMarket: "Indiranagar & Koramangala", avgRate: "₹22,800 / sq.ft", yoyGrowth: "+12.1%", yield: "4.8%", demand: "Very High" },
  { city: "Bangalore", microMarket: "Whitefield & IT Corridor", avgRate: "₹10,500 / sq.ft", yoyGrowth: "+15.3%", yield: "5.1%", demand: "Very High" },
  { city: "Pune", microMarket: "Baner & Balewadi", avgRate: "₹9,800 / sq.ft", yoyGrowth: "+10.9%", yield: "4.6%", demand: "High" },
  { city: "Hyderabad", microMarket: "Gachibowli & Financial Dist.", avgRate: "₹12,400 / sq.ft", yoyGrowth: "+19.2%", yield: "5.3%", demand: "Very High" },
];

function NewsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const categories = [
    { id: "all", label: "All Insights", icon: Newspaper },
    { id: "trends", label: "Market Trends", icon: TrendingUp },
    { id: "price-index", label: "City Price Index", icon: Building },
    { id: "rera", label: "RERA & Legal", icon: Scale },
    { id: "nri", label: "NRI Advisory", icon: Globe2 },
    { id: "guides", label: "Buying Guides", icon: BookOpen },
  ];

  const filteredArticles = INSIGHTS_ARTICLES.filter((article) => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = INSIGHTS_ARTICLES.find((a) => a.featured) || INSIGHTS_ARTICLES[0];

  return (
    <div className="min-h-screen w-full max-w-full flex flex-col bg-stone-50/60">
      <MainHeader />

      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8 sm:space-y-10 min-w-0">
        {/* Breadcrumb & Header */}
        <div className="space-y-3 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-medium text-stone-500">
            <Link href="/" className="hover:text-[#064B25]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[#064B25] font-medium">News &amp; Market Insights</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6 min-w-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-0.5 bg-[#064B25] shrink-0" />
                <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#064B25]">
                  Guardian Property Experts Research
                </span>
              </div>
              <h1 className="text-xl sm:text-4xl font-semibold text-[#202820] tracking-tight break-words">
                Real Estate News, Trends &amp; Intelligence
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl font-normal">
                Verified market updates, price appreciation indices, RERA regulatory audits, and institutional advisory for smart home buyers and investors.
              </p>
            </div>

            {/* Search within insights */}
            <div className="relative w-full md:w-64 min-w-0">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search research &amp; updates..."
                className="w-full pl-9 pr-4 py-2 rounded-full border border-stone-200 bg-white text-xs font-normal text-stone-800 focus:outline-none focus:border-[#064B25] shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pb-1">
          {categories.map((c) => {
            const Icon = c.icon;
            const isActive = activeCategory === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategory(c.id)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#064B25] text-white shadow-xs"
                    : "bg-white text-stone-700 hover:text-[#064B25] hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Editorial Banner */}
        {activeCategory === "all" && !searchQuery && (
          <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E5EAE5] shadow-[0_12px_40px_-15px_rgba(0,0,0,0.08)] grid grid-cols-1 lg:grid-cols-12 group min-w-0 w-full">
            <div className="lg:col-span-7 relative min-h-[200px] sm:min-h-[360px] min-w-0">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#064B25] text-white text-[10px] sm:text-[11px] font-medium uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full shadow-md">
                Featured Report
              </div>
            </div>

            <div className="lg:col-span-5 p-4 sm:p-8 flex flex-col justify-between space-y-4 min-w-0">
              <div className="space-y-3 min-w-0">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] sm:text-xs text-stone-500 font-normal">
                  <span className="text-[#064B25] font-medium uppercase tracking-wider">{featured.categoryLabel}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    {featured.date}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    {featured.readTime}
                  </span>
                </div>

                <h2 className="text-base sm:text-2xl font-semibold text-[#202820] leading-snug group-hover:text-[#064B25] transition-colors break-words">
                  {featured.title}
                </h2>

                <p className="text-xs sm:text-sm text-stone-600 line-clamp-4 font-normal">
                  {featured.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-medium text-stone-900">{featured.author}</div>
                  <div className="text-[11px] text-stone-500 font-normal">{featured.authorRole}</div>
                </div>

                <Button className="bg-[#064B25] hover:bg-[#003D1C] text-white font-medium text-xs rounded-full px-5 h-9 shrink-0">
                  Read Report
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* City Price Index Table Section */}
        {(activeCategory === "all" || activeCategory === "price-index") && (
          <section className="bg-white rounded-3xl p-4 sm:p-8 border border-[#E5EAE5] shadow-xs space-y-5 min-w-0 w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
              <div className="min-w-0">
                <div className="text-xs font-medium text-[#064B25] uppercase tracking-wider">
                  Live Market Benchmark
                </div>
                <h3 className="text-base sm:text-xl font-semibold text-[#202820]">
                  City Price Index &amp; Appreciation Rates
                </h3>
              </div>
              <span className="text-xs text-stone-500 font-medium bg-stone-100 px-3 py-1 rounded-full self-start shrink-0">
                Updated Q4 2026
              </span>
            </div>

            <div className="overflow-x-auto w-full max-w-full">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500 font-medium uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">City</th>
                    <th className="py-3 px-3">Micro-Market</th>
                    <th className="py-3 px-3">Avg Rate (per sq.ft)</th>
                    <th className="py-3 px-3">YoY Appreciation</th>
                    <th className="py-3 px-3">Gross Yield</th>
                    <th className="py-3 px-3">Demand Velocity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-normal text-stone-800">
                  {CITY_PRICE_INDEX_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#F0F7F0]/60 transition">
                      <td className="py-3 px-3 font-medium text-[#064B25]">{row.city}</td>
                      <td className="py-3 px-3">{row.microMarket}</td>
                      <td className="py-3 px-3 font-medium">{row.avgRate}</td>
                      <td className="py-3 px-3 font-medium text-emerald-600">{row.yoyGrowth}</td>
                      <td className="py-3 px-3">{row.yield}</td>
                      <td className="py-3 px-3">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium text-[10px]">
                          {row.demand}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-[#202820]">
            {activeCategory === "all" ? "Latest Articles & Advisory" : `${categories.find(c => c.id === activeCategory)?.label}`}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl border border-[#E5EAE5] overflow-hidden shadow-xs hover:shadow-md transition group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#064B25] font-medium text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                      {article.categoryLabel}
                    </span>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] text-stone-400 font-normal">
                      <span>{article.date}</span>
                      <span>&bull;</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h4 className="text-sm font-semibold text-[#202820] leading-snug group-hover:text-[#064B25] transition line-clamp-2">
                      {article.title}
                    </h4>

                    <p className="text-xs text-stone-500 line-clamp-3 font-normal">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-stone-50 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-stone-800">{article.author}</span>
                    <span className="block text-[10px] text-stone-400 font-normal">{article.authorRole}</span>
                  </div>

                  <button
                    type="button"
                    className="w-8 h-8 rounded-full border border-stone-200 group-hover:border-[#064B25] group-hover:bg-[#F0F7F0] flex items-center justify-center text-stone-600 group-hover:text-[#064B25] transition"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Estate Intelligence Advisory Banner */}
        <div className="rounded-3xl bg-[#064B25] p-5 sm:p-10 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 min-w-0">
          <div className="space-y-2 max-w-xl min-w-0">
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-300">
              Institutional Advisory
            </span>
            <h3 className="text-lg sm:text-2xl font-semibold break-words">
              Need Confidential Portfolio Valuation or RERA Title Search?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 font-normal">
              Our in-house legal advocates and market intelligence desk provide verified title opinions, NRI repatriation advisory, and transaction facilitation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full md:w-auto">
            <Link href="/services/stamp-duty" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto text-xs font-medium bg-white text-[#064B25] hover:bg-emerald-50 rounded-full h-10 sm:h-11 px-5 sm:px-6">
                Calculate Stamp Duty
              </Button>
            </Link>
            <Link href="/services/home-loan" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto text-xs font-medium bg-emerald-500 hover:bg-emerald-600 text-white rounded-full h-10 sm:h-11 px-5 sm:px-6">
                Loan Assistance
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}

export default function NewsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs font-medium text-stone-500">Loading Insights...</div>}>
      <NewsContent />
    </Suspense>
  );
}
