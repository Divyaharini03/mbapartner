/**
 * gsap.js – Centralized GSAP configuration.
 *
 * Import this module ONCE at the application entry point (main.jsx) to
 * register all plugins globally. Individual components and hooks should
 * import `gsap` directly from 'gsap' and never call registerPlugin
 * themselves.
 *
 * Adding a new plugin? Register it here and it will be available
 * everywhere without any per-component setup.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ── Plugin Registration ─────────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ── Global Defaults ─────────────────────────────────────────────────────
// These can be overridden per-tween but provide a consistent baseline.
gsap.defaults({
  ease: 'power3.out',
  duration: 0.7,
});

// ── ScrollTrigger Defaults ──────────────────────────────────────────────
ScrollTrigger.defaults({
  toggleActions: 'play none none none', // play once on enter
  start: 'top 85%',
});

// Re-export for convenience so consumers can do:
//   import { gsap, ScrollTrigger } from '@/lib/gsap';
// instead of two separate imports.
export { gsap, ScrollTrigger };
export default gsap;
