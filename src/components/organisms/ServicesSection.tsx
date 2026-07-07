"use client";

import React from "react";
import ServiceCard from "../molecules/ServiceCard";
import Heading from "../atoms/Heading";
import { servicesData } from "@/store/db";
import { useStore } from "@/store/useStore";

export const ServicesSection: React.FC = () => {
  const openModal = useStore((state) => state.openModal);

  const handleServiceClick = (serviceId: string) => {
    let pValue = "";
    if (serviceId.includes("real-world")) pValue = "internship";
    if (serviceId.includes("skill-up")) pValue = "workshop";
    if (serviceId.includes("expert-guidance")) pValue = "mentorship";
    
    openModal(pValue);
  };

  return (
    <section id="services" className="relative py-20 bg-[#030712]/50 border-y border-[#1e293b]/30">
      {/* Decorative background grids */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col items-start mb-16">
          <Heading level={2} className="relative pb-4">
            Our Services
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#22d3ee] rounded-full" />
          </Heading>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              badge={service.badge}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
              actionText={service.actionText}
              onActionClick={() => handleServiceClick(service.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default ServicesSection;
