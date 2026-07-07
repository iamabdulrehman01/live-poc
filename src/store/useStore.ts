import { create } from "zustand";

export interface FormData {
  fullName: string;
  email: string;
  selectedProgram: string;
  notes: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  selectedProgram?: string;
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
  validateCurrentStep: () => boolean;
  submitForm: () => Promise<boolean>;
  resetForm: () => void;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  selectedProgram: "",
  notes: "",
};

export const useStore = create<AppState>((set, get) => ({
  isModalOpen: false,
  currentStep: 1,
  formData: initialFormData,
  formErrors: {},
  isSubmitted: false,

  openModal: (defaultProgram) => {
    set({
      isModalOpen: true,
      currentStep: 1,
      isSubmitted: false,
      formData: {
        ...initialFormData,
        selectedProgram: defaultProgram || "",
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
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
      formErrors: {
        ...state.formErrors,
        [field]: undefined, // Clear error when field changes
      },
    }));
  },

  validateCurrentStep: () => {
    const { currentStep, formData } = get();
    const errors: FormErrors = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        errors.fullName = "Full name is required";
        isValid = false;
      } else if (formData.fullName.trim().length < 3) {
        errors.fullName = "Name must be at least 3 characters";
        isValid = false;
      }

      if (!formData.email.trim()) {
        errors.email = "Email address is required";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Invalid email format";
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!formData.selectedProgram) {
        errors.selectedProgram = "Please select a program to continue";
        isValid = false;
      }
    }

    set({ formErrors: errors });
    return isValid;
  },

  nextStep: () => {
    const { currentStep, validateCurrentStep } = get();
    if (!validateCurrentStep()) return false;

    if (currentStep < 3) {
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
