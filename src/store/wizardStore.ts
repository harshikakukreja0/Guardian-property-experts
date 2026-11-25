import { create } from "zustand";
import { PropertySubmissionFormData } from "@/types/wizard.types";

interface WizardState {
  currentStep: number;
  formData: PropertySubmissionFormData;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<PropertySubmissionFormData>) => void;
  resetForm: () => void;
}

const initialData: PropertySubmissionFormData = {
  purpose: "buy",
  category: "Apartment",
  state: "Maharashtra",
  city: "Mumbai",
  locality: "Worli",
  sector: "South Mumbai",
  address: "",
  pincode: "400018",
  bhk: 3,
  bathrooms: 3,
  balconies: 2,
  carpetArea: 1650,
  builtUpArea: 1950,
  floor: 12,
  totalFloors: 30,
  furnishing: "Semi-Furnished",
  propertyAge: "1 to 2 years",
  facing: "North-East",
  parking: "Car + Bike",
  price: 45000000,
  monthlyRent: 0,
  maintenance: 12000,
  securityDeposit: 0,
  isNegotiable: true,
  amenities: ["Swimming Pool", "Gymnasium", "Clubhouse", "24/7 Security", "Power Backup", "Covered Parking"],
  images: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  ],
  sellerName: "Vikram Malhotra",
  sellerPhone: "+91 98200 12345",
  sellerEmail: "vikram@malhotraestates.com",
  sellerType: "Owner",
  reraRegistration: "",
};

export const useWizardStore = create<WizardState>((set) => ({
  currentStep: 1,
  formData: initialData,

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 9) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetForm: () => set({ currentStep: 1, formData: initialData }),
}));
