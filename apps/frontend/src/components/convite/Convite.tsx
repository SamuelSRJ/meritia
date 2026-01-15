import { ArrowRightIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

function Convite() {
  return (
    <div className="p-20">
      <div className="mx-auto px-4 text-center">
        <p className="text-4xl font-bold text-slate-900 mb-6">Pronto para melhorar seu curriculo?</p>
        <p className="text-xl text-slate-600 mb-8">Comece agora e descubra como seu currículo se compara às vagas que você deseja.</p>
        {!localStorage.user ? (
          <Link to={"/login"} className="px-10 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg whitespace-nowrap cursor-pointer inline-flex items-center gap-2">
            Iniciar Análise Gratuita
            <ArrowRightIcon size={24} />
          </Link>
        ) : (
          <Link to={"/upload"} className="px-10 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg whitespace-nowrap cursor-pointer inline-flex items-center gap-2">
            Iniciar Análise Gratuita
            <ArrowRightIcon size={24} />
          </Link>
        )}
      </div>
    </div>
  )
}

export default Convite