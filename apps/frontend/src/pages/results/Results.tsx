import { ArrowsCounterClockwiseIcon, CheckCircleIcon, CheckIcon, CodeIcon, FileArrowDownIcon, LightbulbFilamentIcon, ThumbsUpIcon, UsersFourIcon, WarningCircleIcon, WarningIcon, WarningOctagonIcon } from "@phosphor-icons/react"
import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"
import { Link } from "react-router-dom"

function Results() {

  const result = {
    "tech_score": 87,
    "soft_score": 92,
    "job_match": 89,
    "strengths": [
      "Experiência em desenvolvimento full stack com JavaScript e TypeScript",
      "Conhecimento em React e integração de APIs",
      "Experiência em gestão de projetos e liderança de equipes",
      "Familiaridade com testes utilizando Jest",
      "Experiência em criação de dashboards e análise de dados",
    ],
    "weaknesses": [
      "Não possui experiência explícita com Material-UI (MUI)",
      "Não menciona experiência com React Hooks avançado ou patterns de otimização",
      "Falta de experiência com testes E2E/integração usando Cypress",
      "Não possui conhecimento em Cloud Services AWS",
      "Não menciona experiência com Java ou plataformas CMS"
    ],
    "recommendations": [
      "Aprimorar conhecimentos em Material-UI e React Hooks avançado",
      "Adquirir experiência com testes E2E utilizando Cypress",
      "Buscar cursos ou projetos que envolvam AWS e outras Cloud Services",
      "Explorar desenvolvimento em Java e plataformas CMS para diversificação de habilidades"
    ]
  }

  return (
    <div className="bg-linear-to-br from-slate-50 to-blue-50">
      <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-linear-to-r from-green-500 to-emerald-600 rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <CheckIcon size={44} className="" />
              </div>
              <div>
                <p className="text-3xl font-bold mb-2">Análise Concluída!</p>
                <p className="text-green-100">Seu currículo for analisado com sucesso</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* TECH SKILLS */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CodeIcon size={28} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Tech Skills</p>
                  <p className="text-3xl font-bold text-slate-900">{result.tech_score}/100</p>
                </div>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000" style={{ width: `${result.tech_score}%` }}></div>
              </div>
            </div>

            {/* SOFT SKILLS */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <UsersFourIcon size={28} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Soft Skills</p>
                  <p className="text-3xl font-bold text-slate-900">{result.soft_score}/100</p>
                </div>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-1000" style={{ width: `${result.soft_score}%` }}></div>
              </div>
            </div>

            {/* COMPATIBILIDADE */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircleIcon size={28} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Compatibilidade</p>
                  <p className="text-3xl font-bold text-slate-900">{result.job_match}/100</p>
                </div>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000" style={{ width: `${result.job_match}%` }}></div>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* PONTOS FORTES */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ThumbsUpIcon size={24} className="text-green-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">Pontos Fortes</p>
              </div>
              <ul className="space-y-4">
                {result.strengths.map((strengths, id) => (
                  <li className="flex gap-3" key={id}>
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon size={14} className="text-green-700" />
                    </div>
                    <p className="text-slate-700 leading-relaxed">{strengths}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* PONTOS DE MELHORIA */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <WarningIcon size={24} className="text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">Pontos de Melhoria</p>
              </div>
              <ul className="space-y-4">
                {result.weaknesses.map((weaknesses, id) => (
                  <li className="flex gap-3" key={id}>
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <WarningCircleIcon size={14} className="text-orange-600" />
                    </div>
                    <p className="text-slate-700 leading-relaxed">{weaknesses}</p>
                  </li>
                ))}
              </ul>
            </div>
      
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 mb-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <LightbulbFilamentIcon size={24} className="text-indigo-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">Recomendações</p>
            </div>
            <ul className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {result.recommendations.map((recommendations, id) => (
                  <li className="flex gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-100" key={id}>
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      {id+1}
                    </div>
                    <p className="text-slate-700 leading-relaxed">{recommendations}</p>
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
              <p className="font-semibold text-yellow-600 text-sm">Disclaimer: Resultado gerado por IA. Pode haver erros, utilize apenas como referência.</p>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            {/* <button className="px-8 py-4 bg-white text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors border-2 border-slate-200 whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"> */}
            <Link to={"/upload"} className="px-8 py-4 bg-white text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors border-2 border-slate-200 whitespace-nowrap cursor-pointer flex items-center justify-center gap-2">
              <ArrowsCounterClockwiseIcon size={18} />
              Nova Análise
            </Link>
            {/* </button> */}
            <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2">
              <FileArrowDownIcon size={24} className="text-white" />
              Exportar Relatório PDF
            </button>
          </div>
        </div>
      <Footer/>
    </div>
  )
}

export default Results