import { ChartLineIcon, CloudArrowUpIcon, SignInIcon } from "@phosphor-icons/react"

function ComoFunciona() {
  return (
    <div className="flex">
      <div className="container mx-auto items-center py-20">
        <div className="text-center mb-16">
          <div className="text-4xl font-bold text-slate-900 mb-4">Como Funciona</div>
          <div className="text-xl text-slate-600 max-w-2xl mx-auto">Processo simples e rápido para avaliar seu currículo com Inteligência Artificial</div>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {/* STEP 1 */}
          <div className="text-center p-8 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <SignInIcon size={28} className="text-blue-600"></SignInIcon>
            </div>
            <div className="text-xl font-bold text-slate-900 mb-3">1. Faça Login</div>
            <div className="text-slate-600">Entre com sua conta Google para acessar os recursos do Gemini AI de forma segura</div>
          </div>
          {/* STEP 2 */}
          <div className="text-center p-8 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CloudArrowUpIcon size={28} className="text-indigo-600"></CloudArrowUpIcon>
            </div>
            <div className="text-xl font-bold text-slate-900 mb-3">2. Envie os Dados</div>
            <div className="text-slate-600">Anexe seu currículo e cole a descrição da vaga que deseja se candidatar</div>
          </div>
          {/* STEP 3 */}
          <div className="text-center p-8 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ChartLineIcon size={28} className="text-green-600"></ChartLineIcon>
            </div>
            <div className="text-xl font-bold text-slate-900 mb-3">3. Receba Análise</div>
            <div className="text-slate-600">Obtenha notas detalhadas, pontos fortes, fracos e recomendações personalizadas</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComoFunciona