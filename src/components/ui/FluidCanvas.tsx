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

    // The wrapper reads SPLAT_COLOR by reference inside its color generator,
    // so mutating this single object's r/g/b before each splat makes the
    // simulation pick the new color on the next frame. That's how we
    // implement a multi-color palette through an API that only takes one.
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
      // Throttle: each gesture lays down a streak of one color before
      // switching. Without this you'd get a rainbow on every mousemove.
      if (now - lastColorChange < 220) return;
      lastColorChange = now;
      const c = palette[Math.floor(Math.random() * palette.length)];
      splatColor.r = c.r;
      splatColor.g = c.g;
      splatColor.b = c.b;
    };

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };

    fit();

    import('webgl-fluid')
      .then((mod) => {
        if (cancelled) return;
        const WebGLFluid = (mod.default ?? mod) as FluidInit;

        WebGLFluid(canvas, {
          TRIGGER: 'hover',
          IMMEDIATE: false,
          AUTO: false,
          INTERVAL: 0,
          SIM_RESOLUTION: 128,
          DYE_RESOLUTION: 1024,
          DENSITY_DISSIPATION: 2.2,
          VELOCITY_DISSIPATION: 1.0,
          PRESSURE: 0.8,
          PRESSURE_ITERATIONS: 20,
          CURL: 22,
          SPLAT_RADIUS: 0.1,
          SPLAT_FORCE: 5000,
          SPLAT_COUNT: 0,
          SHADING: true,
          COLORFUL: false,
          COLOR_UPDATE_SPEED: 0,
          PAUSED: false,
          BACK_COLOR: { r: 255, g: 255, b: 255 },
          TRANSPARENT: false,
          BLOOM: false,
          SUNRAYS: false,
          SPLAT_COLOR: splatColor,
        });

        // Forward window mousemove → canvas mousemove.
        //
        // Why: the wrapper's internal handler is attached to the canvas
        // itself with a 500ms setTimeout delay AND only fires when the
        // pointer is directly over the canvas. In a Hero with overlay
        // text/buttons that have `pointer-events:auto`, those elements
        // swallow the mousemove and the simulation goes silent — that's
        // why it feels laggy and "wakes up" only over empty space.
        //
        // We dispatch a synthetic MouseEvent at the canvas with the right
        // offsetX/offsetY so the wrapper's handler runs as if the cursor
        // were always directly on the canvas. This also bypasses the
        // 500ms init delay.
        const forwardMouse = (e: MouseEvent) => {
          pickNextColor();
          const rect = canvas.getBoundingClientRect();
          const ev = new MouseEvent('mousemove', {
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: false,
          });
          // The wrapper reads e.offsetX / e.offsetY. These are derived
          // from clientX/Y minus the target's bounding rect, but since we
          // dispatch at the canvas, offset is auto-computed by the browser.
          // We just need clientX/Y to land inside canvas bounds — the
          // canvas covers the viewport (inset-0) so they always do.
          void rect;
          canvas.dispatchEvent(ev);
        };

        const forwardTouch = (e: TouchEvent) => {
          pickNextColor();
          if (e.touches.length === 0) return;
          // Touch events are forwarded by re-dispatching on the canvas.
          // Most browsers don't allow constructing TouchEvent directly,
          // so we synthesise a MouseEvent equivalent — the wrapper has
          // separate touch handlers but mouse path is enough for visual
          // continuity on hybrid devices.
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
          // Pavel's loop holds a rAF we can't cancel from outside, so we
          // lose the WebGL context — that halts rendering and frees GPU
          // memory when the user navigates away (Chrome caps at ~16
          // contexts; without this you'd hit the limit after a few page
          // changes in a SPA).
          const gl =
            canvas.getContext('webgl2') ?? canvas.getContext('webgl');
          (
            gl as WebGLRenderingContext | null
          )?.getExtension('WEBGL_lose_context')?.loseContext();
        };
      })
      .catch((err) => {
        // Fail silently — Hero still renders, just without the fluid.
        console.warn('[FluidCanvas] webgl-fluid failed to load:', err);
      });

    return () => {
      cancelled = true;
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