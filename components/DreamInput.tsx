import React, { useState } from 'react';

interface DreamInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const DreamInput: React.FC<DreamInputProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl transform transition-all duration-500 hover:scale-[1.01]">
      <h2 className="text-3xl font-serif text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
        Share Your Dream
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
            placeholder="I was flying over a golden ocean..."
            className="relative w-full h-40 bg-gray-900/90 text-purple-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none text-lg font-sans placeholder-gray-500 border border-gray-700"
          />
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading || !text.trim()}
            className={`
              relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-serif text-lg font-bold tracking-wide shadow-lg
              transform transition-all duration-300
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-purple-500/50 hover:scale-105 active:scale-95'}
            `}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Divining...
              </span>
            ) : (
              'Weave Dream'
            )}
            {!isLoading && <div className="absolute inset-0 rounded-full ring-2 ring-white/20 animate-pulse-slow"></div>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DreamInput;