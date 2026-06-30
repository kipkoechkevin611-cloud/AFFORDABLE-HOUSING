import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Grace Wanjiku", location: "Pangani Estate, Nairobi", rating: 5, text: "I applied through the portal last year and within 4 months I had my allocation letter. The process was smooth and transparent. I now own a 2-bedroom apartment!", unit: "2 Bedroom Apartment", avatar: "GW", color: "bg-blue-600" },
  { name: "Peter Kamau", location: "Kisumu County", rating: 5, text: "As a civil servant, I was eligible for the affordable housing scheme. The portal made it easy to apply and track my application status at every step.", unit: "1 Bedroom Unit", avatar: "PK", color: "bg-green-700" },
  { name: "Fatuma Hassan", location: "Mombasa County", rating: 5, text: "The site visit booking feature is amazing. I visited three projects before deciding. Transparent pricing, no hidden costs. My family is finally home!", unit: "3 Bedroom Maisonette", avatar: "FH", color: "bg-amber-700" },
  { name: "James Ochieng", location: "Kisumu County", rating: 5, text: "Fast application process and great communication throughout. I received WhatsApp updates at every stage. My family now has a beautiful home.", unit: "2 Bedroom Apartment", avatar: "JO", color: "bg-purple-700" },
  { name: "Mary Njeri", location: "Nakuru County", rating: 5, text: "Affordable pricing with flexible payment plans. The portal showed me all options clearly. The housing officer was very helpful in guiding my application.", unit: "1 Bedroom Unit", avatar: "MN", color: "bg-red-700" },
  { name: "David Mutua", location: "Machakos County", rating: 5, text: "I was skeptical at first, but the portal is genuinely transparent. Within weeks of approval, I was signing my agreement. Highly recommend to every Kenyan.", unit: "2 Bedroom Apartment", avatar: "DM", color: "bg-teal-700" },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1e40af] mb-2">Success Stories</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-gray-900">What Homeowners Say</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">Thousands of Kenyans have found their dream homes through our portal.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow group relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-gray-100 group-hover:text-blue-100 transition-colors" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-black shrink-0`}>{t.avatar}</div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.location}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-[10px] font-semibold bg-green-100 text-green-700 border border-green-200 rounded-full px-2 py-0.5">{t.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
