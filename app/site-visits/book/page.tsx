"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Calendar, Clock, CheckCircle, MessageCircle, ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TIME_SLOTS, buildSiteVisitWhatsApp } from "@/lib/utils";
import toast from "react-hot-toast";

const PROPERTIES = [
  { slug: "pangani-affordable-housing", name: "Pangani Affordable Housing", town: "Nairobi" },
  { slug: "shauri-moyo-estate", name: "Shauri Moyo Estate", town: "Nairobi" },
  { slug: "mombasa-coast-gardens", name: "Mombasa Coast Gardens", town: "Mombasa" },
  { slug: "nakuru-lake-view", name: "Nakuru Lake View", town: "Nakuru" },
  { slug: "kisumu-nyalenda-housing", name: "Kisumu Nyalenda Housing", town: "Kisumu" },
  { slug: "thika-green-valley", name: "Thika Green Valley", town: "Kiambu" },
];

function BookVisitForm() {
  const searchParams = useSearchParams();
  const defaultProperty = searchParams.get("property") || "";
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", propertySlug: defaultProperty, date: "", time: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name) e.name = "Your name is required";
    if (!form.phone || form.phone.length < 10) e.phone = "Valid phone number is required";
    if (!form.propertySlug) e.propertySlug = "Please select a property";
    if (!form.date) e.date = "Please select a date";
    else if (new Date(form.date) < new Date(new Date().setHours(0, 0, 0, 0))) e.date = "Date cannot be in the past";
    if (!form.time) e.time = "Please select a time";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/site-visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      const property = PROPERTIES.find((p) => p.slug === form.propertySlug);
      const waUrl = buildSiteVisitWhatsApp({
        name: form.name, phone: form.phone,
        property: property?.name || form.propertySlug,
        date: new Date(form.date).toLocaleDateString("en-KE", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
        time: form.time,
      });
      setWhatsappUrl(waUrl);
      setSubmitted(true);
      toast.success("Site visit booked successfully!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="font-heading font-black text-gray-900 text-2xl mb-2">Visit Booked!</h2>
          <p className="text-gray-500 text-sm mb-2">
            Your site visit has been scheduled for{" "}
            <strong>{new Date(form.date).toLocaleDateString("en-KE", { weekday: "long", month: "long", day: "numeric" })}</strong> at{" "}
            <strong>{form.time}</strong>.
          </p>
          <p className="text-gray-400 text-xs mb-6">A housing officer will confirm via SMS and WhatsApp within 24 hours.</p>
          <div className="space-y-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="whatsapp" className="w-full gap-2 font-bold">
                <MessageCircle className="h-4 w-4" /> Confirm via WhatsApp
              </Button>
            </a>
            <Link href="/dashboard" className="block">
              <Button variant="outline" className="w-full">Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1e3a5f] pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/properties" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Properties
          </Link>
          <h1 className="font-heading font-black text-white text-2xl sm:text-3xl">Book a Site Visit</h1>
          <p className="text-white/60 text-sm mt-1">Schedule a visit to view your preferred housing project in person.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="font-heading font-bold text-gray-900 text-base border-b border-gray-100 pb-3">Your Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Full Name <span className="text-red-500">*</span></label>
                <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" className={`w-full h-10 border rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent ${errors.name ? "border-red-400" : "border-gray-200"}`} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+254 712 345 678" className={`w-full h-10 border rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent ${errors.phone ? "border-red-400" : "border-gray-200"}`} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="font-heading font-bold text-gray-900 text-base border-b border-gray-100 pb-3">Select Property & Schedule</h2>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">Property <span className="text-red-500">*</span></label>
              <select value={form.propertySlug} onChange={(e) => update("propertySlug", e.target.value)} className={`w-full h-10 border rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent bg-white ${errors.propertySlug ? "border-red-400" : "border-gray-200"}`}>
                <option value="">Select a property to visit</option>
                {PROPERTIES.map((p) => <option key={p.slug} value={p.slug}>{p.name} — {p.town}</option>)}
              </select>
              {errors.propertySlug && <p className="text-red-500 text-xs mt-1">{errors.propertySlug}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5"><Calendar className="h-3.5 w-3.5 inline mr-1" />Preferred Date <span className="text-red-500">*</span></label>
                <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} min={minDateStr} className={`w-full h-10 border rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent ${errors.date ? "border-red-400" : "border-gray-200"}`} />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5"><Clock className="h-3.5 w-3.5 inline mr-1" />Preferred Time <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-3 gap-1.5">
                  {TIME_SLOTS.slice(0, 6).map((slot) => (
                    <button key={slot} type="button" onClick={() => update("time", slot)} className={`h-9 rounded-lg text-xs font-semibold transition-all border ${form.time === slot ? "bg-[#1e3a5f] border-[#1e3a5f] text-white" : "border-gray-200 text-gray-700 hover:border-[#1e40af]"}`}>
                      {slot}
                    </button>
                  ))}
                </div>
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">Additional Notes</label>
              <textarea rows={2} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Any specific requests or questions for the housing officer..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent resize-none" />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full gap-2 font-bold" disabled={loading}>
            {loading ? "Booking Visit..." : <><ArrowRight className="h-5 w-5" /> Book Site Visit</>}
          </Button>
          <p className="text-center text-gray-400 text-xs">Site visits are Mon–Fri 8am–5pm, Sat 9am–2pm. A housing officer will confirm your booking within 24 hours.</p>
        </form>
      </div>
    </div>
  );
}

export default function SiteVisitBookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e40af]" /></div>}>
      <BookVisitForm />
    </Suspense>
  );
}
