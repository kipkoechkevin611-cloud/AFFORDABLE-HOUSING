"use client";

import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "Who is eligible to apply for affordable housing?", a: "Any Kenyan citizen with a valid National ID, a regular monthly income, and no existing government housing allocation is eligible. You must also not own any other residential property." },
  { q: "How much does it cost to apply?", a: "Registration and application on the Affordable Housing Portal Kenya is completely free. You only pay when your application is approved and you proceed to sign the purchase agreement." },
  { q: "How long does the application process take?", a: "Once you submit a complete application, the review process typically takes 4 to 12 weeks depending on the project and available units. You can track your status in real time on your dashboard." },
  { q: "What documents do I need to apply?", a: "You will need your National ID number, KRA PIN, proof of income (pay slips or bank statements), and your phone number. All documents are submitted digitally through the portal." },
  { q: "Can I apply for multiple housing projects?", a: "Yes, you can express interest in multiple projects, but you can only receive one official allocation. Once approved for a unit, other applications will be automatically closed." },
  { q: "What are the payment options available?", a: "We offer flexible payment plans including mortgage financing through partner banks, government tenant purchase scheme, and outright purchase options. Monthly installments are tailored to your income level." },
  { q: "How do I book a site visit?", a: "After registering on the portal, navigate to any property page and click 'Book Site Visit'. Select your preferred date and time, and a housing officer will confirm your visit via WhatsApp and SMS." },
  { q: "What happens if my application is rejected?", a: "If your application is rejected, you will receive a detailed reason via email and SMS. You can re-apply after 90 days or appeal the decision within 30 days by contacting our housing officers." },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1e40af] mb-2">FAQ</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">Everything you need to know about applying for affordable housing in Kenya.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className={cn("bg-white rounded-xl border overflow-hidden transition-all duration-200", open === i ? "border-[#1e40af]/30 shadow-sm" : "border-gray-100")}>
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={cn("font-semibold text-sm leading-snug", open === i ? "text-[#1e3a5f]" : "text-gray-800")}>{faq.q}</span>
                <div className={cn("shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors", open === i ? "bg-[#1e3a5f] text-white" : "bg-gray-100 text-gray-500")}>
                  {open === i ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
