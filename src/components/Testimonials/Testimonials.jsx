import { useRef, useEffect } from 'react';
import gsap from 'gsap';

import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './Testimonials.module.css';


const Testimonials = () => {
  const gridRef = useRef(null);

  const testimonials = [
    {
      photo: '/anish.png',
      name: 'Anish Sharma',
      college: 'FMS Delhi',
      role: 'Management Consultant at McKinsey',
      quote: 'The placement bootcamp completely changed my approach. From consulting frameworks to intense mock interviews with partners, I got exactly the guidance I needed to land my McKinsey offer.'
    },
    {
      photo: '/sneha.png',
      name: 'Sneha Reddy',
      college: 'IIM Bangalore',
      role: 'Product Manager at Microsoft',
      quote: 'Working on the Live Projects gave me real business exposure that I could speak about in my interviews. It bridged the gap between dry classroom theory and actual PM product strategy.'
    },
    {
      photo: '/rohan.png',
      name: 'Rohan Verma',
      college: 'XLRI Jamshedpur',
      role: 'Investment Banking Analyst at Goldman Sachs',
      quote: 'The 1-on-1 career guidance sessions with my IIM mentor were invaluable. They helped me map out my timeline, review my finance guesstimates, and prepare for tough technical interview situations.'
    }
  ];

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(`.${styles.card}`);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 50 });

      let activeIndex = 0;
      let testimonialTimer = null;

      const rotateActiveTestimonial = () => {
        cards.forEach((card, idx) => {
          if (idx === activeIndex) {
            gsap.to(card, {
              scale: 1.03,
              boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.1), 0 8px 10px -6px rgba(37, 99, 235, 0.05)',
              borderColor: 'rgba(37, 99, 235, 0.25)',
              duration: 0.55,
              ease: 'power2.out'
            });
          } else {
            gsap.to(card, {
              scale: 0.97,
              boxShadow: 'none',
              borderColor: 'transparent',
              duration: 0.55,
              ease: 'power2.out'
            });
          }
        });
        activeIndex = (activeIndex + 1) % cards.length;
      };

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          onComplete: () => {
            rotateActiveTestimonial();
            testimonialTimer = setInterval(rotateActiveTestimonial, 4000);
          }
        },
      });

      // Hover overrides and pause/resume timer
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          if (testimonialTimer) {
            clearInterval(testimonialTimer);
            testimonialTimer = null;
          }
          cards.forEach((c) => {
            if (c === card) {
              gsap.to(c, {
                scale: 1.035,
                boxShadow: '0 20px 30px -10px rgba(37, 99, 235, 0.15), 0 10px 15px -5px rgba(37, 99, 235, 0.1)',
                borderColor: 'rgba(37, 99, 235, 0.4)',
                duration: 0.3,
                ease: 'power2.out'
              });
            } else {
              gsap.to(c, {
                scale: 0.965,
                boxShadow: 'none',
                borderColor: 'transparent',
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          });
        });

        card.addEventListener('mouseleave', () => {
          if (!testimonialTimer) {
            testimonialTimer = setInterval(rotateActiveTestimonial, 4000);
          }
        });
      });
    }, gridRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          title="700+ Verified Reviews from India's Top B-Schools"
          subtext="Hear how MBA Partner helped candidates from top business schools crack competitive roles in consulting, PM, and finance with our Placement Bootcamps."
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
