'use client';

import { useState, useEffect } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useQuoteStore } from '@/lib/store';
import { CheckCircle, Download, ArrowLeft, Loader2, CreditCard, ShieldCheck, FileText } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckoutPage() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const { selectedServices, businessRules, getTotal, getSubtotal, getSurcharges } = useQuoteStore();

  if (!clientId) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-4">Pago no disponible</p>
        <h1 className="text-3xl font-light mb-6">El proceso de pago está temporalmente fuera de servicio.</h1>
        <p className="text-secondary mb-8">Escribinos directamente y gestionamos tu proyecto de forma manual.</p>
        <a href="mailto:infomestizzo@gmail.com" className="bg-foreground text-background px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-accent transition-colors">
          Contactar ahora
        </a>
      </main>
    );
  }
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success'>('pending');
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [pdfReady, setPdfReady] = useState(false);

  const total = getTotal();
  const subtotal = getSubtotal();
  const surcharges = getSurcharges();
  const advanceAmount = total * 0.5;
  const pendingAmount = total - advanceAmount;

  useEffect(() => {
    setPdfReady(true);
  }, []);

  const generatePDF = async () => {
    const { pdf } = await import('@react-pdf/renderer');
    const { QuotePDFDocument } = await import('@/components/QuotePDF');

    const services = selectedServices.map(s => ({
      code: s.code,
      name: s.name,
      priceUsd: s.priceUsd,
    }));

    const doc = (
      <QuotePDFDocument
        services={services}
        total={total}
        paid={advanceAmount}
        pending={pendingAmount}
        businessRules={{
          urgency: businessRules.urgency,
          editableFiles: businessRules.editableFiles,
        }}
      />
    );

    const blob = await pdf(doc).toBlob();
    return blob;
  };

  const handleApprove = async () => {
    setPaymentStatus('processing');

    try {
      const blob = await generatePDF();
      setPdfBlob(blob);
      setPaymentStatus('success');
    } catch (error) {
      console.error('Error generating PDF:', error);
      setPaymentStatus('pending');
    }
  };

  const handleDownloadPDF = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cotizacion-mestizzo-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  if (selectedServices.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-heading text-4xl font-black uppercase tracking-tighter mb-4 text-black">
            Sin Servicios
          </h1>
          <p className="text-neutral-500 mb-8 max-w-xs mx-auto">
            Aún no has seleccionado ningún servicio para tu proyecto.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 border-2 border-black px-8 py-4 font-bold uppercase hover:bg-black hover:text-white transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al constructor
          </Link>
        </motion.div>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-white selection:bg-[#FE0048] selection:text-white">
        <div className="max-w-4xl mx-auto p-4 md:p-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-grid bg-white p-8 md:p-16 text-center"
          >
            <div className="flex justify-center mb-8 text-[#FE0048]">
              <CheckCircle className="h-24 w-24" />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
              Pago<br/><span className="text-outline">Confirmado</span>
            </h1>
            <p className="text-xl text-neutral-500 mb-12 max-w-xl mx-auto">
              Tu anticipo de <span className="text-black font-bold">${advanceAmount.toFixed(2)} USD</span> ha sido procesado. 
              Recibirás un correo con los siguientes pasos pronto.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
              <div className="border-grid p-6 bg-neutral-50">
                <h2 className="font-bold uppercase tracking-widest text-xs text-[#FE0048] mb-4">Estado del Proyecto</h2>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span className="text-neutral-500">Anticipo (50%)</span>
                    <span className="text-green-500 font-bold">PAGADO</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Contra entrega</span>
                    <span className="font-bold">${pendingAmount.toFixed(2)} USD</span>
                  </div>
                </div>
              </div>
              <div className="border-grid p-6">
                <h2 className="font-bold uppercase tracking-widest text-xs text-neutral-400 mb-4">Próximos Pasos</h2>
                <ul className="text-sm space-y-2 text-neutral-500">
                  <li>• Asignación de equipo creativo</li>
                  <li>• Kick-off call del proyecto</li>
                  <li>• Envío de primeros borradores</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleDownloadPDF}
                className="flex-1 flex items-center justify-center gap-3 bg-[#FE0048] text-white py-5 px-8 font-black uppercase tracking-tighter hover:brightness-110 transition-all cursor-pointer group"
              >
                <Download className="h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                Descargar Comprobante PDF
              </button>
              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-2 border-2 border-black py-5 px-8 font-black uppercase tracking-tighter hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                Finalizar
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-[#FE0048] selection:text-white">
      {/* Header Grid */}
      <div className="border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link href="/quote" className="inline-flex items-center gap-2 text-neutral-400 hover:text-black transition-colors mb-8 group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">Atrás</span>
            </Link>
            <h1 className="font-heading text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-4">
              Check<span className="text-outline">out</span>
            </h1>
            <p className="text-neutral-500 text-lg uppercase tracking-widest font-medium">Finalizar Propuesta Creativa</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Details Section */}
          <div className="lg:col-span-7 space-y-12">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-black text-white p-2">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Resumen de Servicios</h2>
              </div>
              
              <div className="border-grid">
                {selectedServices.map((service, idx) => (
                  <div 
                    key={service.code}
                    className={`flex items-center justify-between p-6 ${idx !== selectedServices.length - 1 ? 'border-b border-neutral-100' : ''}`}
                  >
                    <div>
                      <h3 className="font-bold uppercase text-sm mb-1">{service.name}</h3>
                      <p className="text-xs text-neutral-400 font-mono">{service.code}</p>
                    </div>
                    <span className="font-black text-lg">${service.priceUsd.toFixed(2)}</span>
                  </div>
                ))}

                {/* Surcharges Block */}
                {(businessRules.urgency || businessRules.editableFiles) && (
                  <div className="bg-neutral-50 p-6 border-t border-neutral-200">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-4">Condiciones Especiales</h4>
                    <div className="space-y-4">
                      {businessRules.urgency && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold uppercase flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#FE0048] rounded-full" />
                            Entrega Express (+40%)
                          </span>
                          <span className="text-sm font-black text-[#FE0048]">+${(subtotal * 0.4).toFixed(2)}</span>
                        </div>
                      )}
                      {businessRules.editableFiles && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold uppercase flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#FE0048] rounded-full" />
                            Archivos Fuente (+25%)
                          </span>
                          <span className="text-sm font-black text-[#FE0048]">+${(subtotal * 0.25).toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black text-white p-8 md:p-12 border-grid"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Inversión Total</h2>
                <span className="text-xs font-mono opacity-50">USD / CURRENCY</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-2">Total del Proyecto</p>
                  <p className="text-6xl md:text-8xl font-black leading-none tracking-tighter">${total.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-2">Anticipo Requerido (50%)</p>
                  <p className="text-3xl md:text-4xl font-black text-[#FE0048]">${advanceAmount.toFixed(2)}</p>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-5">
            <div className="sticky top-12 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="border-grid p-8 bg-white"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#FE0048] text-white p-2">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter">Pasarela de Pago</h2>
                </div>

                <p className="text-neutral-500 text-sm mb-8">
                  Para iniciar tu proyecto creativo, procesaremos un pago de anticipo por el valor del <span className="text-black font-bold">50%</span>. 
                  El saldo restante será cancelado contra entrega de los archivos finales.
                </p>

                <div className="space-y-6">
                  {paymentStatus === 'processing' ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-12 border-2 border-dashed border-neutral-200">
                      <Loader2 className="h-8 w-8 animate-spin text-[#FE0048]" />
                      <span className="font-black uppercase text-xs tracking-widest">Validando Transacción...</span>
                    </div>
                  ) : (
                    <div className="relative z-0">
                      <PayPalScriptProvider
                        options={{
                          clientId,
                          currency: 'USD',
                        }}
                      >
                        <PayPalButtons
                          style={{ 
                            layout: 'vertical', 
                            color: 'black', 
                            shape: 'rect',
                            label: 'pay'
                          }}
                          createOrder={(_data, actions) => {
                            return actions.order.create({
                              intent: 'CAPTURE',
                              purchase_units: [
                                {
                                  description: 'Anticipo Cotización - MESTIZZO Studio',
                                  amount: {
                                    currency_code: 'USD',
                                    value: advanceAmount.toFixed(2),
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={handleApprove}
                          onError={(err) => {
                            console.error('PayPal error:', err);
                            setPaymentStatus('pending');
                          }}
                        />
                      </PayPalScriptProvider>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-neutral-100 flex items-center gap-4 text-neutral-400">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Pago Seguro Encriptado SSL</span>
                </div>
              </motion.div>

              <div className="p-8 border-grid bg-neutral-50">
                <h3 className="font-black uppercase text-xs tracking-widest mb-4">Aviso de Servicio</h3>
                <p className="text-[11px] leading-relaxed text-neutral-500 uppercase tracking-tight">
                  Al proceder con el pago, aceptas que MESTIZZO Studio inicie el proceso creativo de inmediato. 
                  Los tiempos de entrega pueden variar según la complejidad de los servicios seleccionados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}