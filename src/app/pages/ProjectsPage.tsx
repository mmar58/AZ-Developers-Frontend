import React from 'react';
import { PROJECTS } from '../constants';

const ProjectsPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#3f4555' }}>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Our Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map(project => (
            <div key={project.id} className="bg-slate-800/70 rounded-lg shadow-md p-6 flex flex-col items-center">
              <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover rounded mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">{project.title}</h2>
              <p className="text-slate-300 mb-4">{project.description}</p>
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">View Demo</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;

