"use client";

import React from "react";
import { User, Briefcase, Quote } from "lucide-react";
import Heading from "../atoms/Heading";
import { founderInfo } from "@/store/db";

export const WhoWeAre: React.FC = () => {
  return (
    <section id="about" className="relative py-20 md:py-28 bg-[#030712]">
      {/* Visual lighting */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl p-2 bg-gradient-to-b from-[#1e293b] to-transparent border border-white/5 shadow-2xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0a0f1d]">
                <img
                  src={founderInfo.avatarUrl}
                  alt={founderInfo.name}
                  className="w-full h-full object-cover grayscale-[20%] opacity-90 transition-all duration-500 hover:scale-[1.02]"
                />
                
                {/* Decorative Frame Overlay */}
                <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-xl bg-[#090d16]/90 border border-cyan-400/20 backdrop-blur-md">
                  <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest">
                    C2C Strategist
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#090d16]/95 border border-[#1e293b] backdrop-blur-md">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Empowering Growth
                  </h4>
                  <p className="text-[10px] text-[#64748b] mt-0.5 font-semibold">
                    Campus-to-Corporate Alignment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <Heading level={2} className="mb-6 relative pb-4">
              Who We Are
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#22d3ee] rounded-full" />
            </Heading>

            {/* Split Bio Text by paragraph */}
            <div className="text-[#94a3b8] text-base leading-relaxed space-y-6 mb-8 font-medium max-w-xl">
              {founderInfo.bio.split("\n\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* CEO Badge */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#090d16]/60 border border-[#1e293b] backdrop-blur-sm pr-8">
              <div className="h-11 w-11 rounded-xl bg-[#1e293b] border border-[#334155] flex items-center justify-center text-cyan-400">
                <User size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold font-jakarta text-sm">
                  {founderInfo.name}
                </h4>
                <p className="text-[#64748b] text-[10px] uppercase font-bold tracking-wider mt-0.5">
                  {founderInfo.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhoWeAre;
