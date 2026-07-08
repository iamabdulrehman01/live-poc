"use client";

import React from "react";
import Button from "../atoms/Button";
import Heading from "../atoms/Heading";
import { useStore } from "@/store/useStore";
import { ArrowRight } from "lucide-react";

export const CTASection: React.FC = () => {
  const openModal = useStore((state) => state.openModal);

  return (
    <section className="relative py-16 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Glow-box Banner Container */}
        <div className="relative max-w-5xl mx-auto rounded-3xl p-10 md:p-16 bg-[#0d1527] border border-[#1e293b] overflow-hidden text-center flex flex-col items-center shadow-[0_15px_60px_rgba(6,182,212,0.04)]">
          {/* Neon background blurs */}
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-purple-500/10 blur-[80px] pointer-events-none" />

          {/* Title */}
          <Heading level={2} className="mb-4 font-extrabold max-w-2xl text-center text-white">
            Ready to start your tech journey?
          </Heading>

          {/* Subtext */}
          <p className="text-sm md:text-base text-[#94a3b8] leading-relaxed max-w-xl mb-10 font-medium">
            Join hundreds of successful students who have transformed their careers through our industry-vetted programs.
          </p>

          {/* Buttons Layout */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-10">
            <Button
              variant="outline"
              size="md"
              onClick={() => openModal()}
              className="pl-8 pr-6 font-bold text-sm tracking-wide flex gap-2"
            >
              <p>Enroll Now  to connect with our Expert</p>
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CTASection;
