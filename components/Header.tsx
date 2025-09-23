
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#161b22] border-b border-gray-800 p-4">
      <div className="container mx-auto flex items-center gap-4">
        <div className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
           </svg>
        </div>
        <div>
           <h1 className="text-2xl font-bold text-white">Gemini Code Inspector</h1>
           <p className="text-sm text-gray-400">Instant AI-Powered Code Reviews</p>
        </div>
      </div>
    </header>
  );
};
