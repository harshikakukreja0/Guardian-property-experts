"use client";

import React from "react";
import Link from "next/link";
import { MainHeader } from "@/components/common/MainHeader";
import { MainFooter } from "@/components/common/MainFooter";
import { BuilderCard } from "@/components/project/BuilderCard";
import { ListingHeading } from "@/components/common/ListingHeading";
import { MOCK_BUILDERS } from "@/services/mock/projects.data";
import { ShieldCheck, Award } from "lucide-react";

export default function BuildersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50">
      <MainHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 min-w-0">
        <ListingHeading
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Featured Builders" },
          ]}
          title="A-Grade Real Estate Developers"
          description="Browse corporate profiles, 100% tracked delivery records, active projects and credentials of India's most esteemed developers."
        />

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
