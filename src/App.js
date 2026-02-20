import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import About from './About';
import Experience from './Experience';
import Loader from './Loader';
import SelectedWorks from './SelectedWorks';
import Skills from './Skills';
import ContactForm from './ContactForm';
import menuBg from './assets/menu-bg.jpg';

const roles = [
  { text: 'Machine Learning Engineer', article: 'a' },
  { text: 'AI Developer', article: 'an' },
  { text: 'Aspiring Storyteller', article: 'an' },
  { text: 'Passionate Photographer', article: 'a' }
];

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      {!loading && (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

function HomePage() {
  const location = useLocation();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [contactFormOpen, setContactFormOpen] = useState(false);

  // Handle navigation from other pages to scroll to projects
  useEffect(() => {
    if (location.state?.scrollTo === 'projects') {
      setTimeout(() => {
        const element = document.getElementById('projects');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Opacity for hero content
      const opacity = Math.max(0, 1 - (scrollPosition / windowHeight));
      setScrollOpacity(opacity);

      // Smart header visibility
      if (scrollPosition < 100) {
        // Always show header at the very top
        setHeaderVisible(true);
      } else if (scrollPosition < lastScrollY) {
        // Scrolling up - show header
        setHeaderVisible(true);
      } else if (scrollPosition > lastScrollY && scrollPosition > 100) {
        // Scrolling down - hide header
        setHeaderVisible(false);
      }

      setLastScrollY(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex].text;
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setDisplayText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentRoleIndex]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetId === 'projects') {
      const element = document.getElementById('projects');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // Experience is now a separate page, handled by Link component
  };

  return (
    <div className="app">
      {/* Menu Background */}
      <div className={`menu-background ${menuOpen ? 'active' : ''}`} style={{ backgroundImage: `url(${menuBg})` }}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          <span className="close-icon">×</span> Close
        </button>
        <nav className="menu-nav">
          <a href="#home" className="menu-link" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
          <a href="#projects" className="menu-link" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
          <Link to="/experience" className="menu-link" onClick={() => setMenuOpen(false)}>Experience</Link>
          <Link to="/about" className="menu-link" onClick={() => setMenuOpen(false)}>About</Link>
        </nav>
      </div>

      {/* Fixed Header - Outside main-content */}
      <header className={`header ${headerVisible ? 'header-visible' : 'header-hidden'}`}>
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          <span className="menu-icon">≡</span> Menu
        </button>
        <button className="contact-btn" onClick={() => setContactFormOpen(true)}>Contact</button>
      </header>

      {/* Contact Form Modal */}
      <ContactForm isOpen={contactFormOpen} onClose={() => setContactFormOpen(false)} />

      {/* Main Content */}
      <div className={`main-content ${menuOpen ? 'menu-active' : ''}`}>

        <main className="hero">
          <div className="hero-content" style={{ opacity: scrollOpacity }}>
            <h1 className="greeting">
              Sup, I'm Sanjay P N.
            </h1>
            <div className="role-container">
              <span className="role-text">I'm {roles[currentRoleIndex].article} {displayText}</span>
              <span className="cursor"></span>
            </div>
            <p className="description">
              I ship AI products. From LLMs to full-stack apps, I build what people actually use.
            </p>
          </div>
        </main>

        <div className="scroll-indicator" style={{ opacity: scrollOpacity }}>
          <div className="mouse-icon">
            <div className="mouse-wheel"></div>
          </div>
        </div>
      </div>

      {/* What I Do Section */}
      <section className="what-i-do-section">
        <div className="section-header">
          <h2 className="section-title">WHAT I DO /</h2>
          <div className="services-intro">
            <div></div>
            <div>
              <div className="service-label">(SERVICES)</div>
              <div className="service-description">
                <p>
                  I specialize in building full-stack web applications that are fast, reliable, and user-friendly. 
                  With a solid foundation in both frontend and backend technologies, I help bring ideas to life 
                  whether it's for a business, a startup, or a product team.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stacking Cards */}
        <ul className="cards-list">
          <li className="card card-1">
            <div className="card-inner">
              <div className="card-header-row">
                <div className="card-number">(01)</div>
                <h3 className="card-title">AI Software Development</h3>
              </div>
              <div className="card-body-row">
                <div></div>
                <div className="card-content">
                  <p className="card-desc">
                    Building intelligent applications powered by AI and modern web technologies. 
                    From frontend interfaces to backend APIs and AI integrations, I create scalable 
                    solutions that leverage the latest in machine learning and software development.
                  </p>
                  <div className="tech-list">
                    <div className="tech-row"><span>Frontend</span><span>React.js, React Native, Next.js</span></div>
                    <div className="tech-row"><span>Backend</span><span>Python, FastAPI, Django, Node.js, Express.js, REST APIs</span></div>
                    <div className="tech-row"><span>AI/ML</span><span>LangChain, LLMs, RAG, Langraph</span></div>
                    <div className="tech-row"><span>Tools</span><span>Git, GitHub, Postman, Docker</span></div>
                    <div className="tech-row"><span>Databases</span><span>PostgreSQL, MySQL, MongoDB, ChromaDB, PineconeDB</span></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="card card-2">
            <div className="card-inner">
              <div className="card-header-row">
                <div className="card-number">(02)</div>
                <h3 className="card-title">Generative AI & Intelligent Systems</h3>
              </div>
              <div className="card-body-row">
                <div></div>
                <div className="card-content">
                  <p className="card-desc">
                    Building systems that retrieve, reason, and generate reliable outputs. I design GenAI pipelines 
                    that combine large language models with retrieval and orchestration to deliver accurate, 
                    explainable, and scalable AI solutions.
                  </p>
                  <div className="tech-list">
                    <div className="tech-row"><span>GenAI Stack</span><span>LLMs, Prompt Engineering, Structured Outputs, Retrieval-Augmented Generation (RAG)</span></div>
                    <div className="tech-row"><span>Retrieval & Orchestration</span><span>Vector search, embeddings, reranking, LangChain, LangGraph</span></div>
                    <div className="tech-row"><span>Foundations</span><span>Python-based ML workflows, NLP fundamentals for GenAI systems</span></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="card card-3">
            <div className="card-inner">
              <div className="card-header-row">
                <div className="card-number">(03)</div>
                <h3 className="card-title">Design & Web Development</h3>
              </div>
              <div className="card-body-row">
                <div></div>
                <div className="card-content">
                  <p className="card-desc">
                    Beyond AI, I build professional websites for brands and businesses - combining 
                    technical execution with visual storytelling. My background in photography 
                    informs how I approach design: composition, aesthetics, and user experience.
                  </p>
                  <div className="tech-list">
                    <div className="tech-row"><span>Services</span><span>Landing pages, Business websites, Web applications, Brand identity</span></div>
                    <div className="tech-row"><span>Tools</span><span>React.js, Next.js, Tailwind CSS, Adobe Lightroom, Adobe Illustrator</span></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>

      {/* Projects Section */}
      <div id="projects">
        <SelectedWorks />
      </div>

      {/* Skills Section */}
      <Skills />
    </div>
  );
}

export default App;
