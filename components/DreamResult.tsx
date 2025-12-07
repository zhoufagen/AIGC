import React from 'react';
import { DreamAnalysis } from '../types';

interface DreamResultProps {
  analysis: DreamAnalysis | null;
  imageUrl: string | null;
  onReset: () => void;
}

const DreamResult: React.FC<DreamResultProps> = ({ analysis, imageUrl, onReset }) => {
  if (!analysis) return null;

  return (
    <div className="w-full max-w-6xl mx-auto animate-[fadeIn_1s_ease-out]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Visual Card */}
        <div className="order-2 lg:order-1 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-square flex items-center justify-center">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={analysis.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-serif">Manifesting vision...</p>
              </div>
            )}
            
            {/* Overlay Title */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-24">
              <h3 className="text-2xl font-serif text-white">{analysis.title}</h3>
            </div>
          </div>
        </div>

        {/* Text Analysis Card */}
        <div className="order-1 lg:order-2 flex flex-col justify-center">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl h-full relative overflow-hidden">
             {/* Decorative mystic circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 space-y-6">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-purple-300 mb-2 block">Interpretation</span>
                <p className="text-lg leading-relaxed text-purple-50 font-sans border-l-4 border-purple-500 pl-4">
                  {analysis.interpretation}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-pink-300 block mb-1">Mood</span>
                  <span className="text-xl font-serif text-white">{analysis.mood}</span>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-yellow-300 block mb-1">Lucky Number</span>
                  <span className="text-4xl font-serif text-white font-bold">{analysis.luckyNumber}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-blue-300 block mb-3">Key Symbols</span>
                <div className="flex flex-wrap gap-2">
                  {analysis.symbols.map((symbol, idx) => (
                    <span key={idx} className="px-3 py-1 bg-indigo-500/30 border border-indigo-400/30 rounded-full text-sm text-indigo-100">
                      {symbol}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={onReset}
          className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-transparent border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          Dream Again
        </button>
      </div>
    </div>
  );
};

export default DreamResult;