"use client"
import React, { useState, useMemo } from 'react';
import { ProjectCategory } from '../types';
import { PROJECTS, TEAM_MEMBERS, PROCESS_STEPS } from '../constants';
import ProjectCard from '../components/ProjectCard';
import TeamMemberCard from '../components/TeamMemberCard';
import Hero3DBackground from '../components/Hero3DBackground';

const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(ProjectCategory.ALL);

  const filteredProjects = useMemo(() => {
    if (activeCategory === ProjectCategory.ALL) {
      return PROJECTS;
    }
    return PROJECTS.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
      {children}
    </h2>
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
          <Hero3DBackground />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/40 to-slate-900 z-0"></div>
          <div className="absolute inset-0 bg-grid-slate-800/[0.2] [mask-image:linear-gradient(0deg,rgba(255,255,255,0),rgba(255,255,255,1))] z-10"></div>
          <div className="relative z-20">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-4">
                  Crafting <span className="text-indigo-400">Digital Experiences</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                  We are AZ Developers, a passionate team building high-performance games and web applications that engage and inspire.
              </p>
              <a href="#projects" className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-transform duration-300 hover:scale-105 shadow-lg">
                  View Our Work
              </a>
          </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-32 bg-slate-900">
          <div className="container mx-auto px-6">
              <SectionTitle>Our Projects</SectionTitle>
              <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
                  {(Object.values(ProjectCategory) as ProjectCategory[]).map((category) => (
                      <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${
                              activeCategory === category
                              ? 'bg-indigo-600 text-white shadow-md'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                      >
                          {category}
                      </button>
                  ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                  ))}
              </div>
          </div>
      </section>

      {/* Development Process Section */}
      <section id="process" className="py-20 md:py-32 bg-slate-900/70 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
          <div className="container mx-auto px-6">
              <SectionTitle>Our Development Process</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {PROCESS_STEPS.map((step) => (
                      <div key={step.id} className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-lg text-center flex flex-col items-center transition-all duration-300 hover:bg-slate-700/90 transform hover:-translate-y-2 shadow-lg">
                          <div className="text-indigo-400 mb-4">{step.icon}</div>
                          <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                          <p className="text-slate-400">{step.description}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 md:py-32 bg-slate-900">
          <div className="container mx-auto px-6">
              <SectionTitle>Meet the Team</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {TEAM_MEMBERS.map((member) => (
                      <TeamMemberCard key={member.id} member={member} />
                  ))}
              </div>
          </div>
      </section>
    </>
  );
};

export default HomePage;
