"use client";

import React from "react";
import { MainHeader } from "@/components/common/MainHeader";
import { MainFooter } from "@/components/common/MainFooter";
import { BuilderCard } from "@/components/project/BuilderCard";
import { MOCK_BUILDERS } from "@/services/mock/projects.data";
import { ShieldCheck, Award } from "lucide-react";

export default function BuildersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50">
      <MainHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="space-y-2">
          <div className="text-xs text-stone-500">Home &bull; Featured Builders</div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              A-Grade Real Estate Developers
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              100% Tracked Delivery
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500">
            Browse corporate profiles, delivery track records, active projects and credentials of India&apos;s most esteemed developers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_BUILDERS.map((builder) => (
            <BuilderCard key={builder.id} builder={builder} />
          ))}
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
