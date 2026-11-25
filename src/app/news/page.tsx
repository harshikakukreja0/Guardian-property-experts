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
    <div className="min-h-screen w-full max-w-full flex flex-col bg-white">
      <MainHeader />

      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10 min-w-0">
        {/* Breadcrumb & Header */}
        <div className="space-y-4 min-w-0">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 font-normal">
            <Link href="/" className="hover:text-[#064B25] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="text-stone-700 font-medium">News &amp; Market Insights</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-2 min-w-0">
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-5 h-px bg-[#064B25] shrink-0" />
                <span className="text-[11px] font-medium uppercase tracking-widest text-[#064B25]">
                  Guardian Property Experts Research
                </span>
              </div>
              <h1 className="text-[26px] sm:text-[36px] font-semibold text-stone-900 tracking-tight leading-[1.2] break-words">
                Real Estate News, Trends &amp; Intelligence
              </h1>
              <p className="text-[13px] sm:text-[15px] text-stone-500 font-normal leading-relaxed max-w-2xl">
                Verified market updates, price appreciation indices, RERA regulatory audits, and institutional advisory for smart home buyers and investors.
              </p>
            </div>

            {/* Search within insights */}
            <div className="relative w-full md:w-72 min-w-0 shrink-0">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search research & updates..."
                aria-label="Search research and updates"
                className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-stone-200 bg-white text-xs sm:text-[13px] font-normal text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#064B25] focus:ring-1 focus:ring-[#064B25]/20 transition"
              />
            </div>
          </div>
        </div>

        {/* Minimal Editorial Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Insights categories"
          className="flex items-center gap-6 sm:gap-8 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-none pr-4 sm:pr-0"
        >
          {categories.map((c) => {
            const Icon = c.icon;
            const isActive = activeCategory === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={(e) => {
                  setActiveCategory(c.id);
                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    inline: "nearest",
                    block: "nearest",
                  });
                }}
                className={`flex items-center gap-1.5 py-2.5 text-xs sm:text-[13px] whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-[#064B25] ${
                  isActive
                    ? "border-[#064B25] text-[#064B25] font-medium"
                    : "border-transparent text-stone-500 hover:text-stone-900 font-normal"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#064B25]" : "text-stone-400"}`} />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Editorial Report */}
        {activeCategory === "all" && !searchQuery && (
          <article className="rounded-xl overflow-hidden bg-white border border-stone-200 hover:border-stone-300 transition-colors flex flex-col lg:flex-row min-w-0 w-full">
            <div className="w-full lg:w-[55%] relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] bg-stone-100 shrink-0">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>

            <div className="w-full lg:w-[45%] p-5 sm:p-8 lg:p-9 flex flex-col justify-between space-y-6 min-w-0">
              <div className="space-y-3 min-w-0">
                <div className="text-[11px] font-medium uppercase tracking-widest text-[#064B25]">
                  Featured Report
                </div>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 font-normal">
                  <span className="uppercase tracking-wider text-[11px] font-medium text-stone-700">
                    {featured.categoryLabel}
                  </span>
                  <span className="text-stone-300">&bull;</span>
                  <span>{featured.date}</span>
                  <span className="text-stone-300">&bull;</span>
                  <span>{featured.readTime}</span>
                </div>

                <h2 className="text-[20px] sm:text-[24px] font-semibold text-stone-900 leading-[1.3] tracking-tight break-words">
                  {featured.title}
                </h2>

                <p className="text-[13px] sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {featured.summary}
                </p>
              </div>

              <div className="pt-5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-xs font-medium text-stone-900">{featured.author}</div>
                  <div className="text-[11px] text-stone-500 font-normal">{featured.authorRole}</div>
                </div>

                <Link
                  href="#latest-articles"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#064B25] hover:text-[#003D1C] border border-[#064B25]/30 hover:border-[#064B25] hover:bg-[#F0F7F0]/60 px-4 py-2 rounded-lg transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#064B25]/30"
                >
                  <span>Read Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* City Price Index Table Section */}
        {(activeCategory === "all" || activeCategory === "price-index") && (
          <section className="bg-white rounded-xl p-5 sm:p-7 border border-stone-200 space-y-5 min-w-0 w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-100 pb-4">
              <div className="space-y-1 min-w-0">
                <div className="text-[11px] font-medium text-[#064B25] uppercase tracking-widest">
                  Live Market Benchmark
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-stone-900 tracking-tight">
                  City Price Index &amp; Appreciation Rates
                </h2>
              </div>
              <span className="text-[11px] text-stone-500 font-normal bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-md self-start shrink-0">
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
                <tbody className="divide-y divide-stone-100 font-normal text-stone-700">
                  {CITY_PRICE_INDEX_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3 px-3 font-medium text-stone-900">{row.city}</td>
                      <td className="py-3 px-3">{row.microMarket}</td>
                      <td className="py-3 px-3 font-medium text-stone-900">{row.avgRate}</td>
                      <td className="py-3 px-3 font-medium text-[#064B25]">{row.yoyGrowth}</td>
                      <td className="py-3 px-3">{row.yield}</td>
                      <td className="py-3 px-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium text-[10px]">
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
        <section id="latest-articles" className="space-y-5">
          <div className="flex items-baseline justify-between border-b border-stone-100 pb-3">
            <h2 className="text-lg sm:text-[22px] font-semibold text-stone-900 tracking-tight">
              {activeCategory === "all"
                ? "Latest Insights & Advisory"
                : categories.find((c) => c.id === activeCategory)?.label}
            </h2>
            <span className="text-xs text-stone-400 font-normal">
              {filteredArticles.length} {filteredArticles.length === 1 ? "report" : "reports"}
            </span>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl border border-stone-200 hover:border-stone-300 overflow-hidden transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>

                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <span className="font-medium uppercase tracking-wider text-[#064B25]">
                          {article.categoryLabel}
                        </span>
                        <span className="text-stone-400 font-normal">
                          {article.readTime}
                        </span>
                      </div>

                      <h3 className="text-[15px] sm:text-base font-medium text-stone-900 leading-snug group-hover:text-[#064B25] transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-xs text-stone-500 line-clamp-3 font-normal leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div className="min-w-0">
                      <span className="font-medium text-stone-800 block truncate">{article.author}</span>
                      <span className="text-[11px] text-stone-400 font-normal">{article.date}</span>
                    </div>

                    <button
                      type="button"
                      aria-label={`Read ${article.title}`}
                      className="w-8 h-8 rounded-lg border border-stone-200 group-hover:border-[#064B25] group-hover:text-[#064B25] flex items-center justify-center text-stone-500 transition-colors shrink-0 cursor-pointer"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-10 text-center space-y-2">
              <p className="text-sm font-medium text-stone-800">No matching research reports found</p>
              <p className="text-xs text-stone-500 font-normal">
                Try clearing your search query or switching to All Insights.
              </p>
            </div>
          )}
        </section>

        {/* Minimal Institutional Advisory Banner */}
        <section className="rounded-xl bg-stone-50 border border-stone-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 min-w-0">
          <div className="space-y-1.5 max-w-xl min-w-0">
            <span className="text-[11px] font-medium uppercase tracking-widest text-[#064B25]">
              Institutional Advisory
            </span>
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900 tracking-tight break-words">
              Need Confidential Portfolio Valuation or RERA Title Search?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
              Our in-house legal advocates and market intelligence desk provide verified title opinions, NRI repatriation advisory, and transaction facilitation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
            <Link href="/services/stamp-duty" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto text-xs font-medium border-stone-300 text-stone-800 hover:border-[#064B25] hover:text-[#064B25] bg-white rounded-lg h-10 px-4"
              >
                Calculate Stamp Duty
              </Button>
            </Link>
            <Link href="/services/home-loan" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto text-xs font-medium bg-[#064B25] hover:bg-[#003D1C] text-white rounded-lg h-10 px-4 shadow-none">
                Loan Assistance
              </Button>
            </Link>
          </div>
        </section>
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
