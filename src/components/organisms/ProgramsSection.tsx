"use client";

import React from "react";
import ProgramCard from "../molecules/ProgramCard";
import Heading from "../atoms/Heading";
import { programsData } from "@/store/db";
import { useStore } from "@/store/useStore";

export const ProgramsSection: React.FC = () => {
  const openModal = useStore((state) => state.openModal);

  const handleProgramSelection = (programId: string) => {
    // Determine internal value to set in form
    let pValue = "internship";
    if (programId.includes("workshop")) pValue = "workshop";
    if (programId.includes("mentorship")) pValue = "mentorship";
    
    openModal(pValue);
  };

  return (
    <section id="programs" className="relative py-20 bg-[#030712]">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <Heading level={2} className="mb-4">
            Launch Your Professional Journey
          </Heading>
          <p className="text-base text-[#94a3b8] leading-relaxed">
            We offer targeted paths to help you transition from academic excellence to corporate readiness.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {programsData.map((program) => (
            <ProgramCard
              key={program.id}
              id={program.id}
              iconName={program.icon}
              title={program.title}
              description={program.description}
              details={program.details}
              actionText={program.actionText}
              theme={program.theme}
              onActionClick={() => handleProgramSelection(program.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProgramsSection;
