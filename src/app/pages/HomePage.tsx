"use client"
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import ContactModal from '../components/Modal/ContactModal';
import Toast, { ToastState } from '../components/Modal/Toast';
import { ProjectCategory } from '../types';
import { PROJECTS, TEAM_MEMBERS, PROCESS_STEPS } from '../constants';
import ProjectCard from '../components/ProjectCard';
import TeamMemberCard from '../components/TeamMemberCard';
import Hero3DBackground from '../components/Hero3DBackground';

const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(ProjectCategory.ALL);
  const [isContactOpen, setIsContactOpen] = useState(false); // Modal state
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'info' }); // Toast state

  useEffect(() => {
    // Listen for custom event from header nav
    const handler = () => setIsContactOpen(true);
    window.addEventListener('openContactModal', handler);
    return () => window.removeEventListener('openContactModal', handler);
  }, []);

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
      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(t => ({ ...t, show: false }))} />
      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} setToast={setToast} />
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
              <a
                href="#projects"
                onClick={e => {
                  e.preventDefault();
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-transform duration-300 hover:scale-105 shadow-lg"
              >
                View Our Work
              </a>
          </div>
      </section>

      {/* We Offer Section */}
      <section className="py-20 md:py-32 bg-slate-900/80">
        <div className="container mx-auto px-6">
          <SectionTitle>We Offer</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Unity Game Development",
                icon: (
                  <svg className="h-12 w-12 mx-auto mb-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l7 4v6c0 5-7 10-7 10S5 17 5 12V6l7-4z" />
                  </svg>
                ),
                desc: "High-performance 2D/3D games using Unity for all platforms.",
                href: "/offers/unity-game-development"
              },
              {
                title: "Web Game Development",
                icon: (
                  <svg className="h-12 w-12 mx-auto mb-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8M12 8v8" />
                  </svg>
                ),
                desc: "Engaging browser-based games with modern web tech.",
                href: "/offers/web-game-development"
              },
              {
                title: "Web App Development",
                icon: (
                  <svg className="h-12 w-12 mx-auto mb-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2v4M16 2v4M2 8h20" />
                  </svg>
                ),
                desc: "Robust, scalable web applications tailored to your needs.",
                href: "/offers/web-app-development"
              },
              {
                title: "Responsive Websites",
                icon: (
                  <svg className="h-12 w-12 mx-auto mb-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2v4M16 2v4M2 8h20" />
                  </svg>
                ),
                desc: "Beautiful, mobile-friendly websites for every device.",
                href: "/offers/responsive-websites"
              }
            ].map((service, idx) => (
              <Link
                key={idx}
                href={service.href}
                className="bg-slate-800/80 rounded-lg p-8 text-center shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div>{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400">{service.desc}</p>
              </Link>
            ))}
          </div>
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
