"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease, duration } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: duration.page,
        ease:     ease.page as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  );
}
