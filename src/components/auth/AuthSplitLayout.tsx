import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Building2, CheckCircle2, ShieldCheck } from "lucide-react";

interface AuthSplitLayoutProps {
  headline?: string;
  description?: string;
  children: React.ReactNode;
}

export function AuthSplitLayout({
  headline,
  description,
  children,
}: AuthSplitLayoutProps) {
  return (
    <div className="min-h-dvh w-full flex flex-col lg:grid lg:grid-cols-12 bg-white overflow-x-hidden">
      {/* Left Showcase Section (~58-60% on desktop, seamlessly blended into cream backdrop) */}
      <div className="relative lg:col-span-7 w-full aspect-[16/9] lg:aspect-auto lg:min-h-dvh flex items-end justify-center overflow-hidden bg-gradient-to-br from-[#FDF1E5] via-[#FCF2E8] to-[#F7E8D6]">
        {/* Top Header & Right-Corner Trust Highlights (Desktop/Laptop) */}
        <div className="hidden lg:flex absolute top-0 inset-x-0 z-10 items-start justify-between gap-6 p-7 xl:p-10 pointer-events-none">
          <Link
            href="/"
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm border border-[#064B25]/15 text-xs font-semibold text-[#064B25] shadow-2xs transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <div className="max-w-sm text-right space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#064B25]/10 border border-[#064B25]/15 text-[10px] font-bold uppercase tracking-wider text-[#064B25]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Trusted Real Estate Advisory</span>
            </div>
            <p className="text-base xl:text-lg font-semibold text-stone-800 leading-snug">
              Curated Residential &amp; Commercial Properties Across India
            </p>
            <div className="flex flex-wrap justify-end gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/80 border border-stone-200/80 text-[11px] font-medium text-stone-700 shadow-2xs">
                <Building2 className="w-3.5 h-3.5 text-[#064B25]" />
                500+ Verified Listings
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/80 border border-stone-200/80 text-[11px] font-medium text-stone-700 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#064B25]" />
                RERA Due Diligence
              </span>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="relative block w-full h-full"
          title="Back to Guardian PropertyExpert Home"
        >
          <Image
            src="/images/auth-showcase.jpg"
            alt="Guardian PropertyExpert — Discover Your Property Experience"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-contain object-bottom"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 12%, black 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 12%, black 100%)",
            }}
          />
        </Link>

        {/* Soft boundary blend into the white authentication panel */}
        <div
          aria-hidden="true"
          className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-r from-transparent to-white/75"
        />

        {(headline || description) && (
          <div className="sr-only">
            {headline && <h2>{headline}</h2>}
            {description && <p>{description}</p>}
          </div>
        )}
      </div>

      {/* Right Authentication Panel (~40-42% on desktop) */}
      <div className="flex-1 lg:col-span-5 flex flex-col justify-center items-center px-5 sm:px-10 lg:px-12 py-8 sm:py-12 bg-white min-w-0">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
