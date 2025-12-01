import { BrainIcon, ReadCvLogoIcon, ShieldCheckIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

function Login() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <ReadCvLogoIcon size={48} className="bg-blue-600 text-white p-1 rounded-lg mx-auto mb-4" />
          <p className="text-3xl font-bold text-slate-900 mb-2">CV Analyzer</p>
          <p className="text-slate-600">Análise inteligente de currículos com IA</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <p className="text-2xl font-bold text-slate-900 mb-2">Bem-vindo!</p>
          <p className="text-slate-600 mb-8">Faça login com sua conta Google para acessar os recursos do Gemini AI</p>
          <Link to={"/upload"} className="w-full bg-white border-2 border-slate-700 rounded-lg py-4 px-6 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-3 mb-6 whitespace-nowrap cursor-pointer">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z">
              </path>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z">
              </path>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z">
              </path>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z">
              </path>
            </svg>
            <span>Continuar com Google</span>
          </Link>
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">Por que precisamos do Google?</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <BrainIcon size={28} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 mb-1">Acesso ao Gemini AI</p>
                <p className="text-xs text-slate-600">Utilizamos a API do Google Gemini para análise avançada de currículos</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <ShieldCheckIcon size={28} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 mb-1">Segurança Garantida</p>
                <p className="text-xs text-slate-600">Seus dados são protegidos e nunca compartilhados com terceiros</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-slate-500 mt-6">Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade</p>
      </div>
    </div>
  )
}

export default Login