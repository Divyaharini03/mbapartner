import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './LearningExperience.module.css';

gsap.registerPlugin(ScrollTrigger);

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
      desc: 'Get paired with a top IIM alumnus.'
    },
    {
      num: '04',
      title: 'Live Sessions',
      desc: 'Master industry framework & templates.'
    },
    {
      num: '05',
      title: 'Real Projects',
      desc: 'Solve corporate case studies.'
    },
    {
      num: '06',
      title: 'Mock Prep',
      desc: 'Simulate intensive interviews.'
    },
    {
      num: '07',
      title: 'Success',
      desc: 'Crack placement & land your role.'
    }
  ];

  useEffect(() => {
    if (!timelineRef.current) return;

    const stepNodes = timelineRef.current.querySelectorAll(`.${styles.stepNode}`);
    if (!stepNodes.length) return;

    const ctx = gsap.context(() => {
      gsap.set(stepNodes, { opacity: 0, y: 40, willChange: 'transform, opacity' });

      gsap.to(stepNodes, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'willChange',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          title="Your Roadmap To Placement Success"
          subtext="We walk with you at every stage, turning academic knowledge into career-ready capabilities."
          badge="Learning Track"
        />

        <div className={styles.timelineContainer} ref={timelineRef}>
          {/* Main Track Line */}
          <div className={styles.trackLine}></div>

          <div className={styles.stepsGrid}>
            {steps.map((step, idx) => (
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
