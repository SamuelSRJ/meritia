import { CheckIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

function Inicio() {
  return (
    <div className="lg:h-[80vh] bg-blue-50 flex p-2 lg:p-0">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 space-y-3 lg:space-x-3 items-center">
        <div className="mt-6 p-2 lg:p-0">
          <p className="text-3xl lg:text-5xl text-center lg:text-left font-bold text-slate-900 mb-6 leading-tight">Avalie seu currículo com Inteligência Artificial</p>
          <p className="text-xl text-center lg:text-left text-slate-600 mb-8 leading-relaxed">Analise a compatibilidade do seu currículo com vagas de emprego usando IA avançada. Receba feedback detalhado sobre suas habilidades técnicas, soft skills e recomendações personalizadas.</p>
          <div className="flex gap-4 mx-auto">
            {!localStorage.user ? (
              <Link to={"/upload"} className="px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg whitespace-nowrap cursor-pointer">Começar Análise</Link>
            ) : (
              <Link to={"/upload"} className="px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg whitespace-nowrap cursor-pointer">Começar Análise</Link>
            )}
            <a href="#comofunciona" className="px-6 py-4 bg-white text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors text-lg border-2 border-slate-200 whitespace-nowrap cursor-pointer">Saiba Mais</a>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i className=""><CheckIcon size={24} className="text-green-600" /></i>
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
                <span className="text-sm font-medium text-slate-700">Tech Skills</span>
                <span className="text-sm font-bold text-blue-600">92/100</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>
            {/* SOFT SKILLS */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Soft Skills</span>
                <span className="text-sm font-bold text-blue-600">88/100</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-indigo-500 to-indigo-600 rounded-full" style={{ width: "88%" }}></div>
              </div>
            </div>
            {/* COMPATIBILIDADE */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Compatibilidade</span>
                <span className="text-sm font-bold text-blue-600">95/100</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-green-500 to-green-600 rounded-full" style={{ width: "95%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inicio