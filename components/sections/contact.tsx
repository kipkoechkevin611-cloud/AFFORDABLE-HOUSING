"use client";

import { MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1e40af] mb-2">Get In Touch</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-gray-900">Contact a Housing Officer</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">Our team is ready to assist you through every step of your housing application journey.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="space-y-5">
            <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-xl border border-blue-100">
              <div className="w-11 h-11 rounded-xl bg-[#1e3a5f] flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">Phone Support</p>
                <a href="tel:+254740272542" className="text-[#1e40af] font-bold text-base hover:underline">+254 740 272 542</a>
                <p className="text-gray-400 text-xs mt-1">MonFri 8am6pm, Sat 9am2pm</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-green-50 rounded-xl border border-green-100">
              <div className="w-11 h-11 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">WhatsApp Support</p>
                <a href="https://wa.me/254740272542?text=Hello%2C%20I%20need%20help%20with%20my%20housing%20application." target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" size="sm" className="gap-2">
                    <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-amber-50 rounded-xl border border-amber-100">
              <div className="w-11 h-11 rounded-xl bg-amber-600 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">Email Support</p>
                <a href="mailto:info@affordablehousingportal.co.ke" className="text-amber-700 font-medium text-sm hover:underline">info@affordablehousingportal.co.ke</a>
                <p className="text-gray-400 text-xs mt-1">Response within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-11 h-11 rounded-xl bg-gray-700 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">Office Location</p>
                <p className="text-gray-600 text-sm">Housing Finance Building, Nairobi CBD</p>
                <p className="text-gray-400 text-xs mt-1">Nairobi, Kenya</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1e3a5f] rounded-2xl p-8 text-white">
            <h3 className="font-heading font-black text-xl mb-2">Send Us a Message</h3>
            <p className="text-white/60 text-sm mb-6">Fill in the form and a housing officer will contact you shortly.</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">Full Name</label>
                  <input type="text" placeholder="Your full name" className="w-full h-10 bg-white/10 border border-white/20 rounded-lg px-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/50" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">Phone Number</label>
                  <input type="tel" placeholder="+254..." className="w-full h-10 bg-white/10 border border-white/20 rounded-lg px-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/50" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1.5">Email Address</label>
                <input type="email" placeholder="your@email.com" className="w-full h-10 bg-white/10 border border-white/20 rounded-lg px-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/50" />
              </div>
              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1.5">Subject</label>
                <input type="text" placeholder="How can we help?" className="w-full h-10 bg-white/10 border border-white/20 rounded-lg px-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/50" />
              </div>
              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1.5">Message</label>
                <textarea rows={4} placeholder="Tell us about your housing needs..." className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/50 resize-none" />
              </div>
              <a href="https://wa.me/254740272542?text=Hello%2C%20I%20need%20assistance%20with%20affordable%20housing." target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button variant="gold" className="w-full gap-2 font-bold">
                  <MessageCircle className="h-4 w-4" /> Send via WhatsApp
                </Button>
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
