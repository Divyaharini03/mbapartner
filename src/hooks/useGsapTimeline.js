import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * useGsapTimeline – Creates a managed GSAP timeline scoped to a container ref.
 *
 * The hook returns a container ref and a stable getter for the timeline.
 * The timeline is lazily created on first access inside your useEffect and
 * is automatically killed + reverted when the component unmounts.
 *
 * @param {Object}  options
 * @param {Object}  options.timelineVars  – gsap.timeline() vars (defaults, scrollTrigger, etc.)
 * @param {boolean} options.paused        – start the timeline paused (default: false)
 * @returns {{ scopeRef: React.RefObject, getTimeline: () => gsap.core.Timeline }}
 *
 * @example
 * const { scopeRef, getTimeline } = useGsapTimeline();
 *
 * useEffect(() => {
 *   const tl = getTimeline();
 *   tl.from('.card', { opacity: 0, y: 40, stagger: 0.1 });
 * }, []);
 *
 * return <div ref={scopeRef}>…</div>;
 */
export const useGsapTimeline = ({
  timelineVars = {},
  paused = false,
} = {}) => {
  const scopeRef = useRef(null);
  const tlRef = useRef(null);
  const ctxRef = useRef(null);

  // Stable getter – always returns the same timeline instance
  const getTimeline = () => {
    if (!tlRef.current) {
      tlRef.current = gsap.timeline({ paused, ...timelineVars });
    }
    return tlRef.current;
  };

  useEffect(() => {
    if (!scopeRef.current) return;

    // Create a GSAP context scoped to the container for safe cleanup
    ctxRef.current = gsap.context(() => {}, scopeRef);

    return () => {
      // Kill the timeline and revert all GSAP mutations inside the scope
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, []);

  return { scopeRef, getTimeline };
};

export default useGsapTimeline;
