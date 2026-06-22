import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Intro.module.css';

const Intro = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const logoIconRef = useRef(null);
  const glowRingRef = useRef(null);
  const logoTextRef = useRef(null);
  const taglineRef = useRef(null);
  const progressRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!overlayRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit animation
          const exitTl = gsap.timeline({
            onComplete: () => {
              setVisible(false);
              onComplete?.();
            },
          });

          exitTl
            .to(overlayRef.current, {
              clipPath: 'circle(0% at 50% 50%)',
              duration: 0.8,
              ease: 'power3.inOut',
            });
        },
      });

      // Set initial clip-path to full screen
      gsap.set(overlayRef.current, { clipPath: 'circle(150% at 50% 50%)' });

      // 1. Progress bar fills across the bottom
      tl.to(progressRef.current, {
        width: '100%',
        duration: 2.4,
        ease: 'power1.inOut',
      }, 0);

      // 2. Glow ring pulses in
      tl.to(glowRingRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, 0.1);

      tl.fromTo(glowRingRef.current, 
        { scale: 0.8 },
        { scale: 1.1, duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: 1 },
        0.1
      );

      // 3. SVG paths draw in (stroke animation)
      const paths = logoIconRef.current?.querySelectorAll('path');
      if (paths?.length) {
        tl.to(paths, {
          strokeDashoffset: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.inOut',
        }, 0.2);
      }

      // 4. Logo text letters stagger in
      const letters = logoTextRef.current?.querySelectorAll(`.${styles.letter}`);
      if (letters?.length) {
        tl.to(letters, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power3.out',
        }, 0.8);
      }

      // 5. Tagline fades in
      tl.to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, 1.4);

      // 6. Brief hold before exit
      tl.to({}, { duration: 0.5 });
    }, overlayRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!visible) return null;

  // Split text into individual letters for animation
  const renderLetters = (text, className = '') => {
    return text.split('').map((char, i) => (
      <span key={i} className={`${styles.letter} ${className}`}>
        {char}
      </span>
    ));
  };

  return (
    <div className={styles.introOverlay} ref={overlayRef}>
      {/* Logo Icon */}
      <div className={styles.logoIcon} ref={logoIconRef}>
        <div className={styles.glowRing} ref={glowRingRef}></div>
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Logo Text */}
      <div className={styles.logoText} ref={logoTextRef}>
        {renderLetters('MBA')}
        {renderLetters('Partner', styles.logoPartner)}
        {renderLetters('.', styles.logoDot)}
      </div>

      {/* Tagline */}
      <div className={styles.tagline} ref={taglineRef}>
        Industry-Led Career Acceleration
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBar} ref={progressRef}></div>
    </div>
  );
};

export default Intro;
