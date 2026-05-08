'use client';

import { motion } from "framer-motion";
import { ArrowRight, Palette, Code2, Sparkles, TrendingUp, Video, Package } from "lucide-react";
import Link from "next/link";

const IconMap = {
  Palette,
  Code2,
  Sparkles,
  TrendingUp,
  Video,
  Package
};

interface ServiceCardProps {
  id: string;
  title: string;
  desc: string;
  icon: keyof typeof IconMap;
  size: string;
  index: number;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ServiceCard({ id, title, desc, icon, size, index }: ServiceCardProps) {
  const Icon = IconMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
      viewport={{ once: true }}
      className={`
        relative group bg-surface rounded-[3rem] p-12 overflow-hidden
        ${size === 'large' ? 'md:col-span-8' : size === 'medium' ? 'md:col-span-6' : 'md:col-span-4'}
        hover:bg-foreground transition-colors duration-700
      `}
    >
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="mb-20">
          <div className="h-14 w-14 rounded-2xl bg-white border border-border flex items-center justify-center mb-10 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
            {Icon && <Icon className="h-6 w-6 text-accent group-hover:text-white transition-colors" />}
          </div>
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter group-hover:text-white transition-colors mb-6">
            {title}
          </h3>
          <p className="text-lg text-secondary font-medium group-hover:text-white/60 transition-colors max-w-sm">
            {desc}
          </p>
        </div>
        
        <Link 
          href="/quote"
          className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-foreground group-hover:text-white group-hover:gap-6 transition-all"
        >
          Ver Detalles <ArrowRight className="h-4 w-4 text-accent" />
        </Link>
      </div>

      {/* Decorative Background Icon */}
      {Icon && <Icon className="absolute right-[-10%] bottom-[-10%] h-64 w-64 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-1000" />}
    </motion.div>
  );
}
