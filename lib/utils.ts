import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-KE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function buildApplicationWhatsApp(data: {
  name: string;
  idNumber: string;
  phone: string;
  email?: string;
  location: string;
  project: string;
  unitType: string;
  employment: string;
  employer?: string;
  income: string;
  additionalInfo?: string;
}): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254740272542";
  const lines = [
    `🏠 *NEW HOUSING APPLICATION*`,
    ``,
    `👤 *Full Name:* ${data.name}`,
    `🪪 *ID Number:* ${data.idNumber}`,
    `📞 *Phone:* ${data.phone}`,
    data.email ? `📧 *Email:* ${data.email}` : null,
    `📍 *Location/Constituency:* ${data.location}`,
    ``,
    `🏘️ *Project Applied:* ${data.project}`,
    `🏡 *Unit Type:* ${data.unitType}`,
    ``,
    `💼 *Employment:* ${data.employment}`,
    data.employer ? `🏢 *Employer:* ${data.employer}` : null,
    `💰 *Monthly Income:* KES ${data.income}`,
    data.additionalInfo ? `\n📝 *Notes:* ${data.additionalInfo}` : null,
    ``,
    `_Sent via Affordable Housing Portal Kenya_`,
  ].filter(Boolean).join("\n");
  const message = encodeURIComponent(lines);
  return `https://wa.me/${phone}?text=${message}`;
}

export function buildSiteVisitWhatsApp(data: {
  name: string;
  phone: string;
  property: string;
  date: string;
  time: string;
}): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254740272542";
  const message = encodeURIComponent(
    `📅 *NEW SITE VISIT BOOKING*\n\n` +
    `👤 *Name:* ${data.name}\n` +
    `📞 *Phone:* ${data.phone}\n` +
    `🏘️ *Property:* ${data.property}\n` +
    `📆 *Date:* ${data.date}\n` +
    `⏰ *Time:* ${formatTime(data.time)}\n\n` +
    `_Sent via Affordable Housing Portal Kenya_`
  );
  return `https://wa.me/${phone}?text=${message}`;
}

export const HOUSE_TYPE_LABELS: Record<string, string> = {
  STUDIO: "Studio",
  ONE_BEDROOM: "1 Bedroom",
  TWO_BEDROOM: "2 Bedrooms",
  THREE_BEDROOM: "3 Bedrooms",
  MAISONETTE: "Maisonette",
  BUNGALOW: "Bungalow",
};

export const PROPERTY_STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  AVAILABLE: { label: "Available", className: "status-available" },
  SELLING_FAST: { label: "Selling Fast", className: "status-selling-fast" },
  SOLD_OUT: { label: "Sold Out", className: "status-sold-out" },
  COMING_SOON: { label: "Coming Soon", className: "status-coming-soon" },
};

export const APPLICATION_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Pending Review", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  UNDER_REVIEW: { label: "Under Review", color: "bg-blue-100 text-blue-800 border-blue-200" },
  APPROVED: { label: "Approved", color: "bg-green-100 text-green-800 border-green-200" },
  REJECTED: { label: "Rejected", color: "bg-red-100 text-red-800 border-red-200" },
  WAITLISTED: { label: "Waitlisted", color: "bg-purple-100 text-purple-800 border-purple-200" },
};

export const VISIT_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  CONFIRMED: { label: "Confirmed", color: "bg-blue-100 text-blue-800 border-blue-200" },
  COMPLETED: { label: "Completed", color: "bg-green-100 text-green-800 border-green-200" },
  CANCELLED: { label: "Cancelled", color: "bg-red-100 text-red-800 border-red-200" },
};

export const KENYA_COUNTIES = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Machakos", "Kilifi", "Nyeri",
  "Siaya", "Busia", "Migori", "Samburu", "Kwale", "Kakamega", "Meru",
  "Baringo", "Lamu", "Makueni", "Kitui", "Trans Nzoia", "Kiambu", "Kajiado",
  "Muranga", "Embu", "Nyandarua", "Laikipia", "Uasin Gishu", "Elgeyo-Marakwet",
  "Nandi", "Bomet", "Kericho", "Narok", "Kisii", "Nyamira", "Homa Bay", "Vihiga",
  "Bungoma", "Turkana", "West Pokot", "Tana River", "Taita-Taveta", "Garissa",
  "Wajir", "Mandera", "Marsabit", "Isiolo", "Tharaka-Nithi", "Kirinyaga",
];

export const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
];

export const EMPLOYMENT_TYPES = [
  "Employed (Formal)",
  "Self-Employed",
  "Business Owner",
  "Civil Servant",
  "Casual Worker",
  "Retired",
  "Student",
  "Other",
];
