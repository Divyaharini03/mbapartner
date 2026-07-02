import { useEffect, useRef } from 'react';
import gsap from 'gsap';




/**
 * useGsapReveal – Reusable hook for scroll-triggered reveal animations.
 *
 * @param {Object} options
 * @param {string}  options.target      – CSS selector for children to animate (default: direct children)
 * @param {number}  options.y           – translateY start offset in px (default: 60)
 * @param {number}  options.x           – translateX start offset in px (default: 0)
 * @param {number}  options.duration    – tween duration in seconds (default: 0.8)
 * @param {number}  options.stagger     – stagger between elements (default: 0.12)
 * @param {string}  options.ease        – GSAP ease (default: 'power3.out')
 * @param {string}  options.start       – ScrollTrigger start position (default: 'top 85%')
 * @param {boolean} options.once        – animate only once (default: true)
 * @param {number}  options.delay       – initial delay in seconds (default: 0)
 * @param {boolean} options.immediate   – skip ScrollTrigger, animate on mount (default: false)
 * @returns {React.RefObject}
 */
export const useGsapReveal = ({
  target,
  y = 60,
  x = 0,
  duration = 0.8,
  stagger = 0.12,
  ease = 'power3.out',
  start = 'top 85%',
  once = true,
  delay = 0,
  immediate = false,
} = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = target
      ? ref.current.querySelectorAll(target)
      : [ref.current];

    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(elements, { opacity: 0, y, x, willChange: 'transform, opacity' });

      const tweenConfig = {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        stagger,
        ease,
        delay,
        clearProps: 'willChange',
      };

      if (immediate) {
        gsap.to(elements, tweenConfig);
      } else {
        gsap.to(elements, {
          ...tweenConfig,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * useGsapHoverScale – Adds a subtle hover scale effect via GSAP.
 *
 * @param {number} scale   – target scale on hover (default: 1.03)
 * @param {number} duration – tween duration (default: 0.25)
 * @returns {{ onMouseEnter: Function, onMouseLeave: Function, ref: React.RefObject }}
 */
export const useGsapHoverScale = (scale = 1.03, duration = 0.25) => {
  const ref = useRef(null);

  const onMouseEnter = () => {
    if (ref.current) {
      gsap.to(ref.current, { scale, duration, ease: 'power2.out' });
    }
  };

  const onMouseLeave = () => {
    if (ref.current) {
      gsap.to(ref.current, { scale: 1, duration, ease: 'power2.out' });
    }
  };

  return { ref, onMouseEnter, onMouseLeave };
};

export default useGsapReveal;
