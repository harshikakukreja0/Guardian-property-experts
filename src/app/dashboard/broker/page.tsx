"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building,
  PlusCircle,
  Inbox,
  Calendar,
  CreditCard,
  Eye,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_PROPERTIES } from "@/services/mock/properties.data";
import { MOCK_LEADS } from "@/services/mock/leads.data";

export default function BrokerDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const brokerListings = MOCK_PROPERTIES.filter((p) => p.seller.type === "Broker");
  const brokerLeads = MOCK_LEADS.filter((l) => l.source === "Property Page" || l.assignedTo?.includes("Singhania"));

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
      header: "Views",
      accessorKey: "viewsCount" as any,
    },
    {
      header: "Inquiries",
      accessorKey: "inquiriesCount" as any,
    },
    {
      header: "RERA Status",
      cell: (row: any) => (
        <Badge variant={row.verificationStatus === "verified" ? "verified" : "secondary"}>
          {row.verificationStatus}
        </Badge>
      ),
    },
    {
      header: "Action",
      cell: (row: any) => (
        <Link href={`/property/${row.slug}`} className="text-xs font-semibold text-gpe-forest hover:text-gpe-emerald">
          View Live
        </Link>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex bg-stone-100/60">
      <DashboardSidebar
        role="broker"
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Broker Partner Dashboard"
          subtitle="Singhania Prime Realty &bull; RERA Reg: A51900018273"
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gpe-forest text-emerald-300 flex items-center justify-center font-bold text-lg">
                SP
              </div>
              <div>
                <h2 className="text-xl font-bold text-stone-900">Singhania Prime Realty</h2>
                <p className="text-xs text-stone-500">Tier: Diamond Broker Partner &bull; Active Plan: Unlimited RERA Listings</p>
              </div>
            </div>

            <Link href="/submit-property">
              <Button className="flex items-center gap-2 font-bold shadow-md">
                <PlusCircle className="w-4 h-4" />
                <span>Add New Property</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatsCard
              title="Active Listings"
              value="42"
              change="+6"
              isPositive={true}
              subtitle="All RERA verified"
              icon={Building}
            />
            <StatsCard
              title="Total Property Views"
              value="28,400"
              change="+34%"
              isPositive={true}
              subtitle="Past 30 days"
              icon={Eye}
            />
            <StatsCard
              title="Verified Buyer Leads"
              value="184"
              change="+18"
              isPositive={true}
              subtitle="High-intent inquiries"
              icon={Inbox}
            />
            <StatsCard
              title="Scheduled Site Visits"
              value="12"
              change="+4"
              isPositive={true}
              subtitle="This week"
              icon={Calendar}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900">My Property Listings</h3>
                <p className="text-xs text-stone-500">Performance analytics and inquiry counts across listings</p>
              </div>
            </div>
            <DataTable columns={listingColumns} data={brokerListings} searchKey="title" />
          </div>
        </main>
      </div>
    </div>
  );
}
