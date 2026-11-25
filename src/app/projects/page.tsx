"use client";

import React, { useState } from "react";
import { MainHeader } from "@/components/common/MainHeader";
import { MainFooter } from "@/components/common/MainFooter";
import { ProjectCard } from "@/components/project/ProjectCard";
import { MOCK_PROJECTS } from "@/services/mock/projects.data";
import { ProjectStage } from "@/types/project.types";
import { Layers, Sparkles } from "lucide-react";

const STAGES: ("All" | ProjectStage)[] = [
  "All",
  "New Launch",
  "Under Construction",
  "Ready to Move",
  "Upcoming",
];

export default function ProjectsPage() {
  const [selectedStage, setSelectedStage] = useState<"All" | ProjectStage>("All");

  const filteredProjects = selectedStage === "All"
    ? MOCK_PROJECTS
    : MOCK_PROJECTS.filter((p) => p.stage === selectedStage);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50">
      <MainHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 min-w-0">
        <div className="space-y-2">
          <div className="text-xs text-stone-500">Home &bull; New Residential Projects</div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight break-words">
              Trending New Residential Projects
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              Direct Builder Pricing
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500">
            Explore newly launched townships, under-construction towers and ready-to-move masterplans by India&apos;s most reputed developers.
          </p>
        </div>

        {/* Stage Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pb-3 border-b border-stone-200">
          {STAGES.map((stage) => (
            <button
              key={stage}
              onClick={() => setSelectedStage(stage)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedStage === stage
                  ? "bg-gpe-forest text-white shadow-sm"
                  : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
