"use client";

import React, { useState } from "react";
import {
  Headphones,
  FileCheck,
  AlertCircle,
  History,
  CheckCircle2,
  Clock,
  UserCheck,
  MessageSquare,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_TICKETS } from "@/services/mock/leads.data";
import { SupportTicket } from "@/types/lead.types";

export default function SupportDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [ticketsList, setTicketsList] = useState(MOCK_TICKETS);

  const handleStatusChange = (id: string, status: SupportTicket["status"]) => {
    setTicketsList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const ticketColumns = [
    {
      header: "Ticket ID",
      accessorKey: "ticketNumber" as any,
    },
    {
      header: "Subject & Details",
      cell: (row: any) => (
        <div>
          <div className="font-bold text-stone-900">{row.subject}</div>
          <div className="text-[10px] text-stone-500 line-clamp-1">{row.description}</div>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "category" as any,
    },
    {
      header: "User Role",
      cell: (row: any) => (
        <span className="font-semibold text-stone-800">{row.userName} ({row.userRole})</span>
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
        <Badge variant={row.status === "Resolved" ? "verified" : "outline"}>
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Action",
      cell: (row: any) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value as any)}
          className="h-8 px-2 rounded-lg border border-stone-200 bg-white text-[11px] font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-gpe-emerald"
        >
          <option value="Open">Open</option>
          <option value="In Review">In Review</option>
          <option value="Pending Action">Pending Action</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex bg-stone-100/60">
      <DashboardSidebar
        role="support"
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Support, Moderation & Helpdesk"
          subtitle="Ticket resolution, dispute mediation, and expedited verification requests"
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatsCard
              title="Open Tickets"
              value="14"
              change="-3"
              isPositive={true}
              subtitle="Active requests"
              icon={Headphones}
            />
            <StatsCard
              title="Avg Resolution Time"
              value="2.8 hrs"
              change="-18%"
              isPositive={true}
              subtitle="Faster turnaround"
              icon={Clock}
            />
            <StatsCard
              title="Verification Expedites"
              value="7"
              change="+2"
              isPositive={true}
              subtitle="High priority RERA reviews"
              icon={UserCheck}
            />
            <StatsCard
              title="Customer Satisfaction"
              value="98.4%"
              change="+0.8%"
              isPositive={true}
              subtitle="Post-resolution CSAT"
              icon={CheckCircle2}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Support & Moderation Queue</h3>
                <p className="text-xs text-stone-500">Assign agents, update ticket status and resolve user disputes</p>
              </div>
            </div>
            <DataTable columns={ticketColumns} data={ticketsList} searchKey="subject" />
          </div>
        </main>
      </div>
    </div>
  );
}
