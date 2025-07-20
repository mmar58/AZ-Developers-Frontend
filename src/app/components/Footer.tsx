
"use client";
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 py-8 text-center text-slate-400">
        <p className="text-2xl font-bold text-white mb-2">Ready to build something amazing?</p>
        <p className="mb-4">Let's connect and turn your idea into reality.</p>
        <button
          type="button"
          className="inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300 mb-8"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('openContactModal'));
            }
          }}
        >
          Get in Touch
        </button>
        <div className="border-t border-slate-800 pt-8">
            <p>&copy; {new Date().getFullYear()} AZ Developers. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
