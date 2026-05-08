import { create } from 'zustand';
import { 
  URGENCY_SURCHARGE, 
  EDITABLE_FILES_SURCHARGE, 
  ADDITIONAL_HOUR_RATE, 
  DEFAULT_COP_EXCHANGE_RATE,
  HST02_CODE,
  ServiceCategory
} from './constants';

export interface ServiceItem {
  id: number;
  code: string;
  category: string;
  name: string;
  description: string;
  priceUsd: number;
  priceColRef: number;
}

export interface BusinessRules {
  urgency: boolean;
  editableFiles: boolean;
  additionalHours: number;
}

interface QuoteState {
  selectedServices: ServiceItem[];
  businessRules: BusinessRules;
  showUpsell: boolean;
  
  addService: (service: ServiceItem) => void;
  removeService: (code: string) => void;
  clearQuote: () => void;
  
  setUrgency: (value: boolean) => void;
  setEditableFiles: (value: boolean) => void;
  setAdditionalHours: (hours: number) => void;
  dismissUpsell: () => void;
  
  getSubtotal: () => number;
  getSurcharges: () => number;
  getTotal: () => number;
  getTotalCop: () => number;
  shouldShowUpsell: () => boolean;
}

export const useQuoteStore = create<QuoteState>((set, get) => ({
  selectedServices: [],
  businessRules: {
    urgency: false,
    editableFiles: false,
    additionalHours: 0,
  },
  showUpsell: true,
  
  addService: (service: ServiceItem) => {
    const exists = get().selectedServices.some(s => s.code === service.code);
    if (!exists) {
      // Defensive conversion to ensure numbers are used in calculations
      const sanitizedService = {
        ...service,
        priceUsd: Number(service.priceUsd),
        priceColRef: service.priceColRef ? Number(service.priceColRef) : 0,
      };
      set(state => ({
        selectedServices: [...state.selectedServices, sanitizedService],
      }));
    }
  },
  
  removeService: (code: string) => {
    set({ selectedServices: get().selectedServices.filter(s => s.code !== code) });
  },
  
  clearQuote: () => {
    set({ 
      selectedServices: [], 
      businessRules: { urgency: false, editableFiles: false, additionalHours: 0 },
      showUpsell: true,
    });
  },
  
  setUrgency: (value: boolean) => {
    set(state => ({ 
      businessRules: { ...state.businessRules, urgency: value } 
    }));
  },
  
  setEditableFiles: (value: boolean) => {
    set(state => ({ 
      businessRules: { ...state.businessRules, editableFiles: value } 
    }));
  },
  
  setAdditionalHours: (hours: number) => {
    set(state => ({ 
      businessRules: { ...state.businessRules, additionalHours: Math.max(0, hours) } 
    }));
  },
  
  dismissUpsell: () => set({ showUpsell: false }),
  
  getSubtotal: () => {
    return get().selectedServices.reduce((sum, s) => sum + s.priceUsd, 0);
  },
  
  getSurcharges: () => {
    const { urgency, editableFiles, additionalHours } = get().businessRules;
    const subtotal = get().getSubtotal();
    
    let surcharges = 0;
    
    if (urgency) surcharges += subtotal * URGENCY_SURCHARGE;
    if (editableFiles) surcharges += subtotal * EDITABLE_FILES_SURCHARGE;
    surcharges += additionalHours * ADDITIONAL_HOUR_RATE;
    
    return surcharges;
  },
  
  getTotal: () => get().getSubtotal() + get().getSurcharges(),
  
  getTotalCop: () => {
    const rate = Number(process.env.NEXT_PUBLIC_COP_EXCHANGE_RATE) || DEFAULT_COP_EXCHANGE_RATE;
    return get().getTotal() * rate;
  },
  
  shouldShowUpsell: () => {
    const hasWebService = get().selectedServices.some(s => s.category === ServiceCategory.WEB);
    const hasHosting = get().selectedServices.some(s => s.code === HST02_CODE);
    return get().showUpsell && hasWebService && !hasHosting;
  },
}));