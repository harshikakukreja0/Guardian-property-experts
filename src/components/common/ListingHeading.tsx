import React from "react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface ListingHeadingProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description: string;
  className?: string;
}

export function ListingHeading({
  breadcrumbs,
  title,
  description,
  className = "",
}: ListingHeadingProps) {
  return (
    <div className={`space-y-1.5 sm:space-y-2 min-w-0 ${className}`}>
      {/* Breadcrumb Bar */}
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 font-medium">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-gpe-forest hover:underline transition"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-stone-700 font-semibold" : ""}>
                    {item.label}
                  </span>
                )}
                {!isLast && <span className="text-stone-400 select-none">&bull;</span>}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Main Page Heading */}
      <h1 className="text-[23px] min-[360px]:text-[26px] sm:text-[34px] font-bold text-stone-900 tracking-tight leading-[1.25] sm:leading-[1.2] break-words">
        {title}
      </h1>

      {/* Subtitle / Description */}
      <p className="text-[13px] min-[360px]:text-[14px] sm:text-[16px] text-stone-500 font-normal leading-relaxed max-w-4xl">
        {description}
      </p>
    </div>
  );
}
