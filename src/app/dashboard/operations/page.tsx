"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  FileCheck,
  AlertTriangle,
  History,
  CheckCircle2,
  XCircle,
  Eye,
  FileText,
  User,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_PROPERTIES } from "@/services/mock/properties.data";
import { MOCK_TICKETS } from "@/services/mock/leads.data";

export default function OperationsDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [pendingQueue, setPendingQueue] = useState(MOCK_PROPERTIES);

  const handleApprove = (id: string) => {
    setPendingQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, verificationStatus: "verified" } : item))
    );
  };

  const handleReject = (id: string) => {
    setPendingQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, verificationStatus: "rejected" } : item))
    );
  };

  const verificationColumns = [
    {
      header: "Listing ID",
      accessorKey: "id" as any,
    },
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
      header: "RERA Document",
      cell: (row: any) => (
        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
          <FileText className="w-3 h-3" />
          <span>{row.details.reraId || "Verified File"}</span>
        </span>
      ),
    },
    {
      header: "Seller Type",
      cell: (row: any) => (
        <Badge variant="secondary">{row.seller.type}</Badge>
      ),
    },
    {
      header: "Status",
      cell: (row: any) => (
        <Badge variant={row.verificationStatus === "verified" ? "verified" : "secondary"}>
          {row.verificationStatus}
        </Badge>
      ),
    },
    {
      header: "Moderation Action",
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          {row.verificationStatus !== "verified" ? (
            <Button
              size="sm"
              onClick={() => handleApprove(row.id)}
              className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Approve
            </Button>
          ) : (
            <span className="text-xs text-emerald-600 font-bold">Approved</span>
          )}
          {row.verificationStatus !== "rejected" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleReject(row.id)}
              className="h-8 text-xs text-rose-600 hover:bg-rose-50 border-rose-200"
            >
              Reject
            </Button>
          )}
        </div>
      ),
    },
  ];

  const complaintColumns = [
    {
      header: "Ticket #",
      accessorKey: "ticketNumber" as any,
    },
    {
      header: "Subject",
      cell: (row: any) => (
        <div>
          <div className="font-bold text-stone-900">{row.subject}</div>
          <div className="text-[10px] text-stone-500">{row.description}</div>
        </div>
      ),
    },
    {
      header: "Reported By",
      cell: (row: any) => (
        <span className="font-medium">{row.userName} ({row.userRole})</span>
      ),
    },
    {
      header: "Priority",
      cell: (row: any) => (
        <Badge variant={row.priority === "High" ? "destructive" : "secondary"}>
          {row.priority}
        </Badge>
      ),
    },
    {
      header: "Status",
      cell: (row: any) => (
        <Badge variant="outline">{row.status}</Badge>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex bg-stone-100/60">
      <DashboardSidebar
        role="operations"
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Operations & Verification Dashboard"
          subtitle="Document compliance, physical audit logs, and listing moderation"
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatsCard
              title="Pending Verification"
              value="18"
              change="-4"
              isPositive={true}
              subtitle="Requires legal review"
              icon={ShieldCheck}
            />
            <StatsCard
              title="Documents Cleared"
              value="142"
              change="+24"
              isPositive={true}
              subtitle="Title & municipal sanctions"
              icon={FileCheck}
            />
            <StatsCard
              title="Flagged Listings"
              value="3"
              change="-2"
              isPositive={true}
              subtitle="Under inspection"
              icon={AlertTriangle}
            />
            <StatsCard
              title="Audit Turnaround"
              value="4.2 hrs"
              change="-15%"
              isPositive={true}
              subtitle="Average approval speed"
              icon={History}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Property Verification Queue</h3>
                <p className="text-xs text-stone-500">Inspect municipal certificates, title reports and RERA numbers</p>
              </div>
            </div>
            <DataTable columns={verificationColumns} data={pendingQueue} searchKey="title" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Listing Moderation & Complaints</h3>
                <p className="text-xs text-stone-500">Dispute resolution and content integrity</p>
              </div>
            </div>
            <DataTable columns={complaintColumns} data={MOCK_TICKETS} searchKey="subject" />
          </div>
        </main>
      </div>
    </div>
  );
}
