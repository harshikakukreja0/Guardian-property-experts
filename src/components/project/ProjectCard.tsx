import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, Building2, Layers, ArrowUpRight } from "lucide-react";
import { ProjectItem } from "@/types/project.types";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <div className="group rounded-2xl bg-white border border-stone-200/90 hover:border-gpe-forest/30 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Visual Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
        <Image
          src={project.images[0] || "/images/architecture.jpg"}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Badge className="bg-gpe-emerald text-white text-[10px] font-bold">
            {project.stage}
          </Badge>
          <Badge variant="luxury" className="text-[10px]">
            {project.projectArea}
          </Badge>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="text-[11px] text-emerald-300 font-semibold tracking-wide uppercase">
            By {project.builder.name}
          </span>
          <h3 className="text-lg font-bold text-white line-clamp-1">{project.title}</h3>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <MapPin className="w-3.5 h-3.5 text-gpe-emerald shrink-0" />
            <span className="truncate">
              {project.location.locality}, {project.location.city}
            </span>
          </div>
          <p className="text-xs text-stone-600 line-clamp-2">{project.overview}</p>
        </div>

        {/* Configurations & Possession */}
        <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-stone-100 text-xs">
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Price Range</span>
            <span className="font-bold text-gpe-forest text-sm">{project.priceRange}</span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Possession</span>
            <span className="font-semibold text-stone-800 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gpe-emerald" />
              {project.possessionDate}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-stone-500">RERA: {project.reraId.slice(0, 15)}...</span>
          <Link
            href={`/projects`}
            className="inline-flex items-center gap-1 text-xs font-bold text-gpe-forest hover:text-gpe-emerald"
          >
            <span>Project Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
