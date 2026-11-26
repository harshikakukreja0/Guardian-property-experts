import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export function MainFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#F7FAF7] border-t border-[#DDE6DF] text-[#17211C] text-xs">
      {/* Visible, Layered Real-Estate Skyline Illustration along lower portion */}
      <div
        className="pointer-events-none select-none absolute inset-x-0 bottom-0 z-0 opacity-[0.36]"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#F7FAF7] to-transparent" />
        <svg
          viewBox="0 0 1440 180"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-28 sm:h-36 md:h-44 block"
        >
          {/* Back Tower Layer — Soft Sage Green */}
          <path
            d="M0,180 L0,122 L42,122 L42,84 L88,84 L88,122 L114,122 L114,56 L168,56 L168,122 L198,122 L198,95 L248,95 L248,132 L278,132 L278,44 L334,44 L334,132 L364,132 L364,78 L418,78 L418,118 L450,118 L450,32 L506,32 L506,118 L538,118 L538,90 L592,90 L592,128 L624,128 L624,52 L682,52 L682,128 L716,128 L716,96 L768,96 L768,124 L802,124 L802,26 L862,26 L862,124 L894,124 L894,74 L946,74 L946,120 L980,120 L980,48 L1038,48 L1038,120 L1072,120 L1072,92 L1124,92 L1124,126 L1158,126 L1158,38 L1216,38 L1216,126 L1248,126 L1248,80 L1302,80 L1302,118 L1336,118 L1336,56 L1392,56 L1392,118 L1440,118 L1440,180 Z"
            fill="#C7DDD0"
          />
          {/* Front Architectural Layer — Muted Guardian Green with Subtle Outlines */}
          <path
            d="M0,180 L0,144 L56,144 L56,112 L106,112 L106,144 L140,144 L140,94 L194,94 L194,144 L232,144 L232,120 L288,120 L288,150 L322,150 L322,82 L378,82 L378,150 L412,150 L412,106 L468,106 L468,142 L504,142 L504,70 L562,70 L562,142 L598,142 L598,114 L654,114 L654,148 L690,148 L690,86 L748,86 L748,148 L784,148 L784,118 L838,118 L838,144 L874,144 L874,66 L932,66 L932,144 L968,144 L968,104 L1022,104 L1022,142 L1058,142 L1058,82 L1116,82 L1116,142 L1152,142 L1152,114 L1206,114 L1206,146 L1242,146 L1242,74 L1298,74 L1298,146 L1334,146 L1334,108 L1388,108 L1388,140 L1440,140 L1440,180 Z"
            fill="#9BC0AA"
            stroke="#064B25"
            strokeOpacity="0.22"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-14 pb-8">
        {/* Main 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 sm:pb-12">
          {/* Column 1 — Brand Identity */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-block group focus-visible:outline-none"
              title="Guardian PropertyExpert Home"
            >
              <div className="relative h-8 sm:h-9 w-[124px] sm:w-[136px]">
                <Image
                  src="/logo/guardian-logo-tight.png"
                  alt="Guardian PropertyExpert"
                  fill
                  sizes="(max-width: 640px) 124px, 136px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-[#17211C] tracking-tight">
                Your Trusted Partner in Real Estate.
              </p>
              <p className="text-xs text-[#647067] leading-relaxed max-w-sm font-normal">
                Discover the right property, explore premium developments and make confident real-estate decisions with Guardian PropertyExpert.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-2 pt-1">
              {[
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com",
                  path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
                },
                {
                  label: "Instagram",
                  href: "https://www.instagram.com",
                  path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z",
                },
                {
                  label: "X",
                  href: "https://x.com",
                  path: "M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768m2.46 -2.46L20 4",
                },
                {
                  label: "YouTube",
                  href: "https://www.youtube.com",
                  path: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg border border-[#DDE6DF] bg-white/70 hover:bg-white hover:border-[#064B25] text-[#647067] hover:text-[#064B25] flex items-center justify-center transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div className="lg:col-span-2 space-y-3.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#17211C]">
              Explore
            </h3>
            <ul className="space-y-2.5 text-[#647067] font-normal">
              <li>
                <Link href="/" className="hover:text-[#064B25] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/buy" className="hover:text-[#064B25] transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#064B25] transition-colors">
                  Residential Properties
                </Link>
              </li>
              <li>
                <Link href="/commercial" className="hover:text-[#064B25] transition-colors">
                  Commercial Properties
                </Link>
              </li>
              <li>
                <Link href="/builders" className="hover:text-[#064B25] transition-colors">
                  Featured Builders
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-[#064B25] transition-colors">
                  Market Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Resources */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#17211C]">
              Resources
            </h3>
            <ul className="space-y-2.5 text-[#647067] font-normal">
              <li>
                <Link href="/services/stamp-duty" className="hover:text-[#064B25] transition-colors">
                  Stamp Duty &amp; Registration
                </Link>
              </li>
              <li>
                <Link href="/services/home-loan" className="hover:text-[#064B25] transition-colors">
                  Home Loan
                </Link>
              </li>
              <li>
                <Link href="/services/agreements" className="hover:text-[#064B25] transition-colors">
                  Agreement &amp; Legal
                </Link>
              </li>
              <li>
                <Link href="/news?category=guides" className="hover:text-[#064B25] transition-colors">
                  Property Guides
                </Link>
              </li>
              <li>
                <Link href="/news?category=rera" className="hover:text-[#064B25] transition-colors">
                  RERA &amp; Legal Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div className="lg:col-span-3 lg:border-l lg:border-[#DDE6DF] lg:pl-8 space-y-3.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#17211C]">
              Get in Touch
            </h3>

            <ul className="space-y-3 text-[#4A554E] font-normal">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#064B25] shrink-0 mt-0.5" strokeWidth={1.75} />
                <span className="leading-relaxed">
                  Guardian Financial Experts, Sector 49, Sohna Road, Gurugram, Haryana (HR 122018), India.
                </span>
              </li>
              <li>
                <a
                  href="mailto:info@guardianfinancialexperts.com"
                  className="flex items-center gap-2.5 hover:text-[#064B25] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#064B25] shrink-0" strokeWidth={1.75} />
                  <span>info@guardianfinancialexperts.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919220360824"
                  className="flex items-center gap-2.5 hover:text-[#064B25] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#064B25] shrink-0" strokeWidth={1.75} />
                  <span>+91 92203 60824</span>
                </a>
              </li>
            </ul>

            <div className="pt-1.5">
              <Link
                href="/submit-property"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#064B25]/30 hover:border-[#064B25] bg-white/80 hover:bg-white text-[#064B25] font-medium text-xs transition-colors"
              >
                <span>Schedule an Enquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-[#DDE6DF] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#647067] font-normal">
          <p className="text-center sm:text-left">
            &copy; 2026 Guardian PropertyExpert. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
            <Link href="/news?category=rera" className="hover:text-[#064B25] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/services/agreements" className="hover:text-[#064B25] transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/news?category=rera" className="hover:text-[#064B25] transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
