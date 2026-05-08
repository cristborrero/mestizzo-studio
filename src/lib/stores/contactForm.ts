import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { isEmail, isPhone, minLen } from '../validation/contact';

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  brief: string;
  budget: string;
  honeypot: string;
};

type ContactFormState = {
  currentStep: 1 | 2;
  direction: 1 | -1;
  isSubmitting: boolean;
  isSuccess: boolean;
  data: ContactFormData;
  touched: Record<string, boolean>;
  errors: Record<string, string>;

  setField: <K extends keyof ContactFormData>(
    key: K,
    value: ContactFormData[K]
  ) => void;
  toggleService: (service: string) => void;
  markTouched: (key: string) => void;
  next: () => void;
  prev: () => void;
  validateFields: (step: 1 | 2) => { isValid: boolean; errors: Record<string, string> };
  validateStep: (step: 1 | 2) => boolean;
  setSubmitting: (val: boolean) => void;
  setSuccess: (val: boolean) => void;
  submit: () => Promise<void>;
  reset: () => void;
  setDirection: (dir: 1 | -1) => void;
};

const initialData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  services: [],
  brief: '',
  budget: '',
  honeypot: '',
};

export const useContactStore = create<ContactFormState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      direction: 1,
      isSubmitting: false,
      isSuccess: false,
      data: initialData,
      touched: {},
      errors: {},

      setField: (key, value) => 
        set((state) => ({
          data: { ...state.data, [key]: value }
        })),

      toggleService: (service) =>
        set((state) => {
          const services = state.data.services.includes(service)
            ? state.data.services.filter((s) => s !== service)
            : [...state.data.services, service];
          return { data: { ...state.data, services } };
        }),

      markTouched: (key) =>
        set((state) => ({
          touched: { ...state.touched, [key]: true }
        })),

      setDirection: (dir) => set({ direction: dir }),
      setSubmitting: (val) => set({ isSubmitting: val }),
      setSuccess: (val) => set({ isSuccess: val }),

      next: () => {
        const { isValid, errors } = get().validateFields(1);
        if (isValid) {
          set({ currentStep: 2, direction: 1, errors: {} });
        } else {
          set({ errors });
        }
      },

      prev: () => {
        set({ currentStep: 1, direction: -1, errors: {} });
      },

      validateFields: (step) => {
        const { data } = get();
        const newErrors: Record<string, string> = {};

        if (step === 1) {
          if (!minLen(2)(data.name)) newErrors.name = 'El nombre debe tener al menos 2 caracteres';
          if (!isEmail(data.email)) newErrors.email = 'Introduce un email válido';
          if (!isPhone(data.phone)) newErrors.phone = 'Teléfono inválido (mín. 7 dígitos)';
        } else {
          if (data.services.length === 0) newErrors.services = 'Selecciona al menos un servicio';
          if (!minLen(20)(data.brief)) newErrors.brief = 'Cuéntanos un poco más (mín. 20 caracteres)';
          if (!data.budget) newErrors.budget = 'Selecciona un presupuesto estimado';
        }

        return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
      },

      validateStep: (step) => {
        const { isValid, errors } = get().validateFields(step);
        set({ errors });
        return isValid;
      },

      submit: async () => {
        // Fallback simulation if not used directly in component
        const { isValid, errors } = get().validateFields(2);
        if (!isValid) {
          set({ errors });
          return;
        }
        set({ isSubmitting: true });
        await new Promise((r) => setTimeout(r, 1500));
        set({ isSubmitting: false, isSuccess: true });
      },

      reset: () => {
        set({
          currentStep: 1,
          direction: 1,
          isSubmitting: false,
          isSuccess: false,
          data: initialData,
          touched: {},
          errors: {},
        });
        localStorage.removeItem('srm-contact-draft');
      },
    }),
    {
      name: 'srm-contact-draft',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        data: state.data,
        currentStep: state.currentStep,
      }),
    }
  )
);
