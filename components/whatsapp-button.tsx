"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/254740272542?text=Hello%2C%20I%20need%20help%20with%20my%20housing%20application%20on%20Affordable%20Housing%20Portal%20Kenya."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="flex items-center gap-2 px-4 py-3">
        <MessageCircle className="h-6 w-6 fill-white" />
        <span className="text-sm font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
          Chat with us
        </span>
      </div>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
    </a>
  );
}
