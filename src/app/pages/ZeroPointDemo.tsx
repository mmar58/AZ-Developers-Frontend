"use client";
import React from 'react';
import ZeroPointEnergyHero from '../components/ZeroPointEnergyHero';

const ZeroPointDemo: React.FC = () => {
  return (
    <div className="min-h-screen">
      <ZeroPointEnergyHero />
      
      {/* Demo content section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-8 font-mono">
            Zero Point Energy Lab Animation Demo
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Animation Sequence</h3>
              <ol className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="bg-cyan-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>"Zero Point Energy Lab" text appears with staggered animation</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-cyan-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Letters animate as quantum strings with vibration and stretching</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-cyan-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Letters converge and transform into an infinity symbol</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-cyan-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Infinity symbol morphs into a 3D rotating energy sphere</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-cyan-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <span>Sphere continues rotating with particle effects (desktop only)</span>
                </li>
              </ol>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">Technical Features</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>GSAP for smooth letter animations and sequencing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Three.js for 3D sphere with custom shaders</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Responsive design with mobile fallbacks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Performance optimizations for different devices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Modular component for easy integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Custom CSS animations for enhanced effects</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="bg-gray-800 p-6 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Integration Instructions</h3>
              <div className="text-left">
                <pre className="bg-gray-900 p-4 rounded text-green-400 text-sm overflow-x-auto">
{`// 1. Install dependencies
npm install gsap three @types/three

// 2. Import the component
import ZeroPointEnergyHero from './components/ZeroPointEnergyHero';

// 3. Use in your page/component
<ZeroPointEnergyHero />

// 4. Optional: Customize colors and text in the component
// 5. For Shopify: Convert to Liquid template syntax`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZeroPointDemo;
