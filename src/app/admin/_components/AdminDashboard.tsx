'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Tag, TrendingUp, DollarSign, FileText, Layers, ArrowUpRight } from 'lucide-react';
import type { QuoteRequest } from '@/lib/db/schema';

interface Stats {
  totalServices: number;
  avgPrice: number;
  catalogValue: number;
  totalCategories: number;
  totalQuotes: number;
  totalRevenue: number;
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

const STAT_CARDS = [
  { key: 'totalServices',  label: 'SERVICIOS',     icon: Package,    prefix: '',   suffix: '',  decimals: 0 },
  { key: 'totalCategories',label: 'CATEGORÍAS',    icon: Layers,     prefix: '',   suffix: '',  decimals: 0 },
  { key: 'avgPrice',       label: 'PROM. USD',     icon: Tag,        prefix: '$',  suffix: '',  decimals: 2 },
  { key: 'catalogValue',   label: 'VALOR CAT.',    icon: DollarSign, prefix: '$',  suffix: '',  decimals: 0 },
  { key: 'totalQuotes',    label: 'COTIZACIONES',  icon: FileText,   prefix: '',   suffix: '',  decimals: 0 },
  { key: 'totalRevenue',   label: 'REVENUE',       icon: TrendingUp, prefix: '$',  suffix: '',  decimals: 2 },
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
          HOLA, <span className="text-outline">{userName.split(' ')[0]}</span>
        </h1>
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-accent" />
          <p className="text-[10px] font-black tracking-[0.4em] opacity-40 uppercase">
            RESUMEN OPERATIVO / MESTIZZO STUDIO
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <motion.div
        className="border-grid grid grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {STAT_CARDS.map(({ key, label, icon: Icon, prefix, suffix, decimals }) => (
          <motion.div
            key={key}
            variants={item}
            className="group relative p-10 transition-colors hover:bg-muted"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-[10px] font-black tracking-[0.2em] opacity-40">{label}</span>
              <Icon size={14} className="opacity-20 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-4xl">
              <AnimatedNumber
                value={stats[key]}
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

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Category breakdown */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-xs font-black tracking-[0.3em]">POR CATEGORÍA</h2>
            <span className="text-[10px] font-medium opacity-40">DISTRIBUCIÓN</span>
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
                    transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
            <h2 className="text-xs font-black tracking-[0.3em]">COTIZACIONES RECIENTES</h2>
            <span className="text-[10px] font-medium opacity-40">ÚLTIMAS 5</span>
          </div>
          {recentQuotes.length === 0 ? (
            <div className="flex h-32 items-center justify-center border border-dashed border-border">
              <p className="text-[10px] font-black tracking-widest opacity-20 uppercase">No hay actividad</p>
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
