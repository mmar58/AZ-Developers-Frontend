"use client";
import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../../constants';
import ProjectCard from '../../components/ProjectCard';
import { ProjectCategory } from '../../types';
import ContactModal from '../../components/Modal/ContactModal';
import Toast, { ToastState } from '../../components/Modal/Toast';


const UnityGameDevelopment: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'info' });

  useEffect(() => {
    const handler = () => setIsContactOpen(true);
    window.addEventListener('openContactModal', handler);
    return () => window.removeEventListener('openContactModal', handler);
  }, []);

  const unityProjects = PROJECTS.filter(project => project.category === ProjectCategory.UNITY);

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(t => ({ ...t, show: false }))} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} setToast={setToast} />
      <div className="min-h-screen bg-[#3f4555] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">Unity Game Development</h1>
          <p className="text-slate-300 mb-10 text-center max-w-2xl mx-auto">We create high-performance 2D/3D games using Unity for all platforms. Our team specializes in immersive gameplay, stunning visuals, and cross-platform deployment.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {unityProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UnityGameDevelopment;
