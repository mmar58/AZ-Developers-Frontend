import React from 'react';
import { PROJECTS } from '../constants';
import ProjectCard from '../components/ProjectCard'; 
const ProjectsPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#3f4555' }}>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center mt-6 mb-8">
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