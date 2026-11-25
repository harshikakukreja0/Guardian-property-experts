export type UserRole =
  | "super-admin"
  | "operations"
  | "sales-crm"
  | "broker"
  | "builder"
  | "owner"
  | "customer"
  | "support";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  agencyName?: string;
  builderName?: string;
  reraRegistration?: string;
  isVerified: boolean;
  createdAt: string;
  address?: string;
  city?: string;
  state?: string;
  savedPropertyIds?: string[];
  viewedPropertyIds?: string[];
}
