import React, { useRef, useEffect } from 'react';
import { Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './CourseGrid.module.css';

gsap.registerPlugin(ScrollTrigger);

const CourseGrid = ({ onOpenBooking }) => {
  const gridRef = useRef(null);

  const courses = [
    {
      id: 'placement-prep',
      slug: 'placements',
      title: 'Placement Preparation Program',
      duration: '8 Weeks',
      tag: 'Most Popular',
      category: 'Career Prep',
      highlights: [
        'Resume Building',
        'Mock Interviews',
        'Aptitude Training',
        'GD Preparation',
        'HR Interviews',
        'Company Specific Preparation'
      ]
    },
    {
      id: 'live-projects',
      slug: 'projects',
      title: 'Live Projects Program',
      duration: '4-6 Weeks',
      tag: null,
      category: 'Industry Exp',
      highlights: [
        'Real Industry Projects',
        'Business Problem Solving',
        'Industry Certification',
        'Portfolio Building',
        'Mentor Feedback'
      ]
    },
    {
      id: 'case-comp',
      slug: 'consulting',
      title: 'Case Competition Mastery',
      duration: '6 Weeks',
      tag: null,
      category: 'Competition',
      highlights: [
        'Consulting Frameworks',
        'PPT Storytelling',
        'Team Formation',
        'Strategy Sessions',
        'Competition Mentoring'
      ]
    },
    {
      id: 'iim-mentor',
      slug: 'placements',
      title: 'IIM Mentor Program',
      duration: 'Flexible',
      tag: null,
      category: 'Mentorship',
      highlights: [
        'One-on-One Sessions',
        'Career Planning',
        'Industry Insights',
        'Networking Guidance',
        'Leadership Coaching'
      ]
    },
    {
      id: 'consulting-acc',
      slug: 'consulting',
      title: 'Consulting Career Accelerator',
      duration: '10 Weeks',
      tag: null,
      category: 'Consulting',
      highlights: [
        'Case Interviews',
        'Guesstimates',
        'Consulting Frameworks',
        'Resume Reviews',
        'Partner Mock Interviews'
      ]
    },
    {
      id: 'pm-track',
      slug: 'pm',
      title: 'Product Management Career Track',
      duration: '8 Weeks',
      tag: null,
      category: 'Product Management',
      highlights: [
        'Product Thinking',
        'Product Strategy',
        'Product Cases',
        'Roadmap Building',
        'PM Interview Preparation'
      ]
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
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'willChange',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Hover scale effects
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.03, duration: 0.25, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, duration: 0.25, ease: 'power2.out' });
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="programs" className={styles.section}>
      <div className="container">
        <SectionHeader
          title="Programs Designed For Every MBA Journey"
          subtext="Whether you are preparing for internships, placements, consulting roles, product management, marketing, finance, or leadership positions, MBA Partner has a structured program for you."
          badge="Curriculum Catalog"
        />

        <div className={styles.grid} ref={gridRef}>
          {courses.map((course) => (
            <div key={course.id} className={styles.card}>
              {course.tag && <span className={styles.popularBadge}>{course.tag}</span>}

              <div className={styles.cardHeader}>
                <span className={styles.category}>{course.category}</span>
                <div className={styles.duration}>
                  <Calendar size={14} className={styles.icon} />
                  <span>{course.duration}</span>
                </div>
              </div>

              <h3 className={styles.title}>{course.title}</h3>

              <div className={styles.divider} />

              <ul className={styles.highlights}>
                {course.highlights.map((item, idx) => (
                  <li key={idx} className={styles.item}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                className={styles.ctaButton}
                onClick={() => onOpenBooking(course.slug)}
              >
                Inquire &amp; Book Slot
                <ArrowRight size={16} className={styles.btnArrow} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseGrid;
