"use client";

import React, { useState } from "react";
import { X, Phone, Mail, User, CheckCircle2, MessageSquare } from "lucide-react";
import { PropertyItem } from "@/types/property.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { leadsApi } from "@/services/api/leads.api";

interface ContactSellerModalProps {
  property: PropertyItem;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactSellerModal({ property, isOpen, onClose }: ContactSellerModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(`I am interested in ${property.title}. Please share full brochure and price breakdown.`);
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
      message,
      source: "Property Page",
      status: "New",
      budget: property.pricing.displayPrice,
      assignedTo: property.seller.name,
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-stone-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Enquiry Dispatched!</h3>
            <p className="text-xs text-stone-600">
              Your contact request for <span className="font-semibold text-stone-900">{property.title}</span> has been shared with {property.seller.name} ({property.seller.type}).
            </p>
            <div className="p-3.5 bg-emerald-50 rounded-2xl text-xs text-emerald-900 font-medium">
              Seller Direct Phone: <span className="font-bold">{property.seller.phone}</span>
            </div>
            <Button onClick={onClose} className="w-full">
              Done
            </Button>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="text-[10px] font-bold text-gpe-emerald uppercase tracking-wider">
                Direct Contact
              </span>
              <h3 className="text-lg font-bold text-stone-900">Contact {property.seller.type}</h3>
              <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">{property.seller.companyName || property.seller.name}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Your Full Name</label>
                <Input
                  required
                  placeholder="e.g. Rajesh Mehra"
                  icon={<User className="w-4 h-4" />}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

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
                <label className="text-xs font-semibold text-stone-700 block mb-1">Email Address</label>
                <Input
                  type="email"
                  required
                  placeholder="rajesh@example.com"
                  icon={<Mail className="w-4 h-4" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Custom Message</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-white p-3 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-gpe-emerald"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Sending Enquiry..." : "Send Instant Enquiry"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
