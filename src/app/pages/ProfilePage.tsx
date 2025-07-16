"use client"
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { TEAM_MEMBERS } from '../constants';

// Social Icons
const socialIcons = {
    github: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    ),
    linkedin: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    ),
    twitter: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
    )
};

const ProfilePage: React.FC = () => {
    const { memberId } = useParams<{ memberId: string }>();
    const member = TEAM_MEMBERS.find(m => m.id === parseInt(memberId || ''));

    if (!member) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white text-center px-6 pt-24">
                <h2 className="text-4xl font-bold mb-4">Team Member Not Found</h2>
                <p className="text-slate-400 mb-8">We couldn't find a profile with that ID.</p>
                <Link href="/team" className="inline-flex items-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Team Page
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-slate-900 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                 <div className="mb-12">
                     <Link href="/team" className="text-indigo-400 hover:text-indigo-300 inline-flex items-center transition-colors duration-300 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        View All Members
                    </Link>
                </div>
                <div className="bg-slate-800/50 rounded-lg shadow-xl max-w-5xl mx-auto p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                    <div className="flex-shrink-0 text-center">
                        <img 
                            src={member.imageUrl} 
                            alt={member.name}
                            className="w-48 h-48 rounded-full object-cover border-4 border-indigo-500 shadow-lg mx-auto"
                        />
                        <div className="mt-6 flex justify-center space-x-4">
                            {Object.entries(member.socials).map(([key, url]) => (
                                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300">
                                    {socialIcons[key as keyof typeof socialIcons]}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="text-center md:text-left w-full">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">{member.name}</h1>
                        <p className="text-2xl text-indigo-400 font-medium mb-6">{member.role}</p>
                        
                        <p className="text-slate-300 mb-8 text-left">{member.bio}</p>

                        <div className="mb-8 text-left">
                            <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-slate-700 pb-2">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {member.skills.map((skill) => (
                                    <span key={skill} className="bg-indigo-500/10 text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="text-left">
                            <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-slate-700 pb-2">Key Contributions</h3>
                            <ul className="space-y-3 text-slate-300">
                                {member.contributions.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="w-5 h-5 mr-3 text-indigo-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;