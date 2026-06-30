import Link from "next/link";
import { Search, ArrowRight, CheckCircle2, MapPin, Building2, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex flex-col justify-center overflow-hidden bg-green-900">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-green-800/90 to-green-700/85" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-block bg-white/10 border border-white/20 rounded-lg px-4 py-2 mb-6">
            <p className="text-white/90 text-xs font-semibold uppercase tracking-widest">
              Official Government Portal
            </p>
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Affordable Housing
            <br />
            <span className="text-green-300">for All Kenyans</span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            The Government of Kenya is committed to providing decent and affordable housing
            across all 47 counties. Browse available projects and apply today.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link href="/properties">
              <Button size="lg" className="gap-2 font-semibold w-full sm:w-auto bg-white text-green-900 hover:bg-gray-100">
                <Search className="h-4 w-4" />
                Browse Properties
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/properties">
              <Button size="lg" className="gap-2 font-semibold w-full sm:w-auto bg-green-700 hover:bg-green-600 text-white border border-green-600">
                <Building2 className="h-4 w-4" />
                Apply for Housing
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/70 text-sm">
            {["Government-backed", "Transparent process", "All 47 counties", "WhatsApp support"].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-300 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 sm:p-6">
            <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-4 text-center">Search Housing Projects</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <div className="sm:col-span-1 lg:col-span-2">
                <input
                  type="text"
                  placeholder="Search by project name or location..."
                  className="w-full h-10 bg-white border border-white/30 rounded-lg px-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                />
              </div>
              <select className="h-10 bg-white border border-white/30 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">All Counties</option>
                {["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Kiambu"].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select className="h-10 bg-white border border-white/30 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">House Type</option>
                {["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "Maisonette", "Bungalow"].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <Link href="/properties" className="block">
                <Button className="w-full h-10 gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold">
                  <Search className="h-4 w-4" /> Search
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { number: "150+", label: "Active Projects", icon: Building2 },
            { number: "47", label: "Counties Covered", icon: MapPin },
            { number: "12,000+", label: "Units Available", icon: Users },
            { number: "100%", label: "Government Backed", icon: Award },
          ].map(({ number, label, icon: Icon }) => (
            <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
              <Icon className="h-4 w-4 text-green-300 mx-auto mb-1.5" />
              <p className="text-xl sm:text-2xl font-bold text-white">{number}</p>
              <p className="text-white/60 text-[11px] mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
