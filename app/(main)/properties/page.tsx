"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Bed, ArrowRight, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOUSE_TYPE_LABELS, PROPERTY_STATUS_CONFIG } from "@/lib/utils";
import { BOMA_YANGU_PROJECTS } from "@/lib/properties-data";


const ALL_COUNTIES = [
  "Baringo","Bomet","Bungoma","Busia","Elgeyo-Marakwet","Embu","Garissa",
  "Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi",
  "Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos",
  "Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi",
  "Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya",
  "Taita-Taveta","Tana River","Tharaka-Nithi","Trans-Nzoia","Turkana",
  "Uasin Gishu","Vihiga","Wajir","West Pokot",
];
const HOUSE_TYPES = ["STUDIO", "ONE_BEDROOM", "TWO_BEDROOM", "THREE_BEDROOM"];
const STATUSES = ["AVAILABLE", "SOLD_OUT"];

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [county, setCounty] = useState("");
  const [houseType, setHouseType] = useState("");
  const [status, setStatus] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return BOMA_YANGU_PROJECTS.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.town.toLowerCase().includes(search.toLowerCase())) return false;
      if (county && p.county.name !== county) return false;
      if (houseType && p.houseType !== houseType) return false;
      if (status && p.status !== status) return false;
      if (maxPrice && p.startingPrice > Number(maxPrice)) return false;
      return true;
    });
  }, [search, county, houseType, status, maxPrice]);

  const clearFilters = () => { setSearch(""); setCounty(""); setHouseType(""); setStatus(""); setMaxPrice(""); };
  const hasFilters = search || county || houseType || status || maxPrice;
  const statusLabel = (s: string) => s === "AVAILABLE" ? "Ongoing" : "Completed";
  const statusColor = (s: string) => s === "AVAILABLE"
    ? "bg-green-500 text-white"
    : "bg-gray-500 text-white";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-900 pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-green-300 mb-2">Official Government Projects</p>
            <h1 className="font-sans text-3xl sm:text-4xl font-bold">Available Housing Projects</h1>
            <p className="text-white/70 mt-2 text-sm">{filtered.length} projects found across Kenya</p>
          </div>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by project name or location..."
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white text-gray-900 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
            <SlidersHorizontal className="h-4 w-4" /> Filters {hasFilters && <span className="w-2 h-2 rounded-full bg-blue-600" />}
          </button>
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <X className="h-3.5 w-3.5" /> Clear all
            </button>
          )}
          <div className="ml-auto text-sm text-gray-500">{filtered.length} of {BOMA_YANGU_PROJECTS.length} projects</div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">County</label>
                <select value={county} onChange={(e) => setCounty(e.target.value)} className="w-full h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                  <option value="">All Counties</option>
                  {ALL_COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">House Type</label>
                <select value={houseType} onChange={(e) => setHouseType(e.target.value)} className="w-full h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                  <option value="">All Types</option>
                  {HOUSE_TYPES.map(t => <option key={t} value={t}>{HOUSE_TYPE_LABELS[t]}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Availability</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                  <option value="">All Status</option>
                  {STATUSES.map(s => <option key={s} value={s}>{PROPERTY_STATUS_CONFIG[s].label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Unit Type</label>
                <select value={houseType} onChange={(e) => setHouseType(e.target.value)} className="w-full h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                  <option value="">All Types</option>
                  {HOUSE_TYPES.map(t => <option key={t} value={t}>{HOUSE_TYPE_LABELS[t]}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-7 w-7 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500 text-sm mb-4">Try adjusting your search filters</p>
            <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property) => (
              <div key={property.id} className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow ${statusColor(property.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${property.status === "AVAILABLE" ? "bg-green-200" : "bg-gray-300"}`} />
                      {statusLabel(property.status)}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-sm leading-tight line-clamp-2">{property.name}</p>
                    <div className="flex items-center gap-1 text-white/80 text-xs mt-1">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span>{property.town}, {property.county.name}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <Bed className="h-3.5 w-3.5 text-gray-400" />
                    <span>{HOUSE_TYPE_LABELS[property.houseType]}</span>
                    <span className="text-gray-300">•</span>
                    <span className="font-semibold text-[#1e3a5f]">{property.county.name} County</span>
                  </div>
                  {property.status === "SOLD_OUT" ? (
                    <div className="w-full text-center py-2 rounded-lg bg-gray-100 text-gray-500 text-xs font-semibold">
                      Completed — No Longer Accepting Applications
                    </div>
                  ) : (
                    <Link href={`/properties/${property.slug}`} className="block">
                      <Button variant="default" size="sm" className="w-full gap-2 text-xs font-bold">
                        View Details <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
