import {
  CheckIcon,
  LightbulbFilamentIcon,
  ThumbsUpIcon,
  WarningCircleIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Inicio() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[80vh] bg-blue-50 flex items-center">
      <div className="container mx-auto grid grid-cols-2 space-x-4">
        <div className="mt-6">
          <p className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Avalie seu currículo com Inteligência Artificial
          </p>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Analise a compatibilidade do seu currículo com vagas de emprego
            usando IA avançada. Receba feedback detalhado sobre suas habilidades
            técnicas, soft skills e recomendações personalizadas.
          </p>
          <div className="flex gap-4">
            {!localStorage.user ? (
              <Link
                to={"/upload"}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg whitespace-nowrap cursor-pointer"
              >
                Começar Análise
              </Link>
            ) : (
              <Link
                to={"/upload"}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg whitespace-nowrap cursor-pointer"
              >
                Começar Análise
              </Link>
            )}
            <a
              href="#comofunciona"
              className="px-8 py-4 bg-white text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors text-lg border-2 border-slate-200 whitespace-nowrap cursor-pointer"
            >
              Saiba Mais
            </a>
          </div>
        </div>

        <div className="relative w-full self-start">
          {/* SLIDE 1 */}
          <div
            className="absolute bg-white rounded-2xl shadow-2xl p-8 border border-slate-200 transition-opacity duration-700 w-full top-0"
            style={{ opacity: currentSlide === 0 ? 1 : 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i className="">
                  <CheckIcon size={24} className="text-green-600" />
                </i>
              </div>
              <div>
                <div className="text-sm text-slate-500">Análise Completa</div>
                <div className="text-2xl font-bold text-slate-900">95/100</div>
              </div>
            </div>
            <div className="space-y-4">
              {/* TECH SKILLS */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    Tech Skills
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    92/100
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>
              {/* SOFT SKILLS */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    Soft Skills
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    88/100
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-indigo-500 to-indigo-600 rounded-full"
                    style={{ width: "88%" }}
                  ></div>
                </div>
              </div>
              {/* COMPATIBILIDADE */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    Compatibilidade
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    95/100
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-green-500 to-green-600 rounded-full"
                    style={{ width: "95%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 2 */}
          <div
            className="absolute bg-white rounded-2xl shadow-lg p-8 border border-slate-200 transition-opacity duration-700 w-full top-0"
            style={{ opacity: currentSlide === 1 ? 1 : 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ThumbsUpIcon size={20} className="text-green-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">Pontos Fortes</p>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <CheckIcon size={14} className="text-green-700" />
                </div>
                <p className="text-slate-700 leading-relaxed text-base">
                  Experiência sólida em React e TypeScript
                </p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <CheckIcon size={14} className="text-green-700" />
                </div>
                <p className="text-slate-700 leading-relaxed text-base">
                  Conhecimento de banco de dados relacional
                </p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <CheckIcon size={14} className="text-green-700" />
                </div>
                <p className="text-slate-700 leading-relaxed text-base">
                  Excelentes habilidades de resolução de problemas
                </p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <CheckIcon size={14} className="text-green-700" />
                </div>
                <p className="text-slate-700 leading-relaxed text-base">
                  Comunicação clara e documentação de código
                </p>
              </li>
            </ul>
          </div>

          {/* SLIDE 3 */}
          <div
            className="absolute bg-white rounded-2xl shadow-lg p-8 border border-slate-200 transition-opacity duration-700 w-full top-0"
            style={{ opacity: currentSlide === 2 ? 1 : 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <WarningIcon size={24} className="text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">
                Pontos de Melhoria
              </p>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <WarningCircleIcon size={14} className="text-orange-600" />
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Experiência limitada com DevOps
                </p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <WarningCircleIcon size={14} className="text-orange-600" />
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Falta de conhecimento em Machine Learning
                </p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <WarningCircleIcon size={14} className="text-orange-600" />
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Desenvolvimento mobile menos explorado
                </p>
              </li>
            </ul>
          </div>

          {/* SLIDE 4 */}
          <div
            className="absolute bg-white rounded-2xl shadow-lg p-8 border border-slate-200 transition-opacity duration-700 w-full mb-4 top-0"
            style={{ opacity: currentSlide === 3 ? 1 : 0 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <LightbulbFilamentIcon size={24} className="text-indigo-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">Recomendações</p>
            </div>
            <ul className="space-y-2">
              <li className="flex gap-3 p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  1
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Estudar ferramentas de CI/CD como GitHub Actions ou Jenkins
                </p>
              </li>
              <li className="flex gap-3 p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  2
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Aprender conceitos básicos de containerização com Docker
                </p>
              </li>
              <li className="flex gap-3 p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  3
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Explorar frameworks de mobile como React Native
                </p>
              </li>
              <li className="flex gap-3 p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  4
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Desenvolver um projeto pessoal com arquitetura mais complexa
                </p>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Inicio;
