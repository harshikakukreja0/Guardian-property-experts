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
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* Left Showcase Section (~60% on desktop) */}
      <div className="relative lg:col-span-7 min-h-[320px] sm:min-h-[380px] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#F7F1E7]">
        <Link
          href="/"
          className="relative w-full h-full min-h-[320px] sm:min-h-[380px] lg:min-h-screen block"
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

      {/* Right Authentication Panel (~40% on desktop) */}
      <div className="lg:col-span-5 flex flex-col justify-center items-center px-5 sm:px-10 lg:px-12 py-10 sm:py-12 bg-white min-w-0">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
