"use client";

import React from "react";
import TestimonialCard from "../molecules/TestimonialCard";
import Heading from "../atoms/Heading";
import { testimonialsData } from "@/store/db";

export const SuccessStories: React.FC = () => {
  // Extract primary featured testimonial and secondary ones
  const featuredTestimonial = testimonialsData[0];
  const otherTestimonials = testimonialsData.slice(1);

  return (
    <section className="relative py-20 bg-[#030712] overflow-hidden">
      {/* Decorative Blur Background Lights */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Heading level={2} className="mb-4">
            Success Stories
          </Heading>
          <p className="text-base text-[#94a3b8]">
            Hear from our alumni who have successfully transitioned from academic learning to professional success.
          </p>
        </div>

        {/* Layout Structure */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8">
          {/* Main Featured Quote Card (Aryaa Sharma - Figma Image 1/3) */}
          {featuredTestimonial && (
            <TestimonialCard
              quote={featuredTestimonial.quote}
              author={featuredTestimonial.author}
              role={featuredTestimonial.role}
              company={featuredTestimonial.company}
              avatarUrl={featuredTestimonial.avatarUrl}
              className="border-cyan-500/10 shadow-[0_20px_50px_rgba(6,182,212,0.03)]"
            />
          )}

          {/* Secondary Alumni Quotes (Grid Layout - Figma Image 4 Modal details) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                company={testimonial.company}
                avatarUrl={testimonial.avatarUrl}
                className="p-6 md:p-8"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default SuccessStories;
