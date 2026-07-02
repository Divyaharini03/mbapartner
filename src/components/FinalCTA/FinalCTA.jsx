import { useRef, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import styles from './FinalCTA.module.css';


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

      gsap.set(targets, { opacity: 0, y: 40 });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Magnetic hover effects for CTA buttons
      const btns = btnGroup?.querySelectorAll('button, a');
      if (btns?.length) {
        btns.forEach((btn) => {
          const onMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, {
              x: x * 0.32,
              y: y * 0.32,
              duration: 0.25,
              ease: 'power2.out',
            });
          };

          const onMouseLeave = () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.35,
              ease: 'elastic.out(1, 0.3)',
            });
          };

          btn.addEventListener('mousemove', onMouseMove);
          btn.addEventListener('mouseleave', onMouseLeave);
        });
      }
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.containerBox}>
          <div className={styles.content} ref={contentRef}>
            <span className={styles.badge}>Admissions & Strategy</span>
            <h2 className={styles.title}>Join India's Most Elite MBA Placement Platform</h2>
            <p className={styles.subheading}>
              Become part of our 5000+ student network. Join our exclusive WhatsApp and Telegram communities and start accelerating your career today.
            </p>
            <div className={styles.btnGroup}>
              <button onClick={onOpenBooking} className={styles.primaryBtn}>
                Book Free Consultation
                <Calendar size={18} className={styles.icon} />
              </button>
              <a href="#programs" className={styles.secondaryBtn}>
                Explore Placement Bootcamps
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
