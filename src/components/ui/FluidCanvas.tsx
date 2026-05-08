'use client';

/**
 * FluidCanvas — WebGL fluid background for the Hero.
 *
 * Behaviour:
 *  - White background, no auto-splats, no bloom (clean editorial look)
 *  - Mouse / touch only — the simulation is silent until the visitor moves
 *  - Fixed palette: #fe0048 dominant (4/7), red, yellow, black
 *
 * Built on Pavel Dobryakov's WebGL-Fluid-Simulation (MIT) via the
 * `webgl-fluid` npm wrapper. Loaded with a dynamic import so the WebGL
 * code stays out of the initial bundle.
 */

import { useEffect, useRef } from 'react';

type FluidColor = { r: number; g: number; b: number };

type FluidOptions = Partial<{
  TRIGGER: 'hover' | 'click';
  IMMEDIATE: boolean;
  AUTO: boolean;
  INTERVAL: number;
  SIM_RESOLUTION: number;
  DYE_RESOLUTION: number;
  CAPTURE_RESOLUTION: number;
  DENSITY_DISSIPATION: number;
  VELOCITY_DISSIPATION: number;
  PRESSURE: number;
  PRESSURE_ITERATIONS: number;
  CURL: number;
  SPLAT_RADIUS: number;
  SPLAT_FORCE: number;
  SPLAT_COUNT: number;
  SPLAT_COLOR: FluidColor | undefined;
  SHADING: boolean;
  COLORFUL: boolean;
  COLOR_UPDATE_SPEED: number;
  PAUSED: boolean;
  BACK_COLOR: FluidColor;
  TRANSPARENT: boolean;
  BLOOM: boolean;
  BLOOM_ITERATIONS: number;
  BLOOM_RESOLUTION: number;
  BLOOM_INTENSITY: number;
  BLOOM_THRESHOLD: number;
  BLOOM_SOFT_KNEE: number;
  SUNRAYS: boolean;
  SUNRAYS_RESOLUTION: number;
  SUNRAYS_WEIGHT: number;
}>;

type FluidInit = (canvas: HTMLCanvasElement, options?: FluidOptions) => void;

export default function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect reduced-motion: skip WebGL entirely. Background stays white.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const isMobile = window.innerWidth < 768;

    // The wrapper reads SPLAT_COLOR by reference inside its color generator,
    const palette: FluidColor[] = [
      { r: 1.0, g: 0.0, b: 0.28 }, // #fe0048 — dominant
      { r: 1.0, g: 0.0, b: 0.28 },
      { r: 1.0, g: 0.0, b: 0.28 },
      { r: 1.0, g: 0.0, b: 0.28 },
      { r: 0.85, g: 0.05, b: 0.05 }, // red
      { r: 1.0, g: 0.78, b: 0.0 },   // yellow
      { r: 0.05, g: 0.05, b: 0.05 }, // black (replaces white on light bg)
    ];

    const splatColor: FluidColor = { ...palette[0] };

    let lastColorChange = 0;
    const pickNextColor = () => {
      const now = performance.now();
      if (now - lastColorChange < 220) return;
      lastColorChange = now;
      const c = palette[Math.floor(Math.random() * palette.length)];
      splatColor.r = c.r;
      splatColor.g = c.g;
      splatColor.b = c.b;
    };

    const fit = () => {
      // Capping DPR at 1.0 on mobile and 1.5 on desktop to save cycles.
      // High-DPI screens (4K) don't need 2.0+ for a background effect.
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };

    fit();

    // PERFORMANCE: Delay WebGL initialization to prioritize LCP (text rendering).
    const initTimeout = setTimeout(() => {
      import('webgl-fluid')
        .then((mod) => {
          if (cancelled) return;
          const WebGLFluid = (mod.default ?? mod) as FluidInit;

          WebGLFluid(canvas, {
            TRIGGER: 'hover',
            IMMEDIATE: false,
            AUTO: false,
            INTERVAL: 0,
            // Optimized settings for desktop and mobile to fix TBT.
            SIM_RESOLUTION: isMobile ? 32 : 96,
            DYE_RESOLUTION: isMobile ? 512 : 1024,
            DENSITY_DISSIPATION: isMobile ? 3.0 : 2.2, 
            VELOCITY_DISSIPATION: 1.0,
            PRESSURE: 0.8,
            PRESSURE_ITERATIONS: isMobile ? 4 : 10, // Reduced from 20 on desktop
            CURL: isMobile ? 15 : 22,
            SPLAT_RADIUS: 0.1,
            SPLAT_FORCE: 5000,
            SPLAT_COUNT: 0,
            SHADING: !isMobile, 
            COLORFUL: false,
            COLOR_UPDATE_SPEED: 0,
            PAUSED: false,
            BACK_COLOR: { r: 255, g: 255, b: 255 },
            TRANSPARENT: false,
            BLOOM: false,
            SUNRAYS: false,
            SPLAT_COLOR: splatColor,
          });

          const forwardMouse = (e: MouseEvent) => {
            pickNextColor();
            const ev = new MouseEvent('mousemove', {
              clientX: e.clientX,
              clientY: e.clientY,
              bubbles: false,
            });
            canvas.dispatchEvent(ev);
          };

          const forwardTouch = (e: TouchEvent) => {
            pickNextColor();
            if (e.touches.length === 0) return;
            const t = e.touches[0];
            const ev = new MouseEvent('mousemove', {
              clientX: t.clientX,
              clientY: t.clientY,
              bubbles: false,
            });
            canvas.dispatchEvent(ev);
          };

          window.addEventListener('mousemove', forwardMouse, { passive: true });
          window.addEventListener('touchmove', forwardTouch, { passive: true });
          window.addEventListener('resize', fit);

          cleanup = () => {
            window.removeEventListener('mousemove', forwardMouse);
            window.removeEventListener('touchmove', forwardTouch);
            window.removeEventListener('resize', fit);
            const gl =
              canvas.getContext('webgl2') ?? canvas.getContext('webgl');
            (
              gl as WebGLRenderingContext | null
            )?.getExtension('WEBGL_lose_context')?.loseContext();
          };
        })
        .catch((err) => {
          console.warn('[FluidCanvas] webgl-fluid failed to load:', err);
        });
    }, isMobile ? 2000 : 1500); // 2s on mobile, 1.5s on desktop for stability

    return () => {
      cancelled = true;
      clearTimeout(initTimeout);
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full"
    />
  );
}