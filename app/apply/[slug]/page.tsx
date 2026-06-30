"use client";

import { useState, use } from "react";
import Link from "next/link";
import { Building2, CheckCircle, ArrowLeft, ArrowRight, MessageCircle, Briefcase, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EMPLOYMENT_TYPES, HOUSE_TYPE_LABELS, buildApplicationWhatsApp } from "@/lib/utils";
import { PRICE_BY_TYPE } from "@/lib/properties-data";

const HOUSE_TYPES = ["STUDIO", "ONE_BEDROOM", "TWO_BEDROOM", "THREE_BEDROOM", "MAISONETTE", "BUNGALOW"];

const inp = (err?: string) =>
  `w-full h-10 border rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent ${err ? "border-red-400 bg-red-50" : "border-gray-200"}`;

export default function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const projectName = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [form, setForm] = useState({
    name: "", idNumber: "", phone: "", email: "",
    location: "", unitType: "", employment: "",
    employer: "", monthlyIncome: "", additionalInfo: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.idNumber.trim()) e.idNumber = "ID number is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.location.trim()) e.location = "Location / constituency is required";
    if (!form.unitType) e.unitType = "Please select a unit type";
    if (!form.employment) e.employment = "Please select employment type";
    if (!form.monthlyIncome || Number(form.monthlyIncome) < 1000) e.monthlyIncome = "Please enter your monthly income";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const url = buildApplicationWhatsApp({
      name: form.name,
      idNumber: form.idNumber,
      phone: form.phone,
      email: form.email || undefined,
      location: form.location,
      project: projectName,
      unitType: HOUSE_TYPE_LABELS[form.unitType] || form.unitType,
      employment: form.employment,
      employer: form.employer || undefined,
      income: Number(form.monthlyIncome).toLocaleString(),
      additionalInfo: form.additionalInfo || undefined,
    });
    setWhatsappUrl(url);
    setSubmitted(true);
    window.open(url, "_blank");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="font-heading font-black text-gray-900 text-2xl mb-2">Application Sent!</h2>
          <p className="text-gray-500 text-sm mb-1 leading-relaxed">
            Your application for <strong>{projectName}</strong> has been sent to us via WhatsApp.
          </p>
          <p className="text-gray-400 text-xs mb-6">If WhatsApp did not open automatically, tap the button below.</p>
          <div className="space-y-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full gap-2 font-bold bg-green-500 hover:bg-green-600 text-white">
                <MessageCircle className="h-4 w-4" /> View Online
              </Button>
            </a>
            <Link href="/properties" className="block">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const Field = ({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
    <div>
      <label className="text-xs font-semibold text-gray-700 block mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-900 pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/properties" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-sans font-bold text-white text-xl sm:text-2xl">Apply for Housing</h1>
              <p className="text-white/70 text-sm">{projectName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Personal Information */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <User className="h-4 w-4 text-blue-700" />
              </div>
              <h2 className="font-heading font-bold text-gray-900">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" required error={errors.name}>
                <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. John Kamau Mwangi" className={inp(errors.name)} />
              </Field>
              <Field label="National ID Number" required error={errors.idNumber}>
                <input type="text" value={form.idNumber} onChange={(e) => update("idNumber", e.target.value)} placeholder="e.g. 12345678" className={inp(errors.idNumber)} />
              </Field>
              <Field label="Phone Number" required error={errors.phone}>
                <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+254 712 345 678" className={inp(errors.phone)} />
              </Field>
              <Field label="Email Address" error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="email@example.com" className={inp(errors.email)} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Location / Constituency" required error={errors.location}>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="text" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. Kasarani, Nairobi" className={`${inp(errors.location)} pl-9`} />
                  </div>
                </Field>
              </div>
            </div>
          </div>

          {/* Unit Type */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-green-700" />
              </div>
              <h2 className="font-heading font-bold text-gray-900">Preferred Unit Type <span className="text-red-500">*</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HOUSE_TYPES.map((type) => (
                <button key={type} type="button" onClick={() => update("unitType", type)}
                  className={`p-4 rounded-lg border text-left transition-all ${form.unitType === type ? "bg-[#1e3a5f] border-[#1e3a5f] text-white" : "bg-white border-gray-200 text-gray-700 hover:border-[#1e40af]"}`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-sm">{HOUSE_TYPE_LABELS[type]}</span>
                    <span className={`text-xs font-bold ${form.unitType === type ? "text-green-200" : "text-[#1e3a5f]"}`}>
                      KSh {(PRICE_BY_TYPE[type] ?? 0).toLocaleString()}
                    </span>
                  </div>
                  <p className={`text-xs ${form.unitType === type ? "text-white/70" : "text-gray-400"}`}>
                    {type === "STUDIO" ? "Social housing unit" : type === "ONE_BEDROOM" ? "Studio apartment" : "Affordable unit"}
                  </p>
                </button>
              ))}
            </div>
            {errors.unitType && <p className="text-red-500 text-xs mt-2">{errors.unitType}</p>}
          </div>

          {/* Employment */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-amber-700" />
              </div>
              <h2 className="font-heading font-bold text-gray-900">Employment & Income</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Employment Status" required error={errors.employment}>
                <select value={form.employment} onChange={(e) => update("employment", e.target.value)} className={`${inp(errors.employment)} bg-white`}>
                  <option value="">Select employment type</option>
                  {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Employer / Business Name" error={errors.employer}>
                <input type="text" value={form.employer} onChange={(e) => update("employer", e.target.value)} placeholder="e.g. Safaricom PLC" className={inp()} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Monthly Income (KES)" required error={errors.monthlyIncome}>
                  <input type="number" value={form.monthlyIncome} onChange={(e) => update("monthlyIncome", e.target.value)} placeholder="e.g. 45000" min="1000" className={inp(errors.monthlyIncome)} />
                </Field>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">Additional Information (Optional)</label>
            <textarea rows={3} value={form.additionalInfo} onChange={(e) => update("additionalInfo", e.target.value)}
              placeholder="Any additional information relevant to your application..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af] resize-none" />
          </div>

          <Button type="submit" size="lg" className="w-full gap-2 font-bold bg-green-600 hover:bg-green-700 text-white text-base py-6">
            <MessageCircle className="h-5 w-5" /> Submit and Apply
          </Button>
          <p className="text-center text-gray-400 text-xs pb-6">
            Your application details will be sent directly to us via WhatsApp.
          </p>
        </form>
      </div>
    </div>
  );
}
