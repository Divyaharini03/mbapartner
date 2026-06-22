import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './StudentOutcomes.module.css';

gsap.registerPlugin(ScrollTrigger);

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

  const stats = [
    {
      value: '5000+',
      label: 'MBA Community',
      sub: 'Connected across B-schools'
    },
    {
      value: '2000+',
      label: 'Students Mentored',
      sub: 'Personalized 1-on-1 strategy'
    },
    {
      value: '700+',
      label: 'Student Reviews',
      sub: 'Consistent 4.8/5 rating'
    },
    {
      value: '95%',
      label: 'Placement Readiness',
      sub: 'Verified by hiring partners'
    }
  ];

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      const children = headerRef.current.children;
      gsap.set(children, { opacity: 0, y: 40, willChange: 'transform, opacity' });

      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'willChange',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="outcomes" className={styles.section} ref={sectionRef}>
      <div className={`${styles.container} container`}>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.badge}>Impact in Numbers</span>
          <h2 className={styles.title}>Proven Outcomes For Ambitious Minds</h2>
          <p className={styles.subtitle}>
            Our candidates secure placement advantages through structured mentoring and real-world exposure.
          </p>
        </div>

        <div className={styles.grid}>
          {stats.map((stat, idx) => (
            <CountUpStat key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentOutcomes;
