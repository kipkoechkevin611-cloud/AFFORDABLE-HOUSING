import { Building2, MapPin, Users, Home, TrendingUp, Award } from "lucide-react";

const stats = [
  { icon: Building2, value: "12,500+", label: "Units Available", sublabel: "Across all projects", color: "bg-blue-50 text-blue-600", border: "border-blue-100" },
  { icon: MapPin, value: "47", label: "Counties Covered", sublabel: "Full national coverage", color: "bg-green-50 text-green-700", border: "border-green-100" },
  { icon: Users, value: "8,200+", label: "Families Housed", sublabel: "And counting daily", color: "bg-amber-50 text-amber-700", border: "border-amber-100" },
  { icon: Award, value: "95%", label: "Success Rate", sublabel: "Application approvals", color: "bg-purple-50 text-purple-700", border: "border-purple-100" },
  { icon: Home, value: "85+", label: "Active Projects", sublabel: "Nationwide", color: "bg-red-50 text-red-700", border: "border-red-100" },
  { icon: TrendingUp, value: "KES 2M+", label: "Starting Price", sublabel: "Affordable financing", color: "bg-teal-50 text-teal-700", border: "border-teal-100" },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1e40af] mb-2">By The Numbers</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-gray-900">
            Housing Impact Across Kenya
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className={`bg-white rounded-xl p-4 text-center border ${stat.border} shadow-sm hover:shadow-md transition-shadow`}>
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.color} mb-3`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-xl sm:text-2xl font-black text-gray-900 leading-none">{stat.value}</p>
              <p className="text-xs font-semibold text-gray-700 mt-1">{stat.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
