import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './HorizontalText.module.css';


const HorizontalText = () => {
  const wrapperRef = useRef(null);
  const textRef = useRef(null);

  const phrase = "Designed for ambitious MBA students looking to secure top-tier internships, crack competitive placements, win national case competitions, and build strong industry networks with 98.7% placement success.";
  const words = phrase.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = textRef.current.querySelectorAll(`.${styles.char}`);
      
      const scrollTween = gsap.to(textRef.current, {
        xPercent: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          start: 'top top',
          end: '+=2000px',
          scrub: true,
        }
      });

      chars.forEach((char) => {
        gsap.from(char, {
          yPercent: 'random(-200, 200)',
          rotation: 'random(-20, 20)',
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: 'left 100%',
            end: 'left 30%',
            scrub: 1,
          }
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className={styles.horizontalSection}>
      <div className={styles.container}>
        <h3 ref={textRef} className={styles.horizontalText}>
          {words.map((word, wordIdx) => (
            <span key={wordIdx} className={styles.word}>
              {word.split("").map((char, charIdx) => (
                <span key={charIdx} className={styles.char}>
                  {char}
                </span>
              ))}
              <span className={styles.space}>&nbsp;</span>
            </span>
          ))}
        </h3>
      </div>
    </section>
  );
};

export default HorizontalText;
