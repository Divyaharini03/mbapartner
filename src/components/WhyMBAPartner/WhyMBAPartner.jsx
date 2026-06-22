import React, { useRef, useEffect } from 'react';
import { Users, Briefcase, Target, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './WhyMBAPartner.module.css';

gsap.registerPlugin(ScrollTrigger);

const WhyMBAPartner = () => {
  const gridRef = useRef(null);

  const features = [
    {
      icon: <Users size={24} className={styles.iconBlue} />,
      title: 'Industry Mentors',
      desc: 'Learn from IIM graduates, consultants, recruiters, and industry leaders.'
    },
    {
      icon: <Briefcase size={24} className={styles.iconBlue} />,
      title: 'Real Business Exposure',
      desc: 'Work on live corporate projects that add massive weight to your CV.'
    },
    {
      icon: <Target size={24} className={styles.iconBlue} />,
      title: 'Placement Focused',
      desc: 'Syllabi and mock drills designed around actual company hiring criteria.'
    },
    {
      icon: <Globe size={24} className={styles.iconBlue} />,
      title: 'Strong Community',
      desc: 'Network with hundreds of ambitious MBA peers across elite Indian B-schools.'
    }
  ];

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(`.${styles.card}`);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 50, willChange: 'transform, opacity' });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'willChange',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Hover scale effects
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.03, duration: 0.25, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, duration: 0.25, ease: 'power2.out' });
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-us" className={styles.section}>
      <div className="container">
        <SectionHeader
          title="Why Choose MBA Partner?"
          subtext="We bridge the gap between traditional business education and actual industry expectations."
          badge="Our Pillars"
        />

        <div className={styles.grid} ref={gridRef}>
          {features.map((feat, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.iconWrapper}>{feat.icon}</div>
              <h3 className={styles.cardTitle}>{feat.title}</h3>
              <p className={styles.cardDesc}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMBAPartner;
