"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowUpDown, ChevronDown, Check } from "lucide-react";

export type SortOptionValue = "relevance" | "latest" | "price-asc" | "price-desc" | "popular";

export interface SortOption {
  value: SortOptionValue;
  label: string;
}

interface SortDropdownProps {
  value: SortOptionValue;
  onChange: (value: SortOptionValue) => void;
  options: SortOption[];
}

export function SortDropdown({ value, onChange, options }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative min-w-0">
      <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
        <ArrowUpDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400 shrink-0" />
        <span className="text-stone-500 font-semibold hidden sm:inline">Sort By:</span>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="h-9 px-2.5 sm:px-3 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100/80 hover:border-[#064B25]/40 text-stone-800 text-xs font-semibold flex items-center justify-between gap-2 transition cursor-pointer max-w-[170px] sm:max-w-none"
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <span className="truncate">{selectedOption.label}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-stone-400 shrink-0 transition-transform duration-150 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-48 max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-[#E5EAE5] shadow-2xl py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="px-3 py-1 text-[10px] font-black text-stone-400 uppercase tracking-wider border-b border-stone-100">
            Sort Properties
          </div>
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#F0F7F0] transition cursor-pointer ${
                  isSelected ? "text-[#064B25] font-black bg-[#F0F7F0]" : "text-stone-700 font-medium"
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#064B25] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
