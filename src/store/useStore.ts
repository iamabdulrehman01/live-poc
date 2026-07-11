import { create } from "zustand";

export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  selectedProgram: string;
  userType: "student" | "university" | "mentorship" | "";
  internshipType: "summer" | "final" | "";
  focusArea: string;
  universityName: string;
  collegeName: string;
  batchSize: "25" | "50" | "75" | "100" | "";
  notes: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  selectedProgram?: string;
  userType?: string;
  internshipType?: string;
  focusArea?: string;
  universityName?: string;
  collegeName?: string;
  batchSize?: string;
}

interface AppState {
  // Modal states
  isModalOpen: boolean;
  openModal: (defaultProgram?: string) => void;
  closeModal: () => void;

  // Multi-step form states
  currentStep: number;
  formData: FormData;
  formErrors: FormErrors;
  isSubmitted: boolean;
  
  // Actions
  setStep: (step: number) => void;
  nextStep: () => boolean;
  prevStep: () => void;
  updateFormField: (field: keyof FormData, value: string) => void;
  validateField: (field: keyof FormData) => boolean;
  validateCurrentStep: () => boolean;
  submitForm: () => Promise<boolean>;
  resetForm: () => void;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  selectedProgram: "",
  userType: "",
  internshipType: "",
  focusArea: "",
  universityName: "",
  collegeName: "",
  batchSize: "",
  notes: "",
};

export const useStore = create<AppState>((set, get) => ({
  isModalOpen: false,
  currentStep: 1,
  formData: initialFormData,
  formErrors: {},
  isSubmitted: false,

  openModal: (defaultProgram) => {
    let userType: "student" | "university" | "mentorship" | "" = "";
    let selectedProgram = defaultProgram || "";

    if (defaultProgram === "internship") {
      userType = "student";
      selectedProgram = "";
    } else if (defaultProgram === "workshop") {
      userType = "university";
      selectedProgram = "University Workshop";
    } else if (defaultProgram === "mentorship") {
      userType = "mentorship";
      selectedProgram = "1-on-1 Mentorship";
    }

    set({
      isModalOpen: true,
      currentStep: 1,
      isSubmitted: false,
      formData: {
        ...initialFormData,
        userType,
        selectedProgram,
      },
      formErrors: {},
    });
  },

  closeModal: () => {
    set({ isModalOpen: false });
  },

  setStep: (step) => {
    set({ currentStep: step });
  },

  updateFormField: (field, value) => {
    set((state) => {
      const nextFormData = {
        ...state.formData,
        [field]: value,
      };

      // Auto-compute selectedProgram
      let selectedProgram = nextFormData.selectedProgram;
      if (nextFormData.userType === "student") {
        const internText = nextFormData.internshipType === "summer" 
          ? "Summer Internship (4 weeks)" 
          : nextFormData.internshipType === "final" 
            ? "Final Year Internship (8 weeks)" 
            : "";
        const focusText = nextFormData.focusArea ? nextFormData.focusArea : "";
        selectedProgram = [internText, focusText].filter(Boolean).join(" - ");
      } else if (nextFormData.userType === "university") {
        const focusText = nextFormData.focusArea ? nextFormData.focusArea : "";
        const batchText = nextFormData.batchSize ? `${nextFormData.batchSize} Students` : "";
        selectedProgram = ["University Workshop", focusText, batchText].filter(Boolean).join(" - ");
      } else if (nextFormData.userType === "mentorship") {
        const focusText = nextFormData.focusArea ? nextFormData.focusArea : "";
        selectedProgram = ["1-on-1 Mentorship", focusText].filter(Boolean).join(" - ");
      }

      return {
        formData: {
          ...nextFormData,
          selectedProgram,
        },
        formErrors: {
          ...state.formErrors,
          [field]: undefined, // Clear error when field changes
        },
      };
    });
  },

  validateField: (field) => {
    const { formData } = get();
    const errors = { ...get().formErrors };
    let isValid = true;

    if (field === "fullName") {
      if (!formData.fullName.trim()) {
        errors.fullName = "Full name is required";
        isValid = false;
      } else if (formData.fullName.trim().length < 3) {
        errors.fullName = "Name must be at least 3 characters";
        isValid = false;
      } else {
        errors.fullName = undefined;
      }
    }

    if (field === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!formData.email.trim()) {
        errors.email = "Email address is required";
        isValid = false;
      } else if (!emailRegex.test(formData.email.trim())) {
        errors.email = "Please enter a valid email address (e.g. name@domain.com)";
        isValid = false;
      } else {
        errors.email = undefined;
      }
    }

    if (field === "phone") {
      const phoneRegex = /^[0-9]{10}$/;
      if (!formData.phone.trim()) {
        errors.phone = "Phone number is required";
        isValid = false;
      } else if (!phoneRegex.test(formData.phone.trim())) {
        errors.phone = "Please enter a valid 10-digit phone number";
        isValid = false;
      } else {
        errors.phone = undefined;
      }
    }

    if (field === "userType") {
      if (!formData.userType) {
        errors.userType = "Please select whether you are a Student, College Coordinator, or seeking Mentorship";
        isValid = false;
      } else {
        errors.userType = undefined;
      }
    }

    if (field === "internshipType") {
      if (formData.userType === "student" && !formData.internshipType) {
        errors.internshipType = "Please select your internship duration";
        isValid = false;
      } else {
        errors.internshipType = undefined;
      }
    }

    if (field === "focusArea") {
      if (!formData.focusArea) {
        errors.focusArea = "Please select your focus track";
        isValid = false;
      } else {
        errors.focusArea = undefined;
      }
    }

    if (field === "universityName") {
      if (!formData.universityName.trim()) {
        errors.universityName = "University name is required";
        isValid = false;
      } else {
        errors.universityName = undefined;
      }
    }

    if (field === "collegeName") {
      if (!formData.collegeName.trim()) {
        errors.collegeName = "College name is required";
        isValid = false;
      } else {
        errors.collegeName = undefined;
      }
    }

    if (field === "batchSize") {
      if (formData.userType === "university" && !formData.batchSize) {
        errors.batchSize = "Please select a batch size";
        isValid = false;
      } else {
        errors.batchSize = undefined;
      }
    }

    set({ formErrors: errors });
    return isValid;
  },

  validateCurrentStep: () => {
    const { currentStep, validateField, formData } = get();
    let isValid = true;

    if (currentStep === 1) {
      const isNameValid = validateField("fullName");
      const isEmailValid = validateField("email");
      const isPhoneValid = validateField("phone");
      isValid = isNameValid && isEmailValid && isPhoneValid;
    } else if (currentStep === 2) {
      const isUserTypeValid = validateField("userType");
      const isInternshipValid = formData.userType === "student" ? validateField("internshipType") : true;
      const isFocusAreaValid = validateField("focusArea");
      const isBatchSizeValid = formData.userType === "university" ? validateField("batchSize") : true;
      const isUniversityValid = validateField("universityName");
      const isCollegeValid = validateField("collegeName");
      isValid = isUserTypeValid && isInternshipValid && isFocusAreaValid && isBatchSizeValid && isUniversityValid && isCollegeValid;
    }

    return isValid;
  },

  nextStep: () => {
    const { currentStep, validateCurrentStep } = get();
    if (!validateCurrentStep()) return false;

    if (currentStep < 4) {
      set({ currentStep: currentStep + 1 });
      return true;
    }
    return false;
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },

  submitForm: async () => {
    const { validateCurrentStep, formData } = get();
    if (!validateCurrentStep()) return false;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log("Registration Submitted Successfully:", formData);
    set({ isSubmitted: true });
    return true;
  },

  resetForm: () => {
    set({
      currentStep: 1,
      formData: initialFormData,
      formErrors: {},
      isSubmitted: false,
    });
  },
}));
