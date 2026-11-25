"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building,
  PlusCircle,
  Inbox,
  Calendar,
  Eye,
  CheckCircle2,
  Trash2,
  Edit3,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_PROPERTIES } from "@/services/mock/properties.data";

export default function OwnerDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const ownerListings = MOCK_PROPERTIES.filter((p) => p.seller.type === "Owner");

  const listingColumns = [
    {
      header: "Property Name",
      cell: (row: any) => (
        <div>
          <div className="font-bold text-stone-900">{row.title}</div>
          <div className="text-[10px] text-stone-400">{row.location.locality}, {row.location.city}</div>
        </div>
      ),
    },
    {
      header: "Price",
      cell: (row: any) => <span className="font-bold text-gpe-forest">{row.pricing.displayPrice}</span>,
    },
    {
      header: "Total Views",
      accessorKey: "viewsCount" as any,
    },
    {
      header: "Inquiries",
      accessorKey: "inquiriesCount" as any,
    },
    {
      header: "Listing Status",
      cell: (row: any) => (
        <Badge variant={row.verificationStatus === "verified" ? "verified" : "secondary"}>
          {row.verificationStatus}
        </Badge>
      ),
    },
    {
      header: "Actions",
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <Link href={`/property/${row.slug}`}>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              View
            </Button>
          </Link>
          <Button size="sm" variant="outline" className="h-8 text-xs text-rose-600 border-rose-200 hover:bg-rose-50">
            Pause
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex bg-stone-100/60">
      <DashboardSidebar
        role="owner"
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Property Owner Dashboard"
          subtitle="Manage your listings with zero brokerage"
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-stone-900">Welcome, Dr. Arvind Rao</h2>
              <p className="text-xs text-stone-500">Your direct owner listings receive priority placement</p>
            </div>

            <Link href="/submit-property">
              <Button className="flex items-center gap-2 font-bold shadow-md">
                <PlusCircle className="w-4 h-4" />
                <span>Post Free Property Ad</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatsCard
              title="My Properties"
              value="2"
              subtitle="1 For Sale, 1 Rent"
              icon={Building}
            />
            <StatsCard
              title="Direct Views"
              value="4,060"
              change="+14%"
              isPositive={true}
              subtitle="Interested homebuyers"
              icon={Eye}
            />
            <StatsCard
              title="Buyer Inquiries"
              value="136"
              change="+22"
              isPositive={true}
              subtitle="Zero broker interference"
              icon={Inbox}
            />
            <StatsCard
              title="Scheduled Tours"
              value="3"
              subtitle="Confirmed for this weekend"
              icon={Calendar}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900">My Listed Properties</h3>
                <p className="text-xs text-stone-500">Live listings visible to over 2.4 million verified buyers</p>
              </div>
            </div>
            <DataTable columns={listingColumns} data={ownerListings} searchKey="title" />
          </div>
        </main>
      </div>
    </div>
  );
}
