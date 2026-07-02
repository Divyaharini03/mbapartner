import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './SectionHeader.module.css';


const SectionHeader = ({ title, subtext, align = 'center', badge }) => {
  const containerClass = `${styles.headerContainer} ${styles[align]}`;
  const headerRef = useRef(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      const children = headerRef.current.children;
      gsap.set(children, { opacity: 0, y: 30, willChange: 'transform, opacity' });

      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'willChange',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={containerClass} ref={headerRef}>
      {badge && <span className={styles.badge}>{badge}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtext && <p className={styles.subtext}>{subtext}</p>}
    </div>
  );
};

export default SectionHeader;
