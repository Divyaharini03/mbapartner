import { useRef, useEffect } from 'react';
import { Users, Briefcase, Target, Globe } from 'lucide-react';
import gsap from 'gsap';

import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './WhyMBAPartner.module.css';


const WhyMBAPartner = () => {
  const gridRef = useRef(null);

  const features = [
    {
      icon: <Users size={24} className={styles.iconBlue} />,
      title: 'Top B-School Mentors',
      desc: 'Learn directly from elite alumni of IIMs, XLRI, FMS, ISB, and SPJIMR.'
    },
    {
      icon: <Briefcase size={24} className={styles.iconBlue} />,
      title: 'Real Business Exposure',
      desc: 'Work on live corporate projects that add massive weight to your CV.'
    },
    {
      icon: <Target size={24} className={styles.iconBlue} />,
      title: 'End-to-End Bootcamps',
      desc: 'Comprehensive placement bootcamps designed around actual company hiring criteria.'
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
      gsap.set(cards, { opacity: 0, y: 50 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Hover elevations & Independent Icon animations
      cards.forEach((card) => {
        const iconWrapper = card.querySelector(`.${styles.iconWrapper}`);

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -7,
            scale: 1.02,
            boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.05)',
            duration: 0.3,
            ease: 'power2.out'
          });

          if (iconWrapper) {
            gsap.to(iconWrapper, {
              y: -4,
              rotation: 12,
              scale: 1.1,
              duration: 0.3,
              ease: 'back.out(1.5)'
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: 'none',
            duration: 0.3,
            ease: 'power2.out'
          });

          if (iconWrapper) {
            gsap.to(iconWrapper, {
              y: 0,
              rotation: 0,
              scale: 1,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-us" className={styles.section}>
      <div className="container">
        <SectionHeader
          title="Why India's Top MBA Students Choose Us"
          subtext="We bridge the gap between traditional business education and actual industry expectations with our 98.7% placement success rate."
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
