import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^[\d\s+\-()]+$/, "Invalid phone number"),
  nationalId: z
    .string()
    .min(7, "National ID must be at least 7 characters")
    .max(10, "National ID too long"),
  kraPin: z.string().optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const applicationSchema = z.object({
  propertyId: z.string().min(1),
  unitType: z.string().min(1, "Please select a unit type"),
  employment: z.string().min(1, "Please select employment type"),
  employer: z.string().optional(),
  monthlyIncome: z
    .number({ invalid_type_error: "Must be a number" })
    .min(5000, "Monthly income must be at least KES 5,000"),
  additionalInfo: z.string().max(1000).optional(),
});

export const siteVisitSchema = z.object({
  propertyId: z.string().min(1, "Please select a property"),
  date: z.string().min(1, "Please select a date").refine((val) => {
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  }, "Date cannot be in the past"),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().max(500).optional(),
});

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const propertySchema = z.object({
  name: z.string().min(3, "Name is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  countyId: z.string().min(1, "Please select a county"),
  town: z.string().min(2, "Town is required"),
  address: z.string().min(5, "Address is required"),
  houseType: z.enum(["STUDIO", "ONE_BEDROOM", "TWO_BEDROOM", "THREE_BEDROOM", "MAISONETTE", "BUNGALOW"]),
  bedrooms: z.number().min(0).max(10),
  startingPrice: z.number().min(100000, "Starting price must be at least KES 100,000"),
  totalUnits: z.number().min(1),
  availableUnits: z.number().min(0),
  status: z.enum(["AVAILABLE", "SELLING_FAST", "SOLD_OUT", "COMING_SOON"]),
  isFeatured: z.boolean().optional(),
});

export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ApplicationData = z.infer<typeof applicationSchema>;
export type SiteVisitData = z.infer<typeof siteVisitSchema>;
export type AdminLoginData = z.infer<typeof adminLoginSchema>;
export type PropertyData = z.infer<typeof propertySchema>;
