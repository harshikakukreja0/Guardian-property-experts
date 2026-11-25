"use client";

import React, { useState } from "react";
import {
  Users,
  Calendar,
  PhoneCall,
  CheckCircle,
  TrendingUp,
  Clock,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_LEADS } from "@/services/mock/leads.data";
import { LeadStatus } from "@/types/lead.types";

export default function SalesCrmDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [leadsList, setLeadsList] = useState(MOCK_LEADS);

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    setLeadsList((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  };

  const leadColumns = [
    {
      header: "Lead / Buyer",
      cell: (row: any) => (
        <div>
          <div className="font-bold text-stone-900">{row.customerName}</div>
          <div className="text-[10px] text-stone-400 flex items-center gap-2">
            <span>{row.customerPhone}</span> &bull; <span>{row.customerEmail}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Property / Project",
      cell: (row: any) => (
        <div>
          <div className="font-semibold text-stone-800">{row.propertyTitle || row.projectTitle}</div>
          <div className="text-[10px] text-stone-400">Budget: {row.budget}</div>
        </div>
      ),
    },
    {
      header: "Source",
      accessorKey: "source" as any,
    },
    {
      header: "Status",
      cell: (row: any) => {
        let variant: any = "secondary";
        if (row.status === "Closed / Won") variant = "verified";
        if (row.status === "Site Visit Scheduled") variant = "gold";
        if (row.status === "Negotiation") variant = "default";

        return <Badge variant={variant}>{row.status}</Badge>;
      },
    },
    {
      header: "Assigned Advisor",
      accessorKey: "assignedTo" as any,
    },
    {
      header: "Update Pipeline",
      cell: (row: any) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value as LeadStatus)}
          className="h-8 px-2 rounded-lg border border-stone-200 bg-white text-[11px] font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-gpe-emerald"
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Site Visit Scheduled">Site Visit Scheduled</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Closed / Won">Closed / Won</option>
          <option value="Lost">Lost</option>
        </select>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex bg-stone-100/60">
      <DashboardSidebar
        role="sales-crm"
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Sales & CRM Command Center"
          subtitle="Lead pipeline, buyer enquiries, follow-up scheduling, and conversion analytics"
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatsCard
              title="Active Inquiries"
              value="4,720"
              change="+18%"
              isPositive={true}
              subtitle="142 received today"
              icon={Users}
            />
            <StatsCard
              title="Site Visits Scheduled"
              value="38"
              change="+12"
              isPositive={true}
              subtitle="For this weekend"
              icon={Calendar}
            />
            <StatsCard
              title="Deals in Negotiation"
              value="14"
              change="+4"
              isPositive={true}
              subtitle="Value: ₹182 Cr"
              icon={PhoneCall}
            />
            <StatsCard
              title="Conversion Rate"
              value="12.8%"
              change="+2.4%"
              isPositive={true}
              subtitle="Lead to closure ratio"
              icon={TrendingUp}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Lead Pipeline & Tracking</h3>
                <p className="text-xs text-stone-500">Update status, customer notes and scheduled physical site visits</p>
              </div>
            </div>
            <DataTable columns={leadColumns} data={leadsList} searchKey="customerName" />
          </div>
        </main>
      </div>
    </div>
  );
}
