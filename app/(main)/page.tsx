import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Affordable Housing Portal Kenya | Find & Apply for Housing",
  description: "Browse and apply for affordable housing projects across Kenya's 47 counties. Government-backed housing with transparent pricing and online applications.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProjectsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
