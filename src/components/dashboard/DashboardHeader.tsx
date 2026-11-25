"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, Bell, Search, Sparkles, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { UserRole } from "@/types/user.types";
import { useRouter } from "next/navigation";

const ALL_ROLES: { role: UserRole; label: string }[] = [
  { role: "super-admin", label: "Super Admin" },
  { role: "operations", label: "Operations Admin" },
  { role: "sales-crm", label: "Sales CRM" },
  { role: "broker", label: "Broker" },
  { role: "builder", label: "Builder" },
  { role: "owner", label: "Owner" },
  { role: "customer", label: "Customer" },
  { role: "support", label: "Support" },
];

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileMenu: () => void;
}

export function DashboardHeader({ title, subtitle, onOpenMobileMenu }: DashboardHeaderProps) {
  const router = useRouter();
  const { user, switchRole } = useAuthStore();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    setRoleMenuOpen(false);
    router.push(`/dashboard/${role}`);
  };

  return (
    <header className="h-20 bg-white border-b border-stone-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Title & Mobile Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight leading-none">
            {title}
          </h1>
          {subtitle && <p className="text-xs text-stone-500 mt-1">{subtitle}</p>}
        </div>
      </div>

      {/* Header Tools */}
      <div className="flex items-center gap-3">
        {/* Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 text-xs font-semibold text-stone-800 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-gpe-emerald" />
            <span className="hidden sm:inline">Role:</span>
            <span className="text-gpe-forest uppercase">{user?.role}</span>
            <ChevronDown className="w-3 h-3 text-stone-500" />
          </button>

          {roleMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-stone-200 shadow-xl p-1.5 z-50 text-xs"
              onMouseLeave={() => setRoleMenuOpen(false)}
            >
              <div className="px-3 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                Switch Active Role
              </div>
              {ALL_ROLES.map((r) => (
                <button
                  key={r.role}
                  onClick={() => handleRoleChange(r.role)}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition ${
                    user?.role === r.role
                      ? "bg-emerald-50 text-gpe-forest font-bold"
                      : "hover:bg-stone-100 text-stone-700"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="w-10 h-10 rounded-full border border-stone-200 hover:border-gpe-forest flex items-center justify-center text-stone-700 relative transition"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse" />
          </button>

          {notificationsOpen && (
            <div
              className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-stone-200 shadow-2xl p-4 z-50 animate-in fade-in"
              onMouseLeave={() => setNotificationsOpen(false)}
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-2">
                <span className="text-xs font-bold text-stone-900">Notifications</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  3 New
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-950">
                  <div className="font-semibold">New Property Lead</div>
                  <div className="text-[11px] text-emerald-800">Rakesh Capital scheduled Worli tour</div>
                </div>
                <div className="p-2 rounded-lg bg-stone-50 text-stone-800">
                  <div className="font-semibold">Document Verified</div>
                  <div className="text-[11px] text-stone-500">DLF Magnolias HRERA badge approved</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-gpe-forest text-white font-bold flex items-center justify-center text-xs shadow-sm">
          {user?.name?.charAt(0) || "G"}
        </div>
      </div>
    </header>
  );
}
