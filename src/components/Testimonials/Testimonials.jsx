import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './Testimonials.module.css';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const gridRef = useRef(null);

  const testimonials = [
    {
      photo: '/anish.png',
      name: 'Anish Sharma',
      college: 'FMS Delhi',
      role: 'Management Consultant at McKinsey',
      quote: 'The placement prep program completely changed my approach. From consulting frameworks to intense mock interviews with partners, I got exactly the guidance I needed to land my McKinsey offer.'
    },
    {
      photo: '/sneha.png',
      name: 'Sneha Reddy',
      college: 'IIM Bangalore',
      role: 'Product Manager at Microsoft',
      quote: 'Working on the Live Projects Program gave me real business exposure that I could speak about in my interviews. It bridged the gap between dry classroom theory and actual PM product strategy.'
    },
    {
      photo: '/rohan.png',
      name: 'Rohan Verma',
      college: 'XLRI Jamshedpur',
      role: 'Investment Banking Analyst at Goldman Sachs',
      quote: 'The 1-on-1 sessions with my IIM mentor were invaluable. They helped me map out my timeline, review my finance guesstimates, and prepare for tough technical interview situations.'
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
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'willChange',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Hover scale
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.02, duration: 0.25, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, duration: 0.25, ease: 'power2.out' });
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          title="Student Outcomes That Speak For Themselves"
          subtext="Hear how MBA Partner helped candidates from top business schools crack competitive roles in consulting, PM, and finance."
          badge="Success Stories"
        />

        <div className={styles.grid} ref={gridRef}>
          {testimonials.map((t, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.quoteMark}>"</div>
              <p className={styles.quote}>{t.quote}</p>
              
              <div className={styles.profile}>
                <img src={t.photo} alt={t.name} className={styles.photo} />
                <div className={styles.meta}>
                  <h4 className={styles.name}>{t.name}</h4>
                  <p className={styles.college}>{t.college}</p>
                  <p className={styles.role}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
