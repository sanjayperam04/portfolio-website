import React, { useState, useEffect, useRef } from 'react';
import './SelectedWorks.css';
import projectImage1 from './image.png';
import projectImage2 from './image1.png';
import projectImage3 from './image2.png';

const projects = [
  {
    id: 1,
    name: 'LegalGPT',
    badge: 'AI-Powered Legal Assistant',
    tag: 'DEVELOPMENT',
    image: projectImage1,
    link: 'https://github.com/sanjayperam04/LEGAL-GPT'
  },
  {
    id: 2,
    name: 'Stat IQ',
    badge: null,
    tag: 'DEVELOPMENT',
    image: projectImage2,
    link: 'https://github.com/sanjayperam04/Stat-IQ'
  },
  {
    id: 3,
    name: 'Review Pilot',
    badge: null,
    tag: 'DEVELOPMENT',
    image: projectImage3,
    link: 'https://github.com/sanjayperam04/review-pilot'
  },
  {
    id: 4,
    name: 'More Projects',
    badge: null,
    tag: 'GITHUB',
    image: null,
    link: 'https://github.com/sanjayperam04?tab=repositories',
    isGithubCTA: true
  }
];

function SelectedWorks() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const projectsSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!projectsSectionRef.current) return;

      const section = projectsSectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      // Only start calculating progress once the section is fully in view (sticky)
      if (rect.top <= 0) {
        const scrolledIntoSection = Math.abs(rect.top);
        const maxScroll = sectionHeight - windowHeight;
        const progress = Math.min(1, Math.max(0, scrolledIntoSection / maxScroll));
        
        setScrollProgress(progress);

        // Divide scroll into 4 sections for 4 items (3 projects + GitHub CTA)
        // 0-0.25: Project 1
        // 0.25-0.5: Project 2
        // 0.5-0.75: Project 3
        // 0.75-1.0: GitHub CTA
        let newProjectIndex = currentProjectIndex;
        
        if (progress < 0.25) {
          newProjectIndex = 0;
        } else if (progress < 0.5) {
          newProjectIndex = 1;
        } else if (progress < 0.75) {
          newProjectIndex = 2;
        } else {
          newProjectIndex = 3;
        }

        if (newProjectIndex !== currentProjectIndex) {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentProjectIndex(newProjectIndex);
            setTimeout(() => setIsTransitioning(false), 100);
          }, 400);
        }
      } else {
        setScrollProgress(0);
        if (currentProjectIndex !== 0) {
          setCurrentProjectIndex(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentProjectIndex]);

  const handleProjectClick = (link) => {
    window.open(link, '_blank');
  };

  const currentProject = projects[currentProjectIndex];
  
  // Calculate parallax offset for number (moves slower than scroll)
  const numberParallax = scrollProgress * 20; // Subtle parallax effect

  return (
    <section className="selected-works-section">
      {/* Intro Section - Scrolls away */}
      <div className="works-intro-section">
        <div className="works-header">
          <h2 className="works-title">PROJECTS /</h2>
        </div>
        <div className="works-intro-content">
          <div></div>
          <div className="works-intro">
            <div className="works-label">(SELECTED WORK)</div>
            <p className="works-description">
              AI-powered applications I've built from scratch. Practical, functional, and designed to solve real problems.
            </p>
          </div>
        </div>
      </div>

      {/* Projects Section - Becomes fixed */}
      <div className="works-projects-section" ref={projectsSectionRef}>
        <div className="works-sticky-container">
          <div className="works-content">
            <div className="works-left">
              <div 
                className="works-number-container"
                style={{
                  transform: `translateY(${numberParallax}px)`,
                  transition: 'transform 0.1s linear'
                }}
              >
                <span className="works-number-zero">0</span>
                <span className="works-number">{currentProjectIndex + 1}</span>
              </div>
            </div>

            <div className="works-right">
              <div className="project-showcase">
                <div
                  className={`project-slide ${isTransitioning ? 'transitioning' : 'active'}`}
                  onClick={() => handleProjectClick(currentProject.link)}
                >
                  {currentProject.isGithubCTA ? (
                    <div className="github-cta-container">
                      <div className="github-icon">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <h3 className="github-cta-title">Check out more projects</h3>
                      <p className="github-cta-description">Explore my GitHub for additional work and experiments</p>
                      <button className="github-cta-button">
                        View GitHub Profile
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7H7M17 7V17"/>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="project-image-container">
                        <img 
                          src={currentProject.image} 
                          alt={currentProject.name} 
                          className="project-image"
                        />
                        {currentProject.badge && (
                          <div className="project-overlay">
                            <div className="project-badge">{currentProject.badge}</div>
                          </div>
                        )}
                        <button className="project-arrow">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17"/>
                          </svg>
                        </button>
                      </div>
                      <div className="project-info">
                        <h3 className="project-name">{currentProject.name}</h3>
                        <span className="project-tag">{currentProject.tag}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SelectedWorks;
