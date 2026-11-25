import { PropertyCategory, PropertyPurpose, FurnishingStatus } from "./property.types";

export interface PropertySubmissionFormData {
  // Step 1: Purpose
  purpose: PropertyPurpose;

  // Step 2: Category
  category: PropertyCategory;

  // Step 3: Location
  state: string;
  city: string;
  locality: string;
  sector?: string;
  address: string;
  pincode: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;

  // Step 4: Details
  bhk: number;
  bathrooms: number;
  balconies: number;
  carpetArea: number;
  builtUpArea?: number;
  superBuiltUpArea?: number;
  floor: number;
  totalFloors: number;
  furnishing: FurnishingStatus;
  propertyAge: string;
  facing?: string;
  parking: string;

  // Step 5: Pricing
  price: number;
  monthlyRent?: number;
  maintenance?: number;
  securityDeposit?: number;
  isNegotiable: boolean;

  // Step 6: Amenities
  amenities: string[];

  // Step 7: Media
  images: string[];
  floorPlanUrl?: string;
  videoUrl?: string;
  documents?: string[];

  // Step 8: Contact
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  sellerType: "Owner" | "Broker" | "Builder";
  reraRegistration?: string;
}
