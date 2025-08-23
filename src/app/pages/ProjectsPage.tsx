"use client";
import React, { useEffect, useState } from 'react';
import { PROJECTS } from '../constants';
import ProjectCard from '../components/ProjectCard';
import ContactModal from '../components/Modal/ContactModal';
import Toast, { ToastState } from '../components/Modal/Toast';

const ProjectsPage: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'info' });

  useEffect(() => {
    const handler = () => setIsContactOpen(true);
    window.addEventListener('openContactModal', handler);
    return () => window.removeEventListener('openContactModal', handler);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#3f4555' }}>
      <Toast toast={toast} onClose={() => setToast(t => ({ ...t, show: false }))} />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        setToast={setToast}
      />

      <div className="max-w-5xl mx-auto py-10 px-4">
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center mt-20 mb-10">
          Our Projects
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;