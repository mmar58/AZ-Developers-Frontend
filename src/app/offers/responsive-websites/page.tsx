"use client";
import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../../constants';
import ProjectCard from '../../components/ProjectCard';
import { ProjectCategory } from '../../types';
import ContactModal from '../../components/Modal/ContactModal';
import Toast, { ToastState } from '../../components/Modal/Toast';


const ResponsiveWebsites: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'info' });

  useEffect(() => {
    const handler = () => setIsContactOpen(true);
    window.addEventListener('openContactModal', handler);
    return () => window.removeEventListener('openContactModal', handler);
  }, []);

  // Only show Web Games and Web Apps projects
  const filteredProjects = PROJECTS.filter(
    (project) =>
      project.category === ProjectCategory.WEB_GAMES ||
      project.category === ProjectCategory.WEB_APPS
  );

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(t => ({ ...t, show: false }))} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} setToast={setToast} />
      <div className="min-h-screen bg-[#3f4555] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">Responsive Websites</h1>
          <p className="text-slate-300 mb-10 text-center max-w-2xl mx-auto">
            At AZ Developers, we design and develop beautiful, mobile-friendly websites that look great on every device. Our responsive websites include interactive web games and powerful web applications, ensuring your brand and products shine everywhere.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsiveWebsites;
