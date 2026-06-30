import Link from "next/link";
import Image from "next/image";
import { MapPin, Bed, Home, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, HOUSE_TYPE_LABELS, PROPERTY_STATUS_CONFIG } from "@/lib/utils";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export function PropertyCard({ property, compact = false }: PropertyCardProps) {
  const statusConfig = PROPERTY_STATUS_CONFIG[property.status];
  const badgeVariant = property.status === "AVAILABLE" ? "available"
    : property.status === "SELLING_FAST" ? "selling_fast"
    : property.status === "SOLD_OUT" ? "sold_out"
    : "coming_soon";

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm property-card-hover">
      <div className="relative overflow-hidden aspect-[16/10]">
        <Image
          src={property.images[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80"}
          alt={property.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge variant={badgeVariant} className="text-xs font-semibold shadow-sm">
            {statusConfig.label}
          </Badge>
        </div>
        {property.isFeatured && (
          <div className="absolute top-3 right-3">
            <Badge variant="gold" className="text-xs font-semibold shadow-sm">Featured</Badge>
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="glass-white rounded-lg px-3 py-1.5">
            <p className="text-white font-heading font-black text-base leading-none">
              {formatCurrency(property.startingPrice)}
            </p>
            <p className="text-white/80 text-[10px]">Starting from</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading font-bold text-gray-900 text-base leading-snug line-clamp-1 group-hover:text-[#1e40af] transition-colors">
            {property.name}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#1e40af]" />
          <span className="truncate">{property.town}, {property.county.name}</span>
        </div>

        {!compact && (
          <p className="text-gray-500 text-sm line-clamp-2 mb-3 leading-relaxed">
            {property.description}
          </p>
        )}

        <div className="flex items-center gap-3 text-xs text-gray-600 border-t border-gray-100 pt-3 mb-3">
          <div className="flex items-center gap-1">
            <Bed className="h-3.5 w-3.5 text-gray-400" />
            <span>{HOUSE_TYPE_LABELS[property.houseType]}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-gray-400" />
            <span>{property.availableUnits} units left</span>
          </div>
          <div className="flex items-center gap-1">
            <Home className="h-3.5 w-3.5 text-gray-400" />
            <span>{property.totalUnits} total</span>
          </div>
        </div>

        <Link href={`/properties/${property.slug}`} className="block">
          <Button
            variant="default"
            size="sm"
            className="w-full gap-2 text-xs"
            disabled={property.status === "SOLD_OUT"}
          >
            {property.status === "SOLD_OUT" ? "Sold Out" : "View Details"}
            {property.status !== "SOLD_OUT" && <ArrowRight className="h-3.5 w-3.5" />}
          </Button>
        </Link>
      </div>
    </div>
  );
}
