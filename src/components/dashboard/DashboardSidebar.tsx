"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UserRole } from "@/types/user.types";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Building,
  CreditCard,
  BarChart3,
  FileText,
  Settings,
  History,
  AlertCircle,
  Inbox,
  UserCheck,
  Calendar,
  Layers,
  PlusCircle,
  Briefcase,
  Headphones,
  Heart,
  Eye,
  LogOut,
  X,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export interface NavItem {
  label: string;
  href: string;
  icon: any;
  badge?: string | number;
}

export function getRoleNavItems(role: UserRole): NavItem[] {
  switch (role) {
    case "super-admin":
      return [
        { label: "Executive Overview", href: "/dashboard/super-admin", icon: LayoutDashboard },
        { label: "User Management", href: "/dashboard/super-admin?tab=users", icon: Users, badge: "14.8k" },
        { label: "Properties & Approvals", href: "/dashboard/super-admin?tab=properties", icon: Building, badge: "28" },
        { label: "Stamp Duty Management", href: "/dashboard/super-admin?tab=stamp-duty", icon: FileText },
        { label: "Home Loan Leads", href: "/dashboard/super-admin?tab=home-loans", icon: CreditCard, badge: "12" },
        { label: "Agreement Templates", href: "/dashboard/super-admin?tab=agreements", icon: FileText },
        { label: "Homepage CMS", href: "/dashboard/super-admin?tab=cms", icon: Layers },
        { label: "Revenue & Subscriptions", href: "/dashboard/super-admin?tab=revenue", icon: CreditCard },
        { label: "System Audit Logs", href: "/dashboard/super-admin?tab=logs", icon: History },
        { label: "Platform Settings", href: "/dashboard/super-admin?tab=settings", icon: Settings },
      ];
    case "operations":
      return [
        { label: "Operations Hub", href: "/dashboard/operations", icon: LayoutDashboard },
        { label: "Pending Verifications", href: "/dashboard/operations?tab=pending", icon: ShieldCheck, badge: "18" },
        { label: "Document Review", href: "/dashboard/operations?tab=documents", icon: FileText, badge: "6" },
        { label: "Listing Moderation", href: "/dashboard/operations?tab=moderation", icon: AlertCircle },
        { label: "User Complaints", href: "/dashboard/operations?tab=complaints", icon: Inbox, badge: "4" },
        { label: "Verification History", href: "/dashboard/operations?tab=history", icon: History },
      ];
    case "sales-crm":
      return [
        { label: "Sales Pipeline", href: "/dashboard/sales-crm", icon: LayoutDashboard },
        { label: "All Leads & Enquiries", href: "/dashboard/sales-crm?tab=leads", icon: Users, badge: "42" },
        { label: "Follow-up Reminders", href: "/dashboard/sales-crm?tab=followups", icon: Calendar, badge: "9" },
        { label: "Site Visit Tracking", href: "/dashboard/sales-crm?tab=visits", icon: Calendar },
        { label: "Broker Network Leads", href: "/dashboard/sales-crm?tab=broker-leads", icon: Briefcase },
        { label: "Conversion Funnel", href: "/dashboard/sales-crm?tab=analytics", icon: BarChart3 },
      ];
    case "broker":
      return [
        { label: "Broker Dashboard", href: "/dashboard/broker", icon: LayoutDashboard },
        { label: "My Listed Properties", href: "/dashboard/broker?tab=properties", icon: Building, badge: "12" },
        { label: "Add New Listing", href: "/submit-property", icon: PlusCircle },
        { label: "Client Inquiries", href: "/dashboard/broker?tab=inquiries", icon: Inbox, badge: "15" },
        { label: "Scheduled Site Visits", href: "/dashboard/broker?tab=visits", icon: Calendar, badge: "3" },
        { label: "Subscription & Plans", href: "/dashboard/broker?tab=subscription", icon: CreditCard },
      ];
    case "builder":
      return [
        { label: "Developer Overview", href: "/dashboard/builder", icon: LayoutDashboard },
        { label: "Project Portfolio", href: "/dashboard/builder?tab=projects", icon: Layers, badge: "4" },
        { label: "Unit Inventory & Floors", href: "/dashboard/builder?tab=inventory", icon: Building },
        { label: "Buyer Inquiries", href: "/dashboard/builder?tab=leads", icon: Users, badge: "68" },
        { label: "Sales & Analytics", href: "/dashboard/builder?tab=sales", icon: BarChart3 },
      ];
    case "owner":
      return [
        { label: "Owner Overview", href: "/dashboard/owner", icon: LayoutDashboard },
        { label: "My Properties", href: "/dashboard/owner?tab=properties", icon: Building, badge: "2" },
        { label: "Post New Property", href: "/submit-property", icon: PlusCircle },
        { label: "Buyer Enquiries", href: "/dashboard/owner?tab=enquiries", icon: Inbox, badge: "8" },
        { label: "Scheduled Visits", href: "/dashboard/owner?tab=visits", icon: Calendar, badge: "2" },
      ];
    case "customer":
      return [
        { label: "My Account Hub", href: "/dashboard/customer", icon: LayoutDashboard },
        { label: "Saved Properties", href: "/dashboard/customer?tab=saved", icon: Heart, badge: "3" },
        { label: "Recently Viewed", href: "/dashboard/customer?tab=history", icon: Eye },
        { label: "My Inquiries", href: "/dashboard/customer?tab=enquiries", icon: Inbox, badge: "4" },
        { label: "Scheduled Tours", href: "/dashboard/customer?tab=visits", icon: Calendar, badge: "1" },
        { label: "Account Settings", href: "/dashboard/customer?tab=settings", icon: Settings },
      ];
    case "support":
      return [
        { label: "Helpdesk Overview", href: "/dashboard/support", icon: LayoutDashboard },
        { label: "Open Support Tickets", href: "/dashboard/support?tab=tickets", icon: Headphones, badge: "14" },
        { label: "Verification Requests", href: "/dashboard/support?tab=verification", icon: UserCheck, badge: "7" },
        { label: "Listing Disputes", href: "/dashboard/support?tab=disputes", icon: AlertCircle },
        { label: "Resolution Archives", href: "/dashboard/support?tab=history", icon: History },
      ];
    default:
      return [];
  }
}

interface DashboardSidebarProps {
  role: UserRole;
  currentTab?: string;
  onSelectTab?: (tab: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function DashboardSidebar({
  role,
  currentTab = "overview",
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
}: DashboardSidebarProps) {
  const { user, logout } = useAuthStore();
  const navItems = getRoleNavItems(role);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-stone-950 text-stone-300 border-r border-stone-800">
      {/* Brand Header with Official Logo */}
      <div className="p-4 border-b border-stone-800/80 flex items-center justify-between">
        <Link href="/" className="inline-block bg-white p-2 rounded-xl shadow-xs">
          <div className="relative h-9 w-36">
            <Image
              src="/logo/guardian-official-logo.png"
              alt="Guardian Property Experts"
              fill
              className="object-contain"
            />
          </div>
        </Link>
        {onCloseMobile && (
          <button onClick={onCloseMobile} className="lg:hidden text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* User Role Card */}
      <div className="p-4 border-b border-stone-900 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#013F1A] to-[#16852C] text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-bold text-sm shadow-xs">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-white truncate">{user?.name}</h4>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">
              {role.replace("-", " ")} Workspace
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const tabKey = item.href.includes("?tab=") ? item.href.split("?tab=")[1] : "overview";
          const isActive = currentTab === tabKey;

          return (
            <button
              key={item.label}
              onClick={() => {
                if (onSelectTab) onSelectTab(tabKey);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? "bg-gpe-forest text-white shadow-md shadow-emerald-950 font-bold"
                  : "text-stone-400 hover:text-white hover:bg-stone-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-stone-400"}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-stone-800 text-stone-300"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Navigation */}
      <div className="p-3 border-t border-stone-900 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-stone-400 hover:text-white hover:bg-stone-900 transition"
        >
          <Building className="w-4 h-4 text-emerald-400" />
          <span>Public Marketplace</span>
        </Link>
        <button
          onClick={() => {
            logout();
            window.location.href = "/";
          }}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/40 transition text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-40">
        {sidebarContent}
      </aside>

      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
