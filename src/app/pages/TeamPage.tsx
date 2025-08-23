
import React from 'react';
import { TEAM_MEMBERS } from '../constants';
import TeamMemberCard from '../components/TeamMemberCard';

const TeamPage: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-slate-900 min-h-screen pt-32">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 tracking-tight">Our Experts</h2>
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
  );
};

export default TeamPage;
