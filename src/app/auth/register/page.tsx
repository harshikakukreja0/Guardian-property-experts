"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Phone, ShieldCheck } from "lucide-react";
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
];

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authApi.register({
        name,
        email,
        phone,
        role: selectedRole,
      });
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
            <span>Join 14,800+ Members</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white leading-tight">
            Create your account on Guardian PropertyExpert.
          </h2>
          <p className="text-xs text-stone-300 leading-relaxed">
            Free listing for owners, verified buyer network for brokers, and high-intent project discovery for developers.
          </p>
        </div>

        <div className="relative z-10 text-xs text-stone-500">
          &copy; {new Date().getFullYear()} Guardian PropertyExpert India
        </div>
      </div>

      {/* Right Registration Form */}
      <div className="lg:col-span-7 flex flex-col justify-center items-center px-4 sm:px-12 py-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <span className="text-xs font-bold text-gpe-emerald uppercase tracking-wider">
              New Member Registration
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              Create an Account
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Choose your profile type to configure your specialized workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                I am registering as:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ROLE_OPTIONS.map((r) => (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => setSelectedRole(r.role)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition text-center ${
                      selectedRole === r.role
                        ? "bg-gpe-forest text-white border-gpe-forest shadow-xs font-bold"
                        : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Full Name</label>
              <Input
                required
                icon={<User className="w-4 h-4" />}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Phone Number</label>
              <Input
                type="tel"
                required
                icon={<Phone className="w-4 h-4" />}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98000 00000"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Email Address</label>
              <Input
                type="email"
                required
                icon={<Mail className="w-4 h-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 text-sm font-bold shadow-md">
              {loading ? "Creating Account..." : "Complete Registration"}
            </Button>
          </form>

          <div className="text-center text-xs text-stone-500 pt-2">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-bold text-gpe-forest hover:text-gpe-emerald">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
