"use client";
import React, { useEffect, useState } from 'react';
import { TEAM_MEMBERS } from '../constants';
import TeamMemberCard from '../components/TeamMemberCard';
import ContactModal from '../components/Modal/ContactModal';
import Toast, { ToastState } from '../components/Modal/Toast';

const TeamPage: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'info' });

  useEffect(() => {
    const handler = () => setIsContactOpen(true);
    window.addEventListener('openContactModal', handler);
    return () => window.removeEventListener('openContactModal', handler);
  }, []);

  return (
    <>
      {/* Toast + Contact Modal at page root so they overlay the entire page */}
      <Toast toast={toast} onClose={() => setToast(t => ({ ...t, show: false }))} />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        setToast={setToast}
      />

      <section className="py-20 md:py-32 bg-slate-900 min-h-screen pt-32">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 tracking-tight">
            Our Experts
          </h2>
          <p className="text-lg text-slate-400 text-center max-w-3xl mx-auto mb-16">
            Meet the talented individuals who power AZ Developers. Our diverse team of developers, designers, and strategists are the driving force behind our success.
          </p>
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

export default TeamPage;
