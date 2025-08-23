
import React from 'react';

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const PageShell: React.FC<PageShellProps> = ({ title, subtitle, children }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#3f4555' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">{subtitle}</p>}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PageShell;
