'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from "next/link";
import { 
  Trash2, Zap, Palette, Code2, 
  TrendingUp, Printer, Play, Package, ArrowRight, 
  Megaphone, Sparkles, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuoteStore } from '@/lib/store';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Service {
  id: number;
  code: string;
  category: string;
  name: string;
  description: string;
  priceUsd: number;
  priceColRef: number;
}

const CATEGORIES = [
  { id: 'Identidad Corporativa y Branding',       label: 'Branding',      icon: Palette,      color: '#FE0048' },
  { id: 'Diseño Web y Producto Digital',           label: 'Web & App',     icon: Code2,        color: '#FE0048' },
  { id: 'Marketing Digital y Redes Sociales',      label: 'Social Media',  icon: Megaphone,    color: '#FE0048' },
  { id: 'Marketing Estratégico y Growth',          label: 'Growth',        icon: TrendingUp,   color: '#FE0048' },
  { id: 'Inteligencia Artificial (AI)',            label: 'AI Suite',      icon: Sparkles,     color: '#FE0048' },
  { id: 'Fotografía y Video',                      label: 'Media',         icon: Play,         color: '#FE0048' },
  { id: 'Animación y 3D',                          label: 'Animación',     icon: Package,      color: '#FE0048' },
  { id: 'Editorial e Impresos',                    label: 'Editorial',     icon: Printer,      color: '#FE0048' },
];

export default function QuoteBuilder() {
  const [services, setServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState('Identidad Corporativa y Branding');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    selectedServices,
    addService,
    removeService,
    businessRules,
    setUrgency,
    setEditableFiles,
    setAdditionalHours,
    getSubtotal,
    getSurcharges,
    getTotal,
    shouldShowUpsell,
    dismissUpsell,
  } = useQuoteStore();

  const canShowUpsell = shouldShowUpsell();

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/services');
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const filteredServices = useMemo(() => 
    services.filter(s => s.category === activeTab),
    [services, activeTab]
  );

  const subtotal = getSubtotal();
  const surcharges = getSurcharges();
  const total = getTotal();

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-end gap-8"
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4 block">
                Quote Builder — 2026
              </span>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                Configure Your<br />
                <span className="text-outline">Investment.</span>
              </h1>
            </div>
            <p className="max-w-md text-lg text-secondary font-medium leading-snug">
              Selecciona los servicios que necesitas para tu proyecto. El presupuesto se ajusta en tiempo real basado en tus requerimientos técnicos.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Navigation / Categories */}
          <aside className="lg:col-span-3 space-y-2">
            <div className="sticky top-32">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-6 px-4">
                Categorías
              </p>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`
                    w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all duration-300 group
                    ${activeTab === cat.id 
                      ? 'bg-foreground text-background shadow-xl shadow-black/5' 
                      : 'hover:bg-surface text-secondary hover:text-foreground'}
                  `}
                >
                  <cat.icon className={`h-5 w-5 ${activeTab === cat.id ? 'text-accent' : 'group-hover:text-accent'} transition-colors`} />
                  <span className="text-sm font-bold uppercase tracking-wider">{cat.label}</span>
                  {activeTab === cat.id && (
                    <motion.div layoutId="activeCat" className="ml-auto">
                      <ChevronRight className="h-4 w-4" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </aside>

          {/* Service Listing */}
          <main className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="grid grid-cols-1 gap-4"
              >
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-40 w-full bg-surface animate-pulse rounded-[2rem]" />
                  ))
                ) : filteredServices.length > 0 ? (
                  filteredServices.map((service) => {
                    const isSelected = selectedServices.some(s => s.id === service.id);
                    return (
                      <motion.div
                        key={service.id}
                        whileHover={{ y: -4 }}
                        className={`
                          group relative p-8 rounded-[2.5rem] border transition-all duration-500
                          ${isSelected 
                            ? 'bg-foreground border-accent text-white' 
                            : 'bg-surface border-transparent hover:border-border'}
                        `}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 block">
                              {service.code}
                            </span>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                              {service.name}
                            </h3>
                          </div>
                          <button
                            onClick={() => isSelected
                            ? removeService(service.code)
                            : addService(service)}
                            className={`
                              h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300
                              ${isSelected 
                                ? 'bg-accent text-white rotate-45' 
                                : 'bg-background text-foreground border border-border hover:bg-accent hover:text-white hover:border-accent'}
                            `}
                          >
                            <Zap className="h-5 w-5" />
                          </button>
                        </div>
                        
                        <p className={`text-sm font-medium mb-8 ${isSelected ? 'text-white/60' : 'text-secondary'}`}>
                          {service.description}
                        </p>

                        <div className="flex items-center gap-6">
                          <div className="text-2xl font-black tracking-tighter">
                            ${service.priceUsd.toLocaleString()} <span className="text-[10px] uppercase opacity-40">USD</span>
                          </div>
                          <div className={`text-xs font-bold opacity-30 ${isSelected ? 'text-white' : ''}`}>
                            REF: {service.priceColRef}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="py-20 text-center">
                    <p className="text-secondary font-medium">No hay servicios disponibles en esta categoría.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Summary / Cart */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32 bg-surface rounded-[3rem] p-10 border border-border shadow-2xl shadow-black/5">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black uppercase tracking-tight">Resumen</h2>
                <div className="h-8 w-8 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {selectedServices.length}
                </div>
              </div>

              <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {selectedServices.length === 0 ? (
                  <p className="text-sm text-secondary italic">No has seleccionado servicios aún.</p>
                ) : (
                  selectedServices.map(s => (
                    <div key={s.code} className="flex justify-between items-center group">
                      <div className="flex-1 mr-4">
                        <p className="text-xs font-black uppercase tracking-tight line-clamp-1">{s.name}</p>
                        <p className="text-[10px] font-bold text-accent">${s.priceUsd.toLocaleString()} USD</p>
                      </div>
                      <button 
                        onClick={() => removeService(s.code)}
                        className="opacity-0 group-hover:opacity-100 p-2 hover:text-accent transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Business Rules */}
              <div className="space-y-4 pt-8 border-t border-border mb-10">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={businessRules.urgency}
                      onChange={(e) => setUrgency(e.target.checked)}
                      className="hidden"
                    />
                    <div className={`h-6 w-11 rounded-full transition-all duration-300 relative ${businessRules.urgency ? 'bg-accent' : 'bg-muted'}`}>
                       <div className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-all duration-300 ${businessRules.urgency ? 'translate-x-5' : ''}`} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider">Urgencia (+40%)</span>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={businessRules.editableFiles}
                      onChange={(e) => setEditableFiles(e.target.checked)}
                      className="hidden"
                    />
                    <div className={`h-6 w-11 rounded-full transition-all duration-300 relative ${businessRules.editableFiles ? 'bg-accent' : 'bg-muted'}`}>
                       <div className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-all duration-300 ${businessRules.editableFiles ? 'translate-x-5' : ''}`} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider">Fuentes (+25%)</span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-black uppercase tracking-wider">Horas Extra</span>
                  <div className="flex items-center gap-3 bg-background border border-border rounded-full px-3 py-1">
                    <button 
                      onClick={() => setAdditionalHours(Math.max(0, businessRules.additionalHours - 1))}
                      className="text-secondary hover:text-foreground transition-colors"
                    >-</button>
                    <span className="text-xs font-bold w-4 text-center">{businessRules.additionalHours}</span>
                    <button 
                      onClick={() => setAdditionalHours(businessRules.additionalHours + 1)}
                      className="text-secondary hover:text-foreground transition-colors"
                    >+</button>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-[10px] font-medium text-secondary leading-relaxed italic">
                    * Todos los servicios incluyen 2 rondas de cambios. Cambios adicionales se facturan a $35/hora.
                  </p>
                </div>
              </div>

              {/* Total */}
              <div className="space-y-2 mb-12">
                <div className="flex justify-between text-xs font-bold text-secondary uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()} USD</span>
                </div>
                {surcharges > 0 && (
                  <div className="flex justify-between text-xs font-bold text-accent uppercase tracking-widest">
                    <span>Recargos</span>
                    <span>+${surcharges.toLocaleString()} USD</span>
                  </div>
                )}
                <div className="flex justify-between text-4xl font-black tracking-tighter pt-4">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

                            {canShowUpsell && (
                <div className="mb-8 p-4 rounded-2xl bg-foreground text-background relative">
                  <button 
                    onClick={() => dismissUpsell()}
                    className="absolute top-3 right-3 text-background opacity-50 hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Recomendado</p>
                  <p className="text-sm font-medium mb-4">Añade Hosting y Mantenimiento Anual para asegurar el rendimiento de tu web.</p>
                  <button 
                    onClick={() => {
                      const hstService = services.find(s => s.code === 'HST-02');
                      if (hstService) {
                        addService(hstService);
                      }
                    }}
                    className="text-xs font-black uppercase tracking-widest bg-accent text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors"
                  >
                    Añadir Hosting
                  </button>
                </div>
              )}

              <Link
                href={selectedServices.length > 0 ? "/checkout" : "#"}
                className={`
                  w-full flex items-center justify-center gap-4 py-6 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-500
                  ${selectedServices.length > 0 
                    ? 'bg-foreground text-background hover:bg-accent hover:text-white shadow-xl shadow-accent/20' 
                    : 'bg-muted text-secondary cursor-not-allowed pointer-events-none'}
                `}
              >
                Continuar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
