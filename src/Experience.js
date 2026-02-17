import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Experience.css';
import menuBg from './assets/menu-bg.jpg';

const experienceItems = [
  'my journey',
  'where I\'ve worked',
  'what I\'ve built',
  'roles I\'ve held'
];

const experiences = [
  {
    id: 1,
    date: 'DEC 2025 — PRESENT',
    role: 'Machine Learning Engineer',
    company: 'GoML',
    description: 'Building AI solutions with a focus on LLMs and production ML systems. Working on end-to-end ML pipelines, from model development to deployment on cloud infrastructure.',
    tags: ['Python', 'LLMs', 'RAG', 'Transformers', 'ML Pipelines', 'AWS', 'Docker']
  },
  {
    id: 2,
    date: 'MAY 2025 — JUL 2025',
    role: 'AI Software Engineering Intern',
    company: 'Anand & Anand IPR Firm',
    description: 'Developed an AI application to distinguish client logos from those in the TM Journal, reducing false positive infringement matches by 60%. Built a Retrieval-Augmented Generation (RAG) system with vector and SQL search, enabling lawyers to instantly retrieve case-relevant legal content.',
    tags: ['React.js', 'Python', 'FastAPI', 'Pinecone DB', 'Docker']
  },
  {
    id: 3,
    date: 'JUL 2024 — AUG 2024',
    role: 'Software Development Engineer Intern',
    company: 'Bluestock Fintech',
    description: 'Developed and deployed RESTful APIs using Django REST Framework, facilitating efficient data retrieval and manipulation for a stock market IPO platform, reducing query time by 30%.',
    tags: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Git']
  },
  {
    id: 4,
    date: 'JUN 2024 — JUL 2024',
    role: 'ML and CloudOps Intern Trainee',
    company: 'Intellect Design Arena',
    description: 'Leveraged machine learning algorithms for intrusion detection system, while gaining hands-on experience with AWS such as S3, SageMaker, and Redshift for ML model deployment. Acquired proficiency in Apache Kafka including Cluster Setup, handled datasets with Kafka Connect for performance monitoring.',
    tags: ['Python', 'AWS', 'Kafka']
  }
];

function Experience() {
  const navigate = useNavigate();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [headerVisible, setHeaderVisible] = useState(false);
  
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);
  const headerRef = useRef(null);

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

  // Timeline progress on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineElement = timelineRef.current;
      const rect = timelineElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on scroll position
      const startOffset = windowHeight * 0.3;
      const endOffset = windowHeight * 0.7;
      
      if (rect.top <= startOffset && rect.bottom >= endOffset) {
        const scrolled = startOffset - rect.top;
        const total = rect.height - (windowHeight - startOffset - (windowHeight - endOffset));
        const progress = Math.min(Math.max(scrolled / total, 0), 1);
        setTimelineProgress(progress);
      } else if (rect.top > startOffset) {
        setTimelineProgress(0);
      } else if (rect.bottom < endOffset) {
        setTimelineProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for timeline items
  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]));
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '-50px'
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  // Intersection Observer for header section
  useEffect(() => {
    if (!headerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeaderVisible(true);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    observer.observe(headerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

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
          <div className={`experience-header-section ${headerVisible ? 'visible' : ''}`} ref={headerRef}>
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

          <div className="timeline-wrapper" ref={timelineRef}>
            {/* Progress indicator */}
            <div 
              className="timeline-progress" 
              style={{ height: `${timelineProgress * 100}%` }}
            />
            
            {experiences.map((exp, index) => (
              <div 
                key={exp.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`timeline-item ${visibleItems.has(index) ? 'visible' : ''}`}
              >
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-date">{exp.date}</div>
                  <div className="experience-card">
                    <h3 className="experience-role">{exp.role}</h3>
                    <div className="experience-company">{exp.company}</div>
                    <p className="experience-description">{exp.description}</p>
                    <div className="tech-tags">
                      {exp.tags.map((tag, i) => (
                        <span key={i} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Experience;
