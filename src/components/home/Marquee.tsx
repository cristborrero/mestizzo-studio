'use client';

import { motion } from "framer-motion";

export default function Marquee() {
  return (
    <div className="py-12 border-y border-border overflow-hidden whitespace-nowrap bg-surface">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-20 items-center"
      >
        {[1,2,3,4,5].map(i => (
          <div key={i} className="flex gap-20 items-center">
            <span className="text-4xl font-black uppercase tracking-tighter opacity-20">Branding Boutique</span>
            <span className="text-4xl font-black uppercase tracking-tighter text-accent italic">Diseño de Autor</span>
            <span className="text-4xl font-black uppercase tracking-tighter opacity-20">Fullstack Dev</span>
            <span className="text-4xl font-black uppercase tracking-tighter opacity-20">AI Integration</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
