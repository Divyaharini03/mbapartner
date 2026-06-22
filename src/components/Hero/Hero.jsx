import React, { useEffect, useRef } from 'react';
import { ArrowRight, MessageSquare, CheckCircle2, Award, Calendar, Users, Briefcase } from 'lucide-react';
import gsap from 'gsap';

import styles from './Hero.module.css';

const Hero = ({ onOpenBooking }) => {
  const heroContentRef = useRef(null);
  const dashboardRef = useRef(null);

  useEffect(() => {
    if (!heroContentRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state for all animated elements
      const tagline = heroContentRef.current.querySelector(`.${styles.tagline}`);
      const headline = heroContentRef.current.querySelector(`.${styles.headline}`);
      const subheading = heroContentRef.current.querySelector(`.${styles.subheading}`);
      const ctaGroup = heroContentRef.current.querySelector(`.${styles.ctaGroup}`);
      const socialProof = heroContentRef.current.querySelector(`.${styles.socialProof}`);

      const targets = [tagline, headline, subheading, ctaGroup, socialProof].filter(Boolean);

      gsap.set(targets, { opacity: 0, y: 40, willChange: 'transform, opacity' });

      // Staggered reveal timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(tagline, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
        .to(
          headline,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          subheading,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          ctaGroup,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.2'
        )
        .to(
          socialProof,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.2'
        );

      // Dashboard slide-in from the right
      if (dashboardRef.current) {
        gsap.set(dashboardRef.current, { opacity: 0, x: 60, willChange: 'transform, opacity' });
        tl.to(
          dashboardRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          0.5
        );

        // Stagger dashboard cards
        const dbCards = dashboardRef.current.querySelectorAll(`.${styles.dbCard}`);
        if (dbCards.length) {
          gsap.set(dbCards, { opacity: 0, y: 30, scale: 0.96 });
          tl.to(
            dbCards,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
              clearProps: 'willChange',
            },
            0.8
          );
        }
      }
    }, heroContentRef);

    return () => ctx.revert();
  }, []);

  return (
    <header className={styles.heroSection}>
      <div className={`${styles.heroContainer} container`}>
      
        <div className={styles.heroGrid}>
          {/* Left Column - Content */}
          <div className={styles.heroContent} ref={heroContentRef}>
            <div className={styles.tagline}>
              <span className={styles.tagDot}></span>
              Industry-Led MBA Career Accelerator
            </div>
            <h1 className={styles.headline}>
              Accelerate Your MBA Career With <span className={styles.highlightText}>Industry-Led</span> Programs
            </h1>
            <p className={styles.subheading}>
              Bridge the gap between business school academics and elite corporate recruitment. Learn from industry leaders and build verified credentials.
            </p>
            <div className={styles.ctaGroup}>
              <a href="#programs" className={styles.primaryCta}>
                Explore Programs
                <ArrowRight size={18} className={styles.ctaIcon} />
              </a>
              <button onClick={onOpenBooking} className={styles.secondaryCta}>
                Talk To A Mentor
                <MessageSquare size={18} className={styles.ctaIcon} />
              </button>
            </div>
            
            {/* Trusted indicators */}
            <div className={styles.socialProof}>
              <span className={styles.proofText}>Mentors from top firms:</span>
              <div className={styles.firmLogos}>
                <span className={styles.firmTag}>McKinsey</span>
                <span className={styles.firmTag}>Boston Consulting Group</span>
                <span className={styles.firmTag}>Google</span>
                <span className={styles.firmTag}>Goldman Sachs</span>
              </div>
            </div>
          </div>

          {/* Right Column - Premium CSS Dashboard */}
          <div className={styles.heroVisual} aria-hidden="true" ref={dashboardRef}>
            <div className={styles.dashboardContainer}>
              {/* Dashboard Top bar */}
              <div className={styles.dbHeader}>
                <div className={styles.dbDots}>
                  <span className={`${styles.dot} ${styles.red}`}></span>
                  <span className={`${styles.dot} ${styles.yellow}`}></span>
                  <span className={`${styles.dot} ${styles.green}`}></span>
                </div>
                <div className={styles.dbUrl}>student.mbapartner.in/dashboard</div>
                <div className={styles.dbProfile}>
                  <div className={styles.dbAvatarText}>AS</div>
                </div>
              </div>

              {/* Dashboard Content Grid */}
              <div className={styles.dbGrid}>
                {/* 1. Placement Preparation Card */}
                <div className={`${styles.dbCard} ${styles.cardPlacement}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitleGroup}>
                      <Briefcase size={16} className={styles.iconBlue} />
                      <h4>Placement Prep</h4>
                    </div>
                    <span className={styles.cardBadge}>Active</span>
                  </div>
                  <div className={styles.placementContent}>
                    <div className={styles.progressCircle}>
                      <svg width="48" height="48" viewBox="0 0 36 36">
                        <path
                          className={styles.circleBg}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={styles.circle}
                          strokeDasharray="85, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className={styles.progressVal}>85%</div>
                    </div>
                    <div className={styles.checklist}>
                      <div className={styles.checkItem}>
                        <CheckCircle2 size={12} className={styles.checkedIcon} />
                        <span>Resume Reviewed</span>
                      </div>
                      <div className={styles.checkItem}>
                        <CheckCircle2 size={12} className={styles.checkedIcon} />
                        <span>Mock HR Complete</span>
                      </div>
                      <div className={styles.checkItem}>
                        <span className={styles.pendingDot}></span>
                        <span>Case Interview (June 22)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Mentor Sessions Card */}
                <div className={`${styles.dbCard} ${styles.cardMentor}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitleGroup}>
                      <Users size={16} className={styles.iconGold} />
                      <h4>Mentor Session</h4>
                    </div>
                    <span className={`${styles.cardBadge} ${styles.badgeGold}`}>Upcoming</span>
                  </div>
                  <div className={styles.mentorContent}>
                    <div className={styles.mentorAvatarWrapper}>
                      <div className={styles.mentorAvatar}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className={styles.mentorMeta}>
                        <h5>Amit Verma</h5>
                        <p>IIM B Alumnus | Ex-McKinsey</p>
                      </div>
                    </div>
                    <div className={styles.sessionTime}>
                      <Calendar size={12} className={styles.timeIcon} />
                      <span>Today, 5:30 PM (IST)</span>
                    </div>
                    <button className={styles.joinBtn} onClick={onOpenBooking}>Join Room</button>
                  </div>
                </div>

                {/* 3. Live Projects Card */}
                <div className={`${styles.dbCard} ${styles.cardProjects}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitleGroup}>
                      <Briefcase size={16} className={styles.iconBlue} />
                      <h4>Live Projects</h4>
                    </div>
                  </div>
                  <div className={styles.projectContent}>
                    <div className={styles.projectInfo}>
                      <h5>Retail Market Entry</h5>
                      <span className={styles.tagGreen}>In Progress</span>
                    </div>
                    <p className={styles.projectDesc}>
                      Consulting sprint for FMCG client
                    </p>
                    <div className={styles.progressBarWrapper}>
                      <div className={styles.progressBarLabel}>
                        <span>Milestones</span>
                        <span>2 of 3</span>
                      </div>
                      <div className={styles.progressBarTrack}>
                        <div className={styles.progressBarFill} style={{ width: '66%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Case Competitions Card */}
                <div className={`${styles.dbCard} ${styles.cardCase}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitleGroup}>
                      <Award size={16} className={styles.iconGold} />
                      <h4>Case Competitions</h4>
                    </div>
                  </div>
                  <div className={styles.caseContent}>
                    <div className={styles.caseItem}>
                      <div className={styles.caseMeta}>
                        <h5>L'Oreal Brandstorm</h5>
                        <p>Stage: National Semifinals</p>
                      </div>
                      <span className={styles.tagGold}>Active</span>
                    </div>
                    <div className={styles.teamAvatars}>
                      <span className={styles.avatarMini}>R</span>
                      <span className={styles.avatarMini}>S</span>
                      <span className={styles.avatarMini}>A</span>
                      <span className={styles.avatarLabel}>+ 2 members</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
