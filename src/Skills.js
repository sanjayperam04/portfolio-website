import React from 'react';
import './Skills.css';

function Skills() {
  const skillsData = {
    languagesTools: [
      'Python',
      'SQL',
      'TypeScript',
      'JavaScript',
      'Git',
      'Postman',
      'Docker',
      'Firebase',
      'Kafka'
    ],
    frameworksLibraries: [
      'React',
      'Next.js',
      'Node.js',
      'Express.js',
      'Django',
      'FastAPI',
      'Flask',
      'TailwindCSS',
      'Framer Motion'
    ],
    coreConcepts: [
      'Gen-AI',
      'LLMs',
      'DBMS',
      'OOP',
      'Operating Systems',
      'System Design'
    ]
  };

  return (
    <section className="skills-section">
      <div className="skills-container">
        <div className="skills-left">
          <h2 className="skills-title">DEVELOPER</h2>
          <h2 className="skills-title">DESIGNER</h2>
          <h2 className="skills-title">ENGINEER/</h2>
        </div>

        <div className="skills-right">
          <h3 className="skills-heading">Skills</h3>

          <div className="skills-categories">
            <div className="skills-category">
              <h4 className="skills-category-title">Languages & Tools</h4>
              <div className="skills-list">
                {skillsData.languagesTools.map((skill, index) => (
                  <p key={index} className="skill-item">{skill}</p>
                ))}
              </div>
            </div>

            <div className="skills-category">
              <h4 className="skills-category-title">Frameworks & Libraries</h4>
              <div className="skills-list">
                {skillsData.frameworksLibraries.map((skill, index) => (
                  <p key={index} className="skill-item">{skill}</p>
                ))}
              </div>
            </div>

            <div className="skills-category">
              <h4 className="skills-category-title">Core CS Concepts</h4>
              <div className="skills-list">
                {skillsData.coreConcepts.map((skill, index) => (
                  <p key={index} className="skill-item">{skill}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
