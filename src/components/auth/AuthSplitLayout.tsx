import React from "react";
import Link from "next/link";
import Image from "next/image";

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
      {/* Left Showcase Section (~58-60% on desktop, full uncropped artwork) */}
      <div className="relative lg:col-span-7 w-full aspect-[16/9] lg:aspect-auto lg:min-h-dvh flex items-center justify-center overflow-hidden bg-[#FCF0E4]">
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
            className="object-contain object-center"
          />
        </Link>

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
