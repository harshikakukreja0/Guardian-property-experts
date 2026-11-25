"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MainHeader } from "@/components/common/MainHeader";
import { MainFooter } from "@/components/common/MainFooter";
import { formatCurrency } from "@/utils/formatters";
import {
  Coins,
  ShieldCheck,
  CheckCircle2,
  Building2,
  ArrowRight,
  Send,
  Sparkles,
  PhoneCall,
  RotateCcw,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomeLoanPage() {
  // Calculator State
  const [propertyPrice, setPropertyPrice] = useState<number>(15000000); // 1.5 Cr
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const downPaymentAmount = Math.round((propertyPrice * downPaymentPercent) / 100);
  const [loanAmount, setLoanAmount] = useState<number>(12000000); // 1.2 Cr
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  // Lead Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [employmentType, setEmploymentType] = useState("Salaried");
  const [preferredBank, setPreferredBank] = useState("HDFC Bank");
  const [submitted, setSubmitted] = useState(false);

  // EMI Math
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalRepayment = emi * totalMonths;
  const totalInterest = totalRepayment - loanAmount;
  const principalPercent = Math.round((loanAmount / totalRepayment) * 100);
  const interestPercent = 100 - principalPercent;

  const handleReset = () => {
    setPropertyPrice(15000000);
    setDownPaymentPercent(20);
    setLoanAmount(12000000);
    setInterestRate(8.5);
    setTenureYears(20);
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50">
      <MainHeader />

      <main className="flex-1 py-6 sm:py-10 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-w-0">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-semibold text-stone-500">
          <Link href="/" className="hover:text-[#064B25]">Home</Link>
          <span>/</span>
          <span>Services</span>
          <span>/</span>
          <span className="text-[#064B25]">Home Loan Assistant & EMI Intelligence</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#003D1C] to-[#064B25] rounded-3xl p-6 sm:p-10 text-white mb-10 shadow-lg">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold mb-3 border border-emerald-400/20">
              <Coins className="w-4 h-4" /> Premier Real Estate Banking Partners
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
              Home Loan Assistant & Affordability Planner
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              Model your monthly EMIs, examine total interest vs principal amortization, and submit for direct priority underwriting through our vetted banking syndicate.
            </p>
          </div>
        </div>

        {/* Two-Column Section: Calculator on Left, Lead Form & Summary on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Interactive Sliders */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5EAE5] shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-[#202820] flex items-center gap-2">
                <Coins className="w-5 h-5 text-[#064B25]" />
                <span>Loan Affordability Controls</span>
              </h2>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-bold text-stone-500 hover:text-[#064B25] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Slider 1: Loan Amount */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-700">Required Loan Amount</label>
                <span className="text-base font-black text-[#064B25]">{formatCurrency(loanAmount)}</span>
              </div>
              <input
                type="range"
                min={1000000}
                max={100000000}
                step={500000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#064B25]"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-semibold mt-1">
                <span>₹10 Lakhs</span>
                <span>₹5 Cr</span>
                <span>₹10 Cr</span>
              </div>
            </div>

            {/* Slider 2: Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-700">Annual Interest Rate (% p.a.)</label>
                <span className="text-base font-black text-[#064B25]">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={7.0}
                max={12.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#064B25]"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-semibold mt-1">
                <span>7.0% (Prime)</span>
                <span>8.5% (Avg.)</span>
                <span>12.0%</span>
              </div>
            </div>

            {/* Slider 3: Loan Tenure */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-700">Loan Repayment Tenure</label>
                <span className="text-base font-black text-[#064B25]">{tenureYears} Years ({totalMonths} Months)</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#064B25]"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-semibold mt-1">
                <span>5 Years</span>
                <span>20 Years</span>
                <span>30 Years</span>
              </div>
            </div>

            {/* Visual Amortization Proportion Bar */}
            <div className="pt-4 border-t border-stone-100">
              <div className="flex justify-between text-xs font-bold text-stone-700 mb-2">
                <span>Principal ({principalPercent}%)</span>
                <span>Interest ({interestPercent}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden flex">
                <div style={{ width: `${principalPercent}%` }} className="h-full bg-[#064B25]" />
                <div style={{ width: `${interestPercent}%` }} className="h-full bg-[#65B52E]" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#064B25]" />
                  <span>Principal: {formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#65B52E]" />
                  <span>Interest: {formatCurrency(totalInterest)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Results & Banking Lead Form */}
          <div className="lg:col-span-5 space-y-6">
            {/* Output KPI Box */}
            <div className="bg-[#F0F7F0] rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-md">
              <div className="text-xs font-black uppercase text-[#064B25] tracking-wider mb-1">
                Estimated Monthly EMI
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#003D1C] mb-4">
                {formatCurrency(emi)} <span className="text-sm font-semibold text-stone-500">/ month</span>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-emerald-200/80 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-stone-700">
                  <span>Total Principal Amount</span>
                  <span className="font-bold text-[#202820]">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-stone-700">
                  <span>Total Interest Payable</span>
                  <span className="font-bold text-[#202820]">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center text-stone-700 font-bold border-t border-emerald-200/60 pt-2 text-[#003D1C]">
                  <span>Total Amount Payable</span>
                  <span className="text-base font-black">{formatCurrency(totalRepayment)}</span>
                </div>
              </div>
            </div>

            {/* Lead Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5EAE5] shadow-xs">
              <h3 className="text-sm font-black text-[#202820] mb-3 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#064B25]" />
                <span>Request Priority Banking Underwriting</span>
              </h3>

              {submitted ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#064B25] mx-auto" />
                  <p className="text-xs font-black text-[#003D1C]">Underwriting Request Dispatched!</p>
                  <p className="text-[11px] text-stone-600">
                    A dedicated Guardian mortgage advisor will contact you within 2 hours with pre-approved rate sheets from {preferredBank}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-1 focus:ring-[#064B25] font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 min-[340px]:grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-1 focus:ring-[#064B25] font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Preferred Bank</label>
                      <select
                        value={preferredBank}
                        onChange={(e) => setPreferredBank(e.target.value)}
                        className="w-full h-10 px-2 rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-1 focus:ring-[#064B25] font-semibold"
                      >
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="State Bank of India">SBI</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra">Kotak</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#064B25] hover:bg-[#003D1C] text-white font-bold h-11 rounded-xl text-xs shadow-sm mt-2 flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Request Home Loan Assistance</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
