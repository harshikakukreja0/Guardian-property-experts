"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MainHeader } from "@/components/common/MainHeader";
import { MainFooter } from "@/components/common/MainFooter";
import { formatCurrency } from "@/utils/formatters";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Download,
  Printer,
  ChevronRight,
  ChevronLeft,
  Building,
  User,
  Scale,
  Calendar,
  IndianRupee,
  AlertCircle,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AGREEMENT_TYPES = [
  {
    id: "rent",
    title: "Residential Rent Agreement",
    desc: "11-month standard residential tenancy agreement with statutory lock-in & notice clauses.",
    icon: "🏡",
  },
  {
    id: "commercial-lease",
    title: "Commercial Lease Agreement",
    desc: "Comprehensive lease deed for corporate office suites, retail shops & industrial properties.",
    icon: "🏢",
  },
  {
    id: "sale-agreement",
    title: "Agreement to Sell (Property Sale)",
    desc: "Legally drafted sale contract specifying earnest deposit, completion dates & title clearance.",
    icon: "📜",
  },
  {
    id: "builder-buyer",
    title: "Builder-Buyer Allotment Agreement",
    desc: "RERA-compliant standardized allotment contract for under-construction residential units.",
    icon: "🏗️",
  },
];

export default function AgreementGenerationPage() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("rent");

  // Parties Details
  const [firstPartyName, setFirstPartyName] = useState("Vikramaditya Singhania");
  const [firstPartyPhone, setFirstPartyPhone] = useState("+91 98201 12345");
  const [firstPartyPan, setFirstPartyPan] = useState("ABCPS1234F");

  const [secondPartyName, setSecondPartyName] = useState("Aarav Dev Sharma");
  const [secondPartyPhone, setSecondPartyPhone] = useState("+91 98330 67890");
  const [secondPartyPan, setSecondPartyPan] = useState("XYZPD9876K");

  // Property Details
  const [propertyAddress, setPropertyAddress] = useState("Flat 1402, Tower B, Lodha Park, Worli");
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("Maharashtra");
  const [carpetArea, setCarpetArea] = useState("1,850 sq.ft");

  // Terms Details
  const [monthlyRent, setMonthlyRent] = useState(125000);
  const [securityDeposit, setSecurityDeposit] = useState(375000);
  const [agreementDuration, setAgreementDuration] = useState("11 Months");
  const [lockInPeriod, setLockInPeriod] = useState("6 Months");
  const [noticePeriod, setNoticePeriod] = useState("1 Month");
  const [commencementDate, setCommencementDate] = useState("01 December 2024");

  const agreementTitle = AGREEMENT_TYPES.find((a) => a.id === selectedType)?.title || "Tenancy Agreement";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50">
      <MainHeader />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-stone-500">
          <Link href="/" className="hover:text-[#064B25]">Home</Link>
          <span>/</span>
          <span>Services</span>
          <span>/</span>
          <span className="text-[#064B25]">Agreement Generation Workflow</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#003D1C] to-[#064B25] rounded-3xl p-6 sm:p-10 text-white mb-10 shadow-lg">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold mb-3 border border-emerald-400/20">
              <Scale className="w-4 h-4" /> Standardized Indian Legal Drafting
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
              Digital Property Agreement Generator
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              Create standardized, customizable rental agreements, commercial leases, and sale contracts with automated clause validation and instant print/PDF export.
            </p>
          </div>
        </div>

        {/* Step Progress Indicator */}
        <div className="mb-8 bg-white rounded-2xl p-4 border border-[#E5EAE5] shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {[
              { num: 1, label: "Agreement Type" },
              { num: 2, label: "Parties Details" },
              { num: 3, label: "Property & Terms" },
              { num: 4, label: "Preview & Export" },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`flex items-center gap-2 p-2 rounded-xl text-left transition ${
                  step === s.num
                    ? "bg-[#064B25] text-white font-bold"
                    : step > s.num
                    ? "bg-[#F0F7F0] text-[#064B25] font-semibold"
                    : "text-stone-400 font-medium"
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  step === s.num ? "bg-white text-[#064B25]" : "bg-stone-200 text-stone-600"
                }`}>
                  {s.num}
                </span>
                <span className="truncate">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Wizard Steps */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5EAE5] shadow-xs">
          {/* STEP 1: Select Type */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-[#202820]">Step 1: Choose Agreement Template</h2>
                <p className="text-xs text-stone-500">Select the legally formatted deed appropriate for your transaction.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AGREEMENT_TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedType(t.id)}
                    className={`p-5 rounded-2xl border text-left transition flex items-start gap-4 ${
                      selectedType === t.id
                        ? "border-[#064B25] bg-[#F0F7F0] ring-2 ring-[#064B25]"
                        : "border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                    }`}
                  >
                    <span className="text-3xl p-2 rounded-xl bg-white shadow-xs shrink-0">{t.icon}</span>
                    <div>
                      <h3 className="text-sm font-black text-[#202820] mb-1">{t.title}</h3>
                      <p className="text-xs text-stone-500 leading-relaxed">{t.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => setStep(2)}
                  className="bg-[#064B25] hover:bg-[#003D1C] text-white font-bold px-6 h-11 rounded-xl"
                >
                  <span>Next: Parties Information</span>
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Parties Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-[#202820]">Step 2: Parties & Identification Details</h2>
                <p className="text-xs text-stone-500">Enter legal names, identity proof numbers, and registered contact records.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Party (Owner / Licensor / Seller) */}
                <div className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-3">
                  <h3 className="text-xs font-black uppercase text-[#064B25] tracking-wider">
                    First Party (Owner / Landlord / Seller)
                  </h3>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={firstPartyName}
                      onChange={(e) => setFirstPartyName(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-white font-semibold text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">PAN Card Number</label>
                    <input
                      type="text"
                      value={firstPartyPan}
                      onChange={(e) => setFirstPartyPan(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-white font-semibold text-xs uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Mobile Contact</label>
                    <input
                      type="tel"
                      value={firstPartyPhone}
                      onChange={(e) => setFirstPartyPhone(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-white font-semibold text-xs"
                    />
                  </div>
                </div>

                {/* Second Party (Tenant / Licensee / Buyer) */}
                <div className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-3">
                  <h3 className="text-xs font-black uppercase text-[#064B25] tracking-wider">
                    Second Party (Tenant / Licensee / Buyer)
                  </h3>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={secondPartyName}
                      onChange={(e) => setSecondPartyName(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-white font-semibold text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">PAN Card Number</label>
                    <input
                      type="text"
                      value={secondPartyPan}
                      onChange={(e) => setSecondPartyPan(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-white font-semibold text-xs uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Mobile Contact</label>
                    <input
                      type="tel"
                      value={secondPartyPhone}
                      onChange={(e) => setSecondPartyPhone(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-white font-semibold text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="rounded-xl">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="bg-[#064B25] hover:bg-[#003D1C] text-white font-bold px-6 h-11 rounded-xl">
                  <span>Next: Property & Commercials</span>
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Property & Terms */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-[#202820]">Step 3: Property Address & Commercial Terms</h2>
                <p className="text-xs text-stone-500">Specify property premises, monthly consideration, and statutory timelines.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Complete Premise Address</label>
                  <input
                    type="text"
                    value={propertyAddress}
                    onChange={(e) => setPropertyAddress(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-stone-200 bg-stone-50/50 font-semibold text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-stone-50/50 font-semibold text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-stone-50/50 font-semibold text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Monthly Consideration (₹ Rent)</label>
                  <input
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-stone-50/50 font-semibold text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Interest-Free Security Deposit (₹)</label>
                  <input
                    type="number"
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-stone-50/50 font-semibold text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Deed Tenure</label>
                  <select
                    value={agreementDuration}
                    onChange={(e) => setAgreementDuration(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-stone-50/50 font-semibold text-xs"
                  >
                    <option value="11 Months">11 Months (Standard)</option>
                    <option value="24 Months">24 Months</option>
                    <option value="36 Months">36 Months</option>
                    <option value="60 Months">60 Months (Long Lease)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Notice Period</label>
                  <select
                    value={noticePeriod}
                    onChange={(e) => setNoticePeriod(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-stone-50/50 font-semibold text-xs"
                  >
                    <option value="1 Month">1 Month</option>
                    <option value="2 Months">2 Months</option>
                    <option value="3 Months">3 Months</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(2)} className="rounded-xl">
                  Back
                </Button>
                <Button onClick={() => setStep(4)} className="bg-[#064B25] hover:bg-[#003D1C] text-white font-bold px-6 h-11 rounded-xl">
                  <span>Generate Document Preview</span>
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Document Preview & Export */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-[#202820]">Step 4: Formatted Agreement Preview</h2>
                  <p className="text-xs text-stone-500">Review drafted legal clauses before printing or exporting.</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={handlePrint}
                    variant="outline"
                    className="border-[#064B25] text-[#064B25] font-bold text-xs rounded-xl h-10 flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Deed</span>
                  </Button>
                  <Button
                    onClick={handlePrint}
                    className="bg-[#064B25] hover:bg-[#003D1C] text-white font-bold text-xs rounded-xl h-10 flex items-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </Button>
                </div>
              </div>

              {/* Formatted Legal Document Preview Card */}
              <div className="bg-stone-50 rounded-2xl p-6 sm:p-10 border border-stone-300 font-serif text-stone-900 text-xs sm:text-sm leading-relaxed space-y-4 shadow-inner max-h-[500px] overflow-y-auto">
                <div className="text-center pb-4 border-b border-stone-300 space-y-1">
                  <h3 className="font-sans text-base sm:text-lg font-black uppercase tracking-widest text-[#064B25]">
                    {agreementTitle}
                  </h3>
                  <p className="text-[11px] text-stone-500 font-sans">
                    Drafted under the Indian Registration Act, 1908 &amp; State Tenancy Provisions
                  </p>
                </div>

                <p>
                  THIS AGREEMENT is entered into on this day of <strong>{commencementDate}</strong> at <strong>{city}, {state}</strong>, BY AND BETWEEN:
                </p>

                <p>
                  <strong>{firstPartyName}</strong>, bearing PAN <strong>{firstPartyPan}</strong>, residing at the premises (hereinafter referred to as the <strong>&quot;LESSOR / FIRST PARTY&quot;</strong>, which expression shall include legal heirs, successors and assigns);
                </p>

                <p className="text-center font-bold font-sans text-xs uppercase text-stone-500">AND</p>

                <p>
                  <strong>{secondPartyName}</strong>, bearing PAN <strong>{secondPartyPan}</strong>, contact <strong>{secondPartyPhone}</strong> (hereinafter referred to as the <strong>&quot;LESSEE / SECOND PARTY&quot;</strong>, which expression shall include authorized representatives).
                </p>

                <h4 className="font-sans font-bold text-xs uppercase text-[#064B25] pt-2">1. DEMISED PREMISES</h4>
                <p>
                  The First Party hereby demises to the Second Party, and the Second Party takes on lease, all that parcel of residential immovable property situated at: <strong>{propertyAddress}, {city}, {state}</strong> (approx. carpet area <strong>{carpetArea}</strong>).
                </p>

                <h4 className="font-sans font-bold text-xs uppercase text-[#064B25] pt-2">2. DURATION &amp; CONSIDERATION</h4>
                <p>
                  The tenancy shall be for a duration of <strong>{agreementDuration}</strong>, commencing from <strong>{commencementDate}</strong>. The monthly consideration payable by the Second Party shall be <strong>{formatCurrency(monthlyRent)}</strong>, payable in advance on or before the 5th of each English calendar month.
                </p>

                <h4 className="font-sans font-bold text-xs uppercase text-[#064B25] pt-2">3. SECURITY DEPOSIT</h4>
                <p>
                  The Second Party has deposited an interest-free refundable security deposit of <strong>{formatCurrency(securityDeposit)}</strong> with the First Party, refundable upon peaceful handover of possession subject to deductions for unpaid utilities or damages.
                </p>

                <h4 className="font-sans font-bold text-xs uppercase text-[#064B25] pt-2">4. LOCK-IN &amp; NOTICE PERIOD</h4>
                <p>
                  Both parties mutually agree to an initial lock-in period of <strong>{lockInPeriod}</strong>. Following expiration of the lock-in period, either party may terminate this agreement by tendering <strong>{noticePeriod}</strong> advance written notice.
                </p>

                <div className="pt-8 grid grid-cols-2 gap-8 font-sans text-xs">
                  <div className="border-t border-stone-400 pt-2 text-center">
                    <p className="font-bold">{firstPartyName}</p>
                    <p className="text-[10px] text-stone-500">Signature of First Party (Lessor)</p>
                  </div>
                  <div className="border-t border-stone-400 pt-2 text-center">
                    <p className="font-bold">{secondPartyName}</p>
                    <p className="text-[10px] text-stone-500">Signature of Second Party (Lessee)</p>
                  </div>
                </div>
              </div>

              {/* Legal Verification Disclaimer */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Statutory Legal Advisory:</strong> This document generation wizard produces standard non-registered contractual drafts. In accordance with State Tenancy Acts (such as Maharashtra Rent Control Act or Model Tenancy Act), tenancy agreements exceeding 11 months, or as mandated by state revenue directives, must be printed on authorized non-judicial e-stamp paper and registered with the Sub-Registrar of Assurances to be legally admissible in civil court proceedings.
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(3)} className="rounded-xl">
                  Back to Terms
                </Button>
                <Link href="/services/stamp-duty">
                  <Button className="bg-[#064B25] hover:bg-[#003D1C] text-white font-bold px-6 h-11 rounded-xl">
                    <span>Calculate Registration Duty for this Agreement</span>
                    <ChevronRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
