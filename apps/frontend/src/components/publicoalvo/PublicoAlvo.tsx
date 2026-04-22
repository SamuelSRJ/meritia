import { CheckIcon, FileArrowDownIcon, UserCheckIcon, UsersThreeIcon } from "@phosphor-icons/react"

function PublicoAlvo() {
  return (
    <div className="flex py-20 bg-linear-to-br from-blue-600 to-indigo-700">
      <div className="container mx-auto items-center grid grid-cols-2 gap-12">
        <div>
          <div className="p-4">
            <p className="text-4xl font-bold text-white mb-6">Para Desenvolvedores e Profissionais de RH</p>
            <div className="flex flex-col gap-8">
              {/* PARA CANDIDATOS */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                  <UserCheckIcon size={24} className="text-white text-2xl" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-white mb-2">Para Candidatos</p>
                  <p className="text-blue-100">Melhore seu currículo antes de se candidatar. Identifique gaps de habilidades e receba recomendações para aumentar suas chances.</p>
                </div>
              </div>
              {/* PARA RECRUTADORES */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                  <UsersThreeIcon size={24} className="text-white text-2xl" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-white mb-2">Para Recrutadores</p>
                  <p className="text-blue-100">Filtre candidatos de forma eficiente. Analise a compatibilidade de currículos com a vaga e identifique os melhores talentos.</p>
                </div>
              </div>
              {/* RELATÓRIOS EM PDF */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                  <FileArrowDownIcon size={24} className="text-white text-2xl" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-white mb-2">Relatórios em PDF</p>
                  <p className="text-blue-100">Exporte análises completas em PDF para compartilhar com sua equipe ou guardar para referência futura. (EM BREVE...)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <p className="text-2xl text-white font-semibold mb-6">O que você recebe:</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <CheckIcon className="text-xl text-green-300 mt-0.5" />
                <span className="text-white">Nota de Tech Skills (0-100)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="text-xl text-green-300 mt-0.5" />
                <span className="text-white">Nota de Soft Skills (0-100)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="text-xl text-green-300 mt-0.5" />
                <span className="text-white">Compatibilidade com a vaga</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="text-xl text-green-300 mt-0.5" />
                <span className="text-white">Análise de pontos fortes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="text-xl text-green-300 mt-0.5" />
                <span className="text-white">Análise de pontos fracos</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="text-xl text-green-300 mt-0.5" />
                <span className="text-white">Recomendações personalizadas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="text-xl text-green-300 mt-0.5" />
                <span className="text-white">Exportação em PDF</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicoAlvo