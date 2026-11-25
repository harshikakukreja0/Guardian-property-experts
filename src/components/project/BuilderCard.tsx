import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Building2, ShieldCheck, Award, ArrowRight } from "lucide-react";
import { BuilderProfile } from "@/types/project.types";
import { Badge } from "@/components/ui/badge";

export function BuilderCard({ builder }: { builder: BuilderProfile }) {
  return (
    <div className="group rounded-2xl bg-white border border-stone-200/90 hover:border-gpe-forest/30 p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-stone-100 border border-stone-200 p-2 flex items-center justify-center shrink-0">
            <Building2 className="w-8 h-8 text-gpe-forest" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-stone-900 group-hover:text-gpe-forest transition text-base">
                {builder.name}
              </h3>
              {builder.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
            </div>
            <p className="text-xs text-stone-500">Established {builder.establishedYear} &bull; {builder.headquarters}</p>
          </div>
        </div>

        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
          {builder.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-center">
          <div>
            <div className="text-base font-bold text-gpe-forest">{builder.experienceYears}+</div>
            <div className="text-[10px] text-stone-400 uppercase font-medium">Years Exp</div>
          </div>
          <div>
            <div className="text-base font-bold text-gpe-forest">{builder.totalProjects}</div>
            <div className="text-[10px] text-stone-400 uppercase font-medium">Projects</div>
          </div>
          <div>
            <div className="text-base font-bold text-gpe-forest">{builder.ongoingProjects}</div>
            <div className="text-[10px] text-stone-400 uppercase font-medium">Ongoing</div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-stone-500">★ {builder.rating} Rating</span>
        <Link
          href={`/projects`}
          className="inline-flex items-center gap-1 text-xs font-bold text-gpe-forest hover:text-gpe-emerald"
        >
          <span>View Projects</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
