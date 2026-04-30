import {
  ArrowsCounterClockwiseIcon,
  CheckCircleIcon,
  CheckIcon,
  CodeIcon,
  FileArrowDownIcon,
  LightbulbFilamentIcon,
  ThumbsUpIcon,
  UsersFourIcon,
  WarningCircleIcon,
  WarningIcon,
  WarningOctagonIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useAnalysis } from "../../context/AnalysisContext";
import { useCountUp } from "../../hooks/useCountUp";

function Results() {
  const navigate = useNavigate();
  const { result, loading } = useAnalysis();

  // Animar os scores e barra quando carregar
  const animatedTechScore = useCountUp(result?.tech_score || 0, 1100);
  const animatedSoftScore = useCountUp(result?.soft_score || 0, 1100);
  const animatedJobMatch = useCountUp(result?.job_match || 0, 1100);

  // Animar barra quando carregar
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    // Inicia animação das barras após delay
    const timer = setTimeout(() => setBarsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [result]);

  useEffect(() => {
    // Redireciona para upload se não há dados de análise e terminou de carregar
    if (!result && !loading) {
      navigate("/upload");
    }
  }, [result, loading, navigate]);

  // Se ainda não carregou os dados, mostra loading
  if (!result) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-blue-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Carregando resultados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-linear-to-r from-green-500 to-emerald-600 rounded-2xl p-4 lg:p-8 mb-8 text-white">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-13 h-12 lg:w-16 lg:h-16 rounded-full bg-white/20 flex items-center justify-center">
              <CheckIcon size={44} className="p-2 lg:p-0" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold mb-2">Análise Concluída!</p>
              <p className="text-green-100">
                Seu currículo foi analisado com sucesso
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* TECH SKILLS */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                <CodeIcon size={28} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Tech Skills
                </p>
                <p className="text-2xl lg:text-3xl font-bold text-slate-900">
                  {animatedTechScore}/100
                </p>
              </div>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000"
                style={{ width: barsVisible ? `${result.tech_score}%` : "0%" }}
              ></div>
            </div>
          </div>

          {/* SOFT SKILLS */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center">
                <UsersFourIcon size={28} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Soft Skills
                </p>
                <p className="text-2xl lg:text-3xl font-bold text-slate-900">
                  {animatedSoftScore}/100
                </p>
              </div>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-1000"
                style={{ width: barsVisible ? `${result.soft_score}%` : "0%" }}
              ></div>
            </div>
          </div>

          {/* COMPATIBILIDADE */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon size={28} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Compatibilidade
                </p>
                <p className="text-2xl lg:text-3xl font-bold text-slate-900">
                  {animatedJobMatch}/100
                </p>
              </div>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000"
                style={{ width: barsVisible ? `${result.job_match}%` : "0%"}}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* PONTOS FORTES */}
          <div className="bg-white rounded-2xl shadow-lg p-5 lg:p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ThumbsUpIcon size={24} className="text-green-600" />
              </div>
              <p className="text-xl lg:text-2xl font-bold text-slate-900">Pontos Fortes</p>
            </div>
            <ul className="space-y-4">
              {result.strengths.map((strength, id) => (
                <li className="flex gap-3" key={id}>
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <CheckIcon size={14} className="text-green-700" />
                  </div>
                  <p className="text-slate-700 leading-relaxed">{strength}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* PONTOS DE MELHORIA */}
          <div className="bg-white rounded-2xl shadow-lg p-5 lg:p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <WarningIcon size={24} className="text-orange-600" />
              </div>
              <p className="text-xl lg:text-2xl font-bold text-slate-900">
                Pontos de Melhoria
              </p>
            </div>
            <ul className="space-y-4">
              {result.weaknesses.map((weakness, id) => (
                <li className="flex gap-3" key={id}>
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <WarningCircleIcon size={14} className="text-orange-600" />
                  </div>
                  <p className="text-slate-700 leading-relaxed">{weakness}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 lg:p-8 border border-slate-200 mb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <LightbulbFilamentIcon size={24} className="text-indigo-600" />
            </div>
            <p className="text-xl lg:text-2xl font-bold text-slate-900">Recomendações</p>
          </div>
          <ul className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {result.recommendations.map((recommendation, id) => (
                <li
                  className="flex gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-100"
                  key={id}
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {id + 1}
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {recommendation}
                  </p>
                </li>
              ))}
            </div>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border px-8 py-4 border-slate-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
              <WarningOctagonIcon size={24} className="text-yellow-600" />
            </div>
            <p className="font-semibold text-yellow-600 text-sm">
              Disclaimer: Resultado gerado por IA. Pode haver erros, utilize
              apenas como referência.
            </p>
          </div>
        </div>
        <div className="grid lg:flex gap-4 justify-center">
          <Link
            to={"/upload"}
            className="px-8 py-4 bg-white text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors border-2 border-slate-200 whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowsCounterClockwiseIcon size={18} />
            Nova Análise
          </Link>
          {/* <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"> */}
          <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors whitespace-nowrap cursor-pointer disabled:bg-linear-to-r disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2" disabled>
            <FileArrowDownIcon size={24} className="text-white" />
            Exportar Relatório PDF
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Results;
