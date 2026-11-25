export type PropertyPurpose = "buy" | "rent" | "commercial";

export type PropertyCategory =
  | "Apartment"
  | "Independent House"
  | "Villa"
  | "Plot"
  | "Office Space"
  | "Shop"
  | "Warehouse"
  | "Penthouse"
  | "Studio";

export type FurnishingStatus = "Unfurnished" | "Semi-Furnished" | "Fully Furnished";

export type PropertyStatus = "Ready to Move" | "Under Construction" | "Resale" | "New Launch";

export type VerificationStatus = "verified" | "pending" | "rejected" | "featured";

export interface PropertySeller {
  id: string;
  name: string;
  type: "Owner" | "Broker" | "Builder";
  phone: string;
  email: string;
  companyName?: string;
  rating?: number;
  totalListings?: number;
  avatar?: string;
  isVerified?: boolean;
}

export interface PropertyLocation {
  state: string;
  city: string;
  locality: string;
  sector?: string;
  address: string;
  pincode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  landmark?: string;
}

export interface PropertyPricing {
  price: number; // in INR
  displayPrice: string; // e.g. "₹1.45 Cr", "₹45,000 / mo"
  pricePerSqFt?: number;
  monthlyMaintenance?: number;
  securityDeposit?: number; // for rent
  isNegotiable?: boolean;
}

export interface PropertyDetails {
  bhk: number;
  bathrooms: number;
  balconies: number;
  carpetArea: number; // in sq ft
  builtUpArea?: number;
  superBuiltUpArea?: number;
  floor: number;
  totalFloors: number;
  facing?: "North" | "South" | "East" | "West" | "North-East" | "North-West" | "South-East" | "South-West";
  furnishing: FurnishingStatus;
  propertyAge?: string;
  parkingAvailable?: "Car + Bike" | "Car Only" | "Bike Only" | "None";
  reraApproved?: boolean;
  reraId?: string;
}

export interface PropertyItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  purpose: PropertyPurpose;
  category: PropertyCategory;
  pricing: PropertyPricing;
  location: PropertyLocation;
  details: PropertyDetails;
  amenities: string[];
  images: string[];
  floorPlanUrl?: string;
  virtualTourUrl?: string;
  seller: PropertySeller;
  status: PropertyStatus;
  verificationStatus: VerificationStatus;
  postedDate: string;
  viewsCount: number;
  inquiriesCount: number;
  isFeatured?: boolean;
  tags?: string[];
}

export interface PropertyFilters {
  purpose?: PropertyPurpose;
  city?: string;
  locality?: string;
  category?: PropertyCategory[];
  minPrice?: number;
  maxPrice?: number;
  bhk?: number[];
  furnishing?: FurnishingStatus[];
  verificationOnly?: boolean;
  readyToMoveOnly?: boolean;
  minArea?: number;
  maxArea?: number;
  amenities?: string[];
  sortBy?: "price-asc" | "price-desc" | "latest" | "popular" | "relevance";
}
