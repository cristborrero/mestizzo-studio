"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Loader2, ChevronLeft } from "lucide-react";
import { useContactStore } from "@/lib/stores/contactForm";
import { submitContactForm } from "@/app/actions/contact";
import Toast from "@/components/ui/Toast";

const SERVICES = [
  "Branding & Estrategia",
  "Web Boutique",
  "E-Commerce",
  "AI Integration",
  "SEO & Digital Marketing",
  "Site Audit",
  "Hosting & Soporte",
  "Producción Audiovisual",
];

const BUDGET_OPTIONS = [
  "< £5k",
  "£5k–£15k",
  "£15k–£40k",
  "£40k–£100k",
  "£100k+",
  "Aún no estoy seguro",
];

const EASE = [0.16, 1, 0.3, 1];

export default function MultiStepForm() {
  const store = useContactStore();
  const prefersReducedMotion = useReducedMotion();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Solicitud enviada. Te contactaremos pronto.");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleNext = () => {
    store.next();
    if (store.currentStep === 1) {
      store.markTouched("name");
      store.markTouched("email");
      store.markTouched("phone");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = store.validateStep(2);
    if (!isValid) {
      store.markTouched("services");
      store.markTouched("brief");
      store.markTouched("budget");
      return;
    }

    store.setSubmitting(true);
    try {
      const result = await submitContactForm(store.data);
      if (result.success) {
        store.setSuccess(true);
        setToastMessage("Solicitud enviada. Te contactaremos pronto.");
      } else {
        setToastMessage(result.error ?? "Error al enviar. Intentá de nuevo.");
      }
    } catch {
      setToastMessage("Error al enviar. Intentá de nuevo.");
    } finally {
      store.setSubmitting(false);
      setShowToast(true);
    }
  };

  const stepVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : 40 * dir,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : -40 * dir,
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
        delayChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: EASE },
    },
  };

  if (store.isSuccess) {
    return (
      <div className="min-h-[480px] flex flex-col items-center justify-center text-center py-12">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-xl"
          >
            <h2 className="text-5xl md:text-7xl font-serif italic mb-6 text-foreground">
              Gracias, {store.data.name.split(" ")[0]}.
            </h2>
            <p className="text-xl text-secondary font-light mb-12 leading-relaxed">
              Hemos recibido tu solicitud. Te contactaremos en menos de 24 horas.
            </p>
            <button
              onClick={store.reset}
              className="bg-accent text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Enviar otra solicitud
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto min-h-[480px]">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-16 px-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center relative">
            {/* Step 1 Circle */}
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 z-10 ${
                store.currentStep === 1
                  ? "bg-accent text-white scale-110"
                  : "bg-foreground text-background"
              }`}
            >
              {store.currentStep > 1 ? <Check className="h-4 w-4" /> : "01"}
            </div>

            {/* Connecting Line */}
            <div className="w-16 h-[2px] bg-border relative">
              <motion.div
                initial={false}
                animate={{ scaleX: store.currentStep === 2 ? 1 : 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-0 bg-accent origin-left"
              />
            </div>

            {/* Step 2 Circle */}
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 z-10 ${
                store.currentStep === 2
                  ? "bg-accent text-white scale-110"
                  : "border border-border text-foreground/40"
              }`}
            >
              02
            </div>
          </div>
        </div>
        <span className="text-secondary text-[10px] font-black uppercase tracking-[0.3em]">
          Paso {store.currentStep} de 2
        </span>
      </div>

      <form onSubmit={handleSubmit} className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={store.direction}>
          <motion.div
            key={store.currentStep}
            custom={store.direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.45, ease: EASE }}
            className="w-full"
          >
            {store.currentStep === 1 ? (
              <StepOne variants={containerVariants} itemVariants={itemVariants} />
            ) : (
              <StepTwo variants={containerVariants} itemVariants={itemVariants} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Form Controls */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          <div>
            {store.currentStep === 2 && (
              <button
                type="button"
                onClick={store.prev}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-secondary hover:text-foreground transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Volver
              </button>
            )}
          </div>

          {store.currentStep === 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className={`flex items-center gap-3 bg-foreground text-background px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 ${
                !store.validateFields(1).isValid ? "opacity-40" : "hover:bg-accent hover:text-white"
              }`}
            >
              Siguiente Paso
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={store.isSubmitting}
              className={`flex items-center gap-3 bg-accent text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 ${
                !store.validateFields(2).isValid ? "opacity-40" : "hover:scale-105 active:scale-95"
              }`}
            >
              {store.isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Enviar Solicitud
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {showToast && (
          <Toast
            message={toastMessage}
            onDismiss={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function StepOne({ variants, itemVariants }: { variants: any; itemVariants: any }) {
  const { data, setField, errors, touched, markTouched } = useContactStore();

  return (
    <motion.div variants={variants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="md:col-span-2">
        <motion.h3 variants={itemVariants} className="text-3xl font-light mb-2">
          Cuéntanos <span className="font-medium">sobre ti</span>
        </motion.h3>
      </div>

      {/* Name */}
      <motion.div variants={itemVariants} className="flex flex-col gap-3">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">
          Nombre completo *
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setField("name", e.target.value)}
          onBlur={() => markTouched("name")}
          placeholder="Ej. John Doe"
          className={`bg-surface border border-border px-6 py-4 rounded-full focus:outline-none focus:border-foreground transition-colors text-foreground ${
            touched.name && errors.name ? "border-accent" : ""
          }`}
        />
        <AnimatePresence>
          {touched.name && errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-bold text-accent uppercase tracking-widest px-4"
            >
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Email */}
      <motion.div variants={itemVariants} className="flex flex-col gap-3">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">
          Email corporativo *
        </label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => setField("email", e.target.value)}
          onBlur={() => markTouched("email")}
          placeholder="hola@empresa.com"
          className={`bg-surface border border-border px-6 py-4 rounded-full focus:outline-none focus:border-foreground transition-colors text-foreground ${
            touched.email && errors.email ? "border-accent" : ""
          }`}
        />
        <AnimatePresence>
          {touched.email && errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-bold text-accent uppercase tracking-widest px-4"
            >
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Phone */}
      <motion.div variants={itemVariants} className="flex flex-col gap-3">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">
          Teléfono
        </label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => setField("phone", e.target.value)}
          onBlur={() => markTouched("phone")}
          placeholder="+34 600 000 000"
          className={`bg-surface border border-border px-6 py-4 rounded-full focus:outline-none focus:border-foreground transition-colors text-foreground ${
            touched.phone && errors.phone ? "border-accent" : ""
          }`}
        />
        <AnimatePresence>
          {touched.phone && errors.phone && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-bold text-accent uppercase tracking-widest px-4"
            >
              {errors.phone}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Company */}
      <motion.div variants={itemVariants} className="flex flex-col gap-3">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">
          Empresa
        </label>
        <input
          type="text"
          value={data.company}
          onChange={(e) => setField("company", e.target.value)}
          placeholder="Nombre de tu empresa"
          className="bg-surface border border-border px-6 py-4 rounded-full focus:outline-none focus:border-foreground transition-colors text-foreground"
        />
      </motion.div>
    </motion.div>
  );
}

function StepTwo({ variants, itemVariants }: { variants: any; itemVariants: any }) {
  const { data, toggleService, setField, errors, touched, markTouched } = useContactStore();

  return (
    <motion.div variants={variants} initial="hidden" animate="visible" className="flex flex-col gap-10">
      <div>
        <motion.h3 variants={itemVariants} className="text-3xl font-light mb-2">
          Alcance del <span className="font-medium">Proyecto</span>
        </motion.h3>
        <motion.p variants={itemVariants} className="text-secondary text-sm">
          Puedes seleccionar múltiples servicios
        </motion.p>
      </div>

      {/* Services Chips */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
        {SERVICES.map((service) => {
          const isSelected = data.services.includes(service);
          return (
            <motion.button
              key={service}
              type="button"
              whileHover={isSelected ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggleService(service)}
              className={`px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300 ${
                isSelected
                  ? "bg-accent border-accent text-white"
                  : "bg-surface border-border text-foreground hover:border-foreground"
              }`}
            >
              {service}
            </motion.button>
          );
        })}
        <AnimatePresence>
          {touched.services && errors.services && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full text-[10px] font-bold text-accent uppercase tracking-widest px-4 mt-2"
            >
              {errors.services}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Brief */}
      <motion.div variants={itemVariants} className="flex flex-col gap-3">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">
          Cuéntanos sobre tu proyecto *
        </label>
        <textarea
          value={data.brief}
          onChange={(e) => setField("brief", e.target.value)}
          onBlur={() => markTouched("brief")}
          rows={4}
          placeholder="Describe tus objetivos, desafíos y lo que esperas lograr..."
          className={`bg-surface border border-border px-8 py-6 rounded-3xl focus:outline-none focus:border-foreground transition-colors text-foreground resize-none ${
            touched.brief && errors.brief ? "border-accent" : ""
          }`}
        />
        <AnimatePresence>
          {touched.brief && errors.brief && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-bold text-accent uppercase tracking-widest px-4"
            >
              {errors.brief}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Budget */}
      <motion.div variants={itemVariants} className="flex flex-col gap-3">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">
          Presupuesto estimado *
        </label>
        <select
          value={data.budget}
          onChange={(e) => setField("budget", e.target.value)}
          onBlur={() => markTouched("budget")}
          className={`bg-surface border border-border px-6 py-4 rounded-full focus:outline-none focus:border-foreground transition-colors text-foreground appearance-none cursor-pointer ${
            touched.budget && errors.budget ? "border-accent" : ""
          }`}
        >
          <option value="" disabled>Selecciona una opción</option>
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <AnimatePresence>
          {touched.budget && errors.budget && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-bold text-accent uppercase tracking-widest px-4"
            >
              {errors.budget}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Privacy Notice */}
      <motion.p variants={itemVariants} className="text-secondary text-[11px] leading-relaxed">
        Al enviar este formulario, aceptas nuestra{" "}
        <a href="/privacy" className="text-foreground underline underline-offset-4 hover:text-accent transition-colors">
          Política de Privacidad
        </a>. Tus datos están seguros y se utilizarán únicamente para responder a tu consulta.
      </motion.p>
    </motion.div>
  );
}
