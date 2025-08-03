import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  bgColor?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, bgColor = 'bg-white' }) => {
  return (
    <section id={id} className={`min-h-screen ${bgColor} py-20`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        <div className="flex items-center justify-center">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;