
// import React from 'react';
// import { PROJECTS } from '../constants';
// import { ProjectCategory } from '../types';
// // import { Link } from 'react-router-dom';

// const GamesPage: React.FC = () => {
//   const games = PROJECTS.filter(
//     (project) => project.category === ProjectCategory.UNITY || project.category === ProjectCategory.WEB_GAMES
//   );

//   return (
//     <div className="max-w-5xl mx-auto py-10 px-4">
//       <h1 className="text-3xl font-bold text-white mb-8 text-center">Our Published Games</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {games.map((game) => (
//           <div key={game.id} className="bg-slate-800/70 rounded-lg shadow-md p-6 flex flex-col items-center">
//             <img src={game.imageUrl} alt={game.title} className="w-full h-40 object-cover rounded mb-4" />
//             <h2 className="text-xl font-semibold text-white mb-2">{game.title}</h2>
//             <p className="text-slate-300 mb-4">{game.description}</p>
//             {/* {game.demoUrl && (
//               game.demoUrl.startsWith('/') ? (
//                 <Link to={game.demoUrl} className="text-indigo-400 hover:underline">Play Now</Link>
//               ) : (
//                 <a href={game.demoUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Play Now</a>
//               )
//             )} */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GamesPage;



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
