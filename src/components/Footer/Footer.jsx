import { useRef, useEffect } from 'react';
import { Mail } from 'lucide-react';
import gsap from 'gsap';
import styles from './Footer.module.css';

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Fade up footer on scroll
      gsap.fromTo(footerRef.current, {
        opacity: 0,
        y: 35
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none'
        }
      });

      // 2. Social icons bounce elastic on hover
      const socialLinks = footerRef.current.querySelectorAll(`.${styles.socialLink}`);
      if (socialLinks.length) {
        socialLinks.forEach((link) => {
          link.addEventListener('mouseenter', () => {
            gsap.to(link, {
              y: -5,
              scale: 1.15,
              duration: 0.4,
              ease: 'elastic.out(1.2, 0.4)'
            });
          });

          link.addEventListener('mouseleave', () => {
            gsap.to(link, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--color-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="var(--color-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="var(--color-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={styles.logoText}>
                MBA<span className={styles.logoPartner}>Partner</span><span className={styles.logoDot}>.</span>
              </span>
            </div>
            <p className={styles.tagline}>
              Empowering India's next generation of business leaders with industry-backed placement bootcamps and mentorship from IIM, XLRI, and FMS alumni.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              <li><a href="#programs">Programs</a></li>
              <li><a href="#why-us">Mentors</a></li>
              <li><a href="#outcomes">Resources</a></li>
              <li><a href="#outcomes">Placements</a></li>
            </ul>
          </div>

          {/* Socials & Contact Column */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Contact & Connect</h4>
            <div className={styles.contactEmail}>
              <Mail size={16} className={styles.mailIcon} />
              <a href="mailto:admissions@mbapartner.in">admissions@mbapartner.in</a>
            </div>
            <div className={styles.socialsGroup}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} MBA Partner (mbapartner.in). All rights reserved.
          </p>
          <p className={styles.credit}>
            Designed for premium MBA career outcomes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
