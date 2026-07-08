"use client";

import React, { useState } from "react";
import { X, CheckCircle, ArrowRight, ArrowLeft, Loader2, Award, Briefcase, Laptop, GraduationCap } from "lucide-react";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import { useStore } from "@/store/useStore";
import { registrationSteps, testimonialsData } from "@/store/db";

export const RegistrationModal: React.FC = () => {
  const {
    isModalOpen,
    closeModal,
    currentStep,
    formData,
    formErrors,
    isSubmitted,
    updateFormField,
    nextStep,
    prevStep,
    submitForm,
  } = useStore();

  const [loading, setLoading] = useState(false);

  if (!isModalOpen) return null;

  // Handle step submissions
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await submitForm();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 md:p-6 bg-[#030712]/90 backdrop-blur-md">
      {/* Absolute Close Backdrop Area */}
      <div className="absolute inset-0" onClick={closeModal} />

      {/* Modal Main Frame */}
      <div className="relative w-full max-w-4xl bg-[#070b13] border border-[#1e293b] rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 animate-fade-in max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-[#1e293b]/50">
          <span className="text-lg font-extrabold font-jakarta text-white">
            Campus {" "}<span className="text-[#22d3ee] font-medium">2 Corporate</span>
          </span>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-xl bg-[#0d1323] border border-[#1e293b] text-[#64748b] hover:text-white hover:border-slate-700 transition-all cursor-pointer"
            aria-label="Close form"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto flex-grow p-6 md:p-10">
          {!isSubmitted ? (
            <div className="max-w-2xl mx-auto flex flex-col items-center">
              {/* Stepper Headers */}
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold font-jakarta text-white tracking-tight">
                  Launch Your Career Today
                </h2>
                <p className="text-sm text-[#64748b] mt-2 max-w-md">
                  Select your program and fill in your details to get started.
                </p>
              </div>

              {/* Step Progress Indicators */}
              <div className="w-full flex items-center justify-between mb-10 relative">
                {/* Connecting Track Line */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#1e293b] z-0" />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500 z-0"
                  style={{
                    width: `${((currentStep - 1) / (registrationSteps.length - 1)) * 100}%`,
                  }}
                />

                {registrationSteps.map((step) => {
                  const isActive = currentStep >= step.number;
                  const isCurrent = currentStep === step.number;
                  return (
                    <div
                      key={step.number}
                      className="flex flex-col items-center z-10 bg-[#070b13] px-2"
                    >
                      <div
                        className={`h-8 w-8 rounded-full border-2 flex items-center justify-center text-xs font-bold font-jakarta transition-all duration-500 ${isCurrent
                          ? "bg-[#22d3ee] border-[#22d3ee] text-black shadow-[0_0_15px_rgba(64,224,244,0.4)]"
                          : isActive
                            ? "bg-[#0d1323] border-[#22d3ee] text-[#22d3ee]"
                            : "bg-[#0d1323] border-[#1e293b] text-[#475569]"
                          }`}
                      >
                        {step.number}
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider mt-2.5 transition-colors duration-500 hidden sm:block ${isCurrent ? "text-white" : isActive ? "text-[#94a3b8]" : "text-[#475569]"
                          }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Form Forms Layout */}
              <div className="w-full p-8 rounded-2xl bg-[#090d16]/80 border border-[#1e293b]/70 backdrop-blur-md mb-10">
                {/* STEP 1: Personal Details */}
                {currentStep === 1 && (
                  <form onSubmit={handleContinue} className="flex flex-col gap-6">
                    <div className="border-b border-[#1e293b]/40 pb-4 mb-2">
                      <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest">
                        Step 1 of 3
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1">Personal Details</h3>
                    </div>

                    <FormField
                      label="Full Name"
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => updateFormField("fullName", e.target.value)}
                      errorText={formErrors.fullName}
                    />

                    <FormField
                      label="Email Address"
                      id="email"
                      type="email"
                      placeholder="john@university.edu"
                      value={formData.email}
                      onChange={(e) => updateFormField("email", e.target.value)}
                      errorText={formErrors.email}
                    />

                    <Button type="submit" variant="glow-teal" className="mt-4 justify-center gap-2">
                      <span>Continue</span>
                      <ArrowRight size={16} />
                    </Button>
                  </form>
                )}

                {/* STEP 2: Program Selection */}
                {currentStep === 2 && (
                  <form onSubmit={handleContinue} className="flex flex-col gap-6">
                    <div className="border-b border-[#1e293b]/40 pb-4 mb-2">
                      <span className="text-[10px] text-purple-400 font-extrabold uppercase tracking-widest">
                        Step 2 of 3
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1">Program Selection</h3>
                    </div>

                    {formErrors.selectedProgram && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 text-center">
                        {formErrors.selectedProgram}
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-4">
                      {[
                        {
                          id: "internship",
                          title: "Internship Path",
                          desc: "Gain real-world experience on live projects.",
                          icon: Briefcase,
                          color: "cyan",
                        },
                        {
                          id: "workshop",
                          title: "Intensive Workshop",
                          desc: "Master specific stacks in 48h live sessions.",
                          icon: Laptop,
                          color: "purple",
                        },
                        {
                          id: "mentorship",
                          title: "Career Mentorship",
                          desc: "1-on-1 coaching with top corporate engineers.",
                          icon: GraduationCap,
                          color: "teal",
                        },
                      ].map((prog) => {
                        const Icon = prog.icon;
                        const isSelected = formData.selectedProgram === prog.id;
                        return (
                          <button
                            key={prog.id}
                            type="button"
                            onClick={() => updateFormField("selectedProgram", prog.id)}
                            className={`flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${isSelected
                              ? prog.color === "cyan"
                                ? "bg-[#06b6d4]/5 border-[#22d3ee] shadow-[0_0_15px_rgba(64,224,244,0.05)]"
                                : prog.color === "purple"
                                  ? "bg-[#a855f7]/5 border-[#c084fc] shadow-[0_0_15px_rgba(168,85,247,0.05)]"
                                  : "bg-[#2dd4bf]/5 border-[#2dd4bf] shadow-[0_0_15px_rgba(45,212,191,0.05)]"
                              : "bg-[#0d1323]/40 border-[#1e293b] hover:border-slate-700/80"
                              }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`p-3 rounded-xl bg-[#030712] border ${isSelected ? "border-[#22d3ee]/20" : "border-[#1e293b]"
                                  }`}
                              >
                                <Icon
                                  size={20}
                                  className={
                                    isSelected
                                      ? prog.color === "cyan"
                                        ? "text-[#22d3ee]"
                                        : prog.color === "purple"
                                          ? "text-[#c084fc]"
                                          : "text-[#2dd4bf]"
                                      : "text-[#64748b]"
                                  }
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-white">{prog.title}</h4>
                                <p className="text-xs text-[#64748b] mt-0.5">{prog.desc}</p>
                              </div>
                            </div>
                            <div
                              className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${isSelected
                                ? prog.color === "cyan"
                                  ? "border-[#22d3ee] bg-[#22d3ee]"
                                  : prog.color === "purple"
                                    ? "border-[#c084fc] bg-[#c084fc]"
                                    : "border-[#2dd4bf] bg-[#2dd4bf]"
                                : "border-[#334155]"
                                }`}
                            >
                              {isSelected && <span className="h-2 w-2 rounded-full bg-black" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <Button type="button" variant="secondary" onClick={prevStep} className="justify-center gap-2">
                        <ArrowLeft size={16} />
                        <span>Back</span>
                      </Button>
                      <Button type="submit" variant="glow-teal" className="justify-center gap-2">
                        <span>Continue</span>
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </form>
                )}

                {/* STEP 3: Review & Submit */}
                {currentStep === 3 && (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="border-b border-[#1e293b]/40 pb-4 mb-2">
                      <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest">
                        Step 3 of 3
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1">Review & Submit</h3>
                    </div>

                    {/* Summary Info list */}
                    <div className="p-5 rounded-2xl bg-[#030712] border border-[#1e293b] flex flex-col gap-4">
                      <div className="grid grid-cols-3 gap-2 border-b border-[#1e293b]/40 pb-3">
                        <span className="text-xs text-[#64748b] font-bold uppercase tracking-wider">Full Name:</span>
                        <span className="text-sm font-semibold text-white col-span-2">{formData.fullName}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 border-b border-[#1e293b]/40 pb-3">
                        <span className="text-xs text-[#64748b] font-bold uppercase tracking-wider">Email:</span>
                        <span className="text-sm font-semibold text-white col-span-2">{formData.email}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-xs text-[#64748b] font-bold uppercase tracking-wider">Selected Program:</span>
                        <span className="text-sm font-bold text-[#22d3ee] col-span-2 uppercase tracking-wide">
                          {formData.selectedProgram}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="notes" className="text-sm font-semibold text-[#94a3b8]">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        placeholder="Tell us about your learning goals or background details..."
                        value={formData.notes}
                        onChange={(e) => updateFormField("notes", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#030712] text-[#f1f5f9] border border-[#1e293b] focus:border-[#22d3ee] placeholder-[#475569] focus:outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <Button
                        type="button"
                        variant="secondary"
                        disabled={loading}
                        onClick={prevStep}
                        className="justify-center gap-2"
                      >
                        <ArrowLeft size={16} />
                        <span>Back</span>
                      </Button>
                      <Button
                        type="submit"
                        variant="glow-teal"
                        disabled={loading}
                        className="justify-center gap-2 bg-[#22d3ee]"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Award size={16} />
                            <span>Confirm & Submit</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ) : (
            /* Submission Success State */
            <div className="max-w-md mx-auto py-12 text-center flex flex-col items-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 mb-6">
                <CheckCircle size={32} />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold font-jakarta text-white tracking-tight">
                Registration Received!
              </h2>
              <p className="text-sm text-[#94a3b8] leading-relaxed mt-4">
                Thank you for applying to Campus to Corporate. We have saved your registration parameters. An expert advisor will reach out to <span className="text-[#22d3ee] font-semibold">{formData.email}</span> shortly.
              </p>
              <Button variant="secondary" onClick={closeModal} className="mt-10 px-8 py-3 font-semibold text-sm">
                Close Window
              </Button>
            </div>
          )}

          {/* Testimonials Block at bottom (Figma Image 4 Modal details) */}
          {!isSubmitted && (
            <div className="max-w-3xl mx-auto border-t border-[#1e293b]/40 pt-10 mt-6">
              <h4 className="text-center text-xs font-extrabold tracking-widest text-[#475569] uppercase mb-8 font-jakarta">
                Alumni Testimonial Reviews
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonialsData.slice(1, 3).map((test) => (
                  <div
                    key={test.id}
                    className="p-5 rounded-2xl bg-[#090d16]/30 border border-[#1e293b]/50 backdrop-blur-sm flex flex-col justify-between"
                  >
                    <p className="text-xs text-[#94a3b8] italic leading-relaxed mb-4">
                      "{test.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-800 border border-cyan-500/20 flex items-center justify-center text-[10px] text-cyan-400 font-bold">
                        {test.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h5 className="text-[11px] font-bold text-white">{test.author}</h5>
                        <p className="text-[9px] text-[#64748b]">{test.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default RegistrationModal;
