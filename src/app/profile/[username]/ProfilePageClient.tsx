"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TeamMember } from '../../types';
import { getTeamMemberByUsername } from '../../lib/teamApi';
import ContactModal from '../../components/Modal/ContactModal';
import Toast, { ToastState } from '../../components/Modal/Toast';

interface ProfilePageClientProps {
  username: string;
}

const ProfilePageClient: React.FC<ProfilePageClientProps> = ({ username }) => {
  const router = useRouter();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'info' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for contact modal trigger from header/footer
    const handler = () => setIsContactOpen(true);
    window.addEventListener('openContactModal', handler);
    return () => window.removeEventListener('openContactModal', handler);
  }, []);

  useEffect(() => {
    // Fetch team member data from API
    const fetchMember = async () => {
      if (!username) return;
      
      setLoading(true);
      try {
        const foundMember = await getTeamMemberByUsername(username);
        setMember(foundMember);
      } catch (error) {
        console.error('Error fetching team member:', error);
        setMember(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Profile Not Found</h1>
          <p className="text-slate-400 mb-8">The team member you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/team')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Team
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Toast + Contact Modal */}
      <Toast toast={toast} onClose={() => setToast(t => ({ ...t, show: false }))} />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        setToast={setToast}
      />

      <div className="min-h-screen bg-slate-900 pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center text-slate-400 hover:text-indigo-400 transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 rounded-xl p-8 text-center sticky top-24">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-48 h-48 rounded-full object-cover mx-auto mb-6 border-4 border-indigo-500"
                />
                <h1 className="text-3xl font-bold text-white mb-2">{member.name}</h1>
                <p className="text-xl text-indigo-400 font-medium mb-6">{member.role}</p>
                
                {/* Social Links */}
                <div className="flex justify-center space-x-4 mb-6">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}
                </div>

                {/* Contact Button */}
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Get in Touch
                </button>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio Section */}
              <section className="bg-slate-800/50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">About</h2>
                <p className="text-slate-300 leading-relaxed">{member.bio}</p>
              </section>

              {/* Skills Section */}
              <section className="bg-slate-800/50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-3">
                  {member.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-indigo-600/20 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium border border-indigo-600/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Contributions Section */}
              <section className="bg-slate-800/50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Key Contributions</h2>
                <div className="space-y-4">
                  {member.contributions.map((contribution, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <p className="text-slate-300 leading-relaxed">{contribution}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Future: Projects Section */}
              <section className="bg-slate-800/50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Featured Projects</h2>
                <p className="text-slate-400 italic">
                  Project portfolio coming soon. This section will showcase {member.name}'s latest work and achievements.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePageClient;
