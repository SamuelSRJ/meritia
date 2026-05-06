import { createContext, useContext, useState } from "react";
import { analysisResultSeed } from "../config/seedData.ts";

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

// ⚠️ ALTERNAR ENTRE MODO DESENVOLVIMENTO E PRODUÇÃO
// true = usa seed data (para editar a página)
// false = usa API de IA integrada
const USE_SEED_DATA = false;

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  // Em modo seed data, carrega imediatamente; caso contrário, começa como null
  const [result, setResult] = useState<AnalysisResult | null>(
    USE_SEED_DATA ? analysisResultSeed : null,
  );
  const [loading, setLoading] = useState(false); // Não carrega em modo seed data
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
