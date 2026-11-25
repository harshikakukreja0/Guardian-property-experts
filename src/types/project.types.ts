export type ProjectStage = "New Launch" | "Upcoming" | "Under Construction" | "Ready to Move";

export interface ProjectUnitConfig {
  type: string; // e.g. "2 BHK Luxury", "3 BHK Premium"
  carpetArea: string; // e.g. "1,250 - 1,480 sq.ft."
  priceRange: string; // e.g. "₹1.2 - 1.5 Cr"
  floorPlanUrl?: string;
  availableUnits: number;
}

export interface BuilderProfile {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage?: string;
  experienceYears: number;
  totalProjects: number;
  ongoingProjects: number;
  completedProjects: number;
  description: string;
  establishedYear: number;
  headquarters: string;
  isVerified: boolean;
  rating: number;
  reviewsCount: number;
  phone: string;
  email: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  builder: BuilderProfile;
  location: {
    city: string;
    locality: string;
    address: string;
    pincode: string;
    coordinates: { lat: number; lng: number };
  };
  priceRange: string;
  minPrice: number;
  maxPrice: number;
  stage: ProjectStage;
  possessionDate: string;
  totalTowers: number;
  totalUnits: number;
  projectArea: string; // e.g. "14.5 Acres"
  reraId: string;
  images: string[];
  bannerImage: string;
  overview: string;
  description: string;
  unitConfigurations: ProjectUnitConfig[];
  amenities: string[];
  brochureUrl?: string;
  isFeatured?: boolean;
}
