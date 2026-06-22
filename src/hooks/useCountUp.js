import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useCountUp – Animates a number from 0 to `end` when the element scrolls into view.
 *
 * @param {number} end       – Target number to count up to
 * @param {number} duration  – Animation duration in seconds (default: 2)
 * @param {string} suffix    – String to append after the number (e.g. '+', '%')
 * @param {string} prefix    – String to prepend before the number (e.g. '$')
 * @param {string} start     – ScrollTrigger start position (default: 'top 80%')
 * @returns {{ ref: React.RefObject, displayValue: string }}
 */
export const useCountUp = ({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  start = 'top 80%',
} = {}) => {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!ref.current) return;

    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: end,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          setDisplayValue(`${prefix}${Math.round(obj.val)}${suffix}`);
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [end]);

  return { ref, displayValue };
};

export default useCountUp;
