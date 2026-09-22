"use client";

import React from "react";
import StatsCard from "../molecules/StatsCard";
import { dashboardStats } from "@/store/db";

export const StatsGrid: React.FC = () => {

  return (
    <section className="relative py-12 md:py-20 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-10">
          {/* Header Action Button */}
          {/* <Button
            variant="outline"
            size="md"
            onClick={() => openModal()}
            className="border-[#06b6d4]/40 hover:bg-[#06b6d4]/10 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wider uppercase text-[#22d3ee] shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300"
          >
            View Courses
          </Button> */}

          {/* Stats Grid Layout */}
          <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStats.map((stat, idx) => (
              <StatsCard
                key={idx}
                value={stat.value}
                label={stat.label}
                category={stat.category}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default StatsGrid;
