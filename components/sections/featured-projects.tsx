import Link from "next/link";
import Image from "next/image";
import { MapPin, Bed, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

const FEATURED = [
  {
    name: "Pangani Affordable Housing Project",
    slug: "pangani-affordable-housing-project",
    location: "Pangani, Nairobi",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    price: 2000000,
    type: "1 & 2 Bedroom",
    status: "AVAILABLE" as const,
    badge: "available" as const,
  },
  {
    name: "Shauri Moyo A Estate",
    slug: "shauri-moyo-a-estate",
    location: "Shauri Moyo, Nairobi",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    price: 3000000,
    type: "2 & 3 Bedroom",
    status: "AVAILABLE" as const,
    badge: "available" as const,
  },
  {
    name: "Bahati Nakuru Estate",
    slug: "bahati-nakuru-estate",
    location: "Bahati, Nakuru",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    price: 2000000,
    type: "2 Bedroom",
    status: "AVAILABLE" as const,
    badge: "available" as const,
  },
  {
    name: "Buxton Point",
    slug: "buxton-point",
    location: "Buxton, Mombasa",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    price: 2500000,
    type: "1, 2 & 3 Bedroom",
    status: "SOLD_OUT" as const,
    badge: "sold_out" as const,
  },
  {
    name: "Mavoko Estate",
    slug: "mavoko-estate",
    location: "Mavoko, Machakos",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    price: 1800000,
    type: "1 & 2 Bedroom",
    status: "AVAILABLE" as const,
    badge: "available" as const,
  },
  {
    name: "Blue Valley Estate",
    slug: "blue-valley-estate",
    location: "Nyeri Town",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    price: 1500000,
    type: "Studio & 1 Bedroom",
    status: "AVAILABLE" as const,
    badge: "available" as const,
  },
];

const STATUS_LABELS: Record<string, string> = {
  AVAILABLE: "Available",
  SELLING_FAST: "Selling Fast",
  SOLD_OUT: "Sold Out",
  COMING_SOON: "Coming Soon",
};

export function FeaturedProjectsSection() {
  return (
    <section className="py-20 bg-white" id="featured">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#1e40af] mb-2">Featured Projects</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-gray-900">
              Top Housing Projects
            </h2>
            <p className="text-gray-500 mt-2 text-sm max-w-md">
              Carefully selected affordable housing projects with verified unit availability.
            </p>
          </div>
          <Link href="/properties">
            <Button variant="outline" className="gap-2 shrink-0">
              View All Properties <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED.map((project) => (
            <div key={project.slug} className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm property-card-hover">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge variant={project.badge} className="text-xs shadow-sm">
                    {STATUS_LABELS[project.status]}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-sm leading-tight line-clamp-2">{project.name}</p>
                  <div className="flex items-center gap-1 text-white/80 text-xs mt-1">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span>{project.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <Bed className="h-3.5 w-3.5 text-gray-400" />
                  <span>{project.type}</span>
                </div>
                <Link href={`/properties/${project.slug}`}>
                  <Button variant="default" size="sm" className="w-full gap-2 text-xs">
                    View Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/properties">
            <Button variant="navy" size="lg" className="gap-3 font-bold shadow-lg">
              Browse All Properties
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
