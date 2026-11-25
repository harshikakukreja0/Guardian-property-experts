import { ProjectItem, BuilderProfile } from "@/types/project.types";
import { MOCK_PROJECTS, MOCK_BUILDERS } from "../mock/projects.data";
import { ApiClient } from "./client";

export const projectApi = {
  async getProjects(filters?: { stage?: string; city?: string }): Promise<ProjectItem[]> {
    try {
      const response = await ApiClient.get<ProjectItem[]>("/projects", filters);
      return response.data;
    } catch {
      let list = [...MOCK_PROJECTS];
      if (filters?.stage) {
        list = list.filter((p) => p.stage === filters.stage);
      }
      if (filters?.city) {
        list = list.filter((p) => p.location.city.toLowerCase() === filters.city?.toLowerCase());
      }
      return list;
    }
  },

  async getProjectBySlug(slug: string): Promise<ProjectItem | null> {
    try {
      const response = await ApiClient.get<ProjectItem>(`/projects/slug/${slug}`);
      return response.data;
    } catch {
      return MOCK_PROJECTS.find((p) => p.slug === slug || p.id === slug) || null;
    }
  },

  async getBuilders(): Promise<BuilderProfile[]> {
    try {
      const response = await ApiClient.get<BuilderProfile[]>("/builders");
      return response.data;
    } catch {
      return MOCK_BUILDERS;
    }
  },

  async getBuilderBySlug(slug: string): Promise<BuilderProfile | null> {
    try {
      const response = await ApiClient.get<BuilderProfile>(`/builders/slug/${slug}`);
      return response.data;
    } catch {
      return MOCK_BUILDERS.find((b) => b.slug === slug || b.id === slug) || null;
    }
  },
};
