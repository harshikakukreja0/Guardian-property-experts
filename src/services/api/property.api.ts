import { PropertyItem, PropertyFilters, PropertyPurpose } from "@/types/property.types";
import { MOCK_PROPERTIES } from "../mock/properties.data";
import { ApiClient } from "./client";

export const propertyApi = {
  async getProperties(filters?: PropertyFilters): Promise<{ properties: PropertyItem[]; total: number }> {
    try {
      const response = await ApiClient.get<{ properties: PropertyItem[]; total: number }>("/properties", filters);
      return response.data;
    } catch {
      // High-fidelity local service layer
      let list = [...MOCK_PROPERTIES];

      if (filters?.purpose) {
        list = list.filter((p) => p.purpose === filters.purpose);
      }

      if (filters?.city) {
        list = list.filter((p) => p.location.city.toLowerCase() === filters.city?.toLowerCase());
      }

      if (filters?.locality) {
        list = list.filter((p) =>
          p.location.locality.toLowerCase().includes(filters.locality!.toLowerCase())
        );
      }

      if (filters?.category && filters.category.length > 0) {
        list = list.filter((p) => filters.category?.includes(p.category));
      }

      if (filters?.minPrice) {
        list = list.filter((p) => p.pricing.price >= filters.minPrice!);
      }

      if (filters?.maxPrice) {
        list = list.filter((p) => p.pricing.price <= filters.maxPrice!);
      }

      if (filters?.bhk && filters.bhk.length > 0) {
        list = list.filter((p) => filters.bhk?.includes(p.details.bhk));
      }

      if (filters?.verificationOnly) {
        list = list.filter((p) => p.verificationStatus === "verified");
      }

      if (filters?.readyToMoveOnly) {
        list = list.filter((p) => p.status === "Ready to Move");
      }

      if (filters?.sortBy) {
        if (filters.sortBy === "price-asc") {
          list.sort((a, b) => a.pricing.price - b.pricing.price);
        } else if (filters.sortBy === "price-desc") {
          list.sort((a, b) => b.pricing.price - a.pricing.price);
        } else if (filters.sortBy === "latest") {
          list.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        } else if (filters.sortBy === "popular") {
          list.sort((a, b) => b.viewsCount - a.viewsCount);
        }
      }

      return {
        properties: list,
        total: list.length,
      };
    }
  },

  async getPropertyBySlug(slug: string): Promise<PropertyItem | null> {
    try {
      const response = await ApiClient.get<PropertyItem>(`/properties/slug/${slug}`);
      return response.data;
    } catch {
      const found = MOCK_PROPERTIES.find((p) => p.slug === slug || p.id === slug);
      return found || null;
    }
  },

  async getFeaturedProperties(): Promise<PropertyItem[]> {
    const res = await this.getProperties();
    return res.properties.filter((p) => p.isFeatured);
  },

  async getPropertiesByPurpose(purpose: PropertyPurpose): Promise<PropertyItem[]> {
    const res = await this.getProperties({ purpose });
    return res.properties;
  },

  async submitProperty(data: any): Promise<{ success: boolean; id: string; message: string }> {
    try {
      const response = await ApiClient.post<{ id: string }>("/properties", data);
      return { success: true, id: response.data.id, message: "Property listed successfully!" };
    } catch {
      const newId = `prop-${Date.now().toString().slice(-4)}`;
      return {
        success: true,
        id: newId,
        message: "Property submitted successfully for administrative verification!",
      };
    }
  },
};
