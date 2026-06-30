"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const FAQ_RESPONSES: Record<string, string> = {
  "how to apply": "To apply for affordable housing: 1. Browse available properties on the Properties page. 2. Click 'View Details' on a property you're interested in. 3. Select your preferred unit type. 4. Fill out the application form with your personal details. 5. Submit your application via WhatsApp.",
  "eligibility": "To be eligible for affordable housing in Kenya, you must: - Be a Kenyan citizen aged 18 years and above. - Have a valid National ID. - Have a source of income (formal or informal). - Not own another affordable housing unit from the government.",
  "payment": "Payment options include: - Cash payment (10% deposit, balance within 90 days). - Mortgage financing through approved banks. - Installment plans (up to 10 years for certain units). - SACCO financing for members.",
  "documents": "Required documents for application: - National ID card. - KRA PIN certificate. - Passport-size photo. - Proof of income (payslips or bank statements). - Employment letter or business registration.",
  "prices": "Prices vary by unit type and location: - Studio: KES 640,000 - 1 Bedroom: KES 1,000,000 - 2 Bedroom: KES 2,000,000 - 3 Bedroom: KES 3,000,000 - Maisonette: KES 3,000,000 - Bungalow: KES 3,000,000",
  "default": "I can help you with information about affordable housing applications, eligibility, payment options, required documents, and prices. Please ask a specific question or visit our Properties page to browse available housing units.",
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hello! I'm here to help you with affordable housing information. How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("apply") || lowerMessage.includes("application")) {
      return FAQ_RESPONSES["how to apply"];
    }
    if (lowerMessage.includes("eligible") || lowerMessage.includes("eligibility") || lowerMessage.includes("qualify")) {
      return FAQ_RESPONSES["eligibility"];
    }
    if (lowerMessage.includes("pay") || lowerMessage.includes("payment") || lowerMessage.includes("mortgage")) {
      return FAQ_RESPONSES["payment"];
    }
    if (lowerMessage.includes("document") || lowerMessage.includes("id") || lowerMessage.includes("kra")) {
      return FAQ_RESPONSES["documents"];
    }
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("how much")) {
      return FAQ_RESPONSES["prices"];
    }
    
    return FAQ_RESPONSES["default"];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-green-700 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
        title="Chat with us"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-green-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Housing Assistant</h3>
            <p className="text-xs text-white/70">Online • Ready to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    message.role === "user"
                      ? "bg-green-700 text-white rounded-br-sm"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Button
                onClick={handleSend}
                size="sm"
                className="bg-green-700 hover:bg-green-600 px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Powered by Affordable Housing Portal Kenya
            </p>
          </div>
        </>
      )}
    </div>
  );
}
