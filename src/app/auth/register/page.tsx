"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Briefcase,
  Building2,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "@/services/api/auth.api";
import { UserRole } from "@/types/user.types";

type AccountTypeKey = "BUYER" | "AGENT" | "COMPANY";

const ACCOUNT_TYPES: {
  key: AccountTypeKey;
  label: string;
  role: UserRole;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "BUYER", label: "BUYER", role: "customer", icon: Home },
  { key: "AGENT", label: "AGENT", role: "broker", icon: Briefcase },
  { key: "COMPANY", label: "COMPANY", role: "builder", icon: Building2 },
];

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [accountType, setAccountType] = useState<AccountTypeKey>("BUYER");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedRole: UserRole =
    ACCOUNT_TYPES.find((t) => t.key === accountType)?.role || "customer";

  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "bg-stone-200" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { score: 1, label: "Weak", color: "bg-rose-500" };
    if (score === 2) return { score: 2, label: "Fair", color: "bg-amber-500" };
    if (score === 3) return { score: 3, label: "Good", color: "bg-emerald-500" };
    return { score: 4, label: "Strong", color: "bg-[#064B25]" };
  }, [password]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = "First name is required.";
    if (!lastName.trim()) next.lastName = "Last name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (phone.replace(/\D/g, "").length < 10) {
      next.phone = "Enter a valid 10-digit phone number.";
    }
    if (password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }
    if (confirmPassword !== password) {
      next.confirmPassword = "Passwords do not match.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      const res = await authApi.register({
        name: fullName,
        email: email.trim(),
        phone: phone.trim(),
        password,
        role: selectedRole,
      });
      login(res.user);
      router.push(`/dashboard/${res.user.role}`);
    } catch {
      setSubmitError("Could not create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout
      headline="Your Real Estate Journey Starts Here"
      description="Create an account to explore properties, connect with agents, manage listings and discover new opportunities."
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-[28px] font-semibold text-stone-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-normal">
            Join thousands of users on the most premium real estate platform.
          </p>
        </div>

        {submitError && (
          <div
            role="alert"
            className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium"
          >
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Account Type Selection Cards */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-stone-700 block">
              Account Type
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {ACCOUNT_TYPES.map((type) => {
                const Icon = type.icon;
                const isSelected = accountType === type.key;
                return (
                  <button
                    key={type.key}
                    type="button"
                    onClick={() => setAccountType(type.key)}
                    aria-pressed={isSelected}
                    className={`relative flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#064B25] bg-[#F0F7F0] text-[#064B25] ring-1 ring-[#064B25]"
                        : "border-stone-200 bg-stone-50/70 text-stone-600 hover:border-stone-300 hover:bg-stone-100/70"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? "text-[#064B25]" : "text-stone-500"
                      }`}
                    />
                    <span className="text-[11px] font-semibold tracking-wider">
                      {type.label}
                    </span>
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-[#064B25] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" strokeWidth={2.5} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Two-Column Desktop Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* First Name */}
            <div className="space-y-1">
              <label
                htmlFor="reg-first-name"
                className="text-xs font-medium text-stone-700 block"
              >
                First Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="reg-first-name"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Aarav"
                  className="w-full h-10 pl-9 pr-3 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:border-[#064B25] focus:ring-1 focus:ring-[#064B25]/20 transition"
                />
              </div>
              {errors.firstName && (
                <p className="text-[11px] text-rose-600">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-1">
              <label
                htmlFor="reg-last-name"
                className="text-xs font-medium text-stone-700 block"
              >
                Last Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="reg-last-name"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Sharma"
                  className="w-full h-10 pl-9 pr-3 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:border-[#064B25] focus:ring-1 focus:ring-[#064B25]/20 transition"
                />
              </div>
              {errors.lastName && (
                <p className="text-[11px] text-rose-600">{errors.lastName}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label
                htmlFor="reg-email"
                className="text-xs font-medium text-stone-700 block"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="reg-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full h-10 pl-9 pr-3 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:border-[#064B25] focus:ring-1 focus:ring-[#064B25]/20 transition"
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-rose-600">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label
                htmlFor="reg-phone"
                className="text-xs font-medium text-stone-700 block"
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="reg-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  className="w-full h-10 pl-9 pr-3 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:border-[#064B25] focus:ring-1 focus:ring-[#064B25]/20 transition"
                />
              </div>
              {errors.phone && (
                <p className="text-[11px] text-rose-600">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label
                htmlFor="reg-password"
                className="text-xs font-medium text-stone-700 block"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full h-10 pl-9 pr-9 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:border-[#064B25] focus:ring-1 focus:ring-[#064B25]/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-rose-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label
                htmlFor="reg-confirm-password"
                className="text-xs font-medium text-stone-700 block"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="reg-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full h-10 pl-9 pr-9 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:border-[#064B25] focus:ring-1 focus:ring-[#064B25]/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[11px] text-rose-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Password Strength & Requirements Indicator */}
          {password && (
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-stone-500">Password strength</span>
                <span className="font-medium text-stone-700">
                  {passwordStrength.label}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 rounded-full transition-colors ${
                      passwordStrength.score >= level
                        ? passwordStrength.color
                        : "bg-stone-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[11px] text-stone-400">
                Use 8+ characters with mixed case, numbers &amp; symbols.
              </p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-[#064B25] hover:bg-[#003D1C] text-white text-sm font-medium shadow-xs flex items-center justify-center gap-2 transition mt-1"
          >
            <span>{loading ? "Creating Account..." : "Create Account"}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>

        <p className="text-center text-xs text-stone-500 pt-1">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-[#064B25] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </AuthSplitLayout>
  );
}
