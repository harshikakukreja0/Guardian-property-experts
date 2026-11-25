import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon?: any;
}

export function StatsCard({
  title,
  value,
  change,
  isPositive = true,
  subtitle,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl bg-white border border-stone-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-gpe-forest flex items-center justify-center">
            <Icon className="w-5 h-5 text-gpe-forest" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          {value}
        </div>
        {change && (
          <div
            className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${
              isPositive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            <span>{change}</span>
          </div>
        )}
      </div>

      {subtitle && <p className="text-[11px] text-stone-400 mt-2">{subtitle}</p>}
    </div>
  );
}
