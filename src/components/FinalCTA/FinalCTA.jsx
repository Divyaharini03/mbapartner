import React, { useRef, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FinalCTA.module.css';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = ({ onOpenBooking }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const badge = contentRef.current.querySelector(`.${styles.badge}`);
      const title = contentRef.current.querySelector(`.${styles.title}`);
      const subheading = contentRef.current.querySelector(`.${styles.subheading}`);
      const btnGroup = contentRef.current.querySelector(`.${styles.btnGroup}`);

      const targets = [badge, title, subheading, btnGroup].filter(Boolean);

      gsap.set(targets, { opacity: 0, y: 40, willChange: 'transform, opacity' });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'willChange',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.containerBox}>
          <div className={styles.content} ref={contentRef}>
            <span className={styles.badge}>Admissions & Strategy</span>
            <h2 className={styles.title}>Ready To Build Your MBA Career Roadmap?</h2>
            <p className={styles.subheading}>
              Join thousands of MBA students who are preparing smarter, networking better, and achieving stronger placement outcomes.
            </p>
            <div className={styles.btnGroup}>
              <button onClick={onOpenBooking} className={styles.primaryBtn}>
                Book Free Consultation
                <Calendar size={18} className={styles.icon} />
              </button>
              <a href="#programs" className={styles.secondaryBtn}>
                Explore Programs
                <ArrowRight size={18} className={styles.icon} />
              </a>
            </div>
          </div>
          
          {/* Subtle decoration to show a professional grid texture instead of floating gradient dots */}
          <div className={styles.gridOverlay}></div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
