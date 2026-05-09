import { useEffect, useState } from "react";
import { useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { RefObject } from "react";
import type { Variants, Transition } from "framer-motion";

export const ease = {
  text:     [0.16, 1, 0.3, 1],
  material: [0.22, 1, 0.36, 1],
  page:     [0.65, 0, 0.35, 1],
  micro:    [0.4, 0, 0.2, 1],
} as const;

export const duration = {
  micro: 0.25,
  fast:  0.5,
  base:  0.8,
  slow:  1.1,
  page:  0.7,
} as const;

const baseTransition: Transition = {
  duration: duration.base,
  ease:     ease.text as [number, number, number, number],
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.fast, ease: ease.micro as [number, number, number, number] },
  },
};

export const scaleSettle: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base, ease: ease.material as [number, number, number, number] },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.fast, ease: ease.text as [number, number, number, number] },
  },
};

export const drawLine: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: duration.slow, ease: ease.material as [number, number, number, number] },
  },
};

export const headlineFocus: Variants = {
  hidden:  { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.0, ease: ease.text as [number, number, number, number] } },
};

export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: {
      delayChildren:   0.1,
      staggerChildren: 0.07,
    },
  },
};

export function stagger(
  staggerChildren = 0.07,
  delayChildren   = 0.1
): Variants {
  return {
    hidden:  {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

export const viewportOnce  = { once: true, margin: "-80px 0px"  } as const;
export const viewportImage = { once: true, margin: "-40px 0px"  } as const;
export const viewportEarly = { once: true, margin: "-120px 0px" } as const;

export function useParallaxY(
  ref: RefObject<HTMLElement | null>,
  range: number = 40,
  offset: number = 0
): number {
  const [y, setY] = useState(offset);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce || !ref.current) return;
    const el = ref.current;
    const handleScroll = () => {
      const rect     = el.getBoundingClientRect();
      const vh       = window.innerHeight;
      const center   = rect.top + rect.height / 2 - vh / 2;
      const progress = center / vh;
      setY(offset + progress * range);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, range, offset, shouldReduce]);

  return shouldReduce ? offset : y;
}

export function useMotionVariants(variants: Variants): Variants {
  const reduce = useReducedMotion();
  if (!reduce) return variants;
  return {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };
}
