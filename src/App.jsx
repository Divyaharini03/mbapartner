import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import HorizontalText from './components/HorizontalText/HorizontalText';
import CourseGrid from './components/CourseGrid/CourseGrid';
import LearningExperience from './components/LearningExperience/LearningExperience';
import WhyMBAPartner from './components/WhyMBAPartner/WhyMBAPartner';
import StudentOutcomes from './components/StudentOutcomes/StudentOutcomes';
import Testimonials from './components/Testimonials/Testimonials';
import FinalCTA from './components/FinalCTA/FinalCTA';
import Footer from './components/Footer/Footer';
import BookingModal from './components/BookingModal/BookingModal';
import Intro from './components/Intro/Intro';

function App() {
  const [introComplete, setIntroComplete] = useState(() => {
    // Check if it's a new browser session
    const isNewSession = !sessionStorage.getItem('mba_session_active');
    if (isNewSession) {
      sessionStorage.setItem('mba_session_active', 'true');
      localStorage.removeItem('mba_intro_played');
    }
    
    const hasPlayed = localStorage.getItem('mba_intro_played') === 'true';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    return hasPlayed || prefersReducedMotion;
  });
  
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDomain, setBookingDomain] = useState('placements');

  // Lock scroll during intro
  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [introComplete]);

  const handleOpenBooking = (domain = 'placements') => {
    setBookingDomain(domain);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <>
      {!introComplete && (
        <Intro 
          onComplete={() => {
            localStorage.setItem('mba_intro_played', 'true');
            setIntroComplete(true);
          }} 
        />
      )}
      <Navbar onOpenBooking={() => handleOpenBooking('placements')} />
      <main>
        <Hero onOpenBooking={() => handleOpenBooking('placements')} />
        <HorizontalText />
        <CourseGrid onOpenBooking={handleOpenBooking} />
        <LearningExperience />
        <WhyMBAPartner />
        <StudentOutcomes />
        <Testimonials />
        <FinalCTA onOpenBooking={() => handleOpenBooking('placements')} />
      </main>
      <Footer />
      
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={handleCloseBooking} 
        initialDomain={bookingDomain} 
      />
    </>
  );
}

export default App;
