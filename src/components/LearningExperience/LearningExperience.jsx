import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './LearningExperience.module.css';


const LearningExperience = () => {
  const timelineRef = useRef(null);

  const steps = [
    {
      num: '01',
      title: 'Enroll',
      desc: 'Register and outline your career goals.'
    },
    {
      num: '02',
      title: 'Assessment',
      desc: 'Identify skill gaps & current prep level.'
    },
    {
      num: '03',
      title: 'Mentor Match',
      desc: 'Get paired with an elite IIM, XLRI, or ISB alumnus.'
    },
    {
      num: '04',
      title: 'Career Guidance',
      desc: 'Master CV building & LinkedIn optimization.'
    },
    {
      num: '05',
      title: 'Real Projects',
      desc: 'Solve corporate case studies.'
    },
    {
      num: '06',
      title: 'Mock Prep',
      desc: 'Simulate intensive HR & technical interviews.'
    },
    {
      num: '07',
      title: 'Success',
      desc: 'Join the 98.7% who crack their dream roles.'
    }
  ];

  useEffect(() => {
    if (!timelineRef.current) return;

    const trackLine = timelineRef.current.querySelector(`.${styles.trackLine}`);
    const stepNodes = timelineRef.current.querySelectorAll(`.${styles.stepNode}`);
    if (!stepNodes.length) return;

    const ctx = gsap.context(() => {
      // 1. Timeline grows downward while scrolling
      if (trackLine) {
        gsap.fromTo(trackLine, {
          scaleY: 0,
          transformOrigin: 'top center'
        }, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            end: 'bottom 75%',
            scrub: true
          }
        });
      }

      // 2. Alternating steps, badge scaling, active glow and float hover
      stepNodes.forEach((node, idx) => {
        const isEven = idx % 2 === 0;
        const badge = node.querySelector(`.${styles.numberBadge}`);
        const content = node.querySelector(`.${styles.stepContent}`);

        // Set initial positions
        gsap.set(node, { opacity: 0, x: isEven ? -50 : 50 });
        gsap.set(badge, { scale: 0, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });

        tl.to(node, {
          opacity: 1,
          x: 0,
          duration: 0.65,
          ease: 'power3.out'
        })
        .to(badge, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.8)'
        }, '-=0.45')
        // Active timeline point glows subtly
        .to(badge, {
          boxShadow: '0 0 15px rgba(251, 191, 36, 0.55), 0 0 25px rgba(251, 191, 36, 0.3)',
          duration: 1.0,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });

        // Step card floats when hovered
        if (content) {
          content.addEventListener('mouseenter', () => {
            gsap.to(content, {
              y: -5,
              scale: 1.015,
              duration: 0.25,
              ease: 'power2.out'
            });
          });

          content.addEventListener('mouseleave', () => {
            gsap.to(content, {
              y: 0,
              scale: 1,
              duration: 0.25,
              ease: 'power2.out'
            });
          });
        }
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          title="Your Roadmap to 98.7% Placement Success"
          subtext="We walk with you at every stage, turning academic knowledge into career-ready capabilities with end-to-end placement bootcamps."
          badge="Learning Track"
        />

        <div className={styles.timelineContainer} ref={timelineRef}>
          {/* Main Track Line */}
          <div className={styles.trackLine}></div>

          <div className={styles.stepsGrid}>
            {steps.map((step) => (
              <div key={step.num} className={styles.stepNode}>
                <div className={styles.connectorLine}></div>
                <div className={styles.badgeWrapper}>
                  <div className={styles.numberBadge}>{step.num}</div>
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningExperience;
