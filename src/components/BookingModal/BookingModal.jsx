import { useState, useEffect, useRef } from 'react';
import { X, Calendar, Clock, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import styles from './BookingModal.module.css';

const BookingModal = ({ isOpen, onClose, initialDomain = 'placements' }) => {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    graduationYear: '2027',
    targetDomain: initialDomain,
    slotDate: '2026-06-22',
    slotTime: '17:00'
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success

  useEffect(() => {
    if (isOpen) {
      // Defer state update to next tick to avoid cascading render warning in useEffect
      const timer = setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          targetDomain: initialDomain
        }));
        setStatus('idle');
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialDomain]);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const modal = containerRef.current.querySelector(`.${styles.modal}`);
      const headerElements = containerRef.current.querySelectorAll(`.${styles.header} > *`);
      const inputGroups = containerRef.current.querySelectorAll(`.${styles.inputGroup}`);
      const slotSection = containerRef.current.querySelector(`.${styles.slotSection}`);
      const submitBtn = containerRef.current.querySelector(`.${styles.submitButton}`);

      // Set initial states
      gsap.set(modal, { scale: 0.9, opacity: 0 });
      gsap.set(headerElements, { y: 15, opacity: 0 });
      gsap.set(inputGroups, { y: 15, opacity: 0 });
      if (slotSection) gsap.set(slotSection, { y: 15, opacity: 0 });
      if (submitBtn) gsap.set(submitBtn, { scale: 0.95, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.5 } });

      tl.to(modal, { scale: 1, opacity: 1, duration: 0.4 })
        .to(headerElements, { y: 0, opacity: 1, stagger: 0.08 }, '-=0.1')
        .to(inputGroups, { y: 0, opacity: 1, stagger: 0.06 }, '-=0.2');

      if (slotSection) {
        tl.to(slotSection, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2');
      }
      if (submitBtn) {
        tl.to(submitBtn, { scale: 1, opacity: 1, duration: 0.4 }, '-=0.2');
      }

      // Add scale hover for submit button
      if (submitBtn) {
        submitBtn.addEventListener('mouseenter', () => {
          gsap.to(submitBtn, { scale: 1.02, duration: 0.2, ease: 'power2.out' });
        });
        submitBtn.addEventListener('mouseleave', () => {
          gsap.to(submitBtn, { scale: 1, duration: 0.2, ease: 'power2.out' });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API request
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const domainLabels = {
    placements: 'Placement Preparation',
    projects: 'Live Projects',
    consulting: 'Consulting & Case Competitions',
    pm: 'Product Management',
    finance: 'Finance & Core Careers'
  };

  return (
    <div ref={containerRef} className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {status !== 'success' ? (
          <>
            <div className={styles.header}>
              <span className={styles.badge}>Exclusive Mentorship</span>
              <h2 className={styles.title}>Book a Free Consultation</h2>
              <p className={styles.subtitle}>
                Get a 1-on-1 strategy call with an IIM alumnus to map out your MBA placement prep.
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="e.g. rahul@college.edu"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <div className={styles.phoneInput}>
                    <span className={styles.phoneCode}>+91</span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="college">MBA College</label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    required
                    placeholder="e.g. IIM Ahmedabad / FMS Delhi"
                    value={formData.college}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="targetDomain">Focus Area</label>
                  <select
                    id="targetDomain"
                    name="targetDomain"
                    value={formData.targetDomain}
                    onChange={handleChange}
                  >
                    <option value="placements">General Placement Prep</option>
                    <option value="projects">Live Business Projects</option>
                    <option value="consulting">Consulting & Case Prep</option>
                    <option value="pm">Product Management Track</option>
                    <option value="finance">Finance Career Prep</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="graduationYear">Graduation Year</label>
                  <select
                    id="graduationYear"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                  >
                    <option value="2026">MBA Batch of 2026</option>
                    <option value="2027">MBA Batch of 2027</option>
                    <option value="2028">MBA Batch of 2028 (Incoming)</option>
                  </select>
                </div>
              </div>

              <div className={styles.slotSection}>
                <h3 className={styles.slotHeading}>Select Consultation Time</h3>
                <div className={styles.slotGrid}>
                  <div className={styles.slotSelectGroup}>
                    <Calendar size={16} className={styles.slotIcon} />
                    <input
                      type="date"
                      name="slotDate"
                      required
                      min="2026-06-20"
                      max="2026-06-30"
                      value={formData.slotDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.slotSelectGroup}>
                    <Clock size={16} className={styles.slotIcon} />
                    <select
                      name="slotTime"
                      value={formData.slotTime}
                      onChange={handleChange}
                    >
                      <option value="10:00">10:00 AM - 10:30 AM</option>
                      <option value="11:30">11:30 AM - 12:00 PM</option>
                      <option value="14:00">02:00 PM - 02:30 PM</option>
                      <option value="15:30">03:30 PM - 04:00 PM</option>
                      <option value="17:00">05:00 PM - 05:30 PM</option>
                      <option value="19:00">07:00 PM - 07:30 PM</option>
                      <option value="20:30">08:30 PM - 09:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className={styles.spinner} />
                    Securing your slot...
                  </>
                ) : (
                  <>
                    Confirm Free Strategy Session
                    <ArrowRight size={16} className={styles.btnIcon} />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successState}>
            <div className={styles.successIconWrapper}>
              <CheckCircle size={48} className={styles.successIcon} />
            </div>
            <h2 className={styles.successTitle}>Consultation Confirmed!</h2>
            <p className={styles.successMessage}>
              Hi <strong>{formData.name}</strong>, your 1-on-1 Strategy Session has been scheduled for{' '}
              <strong>{formData.slotDate}</strong> at <strong>{formData.slotTime === '10:00' ? '10:00 AM' : formData.slotTime === '11:30' ? '11:30 AM' : formData.slotTime === '14:00' ? '02:00 PM' : formData.slotTime === '15:30' ? '03:30 PM' : formData.slotTime === '17:00' ? '05:00 PM' : formData.slotTime === '19:00' ? '07:00 PM' : '08:30 PM'}</strong>.
            </p>

            <div className={styles.summaryCard}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>College:</span>
                <span className={styles.summaryValue}>{formData.college}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Topic:</span>
                <span className={styles.summaryValue}>{domainLabels[formData.targetDomain]} Strategy</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Format:</span>
                <span className={styles.summaryValue}>1-on-1 Google Meet (30 mins)</span>
              </div>
            </div>

            <div className={styles.successNextSteps}>
              <h4>Next Steps:</h4>
              <ul>
                <li>Check <strong>{formData.email}</strong> for the Google Meet calendar invite.</li>
                <li>Add a reminder to your phone. Mentors respect punctuality.</li>
                <li>Keep your current CV handy for quick feedback on the call.</li>
              </ul>
            </div>

            <button className={styles.doneButton} onClick={onClose}>
              Done, close window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
