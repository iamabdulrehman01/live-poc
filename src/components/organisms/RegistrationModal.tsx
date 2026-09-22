"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Award,
  GraduationCap,
  School,
  FileSpreadsheet,
} from "lucide-react";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import { useStore } from "@/store/useStore";
import { registrationSteps, testimonialsData } from "@/store/db";

interface UniversityApiResponse {
  name?: string;
  country?: string;
  alpha_two_code?: string;
  state_province?: string | null;
  domains?: string[];
  web_pages?: string[];
}

export const RegistrationModal: React.FC = () => {
  const {
    isModalOpen,
    closeModal,
    currentStep,
    formData,
    formErrors,
    isSubmitted,
    updateFormField,
    validateField,
    nextStep,
    prevStep,
    submitForm,
  } = useStore();

  const [loading, setLoading] = useState(false);

  // University search
  const [collegeSearch, setCollegeSearch] = useState("");
  const [colleges, setColleges] = useState<string[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<string[]>([]);
  const [isSearchingColleges, setIsSearchingColleges] = useState(false);
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);

  // Payment
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "success" | "failed"
  >("pending");

  // These are kept because your existing API response may provide them.
  const [, setApproveUrl] = useState("");
  const [, setRejectUrl] = useState("");

  // Excel upload
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [excelError, setExcelError] = useState("");

  /*
   * Initialize search input with the university already
   * stored in the form.
   */
  useEffect(() => {
    if (formData.universityName) {
      setCollegeSearch(formData.universityName);
    }
  }, [formData.universityName]);

  /*
   * Fetch all Indian universities from Hipolabs.
   *
   * API:
   * http://universities.hipolabs.com/search?country=India
   *
   * The API is called only once when the component mounts.
   */
  useEffect(() => {
    const fetchUniversities = async () => {
      setIsSearchingColleges(true);

      try {
        const response = await fetch(
          "http://universities.hipolabs.com/search?country=India",
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch universities. Status: ${response.status}`,
          );
        }

        const data: UniversityApiResponse[] = await response.json();

        const universityNames = Array.from(
          new Set(
            data
              .map((university) => university.name?.trim())
              .filter((name): name is string => Boolean(name)),
          ),
        ).sort((a, b) => a.localeCompare(b));

        setColleges(universityNames);
      } catch (error) {
        console.error("Error fetching universities:", error);
        setColleges([]);
      } finally {
        setIsSearchingColleges(false);
      }
    };

    fetchUniversities();
  }, []);

  /*
   * Filter universities locally as the user types.
   *
   * Only the first 20 matching universities are displayed
   * to prevent an excessively large dropdown.
   */
  useEffect(() => {
    const searchValue = collegeSearch.trim().toLowerCase();

    if (!searchValue || searchValue.length < 2) {
      setFilteredColleges([]);
      return;
    }

    const filtered = colleges
      .filter((university) => university.toLowerCase().includes(searchValue))
      .slice(0, 20);

    setFilteredColleges(filtered);
  }, [collegeSearch, colleges]);

  /*
   * Reset uploaded file state when modal closes.
   */
  useEffect(() => {
    if (!isModalOpen) {
      setUploadedFileName("");
      setExcelError("");
    }
  }, [isModalOpen]);

  /*
   * Calculate program price.
   */
  const getProgramPrice = () => {
    if (formData.userType === "student") {
      return formData.internshipType === "summer" ? 3999 : 7999;
    }

    if (formData.userType === "mentorship") {
      return 499;
    }

    if (formData.userType === "university") {
      const size = Number(formData.batchSize) || 0;
      return 1999 * size;
    }

    return 0;
  };

  /*
   * Poll payment status in Step 4.
   */
  useEffect(() => {
    if (!orderId || paymentStatus !== "pending" || currentStep !== 4) {
      return;
    }

    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `/api/payment-status?orderId=${encodeURIComponent(orderId)}`,
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "success") {
            setPaymentStatus("success");
            clearInterval(interval);

            setTimeout(async () => {
              await submitForm();
            }, 2000);
          } else if (data.status === "failed") {
            setPaymentStatus("failed");
          }
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [orderId, paymentStatus, currentStep, submitForm]);

  if (!isModalOpen) {
    return null;
  }

  /*
   * Handle Step 1 and Step 2 continue.
   */
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  /*
   * Handle Step 3 submit.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.userType === "university" && !uploadedFileName) {
      setExcelError(
        "Please upload the student batch spreadsheet before submitting",
      );
      return;
    }

    setLoading(true);

    try {
      const price = getProgramPrice();

      const response = await fetch("/api/register-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          selectedProgram: formData.selectedProgram,
          collegeName: formData.collegeName,
          universityName: formData.universityName,
          batchSize: formData.batchSize,
          excelFileName: uploadedFileName,
          notes: formData.notes,
          amount: price,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setOrderId(data.orderId);
        setAmount(data.amount);
        setApproveUrl(data.approveUrl || "");
        setRejectUrl(data.rejectUrl || "");
        setPaymentStatus("pending");

        nextStep();
      } else {
        console.error("Failed to register order");
      }
    } catch (error) {
      console.error("Error submitting registration form:", error);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Handle university selection.
   */
  const handleUniversitySelect = (universityName: string) => {
    updateFormField("universityName", universityName);
    setCollegeSearch(universityName);
    setShowCollegeDropdown(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 md:p-6 bg-[#030712]/90 backdrop-blur-md">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={closeModal} />

      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-[#070b13] border border-[#1e293b] rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 animate-fade-in max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1e293b]/50">
          <div className="flex items-center gap-2">
            <img
              src="/favicon.ico"
              alt="C2C Logo"
              className="w-6 h-6 object-contain rounded-md"
            />

            <span className="text-lg font-extrabold font-jakarta text-white">
              Campus{" "}
              <span className="text-[#22d3ee] font-medium">2 Corporate</span>
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl bg-[#0d1323] border border-[#1e293b] text-[#64748b] hover:text-white hover:border-slate-700 transition-all cursor-pointer"
            aria-label="Close form"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-grow p-6 md:p-10">
          {!isSubmitted ? (
            <div className="max-w-2xl mx-auto flex flex-col items-center">
              {/* Heading */}
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold font-jakarta text-white tracking-tight">
                  Launch Your Career Today
                </h2>

                <p className="text-sm text-[#64748b] mt-2 max-w-md">
                  Select your program and fill in your details to get started.
                </p>
              </div>

              {/* Step Progress */}
              <div className="w-full flex items-center justify-between mb-10 relative">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#1e293b] z-0" />

                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500 z-0"
                  style={{
                    width: `${
                      ((currentStep - 1) / (registrationSteps.length - 1)) * 100
                    }%`,
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
                        className={`h-8 w-8 rounded-full border-2 flex items-center justify-center text-xs font-bold font-jakarta transition-all duration-500 ${
                          isCurrent
                            ? "bg-[#22d3ee] border-[#22d3ee] text-black shadow-[0_0_15px_rgba(64,224,244,0.4)]"
                            : isActive
                              ? "bg-[#0d1323] border-[#22d3ee] text-[#22d3ee]"
                              : "bg-[#0d1323] border-[#1e293b] text-[#475569]"
                        }`}
                      >
                        {step.number}
                      </div>

                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider mt-2.5 transition-colors duration-500 hidden sm:block ${
                          isCurrent
                            ? "text-white"
                            : isActive
                              ? "text-[#94a3b8]"
                              : "text-[#475569]"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Form Container */}
              <div className="w-full p-8 rounded-2xl bg-[#090d16]/80 border border-[#1e293b]/70 backdrop-blur-md mb-10">
                {/* ===================================================== */}
                {/* STEP 1 */}
                {/* ===================================================== */}

                {currentStep === 1 && (
                  <form
                    onSubmit={handleContinue}
                    className="flex flex-col gap-6"
                  >
                    <div className="border-b border-[#1e293b]/40 pb-4 mb-2">
                      <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest">
                        Step 1 of 3
                      </span>

                      <h3 className="text-lg font-bold text-white mt-1">
                        Personal Details
                      </h3>
                    </div>

                    <FormField
                      label="Full Name"
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) =>
                        updateFormField("fullName", e.target.value)
                      }
                      onBlur={() => validateField("fullName")}
                      errorText={formErrors.fullName}
                    />

                    <FormField
                      label="Email Address"
                      id="email"
                      type="email"
                      placeholder="john@university.edu"
                      value={formData.email}
                      onChange={(e) => updateFormField("email", e.target.value)}
                      onBlur={() => validateField("email")}
                      errorText={formErrors.email}
                    />

                    <FormField
                      label="Phone Number"
                      id="phone"
                      type="tel"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => {
                        const val = e.target.value
                          .replace(/[^0-9]/g, "")
                          .slice(0, 10);

                        updateFormField("phone", val);
                      }}
                      onBlur={() => validateField("phone")}
                      errorText={formErrors.phone}
                    />

                    <Button
                      type="submit"
                      variant="glow-teal"
                      className="mt-4 justify-center gap-2"
                    >
                      <span>Continue</span>
                      <ArrowRight size={16} />
                    </Button>
                  </form>
                )}

                {/* ===================================================== */}
                {/* STEP 2 */}
                {/* ===================================================== */}

                {currentStep === 2 && (
                  <form
                    onSubmit={handleContinue}
                    className="flex flex-col gap-6"
                  >
                    <div className="border-b border-[#1e293b]/40 pb-4 mb-2">
                      <span className="text-[10px] text-purple-400 font-extrabold uppercase tracking-widest">
                        Step 2 of 3
                      </span>

                      <h3 className="text-lg font-bold text-white mt-1">
                        Program Selection
                      </h3>
                    </div>

                    {formErrors.userType && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 text-center">
                        {formErrors.userType}
                      </div>
                    )}

                    {/* User Type */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-[#94a3b8] tracking-wide">
                        I am registering as a:
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Student */}
                        <button
                          type="button"
                          onClick={() => {
                            updateFormField("userType", "student");
                            updateFormField("focusArea", "");
                            updateFormField("internshipType", "");
                            updateFormField("batchSize", "");
                          }}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                            formData.userType === "student"
                              ? "bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                              : "bg-[#0d1323]/40 border-[#1e293b] text-[#94a3b8] hover:border-slate-700/80"
                          }`}
                        >
                          <GraduationCap
                            size={24}
                            className={
                              formData.userType === "student"
                                ? "text-cyan-400"
                                : "text-[#64748b]"
                            }
                          />

                          <span className="text-sm font-bold mt-2 font-jakarta">
                            Student
                          </span>
                        </button>

                        {/* Mentorship */}
                        <button
                          type="button"
                          onClick={() => {
                            updateFormField("userType", "mentorship");
                            updateFormField("focusArea", "");
                            updateFormField("internshipType", "");
                            updateFormField("batchSize", "");
                          }}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                            formData.userType === "mentorship"
                              ? "bg-amber-500/10 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                              : "bg-[#0d1323]/40 border-[#1e293b] text-[#94a3b8] hover:border-slate-700/80"
                          }`}
                        >
                          <Award
                            size={24}
                            className={
                              formData.userType === "mentorship"
                                ? "text-amber-400"
                                : "text-[#64748b]"
                            }
                          />

                          <span className="text-sm font-bold mt-2 font-jakarta">
                            1-on-1 Mentorship
                          </span>
                        </button>

                        {/* University */}
                        <button
                          type="button"
                          onClick={() => {
                            updateFormField("userType", "university");
                            updateFormField("focusArea", "");
                            updateFormField("internshipType", "");
                            updateFormField("batchSize", "");
                          }}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                            formData.userType === "university"
                              ? "bg-purple-500/10 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                              : "bg-[#0d1323]/40 border-[#1e293b] text-[#94a3b8] hover:border-slate-700/80"
                          }`}
                        >
                          <School
                            size={24}
                            className={
                              formData.userType === "university"
                                ? "text-purple-400"
                                : "text-[#64748b]"
                            }
                          />

                          <span className="text-sm font-bold mt-2 font-jakarta">
                            University / College
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Student */}
                    {formData.userType === "student" && (
                      <>
                        {/* Internship Duration */}
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-[#94a3b8] tracking-wide">
                            Internship Duration:
                          </label>

                          <div className="grid grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() =>
                                updateFormField("internshipType", "summer")
                              }
                              className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                                formData.internshipType === "summer"
                                  ? "bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                                  : "bg-[#0d1323]/40 border-[#1e293b] text-[#94a3b8] hover:border-slate-700/80"
                              }`}
                            >
                              <span className="text-xs font-bold font-jakarta">
                                Summer Internship
                              </span>

                              <span className="text-[11px] text-cyan-400 font-extrabold mt-1">
                                ₹3,999
                              </span>

                              <span className="text-[9px] text-[#64748b] mt-0.5">
                                (4 Weeks Duration)
                              </span>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateFormField("internshipType", "final")
                              }
                              className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                                formData.internshipType === "final"
                                  ? "bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                                  : "bg-[#0d1323]/40 border-[#1e293b] text-[#94a3b8] hover:border-slate-700/80"
                              }`}
                            >
                              <span className="text-xs font-bold font-jakarta">
                                Final Year Internship
                              </span>

                              <span className="text-[11px] text-cyan-400 font-extrabold mt-1">
                                ₹7,999
                              </span>

                              <span className="text-[9px] text-[#64748b] mt-0.5">
                                (8 Weeks Duration)
                              </span>
                            </button>
                          </div>

                          {formErrors.internshipType && (
                            <span className="text-xs font-medium text-red-400 mt-1">
                              {formErrors.internshipType}
                            </span>
                          )}
                        </div>

                        {/* Focus Track */}
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-[#94a3b8] tracking-wide">
                            Focus Area / Tech Track:
                          </label>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[
                              "Frontend",
                              "Backend",
                              "DevOps",
                              "Cloud",
                              "AI and Agentic AI",
                              "UI and UX",
                            ].map((track) => (
                              <button
                                key={track}
                                type="button"
                                onClick={() =>
                                  updateFormField("focusArea", track)
                                }
                                className={`p-3 rounded-xl border text-center text-xs font-semibold font-jakarta transition-all cursor-pointer ${
                                  formData.focusArea === track
                                    ? "bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                                    : "bg-[#0d1323]/40 border-[#1e293b] text-[#64748b] hover:text-[#cbd5e1] hover:border-slate-700"
                                }`}
                              >
                                {track}
                              </button>
                            ))}
                          </div>

                          {formErrors.focusArea && (
                            <span className="text-xs font-medium text-red-400 mt-1">
                              {formErrors.focusArea}
                            </span>
                          )}
                        </div>
                      </>
                    )}

                    {/* Mentorship */}
                    {formData.userType === "mentorship" && (
                      <>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-semibold text-[#94a3b8] tracking-wide font-jakarta">
                              Preferred Mentorship Track:
                            </label>

                            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md font-jakarta">
                              Price: ₹499 / Program
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[
                              "Frontend Development",
                              "Backend Development",
                              "DevOps & SRE",
                              "Cloud Computing",
                              "AI & Agentic AI",
                              "UI & UX Design",
                              "Career Transition Guidance",
                            ].map((track) => (
                              <button
                                key={track}
                                type="button"
                                onClick={() =>
                                  updateFormField("focusArea", track)
                                }
                                className={`p-3 rounded-xl border text-center text-xs font-semibold font-jakarta transition-all cursor-pointer ${
                                  formData.focusArea === track
                                    ? "bg-amber-500/10 border-amber-400 text-white shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                                    : "bg-[#0d1323]/40 border-[#1e293b] text-[#64748b] hover:text-[#cbd5e1] hover:border-slate-700"
                                }`}
                              >
                                {track}
                              </button>
                            ))}
                          </div>

                          {formErrors.focusArea && (
                            <span className="text-xs font-medium text-red-400 mt-1">
                              {formErrors.focusArea}
                            </span>
                          )}
                        </div>
                      </>
                    )}

                    {/* University */}
                    {formData.userType === "university" && (
                      <>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-semibold text-[#94a3b8] tracking-wide font-jakarta">
                              Preferred Workshop Area:
                            </label>

                            <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md font-jakarta">
                              Price: ₹1,999 / Student
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[
                              "Frontend",
                              "Backend",
                              "DevOps",
                              "Cloud",
                              "AI and Agentic AI",
                              "UI and UX",
                              "Project Management Workshops",
                            ].map((track) => (
                              <button
                                key={track}
                                type="button"
                                onClick={() =>
                                  updateFormField("focusArea", track)
                                }
                                className={`p-3 rounded-xl border text-center text-xs font-semibold font-jakarta transition-all cursor-pointer ${
                                  formData.focusArea === track
                                    ? "bg-purple-500/10 border-purple-400 text-white shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                                    : "bg-[#0d1323]/40 border-[#1e293b] text-[#64748b] hover:text-[#cbd5e1] hover:border-slate-700"
                                }`}
                              >
                                {track}
                              </button>
                            ))}
                          </div>

                          {formErrors.focusArea && (
                            <span className="text-xs font-medium text-red-400 mt-1">
                              {formErrors.focusArea}
                            </span>
                          )}
                        </div>

                        {/* Batch Size */}
                        <div className="flex flex-col gap-2 mt-4">
                          <label className="text-sm font-semibold text-[#94a3b8] tracking-wide font-jakarta">
                            Select Batch Size (Mandatory):
                          </label>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {["25", "50", "75", "100"].map((size) => (
                              <button
                                key={size}
                                type="button"
                                onClick={() =>
                                  updateFormField("batchSize", size)
                                }
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                                  formData.batchSize === size
                                    ? "bg-purple-500/10 border-purple-400 text-white shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                                    : "bg-[#0d1323]/40 border-[#1e293b] text-[#94a3b8] hover:border-slate-700/80"
                                }`}
                              >
                                <span className="text-xs font-bold font-jakarta">
                                  {size} Students
                                </span>

                                <span className="text-[10px] text-purple-400 font-extrabold mt-1">
                                  ₹
                                  {(1999 * Number(size)).toLocaleString(
                                    "en-IN",
                                  )}
                                </span>
                              </button>
                            ))}
                          </div>

                          {formErrors.batchSize && (
                            <span className="text-xs font-medium text-red-400 mt-1">
                              {formErrors.batchSize}
                            </span>
                          )}
                        </div>
                      </>
                    )}

                    {/* ================================================= */}
                    {/* UNIVERSITY SEARCH */}
                    {/* ================================================= */}

                    {(formData.userType === "student" ||
                      formData.userType === "university" ||
                      formData.userType === "mentorship") && (
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 relative">
                          <label
                            htmlFor="universitySearch"
                            className="text-sm font-semibold text-[#94a3b8] tracking-wide font-jakarta"
                          >
                            University Name:
                          </label>

                          <div className="relative flex items-center">
                            <input
                              id="universitySearch"
                              type="text"
                              placeholder="Type to search your university..."
                              value={formData.universityName}
                              onChange={(e) => {
                                const value = e.target.value;

                                updateFormField("universityName", value);

                                setCollegeSearch(value);
                                setShowCollegeDropdown(true);
                              }}
                              onFocus={() => {
                                setShowCollegeDropdown(true);
                              }}
                              onBlur={() => {
                                validateField("universityName");

                                /*
                                 * Delay closing so the user can click
                                 * a dropdown item.
                                 */
                                setTimeout(() => {
                                  setShowCollegeDropdown(false);
                                }, 200);
                              }}
                              className={`w-full px-4 py-3 rounded-xl bg-[#090d16]/80 text-[#f1f5f9] border ${
                                formErrors.universityName
                                  ? "border-red-500 focus:ring-red-500/20"
                                  : "border-[#1e293b] focus:border-[#22d3ee] focus:ring-cyan-500/10"
                              } placeholder-[#475569] focus:outline-none focus:ring-4 transition-all duration-300`}
                            />

                            {isSearchingColleges && (
                              <span className="absolute right-4 text-[#64748b]">
                                <Loader2
                                  size={16}
                                  className="animate-spin text-cyan-400"
                                />
                              </span>
                            )}
                          </div>

                          {formErrors.universityName && (
                            <span className="text-xs font-medium text-red-400 mt-1">
                              {formErrors.universityName}
                            </span>
                          )}

                          {/* University Dropdown */}
                          {showCollegeDropdown &&
                            (filteredColleges.length > 0 ||
                              isSearchingColleges) && (
                              <div className="absolute top-[100%] left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-xl border border-[#1e293b] bg-[#070b13] p-1 shadow-2xl backdrop-blur-md">
                                {isSearchingColleges &&
                                colleges.length === 0 ? (
                                  <div className="p-3 text-xs text-[#64748b] text-center font-jakarta">
                                    Loading universities...
                                  </div>
                                ) : filteredColleges.length > 0 ? (
                                  filteredColleges.map((colName) => (
                                    <button
                                      key={colName}
                                      type="button"
                                      onMouseDown={() =>
                                        handleUniversitySelect(colName)
                                      }
                                      className="w-full rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-[#cbd5e1] hover:bg-[#22d3ee]/10 hover:text-[#22d3ee] transition-all cursor-pointer font-jakarta"
                                    >
                                      {colName}
                                    </button>
                                  ))
                                ) : (
                                  <div className="p-3 text-xs text-[#64748b] text-center font-jakarta">
                                    No universities found.
                                  </div>
                                )}
                              </div>
                            )}
                        </div>

                        <FormField
                          label="College Name:"
                          id="collegeName"
                          placeholder="Enter your college name..."
                          value={formData.collegeName}
                          onChange={(e) =>
                            updateFormField("collegeName", e.target.value)
                          }
                          onBlur={() => validateField("collegeName")}
                          errorText={formErrors.collegeName}
                        />
                      </div>
                    )}

                    {/* Amount */}
                    {(formData.userType === "student" ||
                      formData.userType === "university" ||
                      formData.userType === "mentorship") && (
                      <div className="p-4 rounded-xl bg-slate-950/60 border border-[#1e293b] flex items-center justify-between mt-4 mb-2 font-jakarta">
                        <div className="flex flex-col text-left">
                          <span className="text-[10px] text-[#64748b] font-bold uppercase tracking-wider">
                            Finalized Amount
                          </span>

                          <span className="text-xs text-[#cbd5e1] mt-0.5 animate-fade-in">
                            {formData.userType === "student" &&
                              `${
                                formData.internshipType === "summer"
                                  ? "Summer Internship (4 Weeks)"
                                  : formData.internshipType === "final"
                                    ? "Final Year Internship (8 Weeks)"
                                    : "Select Duration"
                              }${
                                formData.focusArea
                                  ? ` - ${formData.focusArea}`
                                  : ""
                              }`}

                            {formData.userType === "mentorship" &&
                              `1-on-1 Mentorship Session${
                                formData.focusArea
                                  ? ` - ${formData.focusArea}`
                                  : ""
                              }`}

                            {formData.userType === "university" &&
                              (formData.focusArea && formData.batchSize
                                ? `Workshop for ${formData.batchSize} Students - ${formData.focusArea}`
                                : "Select Focus & Batch")}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-lg font-extrabold text-[#22d3ee] animate-fade-in">
                            {getProgramPrice() > 0
                              ? `₹${getProgramPrice().toLocaleString("en-IN")}`
                              : "—"}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={prevStep}
                        className="justify-center gap-2"
                      >
                        <ArrowLeft size={16} />
                        <span>Back</span>
                      </Button>

                      <Button
                        type="submit"
                        variant="glow-teal"
                        className="justify-center gap-2"
                      >
                        <span>Continue</span>
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </form>
                )}

                {/* ===================================================== */}
                {/* STEP 3 */}
                {/* ===================================================== */}

                {currentStep === 3 && (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="border-b border-[#1e293b]/40 pb-4 mb-2">
                      <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest">
                        Step 3 of 3
                      </span>

                      <h3 className="text-lg font-bold text-white mt-1">
                        Review & Submit
                      </h3>
                    </div>

                    {/* Summary */}
                    <div className="p-5 rounded-2xl bg-[#030712] border border-[#1e293b] flex flex-col gap-4">
                      <div className="grid grid-cols-3 gap-2 border-b border-[#1e293b]/40 pb-3">
                        <span className="text-xs text-[#64748b] font-bold uppercase tracking-wider">
                          Full Name:
                        </span>

                        <span className="text-sm font-semibold text-white col-span-2">
                          {formData.fullName}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 border-b border-[#1e293b]/40 pb-3">
                        <span className="text-xs text-[#64748b] font-bold uppercase tracking-wider">
                          Email:
                        </span>

                        <span className="text-sm font-semibold text-white col-span-2">
                          {formData.email}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 border-b border-[#1e293b]/40 pb-3">
                        <span className="text-xs text-[#64748b] font-bold uppercase tracking-wider">
                          University:
                        </span>

                        <span className="text-sm font-semibold text-white col-span-2">
                          {formData.universityName}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 border-b border-[#1e293b]/40 pb-3">
                        <span className="text-xs text-[#64748b] font-bold uppercase tracking-wider">
                          College:
                        </span>

                        <span className="text-sm font-semibold text-white col-span-2">
                          {formData.collegeName}
                        </span>
                      </div>

                      <div
                        className={`grid grid-cols-3 gap-2 ${
                          formData.userType === "university" &&
                          formData.batchSize
                            ? "border-b border-[#1e293b]/40 pb-3"
                            : ""
                        }`}
                      >
                        <span className="text-xs text-[#64748b] font-bold uppercase tracking-wider">
                          Selected Program:
                        </span>

                        <span className="text-sm font-bold text-[#22d3ee] col-span-2 uppercase tracking-wide">
                          {formData.selectedProgram}
                        </span>
                      </div>

                      {formData.userType === "university" &&
                        formData.batchSize && (
                          <div className="grid grid-cols-3 gap-2">
                            <span className="text-xs text-[#64748b] font-bold uppercase tracking-wider">
                              Batch Size:
                            </span>

                            <span className="text-sm font-semibold text-white col-span-2">
                              {formData.batchSize} Students
                            </span>
                          </div>
                        )}
                    </div>

                    {/* Excel Upload */}
                    {formData.userType === "university" && (
                      <div className="flex flex-col gap-2.5">
                        <label className="text-sm font-semibold text-[#94a3b8] tracking-wide font-jakarta">
                          Upload Student Batch Details (Excel / CSV){" "}
                          <span className="text-purple-400 font-bold">*</span>
                        </label>

                        <div className="border border-dashed border-purple-500/30 bg-[#090d16]/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 group hover:border-purple-400/50 hover:bg-[#090d16]/70 transition-all duration-300 relative cursor-pointer">
                          <input
                            type="file"
                            id="excelUpload"
                            accept=".xlsx,.xls,.csv"
                            onChange={(e) => {
                              const file = e.target.files?.[0];

                              if (!file) {
                                return;
                              }

                              const extension = file.name
                                .split(".")
                                .pop()
                                ?.toLowerCase();

                              if (
                                extension === "xlsx" ||
                                extension === "xls" ||
                                extension === "csv"
                              ) {
                                setUploadedFileName(file.name);
                                setExcelError("");
                              } else {
                                setUploadedFileName("");

                                setExcelError(
                                  "Only Excel (.xlsx, .xls) and CSV (.csv) files are allowed.",
                                );

                                e.target.value = "";
                              }
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />

                          <div className="p-3 rounded-xl bg-[#090d16] border border-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                            <FileSpreadsheet
                              size={20}
                              className="text-purple-400"
                            />
                          </div>

                          <div>
                            <span className="text-xs font-bold text-white block group-hover:text-purple-300 transition-colors font-jakarta">
                              {uploadedFileName || "Upload Batch Spreadsheet"}
                            </span>

                            <span className="text-[10px] text-[#64748b] mt-1 block font-jakarta font-medium">
                              Drag and drop or click to choose Excel (.xlsx,
                              .xls) or CSV template
                            </span>
                          </div>
                        </div>

                        {excelError && (
                          <span className="text-xs font-semibold text-red-400 mt-1 font-jakarta">
                            {excelError}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Notes */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="notes"
                        className="text-sm font-semibold text-[#94a3b8]"
                      >
                        Additional Notes (Optional)
                      </label>

                      <textarea
                        id="notes"
                        rows={3}
                        placeholder="Tell us about your learning goals or background details..."
                        value={formData.notes}
                        onChange={(e) =>
                          updateFormField("notes", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#030712] text-[#f1f5f9] border border-[#1e293b] focus:border-[#22d3ee] placeholder-[#475569] focus:outline-none transition-all"
                      />
                    </div>

                    {/* Navigation */}
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <Button
                        type="button"
                        variant="secondary"
                        disabled={loading}
                        onClick={prevStep}
                        className="w-full justify-center gap-2"
                      >
                        <ArrowLeft size={16} />
                        <span>Back</span>
                      </Button>

                      <Button
                        type="submit"
                        variant="glow-teal"
                        disabled={loading}
                        className="w-full justify-center gap-2 bg-[#22d3ee]"
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

                {/* ===================================================== */}
                {/* STEP 4 - PAYMENT */}
                {/* ===================================================== */}

                {currentStep === 4 && (
                  <div className="flex flex-col gap-6">
                    <div className="border-b border-[#1e293b]/40 pb-4 mb-2">
                      <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest font-jakarta">
                        Step 4 of 4
                      </span>

                      <h3 className="text-lg font-bold text-white mt-1 font-jakarta">
                        Scan & Pay via UPI
                      </h3>
                    </div>

                    {/* Order Info */}
                    <div className="p-5 rounded-2xl bg-[#030712] border border-[#1e293b] flex flex-col gap-4">
                      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs text-[#64748b] font-bold uppercase tracking-wider block font-jakarta">
                            Order ID
                          </span>

                          <span className="text-sm font-semibold text-white font-mono">
                            {orderId}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-[#64748b] font-bold uppercase tracking-wider block font-jakarta">
                            Amount Due
                          </span>

                          <span className="text-lg font-bold text-[#22d3ee] font-jakarta">
                            ₹{amount.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pending */}
                    {paymentStatus === "pending" && (
                      <div className="flex flex-col items-center gap-6 py-4">
                        <div className="flex flex-col items-center gap-4 text-center">
                          <div className="border border-[#1e293b]/50 p-4 rounded-3xl bg-slate-950/80 shadow-[0_0_30px_rgba(34,211,238,0.15)] relative group overflow-hidden">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                                `upi://pay?pa=abdulrehman630092@okaxis&pn=Campus%20to%20Corporate&am=${amount}&tr=${orderId}&cu=INR&tn=C2C%20Program%20Fee`,
                              )}`}
                              alt="UPI QR Code"
                              className="w-[180px] h-[180px] rounded-xl relative z-10"
                            />
                          </div>

                          <div>
                            <span className="text-xs text-[#64748b] font-bold uppercase tracking-wider font-jakarta">
                              UPI ID:
                            </span>

                            <span className="text-sm font-semibold text-white ml-2 font-jakarta">
                              abdulrehman630092@okaxis
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-xs font-semibold text-cyan-400 animate-pulse text-center w-full justify-center font-jakarta">
                          <Loader2
                            size={16}
                            className="animate-spin text-cyan-400"
                          />

                          <span>
                            Waiting for Admin Department for confirmation...
                            Portal will update instantly.
                          </span>
                        </div>

                        <p className="text-xs text-[#64748b] text-center leading-relaxed max-w-sm font-jakarta">
                          An automated verification request has been emailed to
                          the founder (
                          <span className="text-white font-medium">
                            abdulrehman630092@gmail.com
                          </span>
                          ). Once they verify receipt, your status will update.
                        </p>
                      </div>
                    )}

                    {/* Success */}
                    {paymentStatus === "success" && (
                      <div className="flex flex-col items-center gap-4 py-8 text-center">
                        <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center animate-bounce">
                          <CheckCircle size={32} />
                        </div>

                        <h4 className="text-lg font-bold text-white font-jakarta">
                          Payment Received!
                        </h4>

                        <p className="text-sm text-[#94a3b8] max-w-xs font-jakarta">
                          Admin confirmed receipt. Finalizing your dashboard
                          registration profile...
                        </p>
                      </div>
                    )}

                    {/* Failed */}
                    {paymentStatus === "failed" && (
                      <div className="flex flex-col items-center gap-4 py-6 text-center">
                        <div className="h-16 w-16 rounded-full bg-red-500/10 border border-red-400/30 text-red-400 flex items-center justify-center">
                          <X size={32} />
                        </div>

                        <h4 className="text-lg font-bold text-white font-jakarta">
                          Payment Rejected
                        </h4>

                        <p className="text-sm text-[#94a3b8] max-w-xs mb-2 font-jakarta">
                          The payment could not be verified by the Admin. Please
                          try scanning again or contact support.
                        </p>

                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => {
                            setPaymentStatus("pending");
                            setOrderId("");
                          }}
                          className="px-6 py-2 text-xs font-jakarta"
                        >
                          Retry Payment
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Submission Success */
            <div className="max-w-md mx-auto py-12 text-center flex flex-col items-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 mb-6">
                <CheckCircle size={32} />
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold font-jakarta text-white tracking-tight">
                Registration Received!
              </h2>

              <p className="text-sm text-[#94a3b8] leading-relaxed mt-4">
                Thank you for applying to Campus to Corporate. We have saved
                your registration parameters. An expert advisor will reach out
                to{" "}
                <span className="text-[#22d3ee] font-semibold">
                  {formData.email}
                </span>{" "}
                shortly.
              </p>

              <Button
                variant="secondary"
                onClick={closeModal}
                className="mt-10 px-8 py-3 font-semibold text-sm"
              >
                Close Window
              </Button>
            </div>
          )}

          {/* Testimonials */}
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
                      &ldquo;{test.quote}&rdquo;
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-800 border border-cyan-500/20 flex items-center justify-center text-[10px] text-cyan-400 font-bold">
                        {test.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>

                      <div>
                        <h5 className="text-[11px] font-bold text-white">
                          {test.author}
                        </h5>

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
