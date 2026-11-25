"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MainHeader } from "@/components/common/MainHeader";
import { MainFooter } from "@/components/common/MainFooter";
import { formatCurrency } from "@/utils/formatters";
import {
  Calculator,
  ShieldCheck,
  Building,
  Info,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  FileText,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface StateDutyConfig {
  name: string;
  cities: string[];
  maleRate: number;
  femaleRate: number;
  jointRate: number;
  corporateRate: number;
  metroCess: number;
  registrationCap?: number;
  registrationRate: number;
  effectiveDate: string;
}

const STATE_CONFIGS: Record<string, StateDutyConfig> = {
  Maharashtra: {
    name: "Maharashtra",
    cities: ["Mumbai", "Pune", "Thane", "Nagpur", "Nashik"],
    maleRate: 6.0,
    femaleRate: 5.0,
    jointRate: 5.5,
    corporateRate: 7.0,
    metroCess: 1.0,
    registrationCap: 30000,
    registrationRate: 1.0,
    effectiveDate: "April 2024",
  },
  Delhi: {
    name: "Delhi",
    cities: ["New Delhi", "South Delhi", "West Delhi", "North Delhi"],
    maleRate: 6.0,
    femaleRate: 4.0,
    jointRate: 5.0,
    corporateRate: 6.0,
    metroCess: 0.0,
    registrationRate: 1.0,
    effectiveDate: "January 2024",
  },
  Karnataka: {
    name: "Karnataka",
    cities: ["Bangalore", "Mysore", "Mangalore", "Hubli"],
    maleRate: 5.0,
    femaleRate: 5.0,
    jointRate: 5.0,
    corporateRate: 5.0,
    metroCess: 2.0, // Cess + surcharges
    registrationRate: 1.0,
    effectiveDate: "February 2024",
  },
  Haryana: {
    name: "Haryana",
    cities: ["Gurugram", "Faridabad", "Panchkula", "Sonipat"],
    maleRate: 7.0,
    femaleRate: 5.0,
    jointRate: 6.0,
    corporateRate: 8.0,
    metroCess: 0.0,
    registrationRate: 1.0,
    registrationCap: 50000,
    effectiveDate: "March 2024",
  },
  "Uttar Pradesh": {
    name: "Uttar Pradesh",
    cities: ["Noida", "Greater Noida", "Lucknow", "Ghaziabad", "Kanpur"],
    maleRate: 7.0,
    femaleRate: 6.0,
    jointRate: 6.5,
    corporateRate: 7.0,
    metroCess: 0.0,
    registrationRate: 1.0,
    registrationCap: 20000,
    effectiveDate: "April 2024",
  },
  Telangana: {
    name: "Telangana",
    cities: ["Hyderabad", "Secunderabad", "Warangal"],
    maleRate: 5.5,
    femaleRate: 5.5,
    jointRate: 5.5,
    corporateRate: 5.5,
    metroCess: 0.5,
    registrationRate: 0.5,
    effectiveDate: "January 2024",
  },
};

export default function StampDutyPage() {
  const [selectedState, setSelectedState] = useState<string>("Maharashtra");
  const [selectedCity, setSelectedCity] = useState<string>("Mumbai");
  const [propertyType, setPropertyType] = useState<string>("Residential");
  const [propertyValue, setPropertyValue] = useState<number>(15000000); // 1.5 Cr
  const [ownershipType, setOwnershipType] = useState<"male" | "female" | "joint">("male");
  const [buyerCategory, setBuyerCategory] = useState<"individual" | "corporate">("individual");

  const config = STATE_CONFIGS[selectedState] || STATE_CONFIGS["Maharashtra"];

  // Calculate duty percentage
  let dutyPercent = config.maleRate;
  if (buyerCategory === "corporate") {
    dutyPercent = config.corporateRate;
  } else if (ownershipType === "female") {
    dutyPercent = config.femaleRate;
  } else if (ownershipType === "joint") {
    dutyPercent = config.jointRate;
  }

  const metroCessPercent = config.metroCess;
  const stampDutyAmount = Math.round((propertyValue * (dutyPercent + metroCessPercent)) / 100);

  // Registration fee
  let registrationFee = Math.round((propertyValue * config.registrationRate) / 100);
  if (config.registrationCap && registrationFee > config.registrationCap) {
    registrationFee = config.registrationCap;
  }

  const documentHandling = 1000;
  const totalRegistrationCost = stampDutyAmount + registrationFee + documentHandling;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50">
      <MainHeader />

      <main className="flex-1 py-6 sm:py-10 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-w-0">
        {/* Header Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-semibold text-stone-500">
          <Link href="/" className="hover:text-[#064B25]">Home</Link>
          <span>/</span>
          <span>Services</span>
          <span>/</span>
          <span className="text-[#064B25]">Stamp Duty & Registration Calculator</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#003D1C] to-[#064B25] rounded-3xl p-6 sm:p-10 text-white mb-10 shadow-lg">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold mb-3 border border-emerald-400/20">
              <ShieldCheck className="w-4 h-4" /> 100% RERA & State Revenue Aligned
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
              Stamp Duty & Property Registration Calculator
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              Calculate official state stamp duty, municipal cess, and sub-registrar registration charges for property transactions across major Indian states.
            </p>
          </div>
        </div>

        {/* Two-Column Interactive Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Inputs */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5EAE5] shadow-xs space-y-6">
            <h2 className="text-lg font-black text-[#202820] flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#064B25]" />
              <span>Property Transaction Details</span>
            </h2>

            {/* State & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Property State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    const newState = e.target.value;
                    setSelectedState(newState);
                    setSelectedCity(STATE_CONFIGS[newState]?.cities[0] || "");
                  }}
                  className="w-full h-12 px-3.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm font-semibold text-[#202820] focus:ring-2 focus:ring-[#064B25] focus:outline-none"
                >
                  {Object.keys(STATE_CONFIGS).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  City / Jurisdiction
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full h-12 px-3.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm font-semibold text-[#202820] focus:ring-2 focus:ring-[#064B25] focus:outline-none"
                >
                  {config.cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Property Value Slider & Number Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-700">
                  Property Transaction Value (Consideration Amount)
                </label>
                <span className="text-base font-black text-[#064B25]">
                  {formatCurrency(propertyValue)}
                </span>
              </div>
              <input
                type="range"
                min={1000000}
                max={200000000}
                step={500000}
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#064B25]"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-semibold mt-1">
                <span>₹10 Lakhs</span>
                <span>₹5 Cr</span>
                <span>₹20 Cr+</span>
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Property Category
              </label>
              <div className="grid grid-cols-1 min-[340px]:grid-cols-3 gap-2">
                {["Residential", "Commercial", "Land / Plot"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPropertyType(type)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                      propertyType === type
                        ? "bg-[#064B25] text-white border-[#064B25]"
                        : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Buyer Category */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Buyer Classification
              </label>
              <div className="grid grid-cols-1 min-[340px]:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBuyerCategory("individual")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                    buyerCategory === "individual"
                      ? "bg-[#064B25] text-white border-[#064B25]"
                      : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  Individual
                </button>
                <button
                  type="button"
                  onClick={() => setBuyerCategory("corporate")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                    buyerCategory === "corporate"
                      ? "bg-[#064B25] text-white border-[#064B25]"
                      : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  Company / Corporate Body
                </button>
              </div>
            </div>

            {/* Ownership Category (Only for individuals) */}
            {buyerCategory === "individual" && (
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Gender / Ownership Structure (For State Concessions)
                </label>
                <div className="grid grid-cols-1 min-[340px]:grid-cols-3 gap-2">
                  {[
                    { id: "male", label: "Male" },
                    { id: "female", label: "Female (Concession)" },
                    { id: "joint", label: "Joint (Male + Female)" },
                  ].map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setOwnershipType(o.id as any)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                        ownershipType === o.id
                          ? "bg-[#064B25] text-white border-[#064B25]"
                          : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Breakdown Output */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F0F7F0] rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-md">
              <div className="text-xs font-black uppercase text-[#064B25] tracking-wider mb-1">
                Estimated Government Charges
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#003D1C] mb-4">
                {formatCurrency(totalRegistrationCost)}
              </div>

              <div className="space-y-3 pt-3 border-t border-emerald-200/80 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-stone-700">
                  <span>
                    Stamp Duty ({dutyPercent}% in {selectedState})
                  </span>
                  <span className="font-bold text-[#202820]">
                    {formatCurrency(Math.round((propertyValue * dutyPercent) / 100))}
                  </span>
                </div>

                {metroCessPercent > 0 && (
                  <div className="flex justify-between items-center text-stone-700">
                    <span>Local Body / Metro Cess ({metroCessPercent}%)</span>
                    <span className="font-bold text-[#202820]">
                      {formatCurrency(Math.round((propertyValue * metroCessPercent) / 100))}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center text-stone-700">
                  <span>
                    Registration Charges{" "}
                    {config.registrationCap ? `(Capped at ₹${config.registrationCap.toLocaleString()})` : `(${config.registrationRate}%)`}
                  </span>
                  <span className="font-bold text-[#202820]">
                    {formatCurrency(registrationFee)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-stone-700">
                  <span>Sub-Registrar Scanning & Documentation</span>
                  <span className="font-bold text-[#202820]">₹1,000</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-emerald-200/80 space-y-2">
                <Link href="/services/agreements">
                  <Button className="w-full bg-[#064B25] hover:bg-[#003D1C] text-white font-bold h-12 rounded-xl text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2">
                    <span>Draft Sale / Lease Agreement</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/services/home-loan">
                  <Button variant="outline" className="w-full border-[#064B25] text-[#064B25] font-bold h-12 rounded-xl text-xs sm:text-sm hover:bg-emerald-50">
                    Check Home Loan Affordability
                  </Button>
                </Link>
              </div>
            </div>

            {/* Disclaimer Alert */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed flex items-start gap-3">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Important Regulatory Disclaimer:</strong> Stamp duty and registration rates are governed by respective State Stamp Acts and municipal notifications. The figures presented above are estimates based on rates effective as of {config.effectiveDate}. Final registration fees must be verified against current governmentReady Reckoner / Circle Rates at your local Sub-Registrar Office before deed execution.
              </div>
            </div>
          </div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
