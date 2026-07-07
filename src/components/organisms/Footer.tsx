"use client";

import React from "react";
import { Share2, Globe, Linkedin, Twitter } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#060a12] border-t border-[#1e293b]/50 pt-16 pb-12 overflow-hidden">
      {/* Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-5 flex flex-col items-start">
          <span className="text-xl font-extrabold font-jakarta tracking-tight text-white mb-4">
            Dawdle<span className="text-[#22d3ee] font-medium">.live</span>
          </span>
          <p className="text-sm text-[#64748b] leading-relaxed max-w-sm font-medium">
            Bridging the gap between students and the corporate world through intensive, industry-aligned learning paths.
          </p>
        </div>

        {/* Programs Column */}
        <div className="md:col-span-3">
          <h4 className="text-xs font-bold tracking-widest text-[#94a3b8] uppercase mb-4 font-jakarta">
            Programs
          </h4>
          <ul className="flex flex-col gap-3">
            {["Internship", "Workshop", "Mentorship"].map((item) => (
              <li key={item}>
                <a
                  href="#programs"
                  className="text-sm text-[#64748b] hover:text-[#22d3ee] transition-colors duration-300 font-semibold"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div className="md:col-span-2">
          <h4 className="text-xs font-bold tracking-widest text-[#94a3b8] uppercase mb-4 font-jakarta">
            Company
          </h4>
          <ul className="flex flex-col gap-3">
            {["Contact", "Privacy Policy", "Terms of Service"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-sm text-[#64748b] hover:text-[#22d3ee] transition-colors duration-300 font-semibold"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect/Social Column */}
        <div className="md:col-span-2">
          <h4 className="text-xs font-bold tracking-widest text-[#94a3b8] uppercase mb-4 font-jakarta">
            Connect
          </h4>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="h-10 w-10 rounded-xl bg-[#0d1323] border border-[#1e293b] flex items-center justify-center text-[#64748b] hover:text-[#22d3ee] hover:border-[#22d3ee]/40 transition-all duration-300"
              aria-label="Share page"
            >
              <Share2 size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-xl bg-[#0d1323] border border-[#1e293b] flex items-center justify-center text-[#64748b] hover:text-[#22d3ee] hover:border-[#22d3ee]/40 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Row */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[#1e293b]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-xs text-[#475569] font-medium text-center sm:text-left">
          &copy; 2024 Dawdle.live by Rishikesh Gupta (CEO & Founder)
        </p>

        {/* Live Indicator Status */}
        <div className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
            Live Dashboard Active
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
