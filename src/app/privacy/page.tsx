import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#030712] text-[#cbd5e1] p-6 md:p-12 font-sans relative">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto flex flex-col gap-8 relative z-10">
        {/* Back Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#94a3b8] hover:text-[#22d3ee] transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Branding header */}
        <div className="border-b border-[#1e293b]/50 pb-6">
          <span className="text-2xl font-extrabold text-white tracking-tight">
            C2C <span className="text-[#22d3ee] font-medium font-jakarta">Privacy Policy</span>
          </span>
          <p className="text-xs text-[#64748b] mt-1.5">Last Updated: July 2026</p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 text-sm leading-relaxed text-[#94a3b8]">
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">1. Information We Collect</h2>
            <p>
              We collect personal information that you provide to us directly through registration forms, including your full name, email address, phone number, college/university name, learning track choices, and payment details.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">2. How We Use Your Information</h2>
            <p>
              We use the collected information to process program applications, verify UPI transaction states, compile statistics to refine our courses, and contact you with onboarding parameters or learning announcements.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">3. Data Integrity & Security</h2>
            <p>
              Your registration records are saved in local, secured database storage. We utilize standard cryptographic protocols to ensure your data is kept secure and protected against unauthorized leaks.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">4. Third-Party Sharing</h2>
            <p>
              We do not sell, rent, or trade your personal information to third-party advertising companies. Your contact details may only be shared with verified partner employers for recruitment and internship placement services.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">5. Contact and Queries</h2>
            <p>
              If you have any questions or concerns regarding this privacy policy statement, please contact our support team at <a href="mailto:abdul.rehmn@coforge.com" className="text-[#22d3ee] underline font-semibold">abdul.rehmn@coforge.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
