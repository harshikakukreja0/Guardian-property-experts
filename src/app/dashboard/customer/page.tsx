"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Eye,
  Inbox,
  Calendar,
  Settings,
  MapPin,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/authStore";
import { MOCK_PROPERTIES } from "@/services/mock/properties.data";

export default function CustomerDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { savedPropertyIds, viewedPropertyIds } = useAuthStore();

  const savedProperties = MOCK_PROPERTIES.filter((p) =>
    savedPropertyIds.includes(p.id)
  );

  const viewedProperties = MOCK_PROPERTIES.filter((p) =>
    viewedPropertyIds.includes(p.id)
  );

  return (
    <div className="min-h-screen flex bg-stone-100/60">
      <DashboardSidebar
        role="customer"
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Buyer & Tenant Hub"
          subtitle="Saved homes, tour schedules and direct seller conversations"
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-stone-900">Welcome, Ananya Deshmukh</h2>
              <p className="text-xs text-stone-500">Your curated property shortlist & scheduled physical tours</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatsCard
              title="Saved Properties"
              value={savedProperties.length}
              subtitle="Shortlisted luxury homes"
              icon={Heart}
            />
            <StatsCard
              title="Recently Viewed"
              value={viewedProperties.length}
              subtitle="Browsing history"
              icon={Eye}
            />
            <StatsCard
              title="Active Inquiries"
              value="4"
              subtitle="Responses received"
              icon={Inbox}
            />
            <StatsCard
              title="Upcoming Tours"
              value="1"
              subtitle="Saturday, 11:30 AM"
              icon={Calendar}
            />
          </div>

          {/* Shortlisted Properties */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Saved Properties ({savedProperties.length})</h3>
                <p className="text-xs text-stone-500">Homes and apartments you have bookmarked for comparison</p>
              </div>
              <Link href="/buy">
                <Button size="sm" variant="outline" className="text-xs">
                  Discover More
                </Button>
              </Link>
            </div>

            {savedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {savedProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 text-center text-stone-500 text-xs border border-stone-200">
                You haven&apos;t saved any properties yet. Explore our listings to shortlist your dream home.
              </div>
            )}
          </div>

          {/* Scheduled Site Tours */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Scheduled Physical Site Tours</h3>
                <p className="text-xs text-stone-500">Private guided tours with dedicated Guardian Concierge</p>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full">
                1 Upcoming Visit
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm">The Emerald Penthouse & Luxury Residences</span>
                  <Badge variant="verified">Confirmed</Badge>
                </div>
                <p className="text-xs text-stone-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gpe-emerald" />
                  <span>Worli Sea Face, Mumbai &bull; Tour Date: Sat, Nov 28 at 11:30 AM</span>
                </p>
                <p className="text-xs text-stone-600">Advisor: Rohit Singhania &bull; +91 98200 44521</p>
              </div>

              <Button size="sm" variant="outline" className="text-xs font-semibold">
                Reschedule
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
