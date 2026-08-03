"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import Button from "../atoms/Button";
import { navLinks } from "@/store/db";
import { useStore } from "@/store/useStore";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("Home");
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

  // Track active section via Intersection Observer
  useEffect(() => {
    const sectionIds = ["home", "programs", "about"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -30% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === "home") setActiveSection("Home");
          else if (id === "programs") setActiveSection("Services");
          else if (id === "about") setActiveSection("About Us");
        }
      });
    }, observerOptions);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, label: string) => {
    e.preventDefault();
    setActiveSection(label);

    let targetId = "";
    if (label === "Home") targetId = "home";
    else if (label === "Services") targetId = "programs";
    else if (label === "About Us") targetId = "about";

    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOpen ? "pt-4 pb-0" : "py-4"
      } ${
        scrolled
          ? "bg-[#030712]/80 backdrop-blur-md border-b border-[#1e293b]/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Inner navbar */}
        <div className="px-4">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between glass py-3 rounded-md">
            {/* Brand Logo */}
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={(e) => handleNavClick(e, "Home")}
              role="button"
              tabIndex={0}
              aria-label="Go to Home section"
            >
              <Image
                src="/favicon.ico"
                alt="C2C Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain rounded-md pointer-events-none"
              />
            </div>

            {/* Desktop Sitemap */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.label;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.label)}
                    className={`text-md font-semibold transition-colors duration-300  ${
                      isActive
                        ? "text-[#22d3ee]"
                        : "text-white hover:text-[#22d3ee]"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Action Button */}
            <div className="hidden md:block">
              <Button
                variant="glow-teal"
                size="sm"
                onClick={() => openModal()}
                className="flex items-center gap-2 py-3.5"
              >
                Get Started
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
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#030712]/95 border-b border-[#1e293b] backdrop-blur-lg px-6 py-8 flex flex-col gap-6 animate-fade-in shadow-xl">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.label;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.label);
                    setIsOpen(false);
                  }}
                  className={`text-base font-semibold transition-colors duration-300 ${
                    isActive
                      ? "text-[#22d3ee]"
                      : "text-[#94a3b8] hover:text-[#22d3ee]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
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
