"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, CheckCircle2, User, Phone, Mail } from "lucide-react";
import { PropertyItem } from "@/types/property.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { leadsApi } from "@/services/api/leads.api";

interface ScheduleVisitModalProps {
  property: PropertyItem;
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleVisitModal({ property, isOpen, onClose }: ScheduleVisitModalProps) {
  const [date, setDate] = useState("2026-11-28");
  const [timeSlot, setTimeSlot] = useState("11:00 AM - 01:00 PM");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await leadsApi.createEnquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      scheduledVisitDate: `${date} ${timeSlot}`,
      source: "Property Page",
      status: "Site Visit Scheduled",
      budget: property.pricing.displayPrice,
      assignedTo: property.seller.name,
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-stone-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Site Visit Confirmed!</h3>
            <p className="text-sm text-stone-600 max-w-sm mx-auto">
              Your guided physical site visit for <span className="font-semibold text-stone-900">{property.title}</span> has been confirmed for {date} at {timeSlot}.
            </p>
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-left space-y-1">
              <div><span className="font-semibold text-stone-700">Dedicated Advisor:</span> {property.seller.name}</div>
              <div><span className="font-semibold text-stone-700">Direct Contact:</span> {property.seller.phone}</div>
              <div><span className="font-semibold text-stone-700">Location:</span> {property.location.address}</div>
            </div>
            <Button onClick={onClose} className="w-full">
              Close Window
            </Button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold text-gpe-emerald uppercase tracking-wider">
                Exclusive Viewing
              </span>
              <h3 className="text-xl font-bold text-stone-900">Schedule Private Site Tour</h3>
              <p className="text-xs text-stone-500 mt-1 line-clamp-1">{property.title}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Select Date
                  </label>
                  <Input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="h-11 w-full rounded-xl border border-stone-200 bg-white px-3 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-gpe-emerald"
                  >
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                    <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                    <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Full Name</label>
                <Input
                  required
                  placeholder="Enter your name"
                  icon={<User className="w-4 h-4" />}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Phone Number</label>
                  <Input
                    type="tel"
                    required
                    placeholder="+91 98000 00000"
                    icon={<Phone className="w-4 h-4" />}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Email</label>
                  <Input
                    type="email"
                    required
                    placeholder="you@email.com"
                    icon={<Mail className="w-4 h-4" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Scheduling..." : "Confirm Site Visit"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
