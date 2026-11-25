import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";

export function MainFooter() {
  return (
    <footer className="relative bg-gradient-to-b from-stone-100/85 via-stone-200/40 to-stone-100/95 backdrop-blur-2xl border-t border-white/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_-10px_35px_rgba(0,0,0,0.03)] text-stone-700 text-xs">
      {/* Apple-style glossy top highlight line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        {/* Top Minimal Brand Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-stone-200/70">
          <div className="space-y-2">
            <Link href="/" className="inline-block group" title="Guardian Property Experts Home">
              <div className="relative inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-xs border border-white/90 transition-transform duration-150 group-hover:scale-[1.02]">
                <div className="relative h-7 sm:h-8 w-[105px] sm:w-[118px]">
                  <Image
                    src="/logo/guardian-logo-tight.png"
                    alt="Guardian Property Experts"
                    fill
                    sizes="(max-width: 640px) 105px, 118px"
                    className="object-contain object-center"
                  />
                </div>
              </div>
            </Link>
            <p className="text-stone-500 text-xs max-w-md font-medium leading-relaxed">
              India&apos;s verified real estate, investment &amp; advisory portal. 100% RERA verified listings with architectural diligence.
            </p>
          </div>

          {/* Quick Contact & Helpline Glass Capsules */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="tel:18004197000"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-stone-800 hover:text-[#064B25] border border-white/80 shadow-2xs font-semibold backdrop-blur-sm transition text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#064B25]" />
              <span>1800-419-7000</span>
            </a>
            <a
              href="mailto:concierge@guardianpropertyexpert.com"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-stone-800 hover:text-[#064B25] border border-white/80 shadow-2xs font-semibold backdrop-blur-sm transition text-xs"
            >
              <Mail className="w-3.5 h-3.5 text-[#064B25]" />
              <span>Concierge Desk</span>
            </a>
          </div>
        </div>

        {/* Minimal Navigation Grid (4 Clean Columns) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Col 1: Properties */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-[#064B25]">
              Properties
            </h4>
            <ul className="space-y-2 text-stone-600 font-medium">
              <li><Link href="/buy" className="hover:text-[#064B25] transition">Buy Residential</Link></li>
              <li><Link href="/rent" className="hover:text-[#064B25] transition">Rent Homes</Link></li>
              <li><Link href="/commercial" className="hover:text-[#064B25] transition">Commercial &amp; Offices</Link></li>
              <li><Link href="/projects" className="hover:text-[#064B25] transition">New Launches</Link></li>
              <li><Link href="/builders" className="hover:text-[#064B25] transition">Top Developers</Link></li>
            </ul>
          </div>

          {/* Col 2: Services & Tools */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-[#064B25]">
              Services &amp; Advisory
            </h4>
            <ul className="space-y-2 text-stone-600 font-medium">
              <li><Link href="/services/stamp-duty" className="hover:text-[#064B25] transition">Stamp Duty Calculator</Link></li>
              <li><Link href="/services/home-loan" className="hover:text-[#064B25] transition">Home Loan Assistant</Link></li>
              <li><Link href="/services/agreements" className="hover:text-[#064B25] transition">Agreement Generation</Link></li>
              <li><Link href="/news" className="hover:text-[#064B25] transition">Market Insights &amp; News</Link></li>
              <li><Link href="/submit-property" className="hover:text-[#064B25] transition">Post Free Property Ad</Link></li>
            </ul>
          </div>

          {/* Col 3: Key Metros */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-[#064B25]">
              Major Cities
            </h4>
            <ul className="space-y-2 text-stone-600 font-medium">
              <li><Link href="/buy?city=Mumbai" className="hover:text-[#064B25] transition">Mumbai Real Estate</Link></li>
              <li><Link href="/buy?city=Delhi%20NCR" className="hover:text-[#064B25] transition">Delhi NCR Properties</Link></li>
              <li><Link href="/buy?city=Bangalore" className="hover:text-[#064B25] transition">Bangalore Tech Hubs</Link></li>
              <li><Link href="/buy?city=Pune" className="hover:text-[#064B25] transition">Pune Prime Enclaves</Link></li>
              <li><Link href="/buy?city=Hyderabad" className="hover:text-[#064B25] transition">Hyderabad Financial Dist.</Link></li>
            </ul>
          </div>

          {/* Col 4: Trust & Verification */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-[#064B25]">
              Platform Intelligence
            </h4>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              Every property listed on Guardian Property Experts passes independent legal title diligence and RERA verification.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-stone-700 font-bold text-[11px]">
              <ShieldCheck className="w-4 h-4 text-[#064B25]" />
              <span>100% Verified Listings</span>
            </div>
          </div>
        </div>

        {/* Apple-Style Bottom Legal Bar */}
        <div className="pt-6 border-t border-stone-200/70 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-medium">
          <p>
            &copy; {new Date().getFullYear()} Guardian Property Experts India Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link href="#" className="hover:text-stone-800 transition">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="#" className="hover:text-stone-800 transition">Terms of Use</Link>
            <span>&bull;</span>
            <Link href="#" className="hover:text-stone-800 transition">RERA Compliance</Link>
            <span>&bull;</span>
            <Link href="#" className="hover:text-stone-800 transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
