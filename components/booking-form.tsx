"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVICES, TIME_SLOTS, buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/utils";
import { bookingSchema, type BookingData } from "@/lib/validations";
import { Loader2, Send, User, Phone, Mail, Briefcase, Calendar, Clock, FileText } from "lucide-react";
import toast from "react-hot-toast";

export function BookingForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({});
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (field: keyof BookingData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BookingData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof BookingData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create booking");
      }

      const waMessage = buildWhatsAppMessage(formData);
      const waUrl = buildWhatsAppUrl(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254740272542", waMessage);

      toast.success("Booking submitted successfully!");

      setTimeout(() => {
        router.push(`/book/success?id=${data.booking.id}`);
        window.open(waUrl, "_blank");
      }, 500);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+254 7XX XXX XXX"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="service" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            Service Required <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.service} onValueChange={(val) => handleChange("service", val)}>
            <SelectTrigger className={errors.service ? "border-red-500 focus:ring-red-500" : ""}>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICES.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && <p className="text-xs text-red-500">{errors.service}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Preferred Date <span className="text-red-500">*</span>
          </Label>
          <Input
            id="date"
            type="date"
            min={today}
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className={errors.date ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Preferred Time <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.time} onValueChange={(val) => handleChange("time", val)}>
            <SelectTrigger className={errors.time ? "border-red-500 focus:ring-red-500" : ""}>
              <SelectValue placeholder="Select a time" />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.time && <p className="text-xs text-red-500">{errors.time}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          Additional Notes
        </Label>
        <textarea
          id="notes"
          rows={4}
          placeholder="Any special instructions, address details, or specific requirements..."
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          className="flex w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
        />
        {errors.notes && <p className="text-xs text-red-500">{errors.notes}</p>}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full gap-2 text-base"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting Booking...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Submit Booking
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          After submitting, WhatsApp will open to confirm your booking details.
        </p>
      </div>
    </form>
  );
}
