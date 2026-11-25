"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  PlusCircle,
  Building2,
  Users,
  BarChart3,
  Calendar,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_PROJECTS } from "@/services/mock/projects.data";
import { MOCK_LEADS } from "@/services/mock/leads.data";

export default function BuilderDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const projectColumns = [
    {
      header: "Project Name",
      cell: (row: any) => (
        <div>
          <div className="font-bold text-stone-900">{row.title}</div>
          <div className="text-[10px] text-stone-400">{row.location.locality}, {row.location.city}</div>
        </div>
      ),
    },
    {
      header: "Price Range",
      accessorKey: "priceRange" as any,
    },
    {
      header: "Stage",
      cell: (row: any) => (
        <Badge variant="verified">{row.stage}</Badge>
      ),
    },
    {
      header: "Total Units",
      accessorKey: "totalUnits" as any,
    },
    {
      header: "Possession",
      accessorKey: "possessionDate" as any,
    },
    {
      header: "RERA Reg",
      cell: (row: any) => (
        <span className="text-[10px] font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-700">
          {row.reraId.slice(0, 16)}...
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex bg-stone-100/60">
      <DashboardSidebar
        role="builder"
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Developer & Builder Portal"
          subtitle="Godrej Properties Ltd &bull; Corporate Account"
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gpe-forest text-emerald-300 flex items-center justify-center font-bold text-lg">
                GP
              </div>
              <div>
                <h2 className="text-xl font-bold text-stone-900">Godrej Properties Ltd</h2>
                <p className="text-xs text-stone-500">Tier: National Master Builder &bull; 38 Ongoing Developments</p>
              </div>
            </div>

            <Button className="flex items-center gap-2 font-bold shadow-md">
              <PlusCircle className="w-4 h-4" />
              <span>Add New Project</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatsCard
              title="Active Projects"
              value="6"
              change="+2"
              isPositive={true}
              subtitle="All RERA approved"
              icon={Layers}
            />
            <StatsCard
              title="Total Units Available"
              value="1,420"
              change="-48"
              isPositive={true}
              subtitle="Units booked this month"
              icon={Building2}
            />
            <StatsCard
              title="Project Enquiries"
              value="2,940"
              change="+28%"
              isPositive={true}
              subtitle="High-intent homebuyers"
              icon={Users}
            />
            <StatsCard
              title="Quarterly Sales"
              value="₹145 Cr"
              change="+19.5%"
              isPositive={true}
              subtitle="Gross booking value"
              icon={TrendingUp}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Active Project Portfolio</h3>
                <p className="text-xs text-stone-500">Live inventories, unit configurations and possession timelines</p>
              </div>
            </div>
            <DataTable columns={projectColumns} data={MOCK_PROJECTS} searchKey="title" />
          </div>
        </main>
      </div>
    </div>
  );
}
