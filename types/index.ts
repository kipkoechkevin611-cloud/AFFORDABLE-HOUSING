export type UserRole = "USER" | "ADMIN";
export type HouseType = "STUDIO" | "ONE_BEDROOM" | "TWO_BEDROOM" | "THREE_BEDROOM" | "MAISONETTE" | "BUNGALOW";
export type PropertyStatus = "AVAILABLE" | "SELLING_FAST" | "SOLD_OUT" | "COMING_SOON";
export type ApplicationStatus = "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "WAITLISTED";
export type VisitStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export interface County {
  id: string;
  name: string;
  code: string;
}

export interface PaymentPlan {
  id: string;
  name: string;
  duration: number;
  monthlyAmount: number;
  deposit: number;
  description?: string | null;
}

export interface Property {
  id: string;
  name: string;
  slug: string;
  description: string;
  county: County;
  countyId: string;
  town: string;
  address: string;
  houseType: HouseType;
  bedrooms: number;
  startingPrice: number;
  images: string[];
  amenities: string[];
  totalUnits: number;
  availableUnits: number;
  status: PropertyStatus;
  nearbyFacilities: string[];
  coordinates?: string | null;
  isFeatured: boolean;
  paymentPlans: PaymentPlan[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationalId: string;
  kraPin?: string | null;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
}

export interface Application {
  id: string;
  userId: string;
  propertyId: string;
  property: Pick<Property, "id" | "name" | "town" | "images" | "slug">;
  unitType: string;
  employment: string;
  employer?: string | null;
  monthlyIncome: number;
  additionalInfo?: string | null;
  status: ApplicationStatus;
  createdAt: string;
}

export interface SiteVisit {
  id: string;
  userId: string;
  propertyId: string;
  property: Pick<Property, "id" | "name" | "town" | "images" | "slug">;
  date: string;
  time: string;
  notes?: string | null;
  status: VisitStatus;
  createdAt: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

export interface PropertyFilters {
  county?: string;
  town?: string;
  houseType?: HouseType;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  status?: PropertyStatus;
  search?: string;
}
