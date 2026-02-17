import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Experience.css';
import menuBg from './assets/menu-bg.jpg';

const experienceItems = [
  'my journey',
  'where I\'ve worked',
  'what I\'ve built',
  'roles I\'ve held'
];

function Experience() {
  const navigate = useNavigate();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProjectsClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate('/', { state: { scrollTo: 'projects' } });
  };

  // Typing animation effect
  useEffect(() => {
    const currentItem = experienceItems[currentItemIndex];
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
        setCurrentItemIndex((currentItemIndex + 1) % experienceItems.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentItemIndex]);

  return (
    <div className="experience-page">
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
      <div className={`experience-content ${menuOpen ? 'menu-active' : ''}`}>
        <header className="header">
          <button className="menu-btn" onClick={() => setMenuOpen(true)}>
            <span className="menu-icon">≡</span> Menu
          </button>
          <a href="mailto:sanjayperam2604@gmail.com" className="contact-btn">Contact</a>
        </header>

        <main className="experience-hero">
          <div className="experience-hero-content">
            <h1 className="experience-intro">
              <span className="experience-intro-gray">A page about</span> my journey.
            </h1>
            <div className="experience-typing-container">
              <span className="experience-typing-text">Check out {displayText}</span>
              <span className="cursor"></span>
            </div>
            <p className="experience-description">
              The roles, teams, and projects that shaped how I build today.
            </p>
          </div>
        </main>

        <div className="scroll-indicator">
          <div className="mouse-icon">
            <div className="mouse-wheel"></div>
          </div>
        </div>
      </div>

      {/* Experience Content Section */}
      <section className="experience-content-section">
        <div className="experience-container">
          <div className="experience-header-section">
            <h2 className="experience-section-title">PROFESSIONAL JOURNEY /</h2>
            <div className="experience-intro-grid">
              <div></div>
              <div>
                <div className="experience-label">(TIMELINE)</div>
                <p className="experience-intro-text">
                  Building AI systems and shipping products across startups and enterprises.
                </p>
              </div>
            </div>
          </div>

          <div className="timeline-wrapper">
            {/* Experience 1 - GoML */}
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">DEC 2025 — PRESENT</div>
                <div className="experience-card">
                  <h3 className="experience-role">Machine Learning Engineer</h3>
                  <div className="experience-company">GoML</div>
                  <p className="experience-description">
                    Building AI solutions with a focus on LLMs and production ML systems. Working on end-to-end ML pipelines, 
                    from model development to deployment on cloud infrastructure.
                  </p>
                  <div className="tech-tags">
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">LLMs</span>
                    <span className="tech-tag">RAG</span>
                    <span className="tech-tag">Transformers</span>
                    <span className="tech-tag">ML Pipelines</span>
                    <span className="tech-tag">AWS</span>
                    <span className="tech-tag">Docker</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience 2 - Anand & Anand */}
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">MAY 2025 — JUL 2025</div>
                <div className="experience-card">
                  <h3 className="experience-role">AI Software Engineering Intern</h3>
                  <div className="experience-company">Anand & Anand IPR Firm</div>
                  <p className="experience-description">
                    Developed an AI application to distinguish client logos from those in the TM Journal, reducing false positive 
                    infringement matches by 60%. Built a Retrieval-Augmented Generation (RAG) system with vector and SQL search, 
                    enabling lawyers to instantly retrieve case-relevant legal content.
                  </p>
                  <div className="tech-tags">
                    <span className="tech-tag">React.js</span>
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">FastAPI</span>
                    <span className="tech-tag">Pinecone DB</span>
                    <span className="tech-tag">Docker</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience 3 - Bluestock Fintech */}
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">JUL 2024 — AUG 2024</div>
                <div className="experience-card">
                  <h3 className="experience-role">Software Development Engineer Intern</h3>
                  <div className="experience-company">Bluestock Fintech</div>
                  <p className="experience-description">
                    Developed and deployed RESTful APIs using Django REST Framework, facilitating efficient data retrieval and 
                    manipulation for a stock market IPO platform, reducing query time by 30%.
                  </p>
                  <div className="tech-tags">
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">Django</span>
                    <span className="tech-tag">Django REST Framework</span>
                    <span className="tech-tag">PostgreSQL</span>
                    <span className="tech-tag">Git</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience 4 - Intellect Design Arena */}
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">JUN 2024 — JUL 2024</div>
                <div className="experience-card">
                  <h3 className="experience-role">ML and CloudOps Intern Trainee</h3>
                  <div className="experience-company">Intellect Design Arena</div>
                  <p className="experience-description">
                    Leveraged machine learning algorithms for intrusion detection system, while gaining hands-on experience with 
                    AWS such as S3, SageMaker, and Redshift for ML model deployment. Acquired proficiency in Apache Kafka including 
                    Cluster Setup, handled datasets with Kafka Connect for performance monitoring.
                  </p>
                  <div className="tech-tags">
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">AWS</span>
                    <span className="tech-tag">Kafka</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Experience;
