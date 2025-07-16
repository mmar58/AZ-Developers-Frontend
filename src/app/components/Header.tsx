
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white tracking-wider" onClick={() => setIsMenuOpen(false)}>
          <span className="text-indigo-400">AZ</span> Developers
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.name} href={link.href} className="text-slate-300 hover:text-indigo-400 transition-colors duration-300 font-medium">
              {link.name}
            </Link>
          ))}
        </nav>
        <button 
          className="md:hidden text-slate-300 focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
           {isMenuOpen ? (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
           ) : (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
             </svg>
           )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-y-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
         <nav className="px-6 pt-2 pb-4 flex flex-col">
            {NAV_LINKS.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-slate-300 hover:text-indigo-400 transition-colors duration-300 font-medium py-3 text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                    {link.name}
                </Link>
            ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;