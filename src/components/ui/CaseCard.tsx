"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/motion";

export type CaseCardProps = {
  slug:          string;
  client:        string;
  headline:      string;
  year:          string;
  location:      string;
  capabilities:  string[];
  placeholder?:  string;
  variant?:      "featured" | "default" | "minimal";
  index?:        number;
};

const aspectMap = {
  featured: "aspect-[16/10]",
  default:  "aspect-[4/3]",
  minimal:  "aspect-square",
} as const;

export default function CaseCard({
  slug,
  client,
  headline,
  year,
  location,
  capabilities,
  placeholder = "#1a1a1a",
  variant = "default",
  index = 0,
}: CaseCardProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.article
      variants={fadeUp}
      initial={shouldReduce ? "visible" : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay: index * 0.04 }}
    >
      <Link href={`/trabajo/${slug}`} className="group block">
        <div className={`relative overflow-hidden bg-surface ${aspectMap[variant]}`}>
          <div
            className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ backgroundColor: placeholder }}
          />

          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-[0.15]" />

          {capabilities.length > 0 && (
            <ul className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
              {capabilities.map((cap) => (
                <li
                  key={cap}
                  className="px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.2em] bg-background/80 backdrop-blur-sm text-foreground"
                >
                  {cap}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div className="overflow-hidden">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-1">
              {client} — {year}
            </p>
            <motion.h3
              className="font-heading text-lg font-black leading-tight tracking-tight text-foreground"
              animate={{ y: 0 }}
              whileHover={shouldReduce ? {} : { y: -4 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              {headline}
            </motion.h3>
            <p className="mt-0.5 text-[11px] text-secondary">{location}</p>
          </div>

          <span className="shrink-0 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 text-foreground">
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
