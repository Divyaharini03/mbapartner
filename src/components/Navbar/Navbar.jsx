import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import styles from './Navbar.module.css';

const Navbar = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 960;
      
      const logo = navRef.current.querySelector(`.${styles.logo}`);
      const links = navRef.current.querySelectorAll(`.${styles.link}`);
      const cta = navRef.current.querySelector(`.${styles.ctaButton}`);
      const mobileToggle = navRef.current.querySelector(`.${styles.mobileMenuToggle}`);

      // Set initial positions
      gsap.set(navRef.current, { y: -20, opacity: 0 });
      gsap.set(logo, { scale: 0.95, opacity: 0 });
      
      if (!isMobile) {
        gsap.set(links, { y: -10, opacity: 0 });
        gsap.set(cta, { y: 12, opacity: 0 });
      } else {
        gsap.set(mobileToggle, { scale: 0.85, opacity: 0 });
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(navRef.current, { y: 0, opacity: 1, duration: 0.5 })
        .to(logo, { scale: 1, opacity: 1, duration: 0.5 }, '-=0.2');

      if (!isMobile) {
        tl.to(links, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 }, '-=0.2')
          .to(cta, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2');
      } else {
        tl.to(mobileToggle, { scale: 1, opacity: 1, duration: 0.4 }, '-=0.2');
      }

      // Magnetic Button Hover Effect
      if (cta) {
        const onMouseMove = (e) => {
          const rect = cta.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(cta, {
            x: x * 0.35,
            y: y * 0.35,
            duration: 0.3,
            ease: 'power2.out'
          });
        };

        const onMouseLeave = () => {
          gsap.to(cta, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: 'elastic.out(1, 0.3)'
          });
        };

        cta.addEventListener('mousemove', onMouseMove);
        cta.addEventListener('mouseleave', onMouseLeave);
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav ref={navRef} className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.navContainer} container`}>
        {/* Logo */}
        <a href="/" className={styles.logo} onClick={closeMenu}>
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
        </a>

        {/* Desktop Menu */}
        <div className={styles.desktopNav}>
          <div className={styles.navLinks}>
            <a href="#programs" className={styles.link}>Offerings</a>
            <a href="#programs" className={styles.link}>Courses</a>
            <a href="#why-us" className={styles.link}>Mentors</a>
            <a href="#outcomes" className={styles.link}>Resources</a>
            <a href="#outcomes" className={styles.link}>Placements</a>
          </div>
          <button className={styles.ctaButton} onClick={onOpenBooking}>
            Book a Free Consultation
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuToggle} 
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : ''}`}>
        <div className={styles.mobileLinks}>
          <a href="#programs" className={styles.mobileLink} onClick={closeMenu}>Offerings</a>
          <a href="#programs" className={styles.mobileLink} onClick={closeMenu}>Courses</a>
          <a href="#why-us" className={styles.mobileLink} onClick={closeMenu}>Mentors</a>
          <a href="#outcomes" className={styles.mobileLink} onClick={closeMenu}>Resources</a>
          <a href="#outcomes" className={styles.mobileLink} onClick={closeMenu}>Placements</a>
          <button 
            className={styles.mobileCtaButton} 
            onClick={() => {
              closeMenu();
              onOpenBooking();
            }}
          >
            Book a Free Consultation
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
