import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Intro.module.css';

// ── Particle Class for Canvas ───────────────────────────────────────────
class Particle {
  constructor(canvas, isTrail = false, startX, startY) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.isTrail = isTrail;
    this.reset(startX, startY);
  }

  reset(startX, startY) {
    this.x = startX !== undefined ? startX : Math.random() * this.canvas.width;
    this.y = startY !== undefined ? startY : Math.random() * this.canvas.height;
    
    if (this.isTrail) {
      // Trail particles orbit/burst outwards from center
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.life = Math.random() * 40 + 20;
      this.maxLife = this.life;
      this.size = Math.random() * 2.5 + 1;
      this.color = Math.random() > 0.4 ? '251, 191, 36' : '37, 99, 235'; // Amber gold or Blue
    } else {
      // Standard floating dust particles
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.4 + 0.2);
      this.size = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.15;
      this.color = Math.random() > 0.4 ? '251, 191, 36' : '37, 99, 235';
      // If initialized without specific coordinates, spread across screen height
      if (startY === undefined) {
        this.y = Math.random() * this.canvas.height;
      } else {
        this.y = startY;
      }
    }
  }

  update() {
    if (this.isTrail) {
      this.x += this.vx;
      this.y += this.vy;
      // Apply friction
      this.vx *= 0.97;
      this.vy *= 0.97;
      this.life--;
      this.alpha = Math.max(0, this.life / this.maxLife);
      return this.life > 0;
    } else {
      this.x += this.vx;
      this.y += this.vy;
      
      // Floating sinusoidal motion
      this.x += Math.sin(this.y * 0.008) * 0.08;
      
      // Wrap around screen
      if (this.y < -10) {
        this.y = this.canvas.height + 10;
        this.x = Math.random() * this.canvas.width;
        this.alpha = Math.random() * 0.4 + 0.15;
      }
      return true;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
    this.ctx.shadowBlur = this.size * 2.5;
    this.ctx.shadowColor = `rgba(${this.color}, 0.5)`;
    this.ctx.fill();
    this.ctx.shadowBlur = 0; // Reset shadow for performance
  }
}

// ── Intro Component ─────────────────────────────────────────────────────
const Intro = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const canvasRef = useRef(null);
  const charWrapperRef = useRef(null);
  const studentRef = useRef(null);
  const professionalRef = useRef(null);
  const ringOuterRef = useRef(null);
  const ringInnerRef = useRef(null);
  const flashRef = useRef(null);
  
  const brandWrapperRef = useRef(null);
  const logoIconRef = useRef(null);
  const logoPath1Ref = useRef(null);
  const logoPath2Ref = useRef(null);
  const logoPath3Ref = useRef(null);
  const logoGlowRef = useRef(null);
  const logoTextRef = useRef(null);
  const textMBARef = useRef(null);
  const textPartnerRef = useRef(null);
  const textDotRef = useRef(null);
  const taglineRef = useRef(null);
  const featuresGridRef = useRef(null);
  const skipBtnRef = useRef(null);

  const [visible, setVisible] = useState(true);
  const trailTriggered = useRef(false);

  useEffect(() => {
    if (!visible) return;

    // ── 1. Canvas Particles Setup ──
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    let trailParticles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize floating background particles once on size
      if (particles.length === 0) {
        for (let i = 0; i < 90; i++) {
          particles.push(new Particle(canvas));
        }
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Spawns explosive trails at center of character container
    const triggerTrails = () => {
      if (trailTriggered.current) return;
      trailTriggered.current = true;
      
      // Determine center of character relative to screen
      const charRect = charWrapperRef.current?.getBoundingClientRect();
      const startX = charRect ? charRect.left + charRect.width / 2 : canvas.width / 2;
      const startY = charRect ? charRect.top + charRect.height / 2 : canvas.height / 2;

      for (let i = 0; i < 75; i++) {
        trailParticles.push(new Particle(canvas, true, startX, startY));
      }
    };

    // Canvas animation loop
    const renderLoop = () => {
      // Clear with low opacity to leave trails
      ctx.fillStyle = 'rgba(5, 8, 22, 0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid overlay effect manually on canvas to align with background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.005)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw background floating particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Update, draw, and filter active trail particles
      trailParticles = trailParticles.filter((p) => {
        const active = p.update();
        if (active) p.draw();
        return active;
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // ── 2. GSAP Timeline Sequencing ──
    const ctxGsap = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;
      
      // Set initial states
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(studentRef.current, { y: 150, opacity: 0, scale: 0.85, filter: 'blur(20px) brightness(0.4)' });
      gsap.set(professionalRef.current, { opacity: 0, scale: 0.85, filter: 'blur(20px) brightness(0.4)' });
      gsap.set(ringOuterRef.current, { opacity: 0, scale: 0.65, rotation: 0 });
      gsap.set(ringInnerRef.current, { opacity: 0, scale: 0.65, rotation: 0 });
      gsap.set(flashRef.current, { opacity: 0, scale: 0.1 });
      
      gsap.set(brandWrapperRef.current, { opacity: 0, scale: 0.95 });
      gsap.set([textMBARef.current, textPartnerRef.current, textDotRef.current], { y: 40, opacity: 0 });
      gsap.set(taglineRef.current, { y: 15, opacity: 0 });
      gsap.set(skipBtnRef.current, { opacity: 0, y: 10 });

      const tl = gsap.timeline({
        onComplete: () => {
          // Final fadeout transition
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 1.0,
            ease: 'power2.inOut',
            onComplete: () => {
              setVisible(false);
              onComplete?.();
            }
          });
        }
      });

      // Scene 1 – Premium Introduction
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, 0);

      tl.to(skipBtnRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, 0.5);

      // Scene 2 – Student Entry
      tl.to(studentRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px) brightness(1)',
        duration: 1.6,
        ease: 'power4.out'
      }, 0.8);

      // Scene 3 – Career Transformation (Hold & Ring Rotate)
      // Start outer and inner ring animations
      tl.to(ringOuterRef.current, {
        opacity: 0.8,
        scale: 1.0,
        rotation: 180,
        duration: 1.5,
        ease: 'power2.out'
      }, 2.4);

      tl.to(ringInnerRef.current, {
        opacity: 0.8,
        scale: 1.0,
        rotation: -180,
        duration: 1.5,
        ease: 'power2.out'
      }, 2.5);

      // Trigger the canvas orbital spark trails callback
      tl.call(triggerTrails, [], 2.8);

      // Morphing effects: student blurs/fades out, professional fades in/unblurs
      tl.to(studentRef.current, {
        opacity: 0,
        scale: 1.1,
        filter: 'blur(15px) brightness(1.5)',
        duration: 1.0,
        ease: 'power3.inOut'
      }, 2.8);

      tl.to(professionalRef.current, {
        opacity: 1,
        scale: 1.0,
        filter: 'blur(0px) brightness(1)',
        duration: 1.0,
        ease: 'power3.inOut'
      }, 2.9);

      // Golden transformation flash
      tl.to(flashRef.current, {
        opacity: 1,
        scale: 1.25,
        duration: 0.25,
        ease: 'power2.out'
      }, 3.1);

      tl.to(flashRef.current, {
        opacity: 0,
        scale: 1.6,
        duration: 0.6,
        ease: 'power3.in'
      }, 3.35);

      // Fade out energy rings
      tl.to([ringOuterRef.current, ringInnerRef.current], {
        opacity: 0,
        scale: 1.2,
        rotation: (i) => i === 0 ? 270 : -270,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 3.6);

      // Scene 4 – Brand Reveal & Layout Shift
      // Define synchronized label for split layout transition
      tl.addLabel('reveal', 4.4);

      if (!isMobile) {
        // Desktop: Professional slides to left, brand container slides to right
        tl.to(charWrapperRef.current, {
          x: -240,
          scale: 0.85,
          duration: 1.4,
          ease: 'power4.inOut'
        }, 'reveal');

        tl.to(brandWrapperRef.current, {
          opacity: 1,
          x: 200,
          scale: 1,
          duration: 1.4,
          ease: 'power4.inOut'
        }, 'reveal');
      } else {
        // Mobile: Professional scales down and moves down/subtly fades to act as backdrop
        tl.to(charWrapperRef.current, {
          y: 150,
          scale: 0.5,
          opacity: 0.18,
          duration: 1.4,
          ease: 'power4.inOut'
        }, 'reveal');

        tl.to(brandWrapperRef.current, {
          opacity: 1,
          y: -10,
          scale: 1,
          duration: 1.4,
          ease: 'power4.inOut'
        }, 'reveal');
      }

      // Draw SVG logo paths
      tl.to([logoPath1Ref.current, logoPath2Ref.current, logoPath3Ref.current], {
        strokeDashoffset: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power2.inOut'
      }, 'reveal+=0.3');

      // Logo glow fade in
      tl.to(logoGlowRef.current, {
        opacity: 1,
        scale: 1.15,
        duration: 0.8,
        ease: 'power2.out'
      }, 'reveal+=0.8');

      // Logo Text reveals
      tl.to([textMBARef.current, textPartnerRef.current, textDotRef.current], {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out'
      }, 'reveal+=0.5');

      // Tagline reveals
      tl.to(taglineRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out'
      }, 'reveal+=0.9');

      // Scene 5 – Feature Reveal
      const badges = featuresGridRef.current?.children;
      if (badges?.length) {
        tl.to(badges, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power3.out'
        }, 'reveal+=1.2');
      }

      // Fade out skip button before final transition
      tl.to(skipBtnRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        ease: 'power2.in'
      }, 'reveal+=2.5');

      // Wait a moment at the end
      tl.to({}, { duration: 1.2 });

    }, overlayRef);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      ctxGsap.revert();
    };
  }, [visible, onComplete]);

  const handleSkip = () => {
    // Kill existing tweens and fade out overlay swiftly
    gsap.killTweensOf(overlayRef.current);
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => {
        setVisible(false);
        onComplete?.();
      }
    });
  };

  if (!visible) return null;

  return (
    <div className={styles.introOverlay} ref={overlayRef}>
      {/* Background canvas for grid and floating dust particles */}
      <canvas className={styles.particleCanvas} ref={canvasRef} />
      
      {/* Cinematic ambient glows */}
      <div className={styles.glowSpotBlue}></div>
      <div className={styles.glowSpotGold}></div>

      {/* Main Content Area */}
      <div className={styles.contentWrapper}>
        {/* Left Area: Student and Professional Characters */}
        <div className={styles.characterWrapper} ref={charWrapperRef}>
          <div className={styles.characterContainer}>
            {/* Student Image */}
            <img 
              src="/intro_student.png" 
              className={styles.studentImg} 
              ref={studentRef} 
              alt="Student" 
            />
            {/* Professional Image */}
            <img 
              src="/intro_professional.png" 
              className={styles.professionalImg} 
              ref={professionalRef} 
              alt="Young Professional" 
            />
            
            {/* Golden & Blue Energy Rings */}
            <div className={styles.energyRingOuter} ref={ringOuterRef}></div>
            <div className={styles.energyRingInner} ref={ringInnerRef}></div>
            
            {/* Transformation Flash */}
            <div className={styles.flashOverlay} ref={flashRef}></div>
          </div>
        </div>
        
        {/* Right Area: Brand Logo, Title, Tagline and Program Features */}
        <div className={styles.brandWrapper} ref={brandWrapperRef}>
          {/* Logo SVG */}
          <div className={styles.logoIcon} ref={logoIconRef}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M12 2L2 7L12 12L22 7L12 2Z" 
                stroke="var(--color-blue)" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                ref={logoPath1Ref}
              />
              <path 
                d="M2 17L12 22L22 17" 
                stroke="var(--color-blue)" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                ref={logoPath2Ref}
              />
              <path 
                d="M2 12L12 17L22 12" 
                stroke="var(--color-blue)" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                ref={logoPath3Ref}
              />
            </svg>
            <div className={styles.logoGlow} ref={logoGlowRef}></div>
          </div>
          
          {/* Brand Title */}
          <h1 className={styles.logoText} ref={logoTextRef}>
            <span className={styles.textMBA} ref={textMBARef}>MBA</span>
            <span className={styles.textPartner} ref={textPartnerRef}>Partner</span>
            <span className={styles.textDot} ref={textDotRef}>.</span>
          </h1>
          
          {/* Tagline */}
          <p className={styles.tagline} ref={taglineRef}>
            Empowering Your MBA Journey
          </p>
          
          {/* 6 Features Badges */}
          <div className={styles.featuresGrid} ref={featuresGridRef}>
            <div className={styles.featureBadge}>
              <span className={styles.badgeIcon}>✦</span>
              <span>Industry Mentorship</span>
            </div>
            <div className={styles.featureBadge}>
              <span className={styles.badgeIcon}>✦</span>
              <span>Placement Bootcamps</span>
            </div>
            <div className={styles.featureBadge}>
              <span className={styles.badgeIcon}>✦</span>
              <span>Live Projects</span>
            </div>
            <div className={styles.featureBadge}>
              <span className={styles.badgeIcon}>✦</span>
              <span>Case Competitions</span>
            </div>
            <div className={styles.featureBadge}>
              <span className={styles.badgeIcon}>✦</span>
              <span>Mock Interviews</span>
            </div>
            <div className={styles.featureBadge}>
              <span className={styles.badgeIcon}>✦</span>
              <span>Career Acceleration</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Skip Intro Button */}
      <button className={styles.skipBtn} onClick={handleSkip} ref={skipBtnRef}>
        Skip Intro
      </button>
    </div>
  );
};

export default Intro;
