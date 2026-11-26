import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export function MainFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#F8FBF8] border-t border-[#E2EBE4] text-[#17211C] text-[13px]">
      {/* Main Content + Centered Architectural Skyline */}
      <div className="relative">
        {/* Real-Estate Skyline Background Image */}
        <div
          className="pointer-events-none select-none absolute inset-x-0 bottom-0 z-0 h-28 sm:h-36 md:h-44 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 24%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 24%, black 100%)",
          }}
          aria-hidden="true"
        >
          <Image
            src="/images/footer-skyline.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-85"
          />
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

              {/* Official Social Media Backlinks */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {[
                  {
                    label: "Guardian Financial Experts on Facebook",
                    title: "Facebook",
                    href: "https://www.facebook.com/people/Guardian-Financial-Experts/61559265921589/",
                    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                  },
                  {
                    label: "Guardian Financial Experts on Instagram",
                    title: "Instagram",
                    href: "https://www.instagram.com/guardian_financial_experts_/",
                    path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z",
                  },
                  {
                    label: "Guardian Financial Experts on LinkedIn",
                    title: "LinkedIn",
                    href: "https://www.linkedin.com/company/guardian-financial-experts/",
                    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
                  },
                  {
                    label: "Guardian Financial Experts on YouTube",
                    title: "YouTube",
                    href: "https://www.youtube.com/@guardianfinancialexperts",
                    path: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z",
                  },
                  {
                    label: "Guardian Financial Experts on X (Twitter)",
                    title: "X (Twitter)",
                    href: "https://x.com/guardian_experts",
                    path: "M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768m2.46 -2.46L20 4",
                  },
                ].map((social) => (
                  <a
                    key={social.title}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.title}
                    className="w-8 h-8 rounded-lg border border-[#DCE5DE] bg-white/80 hover:bg-[#16793D] hover:border-[#16793D] text-[#16793D] hover:text-white flex items-center justify-center transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
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
                    Sector 49, Gurugram, Haryana, India
                  </span>
                </li>
                <li>
                  <a
                    href="mailto:Contact@guardianpropertyexperts.com"
                    className="flex items-center gap-2.5 hover:text-[#16793D] transition-colors break-all"
                  >
                    <Mail className="w-4 h-4 text-[#16793D] shrink-0" strokeWidth={1.75} />
                    <span>Contact@guardianpropertyexperts.com</span>
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
