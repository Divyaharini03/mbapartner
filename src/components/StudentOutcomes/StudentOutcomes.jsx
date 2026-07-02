import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './StudentOutcomes.module.css';

/**
 * CountUpStat – Internal component that animates a single stat value.
 */
const CountUpStat = ({ value, label, sub }) => {
  const valRef = useRef(null);

  // Parse the numeric part and suffix (e.g. "5000+" → 5000, "+")
  const numericMatch = value.match(/^(\d+)(.*)$/);
  const endNum = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = numericMatch ? numericMatch[2] : value;

  useEffect(() => {
    if (!valRef.current) return;

    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: endNum,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: valRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (valRef.current) {
            valRef.current.textContent = `${Math.round(obj.val).toLocaleString()}${suffix}`;
          }
        },
      });
    }, valRef);

    return () => ctx.revert();
  }, [endNum, suffix]);

  return (
    <div className={styles.statCard}>
      <div className={styles.value} ref={valRef}>
        0{suffix}
      </div>
      <div className={styles.label}>{label}</div>
      <div className={styles.subText}>{sub}</div>
    </div>
  );
};

const StudentOutcomes = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const stats = [
    {
      value: '5000+',
      label: 'MBA Student Network',
      sub: 'Across IIMs, IITs, MDI, etc.'
    },
    {
      value: '200+',
      label: 'Industry Mentors',
      sub: 'Guidance from top executives'
    },
    {
      value: '700+',
      label: 'Verified Student Reviews',
      sub: 'Consistent 4.9/5 rating'
    },
    {
      value: '98.7%',
      label: 'Placement Success',
      sub: 'Secured elite corporate roles'
    }
  ];

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      const children = headerRef.current.children;
      gsap.set(children, { opacity: 0, y: 40 });

      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(`.${styles.statCard}`);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 45 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Hover elevate & golden glow box shadow
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -6,
            scale: 1.02,
            boxShadow: '0 20px 25px -5px rgba(251, 191, 36, 0.12), 0 8px 10px -6px rgba(251, 191, 36, 0.08)',
            duration: 0.25,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: 'none',
            duration: 0.25,
            ease: 'power2.out',
          });
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="outcomes" className={styles.section} ref={sectionRef}>
      <div className={`${styles.container} container`}>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.badge}>Impact in Numbers</span>
          <h2 className={styles.title}>Proven Outcomes With 98.7% Placement Success</h2>
          <p className={styles.subtitle}>
            Our candidates secure placement advantages through structured mentoring, CV & Resume building, and real-world exposure.
          </p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {stats.map((stat, idx) => (
            <CountUpStat key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentOutcomes;
