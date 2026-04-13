import { createContext, useContext, useState } from "react";

interface AnalysisResult {
  tech_score: number;
  soft_score: number;
  job_match: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

interface AnalysisContextType {
  result: AnalysisResult | null;
  setResult: (result: AnalysisResult) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined,
);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <AnalysisContext.Provider
      value={{ result, setResult, loading, setLoading, error, setError }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error("useAnalysis deve ser usado dentro de AnalysisProvider");
  }
  return context;
}
