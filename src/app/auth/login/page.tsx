"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "@/services/api/auth.api";
import { UserRole } from "@/types/user.types";

const ROLE_OPTIONS: { role: UserRole; label: string }[] = [
  { role: "customer", label: "Customer / Buyer" },
  { role: "owner", label: "Property Owner" },
  { role: "broker", label: "Broker Partner" },
  { role: "builder", label: "Builder / Developer" },
  { role: "sales-crm", label: "Sales / CRM" },
  { role: "operations", label: "Operations Admin" },
  { role: "support", label: "Support & Verification" },
  { role: "super-admin", label: "Super Admin" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("admin@guardianpropertyexpert.com");
  const [password, setPassword] = useState("••••••••••••");
  const [selectedRole, setSelectedRole] = useState<UserRole>("super-admin");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authApi.login(email, selectedRole);
      login(res.user);
      router.push(`/dashboard/${selectedRole}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* Left Brand Showcase Banner */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-stone-950 p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/architecture.jpg"
            alt="Guardian Architecture"
            fill
            className="object-cover brightness-[0.35]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white p-1">
            <Image src="/logo/guardian-logo.png" alt="Logo" width={40} height={40} className="object-contain" />
          </div>
          <div>
            <span className="font-heading text-lg font-bold text-white leading-none block">
              GUARDIAN
            </span>
            <span className="text-[9px] font-semibold tracking-[0.2em] text-emerald-400 uppercase">
              PropertyExpert
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-4 max-w-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Real Estate Portal</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white leading-tight">
            Manage, discover, and transact premium real estate.
          </h2>
          <p className="text-xs text-stone-300 leading-relaxed">
            Access unified dashboards tailored for owners, brokers, builders, CRM agents, and platform administrators.
          </p>
        </div>

        <div className="relative z-10 text-xs text-stone-500">
          &copy; {new Date().getFullYear()} Guardian PropertyExpert India
        </div>
      </div>

      {/* Right Login Form */}
      <div className="lg:col-span-7 flex flex-col justify-center items-center px-4 sm:px-12 py-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <span className="text-xs font-bold text-gpe-emerald uppercase tracking-wider">
              Account Authentication
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              Welcome Back
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Sign in to your Guardian PropertyExpert account to access your workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selector */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Select Your Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-gpe-emerald"
              >
                {ROLE_OPTIONS.map((r) => (
                  <option key={r.role} value={r.role}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Email Address</label>
              <Input
                type="email"
                required
                icon={<Mail className="w-4 h-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-stone-700">Password</label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-gpe-forest hover:text-gpe-emerald font-semibold"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                type="password"
                required
                icon={<Lock className="w-4 h-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 text-sm font-bold shadow-md">
              {loading ? "Authenticating..." : `Log In to ${selectedRole.toUpperCase().replace("-", " ")}`}
            </Button>
          </form>

          <div className="text-center text-xs text-stone-500 pt-2">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="font-bold text-gpe-forest hover:text-gpe-emerald">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
