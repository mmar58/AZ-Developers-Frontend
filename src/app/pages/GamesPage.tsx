import React from 'react';
import { PROJECTS } from '../constants';
import PageShell from '../components/PageShell';

const GameCard: React.FC<{ title: string; description: string; imageUrl: string; category: string; }> = ({ title, description, imageUrl, category }) => (
    <div className="bg-slate-700 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <span className="text-sm font-semibold text-indigo-400">{category}</span>
            <h3 className="text-xl font-bold text-white mt-2 mb-2">{title}</h3>
            <p className="text-slate-300">{description}</p>
        </div>
    </div>
);


const GamesPage: React.FC = () => {
  return (
    <PageShell 
      title="Our Games"
      subtitle="Explore the interactive worlds we've created, from immersive 3D experiences to fun browser games."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </PageShell>
  );
};

export default GamesPage;




