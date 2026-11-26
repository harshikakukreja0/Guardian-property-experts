import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export function MainFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#F8FBF8] border-t border-[#E2EBE4] text-[#17211C] text-[13px]">
      {/* Main Content + Centered Architectural Skyline */}
      <div className="relative">
        {/* Soft Sage Rolling Hills & Centered Architectural Cityscape Illustration */}
        <div
          className="pointer-events-none select-none absolute inset-x-0 bottom-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 160"
            fill="none"
            preserveAspectRatio="xMidYMax slice"
            className="w-full h-24 sm:h-32 md:h-36 block"
          >
            <defs>
              <linearGradient id="skylineFade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9ABEA7" stopOpacity="0" />
                <stop offset="18%" stopColor="#9ABEA7" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#7FA98E" stopOpacity="0.65" />
                <stop offset="82%" stopColor="#9ABEA7" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#9ABEA7" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="skylineBackFade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#BDD6C5" stopOpacity="0" />
                <stop offset="22%" stopColor="#BDD6C5" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#ACCAB7" stopOpacity="0.6" />
                <stop offset="78%" stopColor="#BDD6C5" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#BDD6C5" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="hillLeft" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#DDE9E0" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#EDF4EE" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="hillRight" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DDE9E0" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#EDF4EE" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Subtle Left & Right Sage Hills framing the skyline */}
            <path d="M0,115 Q260,138 560,160 L0,160 Z" fill="url(#hillLeft)" />
            <path d="M1440,112 Q1180,138 880,160 L1440,160 Z" fill="url(#hillRight)" />

            {/* Back Architectural Towers */}
            <g fill="url(#skylineBackFade)">
              <rect x="385" y="102" width="26" height="58" rx="1" />
              <rect x="448" y="88" width="24" height="72" rx="1" />
              <rect x="520" y="72" width="32" height="88" rx="1" />
              <rect x="588" y="92" width="28" height="68" rx="1" />
              <rect x="656" y="64" width="34" height="96" rx="1" />
              <rect x="742" y="54" width="30" height="106" rx="1" />
              <rect x="818" y="78" width="32" height="82" rx="1" />
              <rect x="892" y="94" width="26" height="66" rx="1" />
              <rect x="960" y="84" width="28" height="76" rx="1" />
              <rect x="1026" y="104" width="24" height="56" rx="1" />
            </g>

            {/* Foreground High-Rises with Stepped Roofs & Subtle Facade Lines */}
            <g fill="url(#skylineFade)">
              <rect x="494" y="58" width="24" height="102" rx="1" />
              <rect x="500" y="50" width="12" height="8" />
              <rect x="558" y="98" width="26" height="62" rx="1" />
              <rect x="622" y="74" width="28" height="86" rx="1" />
              <rect x="698" y="42" width="32" height="118" rx="1" />
              <rect x="706" y="32" width="16" height="10" />
              <rect x="713" y="20" width="2" height="12" />
              <rect x="778" y="34" width="34" height="126" rx="1" />
              <rect x="786" y="24" width="18" height="10" />
              <rect x="794" y="12" width="2" height="12" />
              <rect x="854" y="86" width="28" height="74" rx="1" />
              <rect x="922" y="66" width="30" height="94" rx="1" />
              <rect x="930" y="58" width="14" height="8" />
            </g>

            {/* Subtle Vertical Architectural Window Ribbons */}
            <g stroke="#F8FBF8" strokeOpacity="0.45" strokeWidth="1.2">
              <line x1="502" y1="64" x2="502" y2="152" />
              <line x1="510" y1="64" x2="510" y2="152" />
              <line x1="631" y1="82" x2="631" y2="152" />
              <line x1="641" y1="82" x2="641" y2="152" />
              <line x1="708" y1="50" x2="708" y2="152" />
              <line x1="714" y1="50" x2="714" y2="152" />
              <line x1="720" y1="50" x2="720" y2="152" />
              <line x1="788" y1="44" x2="788" y2="152" />
              <line x1="795" y1="44" x2="795" y2="152" />
              <line x1="802" y1="44" x2="802" y2="152" />
              <line x1="932" y1="74" x2="932" y2="152" />
              <line x1="942" y1="74" x2="942" y2="152" />
            </g>

            {/* Soft Sage Tree Foliage Cluster Along the Base */}
            <g fill="#A8C7B2" fillOpacity="0.55">
              <circle cx="368" cy="148" r="14" />
              <circle cx="384" cy="152" r="10" />
              <circle cx="424" cy="150" r="12" />
              <circle cx="476" cy="152" r="11" />
              <circle cx="540" cy="151" r="12" />
              <circle cx="606" cy="152" r="10" />
              <circle cx="678" cy="151" r="12" />
              <circle cx="760" cy="152" r="11" />
              <circle cx="838" cy="151" r="12" />
              <circle cx="908" cy="152" r="10" />
              <circle cx="988" cy="150" r="12" />
              <circle cx="1052" cy="148" r="13" />
              <circle cx="1070" cy="152" r="9" />
            </g>
          </svg>
        </div>

        {/* 4-Column Responsive Footer Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-14 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
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

              <div className="space-y-2">
                <p className="text-[15px] sm:text-base font-semibold text-[#17211C] tracking-tight">
                  Your Trusted Partner in{" "}
                  <span className="text-[#16793D]">Real Estate.</span>
                </p>
                <p className="text-[13px] text-[#5C6860] leading-relaxed max-w-xs font-normal">
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
                    className="w-8 h-8 rounded-lg border border-[#DCE5DE] bg-white/80 hover:bg-white hover:border-[#16793D] text-[#16793D] flex items-center justify-center transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
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
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h3 className="text-[13px] font-semibold text-[#17211C]">
                  Explore
                </h3>
                <div className="w-6 h-[2px] bg-[#16793D] mt-1.5 rounded-full" />
              </div>
              <ul className="space-y-2.5 text-[#525E56] font-normal text-[13px]">
                <li>
                  <Link href="/" className="hover:text-[#16793D] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/buy" className="hover:text-[#16793D] transition-colors">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-[#16793D] transition-colors">
                    Residential Properties
                  </Link>
                </li>
                <li>
                  <Link href="/commercial" className="hover:text-[#16793D] transition-colors">
                    Commercial Properties
                  </Link>
                </li>
                <li>
                  <Link href="/builders" className="hover:text-[#16793D] transition-colors">
                    Featured Builders
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="hover:text-[#16793D] transition-colors">
                    Market Insights
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 — Resources */}
            <div className="lg:col-span-3 space-y-4">
              <div>
                <h3 className="text-[13px] font-semibold text-[#17211C]">
                  Resources
                </h3>
                <div className="w-6 h-[2px] bg-[#16793D] mt-1.5 rounded-full" />
              </div>
              <ul className="space-y-2.5 text-[#525E56] font-normal text-[13px]">
                <li>
                  <Link href="/services/stamp-duty" className="hover:text-[#16793D] transition-colors">
                    Stamp Duty &amp; Registration
                  </Link>
                </li>
                <li>
                  <Link href="/services/home-loan" className="hover:text-[#16793D] transition-colors">
                    Home Loan
                  </Link>
                </li>
                <li>
                  <Link href="/services/agreements" className="hover:text-[#16793D] transition-colors">
                    Agreement &amp; Legal
                  </Link>
                </li>
                <li>
                  <Link href="/news?category=guides" className="hover:text-[#16793D] transition-colors">
                    Property Guides
                  </Link>
                </li>
                <li>
                  <Link href="/news?category=rera" className="hover:text-[#16793D] transition-colors">
                    RERA &amp; Legal Updates
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 — Get in Touch */}
            <div className="lg:col-span-3 lg:border-l lg:border-[#E2EBE4] lg:pl-8 space-y-4">
              <div>
                <h3 className="text-[13px] font-semibold text-[#17211C]">
                  Get in Touch
                </h3>
                <div className="w-6 h-[2px] bg-[#16793D] mt-1.5 rounded-full" />
              </div>

              <ul className="space-y-3 text-[#4A554E] font-normal text-[13px]">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#16793D] shrink-0 mt-0.5" strokeWidth={1.75} />
                  <span className="leading-relaxed">
                    Guardian Financial Experts, Sector 49, Sohna Road, Gurugram, Haryana (HR 122018), India.
                  </span>
                </li>
                <li>
                  <a
                    href="mailto:info@guardianfinancialexperts.com"
                    className="flex items-center gap-2.5 hover:text-[#16793D] transition-colors break-all"
                  >
                    <Mail className="w-4 h-4 text-[#16793D] shrink-0" strokeWidth={1.75} />
                    <span>info@guardianfinancialexperts.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919220360824"
                    className="flex items-center gap-2.5 hover:text-[#16793D] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#16793D] shrink-0" strokeWidth={1.75} />
                    <span>+91 92203 60824</span>
                  </a>
                </li>
              </ul>

              <div className="pt-1">
                <Link
                  href="/submit-property"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#16793D] hover:bg-[#064B25] text-white font-medium text-[13px] transition-colors shadow-xs"
                >
                  <span>Schedule an Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="relative z-10 bg-[#F8FBF8] border-t border-[#E2EBE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5C6860] font-normal">
          <p className="text-center sm:text-left">
            &copy; 2026 Guardian PropertyExpert. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link href="/news?category=rera" className="hover:text-[#16793D] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#CBD5CD]">|</span>
            <Link href="/services/agreements" className="hover:text-[#16793D] transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-[#CBD5CD]">|</span>
            <Link href="/news?category=rera" className="hover:text-[#16793D] transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
