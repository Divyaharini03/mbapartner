import { useRef, useEffect } from 'react';
import { Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './CourseGrid.module.css';


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
        'CV & Resume Building',
        'Mock HR Interviews',
        'Aptitude & GD Preparation',
        'LinkedIn Optimization',
        'Industry Networking',
        'Company Specific Preparation'
      ]
    },
    {
      id: 'live-projects',
      slug: 'projects',
      title: 'Live Projects & Internships',
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
      title: '1-on-1 Industry Mentorship',
      duration: 'Flexible',
      tag: null,
      category: 'Mentorship',
      highlights: [
        'One-on-One Sessions with IIM/XLRI Alumni',
        'Personalized Career Guidance',
        'Industry Insights & Networking',
        'Resume & LinkedIn Optimization',
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
      gsap.set(cards, { opacity: 0, y: 55 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Hover micro-interactions & Magnetic button effect
      cards.forEach((card) => {
        const ctaBtn = card.querySelector(`.${styles.ctaButton}`);
        const checkIcons = card.querySelectorAll(`.${styles.checkIcon}`);
        const durationBadge = card.querySelector(`.${styles.duration}`);

        card.addEventListener('mouseenter', () => {
          // Elevate card + add soft glow shadow
          gsap.to(card, {
            y: -8,
            scale: 1.015,
            boxShadow: '0 20px 30px -10px rgba(37, 99, 235, 0.12), 0 10px 15px -5px rgba(37, 99, 235, 0.08)',
            duration: 0.35,
            ease: 'power2.out',
          });
          // Rotate checkmark icons slightly
          if (checkIcons.length) {
            gsap.to(checkIcons, { rotation: 15, scale: 1.1, duration: 0.3, stagger: 0.04, ease: 'power2.out' });
          }
          // Zoom duration badge slightly
          if (durationBadge) {
            gsap.to(durationBadge, { scale: 1.06, duration: 0.3, ease: 'power2.out' });
          }
        });

        card.addEventListener('mouseleave', () => {
          // Reset card
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.05)',
            duration: 0.35,
            ease: 'power2.out',
          });
          // Reset checkmarks
          if (checkIcons.length) {
            gsap.to(checkIcons, { rotation: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
          }
          // Reset duration badge
          if (durationBadge) {
            gsap.to(durationBadge, { scale: 1, duration: 0.3, ease: 'power2.out' });
          }
        });

        // Magnetic hover effect on button
        if (ctaBtn) {
          const onMouseMove = (e) => {
            const rect = ctaBtn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(ctaBtn, {
              x: x * 0.3,
              y: y * 0.3,
              duration: 0.25,
              ease: 'power2.out',
            });
          };

          const onMouseLeave = () => {
            gsap.to(ctaBtn, {
              x: 0,
              y: 0,
              duration: 0.35,
              ease: 'elastic.out(1, 0.3)',
            });
          };

          ctaBtn.addEventListener('mousemove', onMouseMove);
          ctaBtn.addEventListener('mouseleave', onMouseLeave);
        }
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="programs" className={styles.section}>
      <div className="container">
        <SectionHeader
          title="Comprehensive Services For Every MBA Journey"
          subtext="From Placement Bootcamps and CV & Resume Building to Live Projects and LinkedIn Optimization, we offer end-to-end career guidance."
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
