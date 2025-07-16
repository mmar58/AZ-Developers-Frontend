
import React from 'react';
import { PROJECTS } from '../constants';
import { ProjectCategory } from '../types';
// import { Link } from 'react-router-dom';

const GamesPage: React.FC = () => {
  const games = PROJECTS.filter(
    (project) => project.category === ProjectCategory.UNITY || project.category === ProjectCategory.WEB_GAMES
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Our Published Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <div key={game.id} className="bg-slate-800/70 rounded-lg shadow-md p-6 flex flex-col items-center">
            <img src={game.imageUrl} alt={game.title} className="w-full h-40 object-cover rounded mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">{game.title}</h2>
            <p className="text-slate-300 mb-4">{game.description}</p>
            {/* {game.demoUrl && (
              game.demoUrl.startsWith('/') ? (
                <Link to={game.demoUrl} className="text-indigo-400 hover:underline">Play Now</Link>
              ) : (
                <a href={game.demoUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Play Now</a>
              )
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
