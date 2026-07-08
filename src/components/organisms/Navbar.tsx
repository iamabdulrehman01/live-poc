"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Button from "../atoms/Button";
import { navLinks } from "@/store/db";
import { useStore } from "@/store/useStore";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const openModal = useStore((state) => state.openModal);

  // Monitor page scroll to apply background fills
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-[#030712]/80 backdrop-blur-md border-b border-[#1e293b]/50 shadow-lg py-4"
        : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-2xl font-jakarta tracking-tight text-white group-hover:text-[#22d3ee] transition-colors duration-300">
            C<span className="text-[#22d3ee] font-medium">2C</span>
          </span>
        </a>

        {/* Desktop Sitemap */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[#94a3b8] hover:text-[#22d3ee] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:block">
          <Button
            variant="glow-teal"
            size="sm"
            onClick={() => openModal()}
            className="flex items-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight size={16} />
          </Button>
        </div>

        {/* Mobile Navigation Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#94a3b8] hover:text-white p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#030712]/95 border-b border-[#1e293b] backdrop-blur-lg px-6 py-8 flex flex-col gap-6 animate-fade-in shadow-xl">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-[#94a3b8] hover:text-[#22d3ee]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button
            variant="glow-teal"
            onClick={() => {
              setIsOpen(false);
              openModal();
            }}
            className="w-full justify-center flex items-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      )}
    </header>
  );
};
export default Navbar;
