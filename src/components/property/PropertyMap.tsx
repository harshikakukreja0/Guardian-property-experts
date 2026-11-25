"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Layers, Compass, ZoomIn, ZoomOut } from "lucide-react";
import { PropertyItem } from "@/types/property.types";

interface PropertyMapProps {
  properties: PropertyItem[];
  selectedProperty?: PropertyItem | null;
  onSelectProperty?: (property: PropertyItem) => void;
  className?: string;
}

export function PropertyMap({
  properties,
  selectedProperty,
  onSelectProperty,
  className = "",
}: PropertyMapProps) {
  const [activeProperty, setActiveProperty] = useState<PropertyItem | null>(
    selectedProperty || properties[0] || null
  );
  const [zoomLevel, setZoomLevel] = useState(13);

  const handlePinClick = (prop: PropertyItem) => {
    setActiveProperty(prop);
    if (onSelectProperty) onSelectProperty(prop);
  };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-stone-900 ${className}`}
      style={{ minHeight: "420px" }}
    >
      {/* Interactive Map Visual Simulation (Architectural Dark/Emerald Theme) */}
      <div className="absolute inset-0 bg-[#0d1410] overflow-hidden">
        {/* Subtle Map Grid Lines */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(22, 133, 44, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(22, 133, 44, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Topographic Road Arteries */}
        <svg className="absolute inset-0 w-full h-full stroke-emerald-900/40 fill-none" strokeWidth="2">
          <path d="M-50,200 Q200,100 400,250 T900,180" />
          <path d="M100,-20 Q250,300 350,500" strokeWidth="3" className="stroke-emerald-800/30" />
          <path d="M-20,400 Q400,380 800,420" strokeWidth="2.5" />
          <path d="M500,0 Q600,280 750,600" strokeWidth="2" />
        </svg>

        {/* Interactive Property Markers */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative w-full h-full max-w-2xl max-h-96">
            {properties.map((prop, index) => {
              // Distribute pins across mock coordinates
              const topPos = 20 + ((index * 23) % 65);
              const leftPos = 15 + ((index * 29) % 70);
              const isSelected = activeProperty?.id === prop.id;

              return (
                <div
                  key={prop.id}
                  style={{ top: `${topPos}%`, left: `${leftPos}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform duration-200 hover:scale-110"
                  onClick={() => handlePinClick(prop)}
                >
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-xl transition-all ${
                      isSelected
                        ? "bg-gpe-forest text-white ring-4 ring-emerald-400 font-bold scale-110"
                        : "bg-white text-stone-900 hover:bg-emerald-50 border border-stone-200 font-semibold"
                    }`}
                  >
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-emerald-300" : "text-gpe-forest"}`} />
                    <span className="text-xs whitespace-nowrap">{prop.pricing.displayPrice}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map Floating UI Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
        <button
          onClick={() => setZoomLevel((z) => Math.min(z + 1, 18))}
          className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md hover:bg-white text-stone-800 flex items-center justify-center shadow-lg transition"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(z - 1, 10))}
          className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md hover:bg-white text-stone-800 flex items-center justify-center shadow-lg transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Map Status Badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-950/80 backdrop-blur-md text-white text-xs border border-white/10 shadow-lg">
          <Navigation className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
          <span>Showing {properties.length} verified listings on map</span>
        </div>
      </div>

      {/* Selected Property Popup Card */}
      {activeProperty && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:w-96 z-20 bg-white rounded-2xl p-3.5 shadow-2xl border border-stone-200 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex gap-3">
            <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0 bg-stone-100">
              <img
                src={activeProperty.images[0]}
                alt={activeProperty.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] text-gpe-emerald font-bold uppercase tracking-wider">
                {activeProperty.details.bhk} BHK &bull; {activeProperty.category}
              </span>
              <h4 className="text-xs font-bold text-stone-900 truncate">{activeProperty.title}</h4>
              <p className="text-[11px] text-stone-500 truncate">
                {activeProperty.location.locality}, {activeProperty.location.city}
              </p>
              <div className="text-sm font-extrabold text-gpe-forest mt-1">
                {activeProperty.pricing.displayPrice}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
