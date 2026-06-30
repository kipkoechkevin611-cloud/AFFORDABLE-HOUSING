import Link from "next/link";
import { Sparkles, Building2, Layers, Shirt, Grid3X3, Square, Truck, HardHat, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Sparkles,
    title: "House Cleaning",
    description: "Deep and regular house cleaning tailored to your schedule and needs.",
    price: "From KES 1,500",
    popular: true,
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Building2,
    title: "Office Cleaning",
    description: "Professional office and commercial space cleaning for a productive environment.",
    price: "From KES 2,500",
    popular: false,
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Layers,
    title: "Deep Cleaning",
    description: "Thorough top-to-bottom deep cleaning for homes and offices.",
    price: "From KES 3,000",
    popular: false,
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Shirt,
    title: "Laundry Services",
    description: "Full laundry pickup, wash, dry, and delivery service.",
    price: "From KES 800",
    popular: false,
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Grid3X3,
    title: "Carpet Cleaning",
    description: "Steam and dry carpet cleaning to remove stains and allergens.",
    price: "From KES 500/m²",
    popular: false,
    color: "from-orange-500 to-amber-600",
  },
  {
    icon: Square,
    title: "Window Cleaning",
    description: "Crystal clear window cleaning for homes, offices, and high-rises.",
    price: "From KES 1,000",
    popular: false,
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Truck,
    title: "Move In/Out Cleaning",
    description: "Complete cleaning service when moving to a new space.",
    price: "From KES 4,000",
    popular: false,
    color: "from-indigo-500 to-violet-600",
  },
  {
    icon: HardHat,
    title: "Post-Construction",
    description: "Specialized cleaning to remove dust and debris after construction.",
    price: "From KES 5,000",
    popular: false,
    color: "from-yellow-500 to-orange-600",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3">
            What We Offer
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-4">
            Our Professional Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From routine cleaning to specialized services — we handle it all with care and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative bg-card rounded-2xl border border-border p-6 card-hover cursor-pointer"
            >
              {service.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
              <p className="text-sm font-bold text-primary">{service.price}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/book">
            <Button variant="gradient" size="lg" className="gap-2">
              Book a Service <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
