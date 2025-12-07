import React, { useState } from 'react';
import StarryBackground from './components/StarryBackground';
import DreamInput from './components/DreamInput';
import DreamResult from './components/DreamResult';
import { analyzeDream, visualizeDream } from './services/geminiService';
import { DreamAnalysis, DreamState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<DreamState>({
    isAnalyzing: false,
    isVisualizing: false,
    analysis: null,
    imageUrl: null,
    error: null,
  });

  const handleDreamSubmit = async (text: string) => {
    setState(prev => ({ 
      ...prev, 
      isAnalyzing: true, 
      isVisualizing: true, 
      error: null,
      analysis: null,
      imageUrl: null 
    }));

    // Start Analysis
    try {
      const analysisData = await analyzeDream(text);
      setState(prev => ({ 
        ...prev, 
        analysis: analysisData,
        isAnalyzing: false
      }));

      // Only start visualization if analysis succeeds (we need the mood/context sometimes, but here we run parallel-ish for speed, 
      // but passing the original text is fine. Alternatively, we could wait for analysis to get a better prompt).
      // Let's chain it slightly to use the mood from analysis for a better image prompt.
      
      try {
        const generatedImageUrl = await visualizeDream(text, analysisData.mood);
        setState(prev => ({ 
            ...prev, 
            imageUrl: generatedImageUrl,
            isVisualizing: false 
        }));
      } catch (imgError) {
        console.error("Image generation failed", imgError);
        // We don't fail the whole state, just the image part
        setState(prev => ({ ...prev, isVisualizing: false }));
      }

    } catch (error) {
      console.error("Dream analysis failed", error);
      setState(prev => ({ 
        ...prev, 
        isAnalyzing: false, 
        isVisualizing: false,
        error: "The mists are too thick. The oracle could not interpret your dream. Please check your API Key or try again."
      }));
    }
  };

  const resetDream = () => {
    setState({
      isAnalyzing: false,
      isVisualizing: false,
      analysis: null,
      imageUrl: null,
      error: null,
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans selection:bg-purple-500 selection:text-white">
      <StarryBackground />
      
      <main className="container mx-auto px-4 py-12 relative z-10 min-h-screen flex flex-col items-center justify-center">
        
        {/* Header */}
        <header className={`text-center mb-12 transition-all duration-700 ${state.analysis ? 'scale-75 mb-8' : ''}`}>
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full"></div>
            <h1 className="relative text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-indigo-200 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              DreamWeave
            </h1>
          </div>
          <p className={`mt-4 text-lg text-indigo-200/80 font-light tracking-wide max-w-lg mx-auto transition-opacity duration-500 ${state.analysis ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
            Enter the realm of subconscious. Reveal the hidden meanings and visualize the ethereal landscapes of your dreams.
          </p>
        </header>

        {/* Content Area */}
        <div className="w-full transition-all duration-500">
          {state.error && (
            <div className="max-w-md mx-auto mb-8 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-100 text-center animate-pulse">
              {state.error}
            </div>
          )}

          {!state.analysis && !state.isAnalyzing ? (
            <DreamInput onSubmit={handleDreamSubmit} isLoading={state.isAnalyzing} />
          ) : (
            <DreamResult 
              analysis={state.analysis} 
              imageUrl={state.imageUrl}
              onReset={resetDream}
            />
          )}

          {/* Loading State for initial transition */}
          {state.isAnalyzing && !state.analysis && (
             <div className="flex flex-col items-center justify-center space-y-4 mt-8">
               <div className="relative w-24 h-24">
                 <div className="absolute inset-0 border-t-4 border-purple-500 rounded-full animate-spin"></div>
                 <div className="absolute inset-2 border-r-4 border-indigo-400 rounded-full animate-spin-slow"></div>
                 <div className="absolute inset-4 border-b-4 border-pink-500 rounded-full animate-[spin_3s_linear_infinite]"></div>
               </div>
               <p className="text-purple-200 animate-pulse font-serif tracking-widest">Consulting the Oracle...</p>
             </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-4 w-full text-center text-white/20 text-xs z-10 pointer-events-none">
        <p>Powered by Gemini 2.5 Flash & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default App;