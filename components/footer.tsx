import Link from "next/link";
import { Building2, MessageCircle, Mail, Phone, MapPin, FileText, Shield, HelpCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-green-900 text-white border-t-4 border-green-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 border-green-600">
                <Building2 className="h-6 w-6 text-green-800" />
              </div>
              <div>
                <p className="font-sans font-bold text-base text-white leading-tight">
                  Republic of Kenya
                </p>
                <p className="text-xs font-medium text-green-300 uppercase tracking-wide">
                  Affordable Housing Portal
                </p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Official government portal for affordable housing initiatives. Providing quality housing opportunities for all Kenyans.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://wa.me/254740272542" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-500 transition-colors" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5 text-white" />
              </a>
              <a href="mailto:info@affordablehousingportal.co.ke"
                className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center hover:bg-green-700 transition-colors" aria-label="Email">
                <Mail className="h-5 w-5 text-white" />
              </a>
              <a href="tel:+254740272542"
                className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center hover:bg-green-700 transition-colors" aria-label="Phone">
                <Phone className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-green-300 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Browse Properties", href: "/properties" },
                { label: "How It Works", href: "/#how-it-works" },
                { label: "Eligibility", href: "/#about" },
                { label: "Contact Us", href: "/#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-green-300 mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { label: "Housing Policy", href: "#", icon: FileText },
                { label: "Eligibility Criteria", href: "#", icon: Shield },
                { label: "FAQ", href: "/#faq", icon: HelpCircle },
                { label: "Privacy Policy", href: "#", icon: Shield },
                { label: "Terms of Service", href: "#", icon: FileText },
              ].map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
                    <Icon className="h-4 w-4 text-green-400" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-green-300 mb-4">Contact</h3>
            <ul className="space-y-3">
              {[
                { icon: Phone, text: "+254 740 272 542", href: "tel:+254740272542" },
                { icon: MessageCircle, text: "WhatsApp Support", href: "https://wa.me/254740272542" },
                { icon: Mail, text: "info@affordablehousingportal.co.ke", href: "mailto:info@affordablehousingportal.co.ke" },
                { icon: MapPin, text: "Nairobi, Kenya", href: "#" },
              ].map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  <a href={href} className="flex items-start gap-2.5 text-sm text-white/70 hover:text-white transition-colors">
                    <Icon className="h-4 w-4 mt-0.5 text-green-400 shrink-0" />
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-green-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Government of Kenya. Ministry of Housing and Urban Development. All rights reserved.
          </p>
          <p className="text-xs text-white/60">
            Serving all 47 counties of Kenya 🇰🇪
          </p>
        </div>
      </div>
    </footer>
  );
}
