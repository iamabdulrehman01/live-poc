import React from "react";
import Navbar from "@/components/organisms/Navbar";
import HeroSection from "@/components/organisms/HeroSection";
import StatsGrid from "@/components/organisms/StatsGrid";
import ServicesSection from "@/components/organisms/ServicesSection";
import ProgramsSection from "@/components/organisms/ProgramsSection";
import WhoWeAre from "@/components/organisms/WhoWeAre";
import SuccessStories from "@/components/organisms/SuccessStories";
import CTASection from "@/components/organisms/CTASection";
import Footer from "@/components/organisms/Footer";
import RegistrationModal from "@/components/organisms/RegistrationModal";

export default function Home() {
  return (
    <>
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* Hero Banner Area */}
        <HeroSection />

        {/* Highlight Statistics */}
        <StatsGrid />

        {/* Program Pathways */}
        <ProgramsSection />

        {/* Company Services */}
        <ServicesSection />

        {/* Vision & Founders info */}
        <WhoWeAre />

        {/* Student Testimonials */}
        <SuccessStories />

        {/* Call To Action banner */}
        <CTASection />
      </main>

      {/* Website Footer */}
      <Footer />

      {/* Overlay Multi-Step Form Modal */}
      <RegistrationModal />
    </>
  );
}
