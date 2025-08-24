"use client"

import React from 'react';
import Link from 'next/link';
import { TeamMember } from '../types';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <Link href={`/profile/${member.username}`} className="group block">
      <div className="text-center bg-slate-800/50 p-6 rounded-lg shadow-md hover:shadow-indigo-500/20 transition-all duration-300 flex flex-col items-center hover:-translate-y-1 relative cursor-pointer">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-slate-700 group-hover:border-indigo-500 transition-colors duration-300"
        />
        <h3 className="text-xl font-bold text-white">{member.name}</h3>
        <p className="text-indigo-400 font-medium mb-3">{member.role}</p>
        <p className="text-sm text-slate-400 line-clamp-3 mb-4">{member.bio}</p>
        <span className="text-sm text-indigo-300 hover:text-indigo-400 transition-colors font-medium">
          View Profile →
        </span>
      </div>
    </Link>
  );
};

export default TeamMemberCard;