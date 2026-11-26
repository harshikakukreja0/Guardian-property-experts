import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Linkedin,
  Instagram,
  Globe,
} from "lucide-react";

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/buy" },
  { label: "Residential Projects", href: "/projects" },
  { label: "Rental Homes", href: "/rent" },
  { label: "Commercial Properties", href: "/commercial" },
  { label: "Featured Builders", href: "/builders" },
  { label: "Market Insights", href: "/news" },
];

export function MainFooter() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#F4F8F4] via-[#F7FAF7] to-[#EFF5EF] border-t border-stone-200/80 text-stone-700 text-xs">
      {/* Subtle ambient Guardian green glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[220px] rounded-full bg-[#65B52E]/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        {/* Three-Column Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {/* Column 1: Brand Identity */}
          <div className="md:col-span-2 lg:col-span-1 bg-white/95 rounded-2xl border border-stone-200/80 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3.5">
              <Link
                href="/"
                className="inline-block group"
                title="Guardian PropertyExpert Home"
              >
                <div className="relative h-8 w-[122px] transition-transform duration-150 group-hover:scale-[1.02]">
                  <Image
                    src="/logo/guardian-logo-tight.png"
                    alt="Guardian PropertyExpert"
                    fill
                    sizes="122px"
                    className="object-contain object-left"
                  />
                </div>
              </Link>

              <h3 className="text-sm font-semibold text-stone-900 tracking-tight">
                Your Trusted Partner in Real Estate.
              </h3>

              <p className="text-xs text-stone-500 font-normal leading-relaxed">
                Discover the right property, explore premium developments and make
                confident real-estate decisions with Guardian PropertyExpert.
              </p>
            </div>

            {/* Subtle Social / Platform Icon Containers */}
            <div className="flex items-center gap-2.5 pt-1">
              <Link
                href="/"
                aria-label="Guardian PropertyExpert Website"
                className="w-8 h-8 rounded-lg border border-stone-200 bg-stone-50/70 hover:border-[#064B25]/40 hover:bg-[#F0F7F0] hover:text-[#064B25] flex items-center justify-center text-stone-500 transition-colors"
              >
                <Globe className="w-4 h-4" />
              </Link>
              <a
                href="mailto:Contact@guardianpropertyexperts.com"
                aria-label="Email Guardian PropertyExpert"
                className="w-8 h-8 rounded-lg border border-stone-200 bg-stone-50/70 hover:border-[#064B25]/40 hover:bg-[#F0F7F0] hover:text-[#064B25] flex items-center justify-center text-stone-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <Link
                href="/news"
                aria-label="Guardian Research Updates"
                className="w-8 h-8 rounded-lg border border-stone-200 bg-stone-50/70 hover:border-[#064B25]/40 hover:bg-[#F0F7F0] hover:text-[#064B25] flex items-center justify-center text-stone-500 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                aria-label="Guardian Featured Developments"
                className="w-8 h-8 rounded-lg border border-stone-200 bg-stone-50/70 hover:border-[#064B25]/40 hover:bg-[#F0F7F0] hover:text-[#064B25] flex items-center justify-center text-stone-500 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <nav
            aria-label="Explore Guardian"
            className="bg-white/95 rounded-2xl border border-stone-200/80 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] p-6 sm:p-7 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#064B25]" />
                <h4 className="text-sm font-semibold text-stone-900 tracking-tight">
                  Explore Guardian
                </h4>
              </div>

              <ul className="grid grid-cols-1 min-[380px]:grid-cols-2 lg:grid-cols-1 gap-y-2.5 gap-x-4 text-xs font-normal text-stone-600">
                {EXPLORE_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 hover:text-[#064B25] transition-colors group"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#064B25]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-stone-100">
              <Link
                href="/services/stamp-duty"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#064B25] hover:text-[#003D1C] transition-colors"
              >
                <span>Stamp Duty &amp; Loan Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </nav>

          {/* Column 3: Contact Information */}
          <div className="bg-white/95 rounded-2xl border border-stone-200/80 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#064B25]" />
                <h4 className="text-sm font-semibold text-stone-900 tracking-tight">
                  Get in Touch
                </h4>
              </div>

              <ul className="space-y-3.5 text-xs text-stone-600 font-normal">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#064B25] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    One International Center, Tower 3, Senapati Bapat Marg, Mumbai 400013
                  </span>
                </li>

                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#064B25] shrink-0" />
                  <a
                    href="mailto:Contact@guardianpropertyexperts.com"
                    className="hover:text-[#064B25] transition-colors break-all"
                  >
                    Contact@guardianpropertyexperts.com
                  </a>
                </li>

                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#064B25] shrink-0" />
                  <a
                    href="tel:18004197000"
                    className="hover:text-[#064B25] font-medium text-stone-800 transition-colors"
                  >
                    1800-419-7000
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-1">
              <a
                href="mailto:Contact@guardianpropertyexperts.com?subject=Property%20Advisory%20Enquiry"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl border border-[#064B25]/25 bg-[#F0F7F0]/70 hover:bg-[#064B25] text-[#064B25] hover:text-white text-xs font-medium transition-colors"
              >
                <span>Schedule an Enquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500 font-normal">
          <p>&copy; 2026 Guardian PropertyExpert. All Rights Reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href="/services/agreements" className="hover:text-stone-800 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-stone-300">&bull;</span>
            <Link href="/services/agreements" className="hover:text-stone-800 transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-stone-300">&bull;</span>
            <Link href="/news?category=rera" className="hover:text-stone-800 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
