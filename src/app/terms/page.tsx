import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
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
            C2C <span className="text-[#22d3ee] font-medium font-jakarta">Terms & Conditions</span>
          </span>
          <p className="text-xs text-[#64748b] mt-1.5">Last Updated: July 2026</p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 text-sm leading-relaxed text-[#94a3b8]">
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">1. Agreement to Terms</h2>
            <p>
              By accessing our website and registering for the Campus to Corporate learning tracks, you agree to comply with and be bound by these Terms of Service. If you disagree, you must not use our services.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">2. Registration & Accounts</h2>
            <p>
              You agree to provide true, accurate, and complete information during registration. You are responsible for ensuring your payment status is approved by transferring the exact fee listed for your selected plan.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">3. Fees & Refund Policy</h2>
            <p>
              Prices for each program (Summer Internship, Final Year Internship, and University Workshops) are listed clearly prior to checkout. All payments verified by the CEO are non-refundable once the learning tracks commence.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">4. Academic Integrity & Conduct</h2>
            <p>
              Students and participants agree to maintain professional code standards, avoid plagiarism, and treat cohorts and mentors with academic respect. Any form of cheating or harassment will lead to termination of program access.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">5. Service Modifications</h2>
            <p>
              Campus to Corporate reserves the right to modify, suspend, or discontinue any course, duration, or curriculum material at any time. We will notify registered students of significant track changes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
