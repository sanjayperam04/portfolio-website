import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';
import ContactForm from './ContactForm';
import profileImage from './assets/profile.jpg';
import photo1 from './assets/photo1.jpg';
import photo2 from './assets/photo2.jpg';
import photo3 from './assets/photo3.jpg';
import menuBg from './assets/menu-bg.jpg';

const aboutItems = [
  'who I am',
  'tools I like',
  'my interests',
  'what drives me'
];

function About() {
  const navigate = useNavigate();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);

  const handleProjectsClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate('/', { state: { scrollTo: 'projects' } });
  };

  // Typing animation effect
  useEffect(() => {
    const currentItem = aboutItems[currentItemIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentItem.length) {
        setDisplayText(currentItem.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentItem.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentItem.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentItemIndex((currentItemIndex + 1) % aboutItems.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentItemIndex]);

  return (
    <div className="about-page">
      {/* Menu Background */}
      <div className={`menu-background ${menuOpen ? 'active' : ''}`} style={{ backgroundImage: `url(${menuBg})` }}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          <span className="close-icon">×</span> Close
        </button>
        <nav className="menu-nav">
          <a href="/" className="menu-link">Home</a>
          <a href="/#projects" className="menu-link" onClick={handleProjectsClick}>Projects</a>
          <a href="/experience" className="menu-link">Experience</a>
          <a href="/about" className="menu-link">About</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`about-content ${menuOpen ? 'menu-active' : ''}`}>
        <header className="header">
          <button className="menu-btn" onClick={() => setMenuOpen(true)}>
            <span className="menu-icon">≡</span> Menu
          </button>
          <button className="contact-btn" onClick={() => setContactFormOpen(true)}>Contact</button>
        </header>

        {/* Contact Form Modal */}
        <ContactForm isOpen={contactFormOpen} onClose={() => setContactFormOpen(false)} />

        <main className="about-hero">
          <div className="about-hero-content">
            <h1 className="about-intro">
              <span className="about-intro-gray">A page</span> About me.
            </h1>
            <div className="about-typing-container">
              <span className="about-typing-text">Check out {displayText}</span>
              <span className="cursor"></span>
            </div>
            <p className="about-description">
              Outside of work, I enjoy photography, solo travel, and spending time with podcasts that spark new ideas.
            </p>
          </div>
        </main>

        <div className="scroll-indicator">
          <div className="mouse-icon">
            <div className="mouse-wheel"></div>
          </div>
        </div>
      </div>

      {/* About Content Grid */}
      <section className="about-grid-section">
        <div className="about-grid">
          {/* Photo Card */}
          <div className="about-card photo-card">
            <div className="photo-overlay">From Chennai, India</div>
            <img src={profileImage} alt="Sanjay P N" className="profile-photo" />
          </div>

          {/* Socials Card */}
          <div className="about-card socials-card">
            <h3 className="card-title">Connect</h3>
            <div className="socials-grid">
              <a href="https://www.linkedin.com/in/sanjaypn" target="_blank" rel="noopener noreferrer" className="social-link">
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="social-name">LinkedIn</span>
              </a>
              <a href="https://github.com/sanjayperam04" target="_blank" rel="noopener noreferrer" className="social-link">
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="social-name">GitHub</span>
              </a>
              <a href="https://vsco.co/sanjayperam" target="_blank" rel="noopener noreferrer" className="social-link">
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6c4.635 0 8.4 3.765 8.4 8.4 0 4.635-3.765 8.4-8.4 8.4-4.635 0-8.4-3.765-8.4-8.4 0-4.635 3.765-8.4 8.4-8.4zm0 2.4c-3.315 0-6 2.685-6 6s2.685 6 6 6 6-2.685 6-6-2.685-6-6-6z"/>
                </svg>
                <span className="social-name">VSCO</span>
              </a>
              <a href="mailto:sanjayperam2604@gmail.com" className="social-link">
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span className="social-name">Email</span>
              </a>
            </div>
          </div>

          {/* About Me */}
          <div className="about-card brief-card">
            <h3 className="card-title">About me</h3>
            <p className="card-text">
              I build intelligent systems at the intersection of AI and software, with a focus on creating products 
              that are practical, scalable, and thoughtfully designed. I enjoy turning complex ideas into usable 
              solutions and care deeply about clarity, performance, and real-world impact. Outside of tech, 
              photography is my creative outlet, helping me explore visual storytelling and refine my sense of design.
            </p>
          </div>

          {/* Photography Showcase */}
          <div className="about-card photo-showcase-card">
            <div className="showcase-header">
              <p>Shots</p>
            </div>
            <div className="photo-carousel">
              <div className="carousel-track">
                <img src={photo1} alt="Photography 1" className="carousel-photo" />
                <img src={photo2} alt="Photography 2" className="carousel-photo" />
                <img src={photo3} alt="Photography 3" className="carousel-photo" />
              </div>
              <div className="carousel-track" aria-hidden="true">
                <img src={photo1} alt="Photography 1" className="carousel-photo" />
                <img src={photo2} alt="Photography 2" className="carousel-photo" />
                <img src={photo3} alt="Photography 3" className="carousel-photo" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
