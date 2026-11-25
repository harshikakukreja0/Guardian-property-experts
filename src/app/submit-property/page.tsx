"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Building,
  Home,
  Briefcase,
  MapPin,
  IndianRupee,
  Sparkles,
  Upload,
  User,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { MainHeader } from "@/components/common/MainHeader";
import { MainFooter } from "@/components/common/MainFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWizardStore } from "@/store/wizardStore";
import { propertyApi } from "@/services/api/property.api";
import { PropertyCategory, FurnishingStatus } from "@/types/property.types";

const ALL_CATEGORIES: PropertyCategory[] = [
  "Apartment",
  "Independent House",
  "Villa",
  "Plot",
  "Office Space",
  "Shop",
  "Warehouse",
];

const ALL_AMENITIES = [
  "Swimming Pool",
  "Gymnasium",
  "Clubhouse",
  "24/7 Security",
  "Power Backup",
  "Covered Parking",
  "EV Charging Station",
  "Children Play Area",
  "Jogging Track",
  "High Speed Elevators",
  "Private Garden",
  "Smart Home Automation",
];

export default function SubmitPropertyPage() {
  const { currentStep, formData, nextStep, prevStep, updateFormData, resetForm } = useWizardStore();
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await propertyApi.submitProperty(formData);
      setSubmittedId(res.id);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50">
      <MainHeader />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {submittedId ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 text-center space-y-6 shadow-xl animate-in fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-gpe-emerald uppercase tracking-wider">
                Submission Received &bull; ID: #{submittedId}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Property Submitted for Verification!
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                Your listing for <span className="font-semibold text-stone-900">{formData.category} in {formData.locality}, {formData.city}</span> has been dispatched to our Operations team for legal title & RERA review. It will go live within 2-4 hours.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/dashboard/owner">
                <Button className="font-bold">Go to Owner Dashboard</Button>
              </Link>
              <button
                onClick={() => {
                  resetForm();
                  setSubmittedId(null);
                }}
                className="text-xs font-bold text-gpe-forest hover:underline"
              >
                Post Another Property
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden">
            {/* Top Wizard Steps Indicator */}
            <div className="bg-stone-950 p-6 sm:p-8 text-white border-b border-stone-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                    Step {currentStep} of 9
                  </span>
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Post Verified Property
                  </h1>
                </div>
                <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-white/80">
                  {Math.round((currentStep / 9) * 100)}% Completed
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-green-400 h-full transition-all duration-300"
                  style={{ width: `${(currentStep / 9) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Body */}
            <div className="p-6 sm:p-10 space-y-8">
              {/* Step 1: Purpose */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">What do you want to do?</h3>
                    <p className="text-xs text-stone-500">Select the primary purpose of your property listing.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: "buy", label: "Sell Property", desc: "List for prospective buyers", icon: Home },
                      { id: "rent", label: "Rent Out", desc: "List for verified tenants", icon: Building },
                      { id: "commercial", label: "Commercial", desc: "Offices, retail, tech parks", icon: Briefcase },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateFormData({ purpose: opt.id as any })}
                        className={`p-6 rounded-2xl border text-left transition flex flex-col justify-between space-y-4 ${
                          formData.purpose === opt.id
                            ? "bg-emerald-50/60 border-gpe-forest ring-2 ring-emerald-500/20"
                            : "hover:bg-stone-50 border-stone-200"
                        }`}
                      >
                        <opt.icon className={`w-8 h-8 ${formData.purpose === opt.id ? "text-gpe-forest" : "text-stone-400"}`} />
                        <div>
                          <div className="font-bold text-stone-900 text-sm">{opt.label}</div>
                          <div className="text-[11px] text-stone-500 mt-0.5">{opt.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Category */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">Select Property Category</h3>
                    <p className="text-xs text-stone-500">Choose the architectural classification that best matches.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {ALL_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => updateFormData({ category: cat })}
                        className={`p-4 rounded-xl border text-left text-xs font-semibold transition ${
                          formData.category === cat
                            ? "bg-gpe-forest text-white border-gpe-forest shadow-xs font-bold"
                            : "hover:bg-stone-50 border-stone-200 text-stone-800"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Location */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">Property Location</h3>
                    <p className="text-xs text-stone-500">Accurate location ensures higher search rankings.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">City</label>
                      <Input
                        value={formData.city}
                        onChange={(e) => updateFormData({ city: e.target.value })}
                        placeholder="e.g. Mumbai, Gurugram, Bangalore"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Locality / Sector</label>
                      <Input
                        value={formData.locality}
                        onChange={(e) => updateFormData({ locality: e.target.value })}
                        placeholder="e.g. Worli Sea Face, Sector 42"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Complete Address</label>
                    <Input
                      value={formData.address}
                      onChange={(e) => updateFormData({ address: e.target.value })}
                      placeholder="Building name, flat number, street"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">State</label>
                      <Input
                        value={formData.state}
                        onChange={(e) => updateFormData({ state: e.target.value })}
                        placeholder="Maharashtra"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Pincode</label>
                      <Input
                        value={formData.pincode}
                        onChange={(e) => updateFormData({ pincode: e.target.value })}
                        placeholder="400018"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Details */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">Property Configuration & Area</h3>
                    <p className="text-xs text-stone-500">Provide dimensions and layout details.</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">BHK</label>
                      <select
                        value={formData.bhk}
                        onChange={(e) => updateFormData({ bhk: Number(e.target.value) })}
                        className="h-11 w-full rounded-xl border border-stone-200 bg-white px-3 text-xs"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} BHK
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Bathrooms</label>
                      <select
                        value={formData.bathrooms}
                        onChange={(e) => updateFormData({ bathrooms: Number(e.target.value) })}
                        className="h-11 w-full rounded-xl border border-stone-200 bg-white px-3 text-xs"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} Baths
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Balconies</label>
                      <select
                        value={formData.balconies}
                        onChange={(e) => updateFormData({ balconies: Number(e.target.value) })}
                        className="h-11 w-full rounded-xl border border-stone-200 bg-white px-3 text-xs"
                      >
                        {[0, 1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} Balconies
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Carpet Area (sq.ft.)</label>
                      <Input
                        type="number"
                        value={formData.carpetArea}
                        onChange={(e) => updateFormData({ carpetArea: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Furnishing Status</label>
                      <select
                        value={formData.furnishing}
                        onChange={(e) => updateFormData({ furnishing: e.target.value as FurnishingStatus })}
                        className="h-11 w-full rounded-xl border border-stone-200 bg-white px-3 text-xs"
                      >
                        <option value="Unfurnished">Unfurnished</option>
                        <option value="Semi-Furnished">Semi-Furnished</option>
                        <option value="Fully Furnished">Fully Furnished</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Pricing */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">Pricing & Maintenance</h3>
                    <p className="text-xs text-stone-500">Provide clear transparent figures.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Expected Price / Rent (₹)</label>
                      <Input
                        type="number"
                        icon={<IndianRupee className="w-4 h-4" />}
                        value={formData.price}
                        onChange={(e) => updateFormData({ price: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Monthly Maintenance (₹)</label>
                      <Input
                        type="number"
                        value={formData.maintenance}
                        onChange={(e) => updateFormData({ maintenance: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Amenities */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">Amenities & Highlights</h3>
                    <p className="text-xs text-stone-500">Select all amenities available in the building or residence.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {ALL_AMENITIES.map((am) => {
                      const isSelected = formData.amenities.includes(am);
                      return (
                        <button
                          key={am}
                          type="button"
                          onClick={() => {
                            const updated = isSelected
                              ? formData.amenities.filter((item) => item !== am)
                              : [...formData.amenities, am];
                            updateFormData({ amenities: updated });
                          }}
                          className={`p-3 rounded-xl border text-left text-xs font-semibold transition flex items-center justify-between ${
                            isSelected
                              ? "bg-emerald-50 text-gpe-forest border-emerald-300 font-bold"
                              : "hover:bg-stone-50 border-stone-200 text-stone-700"
                          }`}
                        >
                          <span>{am}</span>
                          {isSelected && <Check className="w-4 h-4 text-gpe-emerald" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 7: Media */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">Upload Photos & Floor Plans</h3>
                    <p className="text-xs text-stone-500">Listings with high resolution photos receive 8x more inquiries.</p>
                  </div>
                  <div className="p-8 border-2 border-dashed border-stone-300 rounded-3xl text-center space-y-3 bg-stone-50/50">
                    <Upload className="w-10 h-10 text-stone-400 mx-auto" />
                    <div>
                      <div className="text-xs font-bold text-stone-800">Drag & drop high-res property photos here</div>
                      <div className="text-[11px] text-stone-400">Supports JPG, PNG, WebP up to 15MB each</div>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      Browse Files
                    </Button>
                  </div>
                  <div className="text-xs text-emerald-800 font-semibold bg-emerald-50 p-3 rounded-xl">
                    ✓ 2 High-resolution sample architectural photos pre-staged for preview.
                  </div>
                </div>
              )}

              {/* Step 8: Contact */}
              {currentStep === 8 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">Contact & Seller Details</h3>
                    <p className="text-xs text-stone-500">Direct inquiries will be forwarded to these credentials.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Your Name</label>
                      <Input
                        value={formData.sellerName}
                        onChange={(e) => updateFormData({ sellerName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Phone Number</label>
                      <Input
                        value={formData.sellerPhone}
                        onChange={(e) => updateFormData({ sellerPhone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Email</label>
                      <Input
                        value={formData.sellerEmail}
                        onChange={(e) => updateFormData({ sellerEmail: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Seller Type</label>
                      <select
                        value={formData.sellerType}
                        onChange={(e) => updateFormData({ sellerType: e.target.value as any })}
                        className="h-11 w-full rounded-xl border border-stone-200 bg-white px-3 text-xs"
                      >
                        <option value="Owner">Property Owner</option>
                        <option value="Broker">Broker</option>
                        <option value="Builder">Builder</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 9: Preview & Final Submission */}
              {currentStep === 9 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">Review & Confirmation</h3>
                    <p className="text-xs text-stone-500">Verify details before submitting for compliance clearance.</p>
                  </div>

                  <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-stone-200">
                      <div>
                        <span className="text-stone-400 font-semibold block uppercase text-[10px]">Purpose & Type</span>
                        <span className="font-bold text-stone-800 text-sm">
                          {formData.purpose.toUpperCase()} &bull; {formData.category} ({formData.bhk} BHK)
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-400 font-semibold block uppercase text-[10px]">Expected Price</span>
                        <span className="font-bold text-gpe-forest text-sm">
                          ₹{formData.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-stone-400 font-semibold block uppercase text-[10px]">Location</span>
                        <span className="font-medium text-stone-800">
                          {formData.locality}, {formData.city} - {formData.pincode}
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-400 font-semibold block uppercase text-[10px]">Contact Person</span>
                        <span className="font-medium text-stone-800">
                          {formData.sellerName} ({formData.sellerType}) &bull; {formData.sellerPhone}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-stone-400 font-semibold block uppercase text-[10px]">Selected Amenities</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {formData.amenities.map((a) => (
                          <span key={a} className="bg-white border border-stone-200 px-2 py-0.5 rounded text-[10px]">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Nav Buttons */}
              <div className="pt-6 border-t border-stone-150 flex items-center justify-between">
                {currentStep > 1 ? (
                  <Button variant="outline" onClick={prevStep} className="flex items-center gap-1.5">
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Step</span>
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 9 ? (
                  <Button onClick={nextStep} className="flex items-center gap-1.5 font-bold shadow-md">
                    <span>Next Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg"
                  >
                    {submitting ? "Submitting Listing..." : "Confirm & Submit Property"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <MainFooter />
    </div>
  );
}
