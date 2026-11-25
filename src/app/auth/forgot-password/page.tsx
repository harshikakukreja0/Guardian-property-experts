"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-stone-50">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-stone-200/90 shadow-xl space-y-6">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-gpe-forest"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>

        {sent ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-stone-900">Reset Link Sent</h2>
            <p className="text-xs text-stone-600">
              We have emailed instructions to <span className="font-semibold text-stone-900">{email}</span> to reset your password.
            </p>
            <Link href="/auth/login" className="block pt-2">
              <Button className="w-full">Return to Sign In</Button>
            </Link>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              Reset Your Password
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Enter your registered email address and we&apos;ll send you a secure verification link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Email Address</label>
                <Input
                  type="email"
                  required
                  icon={<Mail className="w-4 h-4" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                />
              </div>

              <Button type="submit" className="w-full h-11 text-sm font-bold">
                Send Reset Link
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
