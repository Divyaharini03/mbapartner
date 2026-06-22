import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
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
