'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Tag, TrendingUp, DollarSign, FileText, Layers, ArrowUpRight } from 'lucide-react';
import type { QuoteRequest } from '@/lib/db/schema';

interface Stats {
  totalQuotes: number;
  totalRevenue: number;
  avgTicket: number;
  totalServices: number;
  catalogValue: number;
  totalCategories: number;
}

interface CategoryCount {
  category: string;
  count: number;
  total: number;
}

interface Props {
  userName: string;
  stats: Stats;
  categoryCounts: CategoryCount[];
  recentQuotes: QuoteRequest[];
}

function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }: {
  value: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const [displayed, setDisplayed] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1500;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayed(eased * value);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value]);

  const formatted = decimals > 0
    ? displayed.toFixed(decimals)
    : Math.floor(displayed).toLocaleString('es-CO');

  return <span className="font-black">{prefix}{formatted}{suffix}</span>;
}

const PERFORMANCE_CARDS = [
  { key: 'totalRevenue',   label: 'REVENUE TOTAL',     icon: TrendingUp, prefix: '$',  suffix: '',  decimals: 2 },
  { key: 'totalQuotes',    label: 'COTIZACIONES',      icon: FileText,   prefix: '',   suffix: '',  decimals: 0 },
  { key: 'avgTicket',      label: 'TICKET PROMEDIO',   icon: DollarSign, prefix: '$',  suffix: '',  decimals: 2 },
] as const;

const INVENTORY_CARDS = [
  { key: 'totalServices',  label: 'ITEMS EN CATÁLOGO', icon: Package,    prefix: '',   suffix: '',  decimals: 0 },
  { key: 'totalCategories',label: 'CATEGORÍAS',        icon: Layers,     prefix: '',   suffix: '',  decimals: 0 },
  { key: 'catalogValue',   label: 'VALOR POTENCIAL',   icon: Tag,        prefix: '$',  suffix: '',  decimals: 0 },
] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const item = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function AdminDashboard({ userName, stats, categoryCounts, recentQuotes }: Props) {
  const maxCount = Math.max(...categoryCounts.map((c) => c.count), 1);

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-black tracking-tight leading-none uppercase">
          CENTRO DE <span className="text-outline">MANDO</span>
        </h1>
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-accent" />
          <p className="text-[10px] font-black tracking-[0.4em] opacity-40 uppercase">
            MESTIZZO STUDIO / {userName.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Primary Performance Stats */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-[10px] font-black tracking-[0.3em] opacity-30 uppercase">Desempeño Comercial</h2>
          <div className="h-px flex-1 bg-border/50" />
        </div>
        <motion.div
          className="border-grid grid grid-cols-1 md:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {PERFORMANCE_CARDS.map(({ key, label, icon: Icon, prefix, suffix, decimals }) => (
            <motion.div
              key={key}
              variants={item}
              className="group relative p-10 transition-colors hover:bg-muted border-r border-b md:border-b-0 border-border"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-[10px] font-black tracking-[0.2em] opacity-40">{label}</span>
                <Icon size={14} className="text-accent opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-5xl tracking-tighter">
                <AnimatedNumber
                  value={stats[key as keyof Stats]}
                  prefix={prefix}
                  suffix={suffix}
                  decimals={decimals}
                />
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight size={16} className="text-accent" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Secondary Inventory Stats */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-[10px] font-black tracking-[0.3em] opacity-30 uppercase">Infraestructura del Catálogo</h2>
          <div className="h-px flex-1 bg-border/50" />
        </div>
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-3 gap-0"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {INVENTORY_CARDS.map(({ key, label, icon: Icon, prefix, suffix, decimals }) => (
            <motion.div
              key={key}
              variants={item}
              className="group p-8 border-r border-b last:border-r-0 border-border/40 hover:bg-muted/30 transition-all"
            >
              <div className="flex items-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity mb-2">
                <Icon size={12} />
                <span className="text-[9px] font-bold tracking-widest uppercase">{label}</span>
              </div>
              <div className="text-2xl opacity-60 group-hover:opacity-100 transition-all">
                <AnimatedNumber
                  value={stats[key as keyof Stats]}
                  prefix={prefix}
                  suffix={suffix}
                  decimals={decimals}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 pt-8 border-t border-border">
        {/* Category breakdown */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-xs font-black tracking-[0.3em]">EQUILIBRIO DEL CATÁLOGO</h2>
            <span className="text-[10px] font-medium opacity-40">SERVICIOS / CAT</span>
          </div>
          <div className="space-y-6">
            {categoryCounts.map(({ category, count }) => (
              <div key={category} className="group">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-black tracking-widest">{category.toUpperCase()}</span>
                  <span className="font-mono text-[10px] opacity-40">{count}</span>
                </div>
                <div className="h-[2px] w-full bg-border">
                  <motion.div
                    className="h-full bg-foreground group-hover:bg-accent transition-colors"
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / maxCount) * 100}%` }}
                    transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent quotes */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-xs font-black tracking-[0.3em]">FLUJO DE ACTIVIDAD</h2>
            <span className="text-[10px] font-medium opacity-40">ÚLTIMAS 5 OPERACIONES</span>
          </div>
          {recentQuotes.length === 0 ? (
            <div className="flex h-32 items-center justify-center border border-dashed border-border">
              <p className="text-[10px] font-black tracking-widest opacity-20 uppercase">Esperando primera transacción...</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentQuotes.map((q) => (
                <div
                  key={q.id}
                  className="group flex items-center justify-between py-6 transition-all hover:px-2"
                >
                  <div>
                    <p className="text-[10px] font-black tracking-widest">
                      COTIZACIÓN #{q.id.toString().padStart(4, '0')}
                    </p>
                    <p className="text-[9px] font-medium opacity-40 tracking-widest">
                      {q.serviceCount} ÍTEMS — {q.createdAt ? new Date(q.createdAt).toLocaleDateString('es-CO') : '—'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black">
                      ${Number(q.totalUsd).toFixed(2)}
                    </p>
                    <span className={`text-[8px] font-black uppercase tracking-tighter ${
                      q.status === 'paid'
                        ? 'text-accent'
                        : 'opacity-40'
                    }`}>
                      {q.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
