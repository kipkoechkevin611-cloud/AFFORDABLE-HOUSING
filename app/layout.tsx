import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Affordable Housing Portal Kenya | Apply for Housing",
    template: "%s | Affordable Housing Portal Kenya",
  },
  description:
    "Kenya's premier affordable housing portal. Browse, apply, and track your housing application. Government-backed housing projects across all 47 counties.",
  keywords: [
    "affordable housing Kenya",
    "housing portal Kenya",
    "apply for housing Kenya",
    "government housing Kenya",
    "Kenya housing projects",
    "affordable houses Nairobi",
    "housing application Kenya",
    "boma yangu alternative",
  ],
  authors: [{ name: "Affordable Housing Portal Kenya" }],
  creator: "Affordable Housing Portal Kenya",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Affordable Housing Portal Kenya",
    description: "Browse and apply for affordable housing across Kenya's 47 counties.",
    siteName: "Affordable Housing Portal Kenya",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Affordable Housing Portal Kenya" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Affordable Housing Portal Kenya",
    description: "Kenya's premier affordable housing portal. Apply for housing today.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon-16x16.png", sizes: "16x16" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  alternates: { canonical: process.env.NEXT_PUBLIC_APP_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GovernmentOrganization",
              name: "Affordable Housing Portal Kenya",
              description: "Kenya's premier affordable housing application portal",
              url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
              telephone: "+254740272542",
              address: { "@type": "PostalAddress", addressCountry: "KE", addressRegion: "Nairobi" },
              areaServed: "KE",
              sameAs: ["https://wa.me/254740272542"],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "#1e3a5f",
              color: "#fff",
              borderRadius: "0.625rem",
              fontSize: "0.875rem",
            },
            success: { style: { background: "#166534", color: "#fff" } },
            error: { style: { background: "#991b1b", color: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}
