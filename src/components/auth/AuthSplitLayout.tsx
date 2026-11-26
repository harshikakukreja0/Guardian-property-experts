import React from "react";
import Link from "next/link";
import Image from "next/image";

interface AuthSplitLayoutProps {
  headline: string;
  description: string;
  children: React.ReactNode;
}

export function AuthSplitLayout({
  headline,
  description,
  children,
}: AuthSplitLayoutProps) {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* Left Showcase Section (~60% on desktop, compact banner on mobile/tablet) */}
      <div className="relative lg:col-span-7 min-h-[210px] sm:min-h-[260px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden bg-[#0b1f14]">
        <Image
          src="/images/hero-luxury.jpg"
          alt="Guardian PropertyExpert Luxury Residence"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover"
        />
        {/* Warm, subtle brand overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d12]/90 via-[#152a1e]/45 to-[#064B25]/25 pointer-events-none" />

        {/* Top-Left Guardian PropertyExpert Logo */}
        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-xs border border-white/80 hover:scale-[1.02] transition-transform"
            title="Back to Guardian PropertyExpert Home"
          >
            <div className="relative h-6 sm:h-7 w-[108px] sm:w-[122px]">
              <Image
                src="/logo/guardian-logo-tight.png"
                alt="Guardian PropertyExpert"
                fill
                sizes="122px"
                className="object-contain object-center"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Bottom Headline & Supporting Description */}
        <div className="relative z-10 max-w-xl space-y-2.5 sm:space-y-3 pt-8 lg:pt-0">
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold text-white tracking-tight leading-[1.18]">
            {headline}
          </h2>
          <p className="text-xs sm:text-sm lg:text-[15px] text-stone-200/90 font-normal leading-relaxed max-w-lg">
            {description}
          </p>
        </div>
      </div>

      {/* Right Authentication Panel (~40% on desktop) */}
      <div className="lg:col-span-5 flex flex-col justify-center items-center px-5 sm:px-10 lg:px-12 py-10 sm:py-12 bg-white min-w-0">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
