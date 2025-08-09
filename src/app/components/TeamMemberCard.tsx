"use client"

import React, { useState } from 'react';
import { TeamMember } from '../types';
import TeamMemberDetails from './TeamMemberDetails';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="group text-center bg-slate-800/50 p-6 rounded-lg shadow-md hover:shadow-indigo-500/20 transition-all duration-300 flex flex-col items-center hover:-translate-y-1 relative">
      {/* <Link 
        to={`/team/${member.id}`} 
        className="absolute inset-0 z-0"
        tabIndex={-1}
        aria-label={`Go to ${member.name}'s profile`}
        style={{ pointerEvents: showDetails ? 'none' : 'auto' }}
      /> */}
      <img
        src={member.imageUrl}
        alt={member.name}
        className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-slate-700 group-hover:border-indigo-500 transition-colors duration-300 z-10"
      />
      <h3 className="text-xl font-bold text-white z-10">{member.name}</h3>
      <p className="text-indigo-400 font-medium z-10">{member.role}</p>
      <button
        className="mt-2 text-sm text-indigo-300 underline hover:text-indigo-400 z-10"
        onClick={e => { e.stopPropagation(); setShowDetails(v => !v); }}
        type="button"
      >
        {showDetails ? 'Hide Details' : 'Show More'}
      </button>
      {showDetails && (
        <TeamMemberDetails member={member} />
      )}
    </div>
  );
};

export default TeamMemberCard;