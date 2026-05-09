"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import CaseCard, { type CaseCardProps } from "@/components/ui/CaseCard";
import SectionLabel from "@/components/ui/SectionLabel";

type WorkPreviewProps = {
  cases:    CaseCardProps[];
  showCTA?: boolean;
};

function resolveVariant(position: number, total: number): CaseCardProps["variant"] {
  if (position === 4 && total === 5) return "featured";
  const featuredPositions = [0, 3];
  return featuredPositions.includes(position) ? "featured" : "default";
}

function colSpanClass(variant: CaseCardProps["variant"], position: number, total: number): string {
  if (position === 4 && total === 5) return "md:col-span-12";

  const row = Math.floor(position / 2);
  const posInRow = position % 2;

  if (row % 2 === 0) {
    return posInRow === 0 ? "md:col-span-7" : "md:col-span-5";
  }
  return posInRow === 0 ? "md:col-span-5" : "md:col-span-7";
}

export default function WorkPreview({ cases, showCTA = true }: WorkPreviewProps) {
  const shouldReduce = useReducedMotion();
  const visible = cases.slice(0, 5);

  return (
    <section className="px-5 md:px-10 py-24 md:py-32">
      <div className="mb-10 flex items-end justify-between">
        <div className="flex flex-col gap-3">
          <SectionLabel label="Trabajo" number="02" variant="numbered" />
          <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Trabajo seleccionado
          </h2>
        </div>
        {showCTA && (
          <Link
            href="/trabajo"
            className="hidden md:flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-secondary hover:text-foreground transition-colors duration-300"
          >
            Ver todo <ArrowUpRight size={14} strokeWidth={2.5} />
          </Link>
        )}
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6"
        variants={staggerContainer}
        initial={shouldReduce ? "visible" : "hidden"}
        whileInView="visible"
        viewport={viewportOnce}
      >
        {visible.map((item, i) => {
          const variant  = resolveVariant(i, visible.length);
          const colClass = colSpanClass(variant, i, visible.length);

          return (
            <div key={item.slug} className={`col-span-1 ${colClass}`}>
              <CaseCard
                {...item}
                variant={variant}
                index={i}
              />
            </div>
          );
        })}
      </motion.div>

      {showCTA && (
        <div className="mt-12 flex md:hidden justify-center">
          <Link
            href="/trabajo"
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-secondary hover:text-foreground transition-colors duration-300"
          >
            Ver todo el trabajo <ArrowUpRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      )}
    </section>
  );
}
