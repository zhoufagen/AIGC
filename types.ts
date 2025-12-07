export interface DreamAnalysis {
  title: string;
  interpretation: string;
  mood: string;
  symbols: string[];
  luckyNumber: number;
}

export interface DreamState {
  isAnalyzing: boolean;
  isVisualizing: boolean;
  analysis: DreamAnalysis | null;
  imageUrl: string | null;
  error: string | null;
}
