"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Bed, ArrowRight, Building2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOUSE_TYPE_LABELS } from "@/lib/utils";
import { BOMA_YANGU_PROJECTS, PRICE_BY_TYPE } from "@/lib/properties-data";

const HOUSE_TYPES = ["STUDIO", "ONE_BEDROOM", "TWO_BEDROOM", "THREE_BEDROOM", "MAISONETTE", "BUNGALOW"];

const UNIT_FEATURES: Record<string, string[]> = {
  STUDIO: ["Open plan living area", "Modern kitchen", "Bathroom facilities", "Secure location", "Ample natural light"],
  ONE_BEDROOM: ["Separate bedroom", "Spacious living area", "Modern kitchen", "Bathroom facilities", "Secure location"],
  TWO_BEDROOM: ["2 bedrooms", "Spacious living area", "Modern kitchen", "2 bathrooms", "Secure location", "Balcony"],
  THREE_BEDROOM: ["3 bedrooms", "Large living area", "Modern kitchen", "2 bathrooms", "Secure location", "Balcony", "Storage space"],
  MAISONETTE: ["2 floors", "Multiple bedrooms", "Spacious living area", "Modern kitchen", "Multiple bathrooms", "Private garden"],
  BUNGALOW: ["Single story", "Multiple bedrooms", "Spacious living area", "Modern kitchen", "Multiple bathrooms", "Private compound"],
};

export default function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const property = BOMA_YANGU_PROJECTS.find((p) => p.slug === slug);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h1>
          <Link href="/properties">
            <Button variant="outline">Back to Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusLabel = property.status === "AVAILABLE" ? "Ongoing" : "Completed";
  const statusColor = property.status === "AVAILABLE" ? "bg-green-500 text-white" : "bg-gray-500 text-white";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-900 pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/properties" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Properties
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-sans font-bold text-white text-2xl sm:text-3xl">{property.name}</h1>
              <div className="flex items-center gap-2 text-white/70 text-sm mt-1">
                <MapPin className="h-4 w-4" />
                <span>{property.town}, {property.county.name} County</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${statusColor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${property.status === "AVAILABLE" ? "bg-green-200" : "bg-gray-300"}`} />
                  {statusLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-lg">
          <Image src={property.image} alt={property.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 80vw" />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-sans font-bold text-gray-900 text-xl mb-4">Project Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm mb-6">
            <div>
              <p className="text-gray-500 mb-1">Project Name</p>
              <p className="font-semibold text-gray-900">{property.name}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Location</p>
              <p className="font-semibold text-gray-900">{property.town}, {property.county.name} County</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Status</p>
              <p className="font-semibold text-gray-900">{statusLabel}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Application Method</p>
              <p className="font-semibold text-gray-900">Via WhatsApp</p>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Project Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Government-backed housing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Affordable pricing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Secure gated community
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Access to essential amenities
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Well-planned infrastructure
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Proximity to social services
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-sans font-bold text-gray-900 text-xl mb-4">Available Unit Types</h2>
          <p className="text-gray-500 text-sm mb-6">Select a unit type to view details and apply:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HOUSE_TYPES.map((type) => (
              <div key={type} className="border border-gray-200 rounded-xl p-5 hover:border-green-500 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <Bed className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{HOUSE_TYPE_LABELS[type]}</h3>
                    <p className="text-xs text-gray-400">
                      {type === "STUDIO" ? "Social housing unit" : type === "ONE_BEDROOM" ? "Studio apartment" : "Affordable unit"}
                    </p>
                  </div>
                </div>
                <p className="text-green-700 font-black text-2xl mb-4">
                  KSh {(PRICE_BY_TYPE[type] ?? 0).toLocaleString()}
                </p>
                <div className="space-y-2 mb-4 text-xs text-gray-600">
                  {UNIT_FEATURES[type]?.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                {property.status === "SOLD_OUT" ? (
                  <div className="w-full text-center py-2.5 rounded-lg bg-gray-100 text-gray-500 text-sm font-semibold">
                    Completed — No Longer Accepting Applications
                  </div>
                ) : (
                  <Link href={`/apply/${property.slug}`} className="block">
                    <Button variant="default" className="w-full gap-2 font-bold bg-green-700 hover:bg-green-600">
                      Apply for {HOUSE_TYPE_LABELS[type]} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {property.status !== "SOLD_OUT" && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <h2 className="font-sans font-bold text-gray-900 text-xl mb-2">Ready to Apply?</h2>
            <p className="text-gray-600 text-sm mb-4">Complete your application for this affordable housing project via WhatsApp.</p>
            <Link href={`/apply/${property.slug}`}>
              <Button size="lg" className="gap-2 font-bold bg-green-700 hover:bg-green-600">
                Proceed to Apply <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
