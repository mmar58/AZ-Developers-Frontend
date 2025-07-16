import React from 'react';
import { TeamMember } from '../types';

interface TeamMemberDetailsProps {
  member: TeamMember;
}

const TeamMemberDetails: React.FC<TeamMemberDetailsProps> = ({ member }) => {
  return (
    <div className="mt-4 text-left w-full max-w-xs mx-auto bg-slate-900/80 rounded-lg p-4">
      <p className="text-slate-300 mb-2"><span className="font-semibold text-white">Bio:</span> {member.bio}</p>
      <div className="mb-2">
        <span className="font-semibold text-white">Skills:</span>
        <ul className="list-disc list-inside text-slate-300 ml-2">
          {member.skills.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-white">Contributions:</span>
        <ul className="list-disc list-inside text-slate-300 ml-2">
          {member.contributions.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      {member.socials && (
        <div className="flex gap-4 mt-2">
          {member.socials.linkedin && (
            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LinkedIn</a>
          )}
          {member.socials.github && (
            <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:underline">GitHub</a>
          )}
          {member.socials.twitter && (
            <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Twitter</a>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMemberDetails;
