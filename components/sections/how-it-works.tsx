import Link from "next/link";
import { UserPlus, FileText, Home, Key, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    step: "01",
    icon: UserPlus,
    title: "Register Account",
    description: "Create your free account with your National ID, phone number, and email address. Takes less than 3 minutes.",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-600",
  },
  {
    step: "02",
    icon: FileText,
    title: "Complete Profile",
    description: "Fill in your personal details, employment information, and monthly income to determine your eligibility.",
    color: "bg-green-50 text-green-700 border-green-200",
    dot: "bg-green-600",
  },
  {
    step: "03",
    icon: Home,
    title: "Apply for Housing",
    description: "Browse available properties, select your preferred unit type, and submit your housing application online.",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-600",
  },
  {
    step: "04",
    icon: Key,
    title: "Get Allocation",
    description: "Track your application status. Upon approval, receive your allocation letter and complete the payment process.",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    dot: "bg-purple-600",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-50 section-pattern" id="how-it-works">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1e40af] mb-2">Simple Process</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-gray-900">
            How to Apply for Housing
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Our streamlined application process makes it easy to secure your affordable home.
            Follow these four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-200 via-green-200 via-amber-200 to-purple-200 z-0" />

          {STEPS.map(({ step, icon: Icon, title, description, color, dot }) => (
            <div key={step} className="relative z-10 flex flex-col items-center text-center group">
              <div className={`relative w-20 h-20 rounded-2xl border-2 ${color} flex items-center justify-center mb-5 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300`}>
                <Icon className="h-8 w-8" />
                <div className={`absolute -top-2 -right-2 w-6 h-6 ${dot} rounded-full flex items-center justify-center shadow-sm`}>
                  <span className="text-white text-[10px] font-black">{step}</span>
                </div>
              </div>
              <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-[#1e3a5f] rounded-2xl p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="font-heading font-black text-white text-xl sm:text-2xl mb-2">
                Ready to Find Your Home?
              </h3>
              <p className="text-white/60 text-sm">
                Join thousands of Kenyans who have already secured their affordable homes.
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                {["Free registration", "No hidden fees", "Secure process"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-white/80 text-xs">
                    <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/auth/register">
                <Button variant="gold" size="lg" className="gap-2 font-bold whitespace-nowrap">
                  <UserPlus className="h-4 w-4" />
                  Start Application
                </Button>
              </Link>
              <Link href="/properties">
                <Button variant="outline_white" size="lg" className="gap-2 font-bold whitespace-nowrap">
                  Browse Properties
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
