"use client";

import React from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Button from "../atoms/Button";
import Heading from "../atoms/Heading";
import StatItem from "../atoms/StatItem";
import { horizontalStats } from "@/store/db";
import { useStore } from "@/store/useStore";

export const HeroSection: React.FC = () => {
  const openModal = useStore((state) => state.openModal);

  return (
    <section id="home" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-grid-pattern">
      {/* Absolute Ambient Background Lights (Vibrant Mesh Blobs) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full mesh-blob-cyan pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full mesh-blob-purple pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] rounded-full mesh-blob-emerald pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-[400px] h-[400px] rounded-full mesh-blob-amber pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Main Grid: Left copy, Right graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Neon label tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/50 border border-[#22d3ee]/40 text-[#22d3ee] text-xs font-bold uppercase tracking-wider mb-6 animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.25)]">
              <Sparkles size={14} className="text-[#22d3ee]" />
              <span>Bridging the Talent Gap for 200+ Students</span>
            </div>

            {/* Main Headline */}
            <Heading level={1} className="mb-6 font-extrabold tracking-tight leading-tight">
              Bridge the Gap from <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(6,182,212,0.15)]">
                Campus to Corporate.
              </span>
            </Heading>

            {/* Description */}
            <p className="text-base md:text-lg text-[#cbd5e1] leading-relaxed max-w-xl mb-10 font-semibold">
              Expert-led Internship, Workshop, and Mentorship programs designed to launch your tech career with confidence and corporate-ready skills.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-10">
              <Button
                variant="glow-teal"
                size="lg"
                onClick={() => openModal()}
                className="flex items-center justify-center gap-2 text-black font-extrabold"
              >
                <span>Get Started</span>
                <ArrowRight size={18} />
              </Button>
              <a href="#services" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2 font-bold text-white border-slate-700 bg-slate-900/60"
                >
                  <span>Explore Programs</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Banner Image Frame */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            {/* Glassmorphic border container */}
            <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl p-3 bg-gradient-to-tr from-[#22d3ee]/25 via-transparent to-[#a855f7]/25 border border-white/10 backdrop-blur-md shadow-2xl animate-float">
              {/* Internal image layout */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#030712]">
                <img
                  src="/images/hero-collaboration.jpeg"
                  alt="Students Collaborating"
                  className="w-full h-full object-cover opacity-90"
                />

                {/* Floating Tag Overlay */}
                {/* <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#090d16]/90 border border-cyan-500/20 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-wider">Active Cohort</span>
                    <h4 className="text-sm font-extrabold text-white mt-0.5">Career Growth</h4>
                  </div>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-black">
                    <Play size={12} fill="black" className="ml-0.5" />
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Stats Strip */}
        <div className="mt-20 md:mt-28 py-8 px-6 rounded-3xl bg-slate-950/40 border border-slate-800/80 backdrop-blur-sm shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {horizontalStats.map((stat, idx) => {
              // Give stats unique gradients
              const colors = [
                "bg-gradient-to-r from-white to-[#22d3ee]",
                "bg-gradient-to-r from-white to-[#c084fc]",
                "bg-gradient-to-r from-white to-[#34d399]",
                "bg-gradient-to-r from-white to-[#fbbf24]",
                "bg-gradient-to-r from-[#22d3ee] to-[#c084fc]"
              ];
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center ${idx === 4 ? "col-span-2 md:col-span-1" : ""
                    }`}
                >
                  <StatItem
                    value={stat.value}
                    label={stat.label}
                    valueClassName={`text-2xl md:text-3xl font-extrabold ${colors[idx % colors.length]}`}
                    labelClassName="text-[10px] tracking-widest mt-0.5 text-slate-400"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
