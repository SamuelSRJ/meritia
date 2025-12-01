import { BriefcaseIcon, CloudArrowUpIcon, FileArrowUpIcon } from "@phosphor-icons/react"
import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"

function Upload() {
  return (
    <div className="w-full bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <div className="container mx-auto ">
        <p className="text-4xl font-bold text-slate-900 mt-8 mb-4 text-center">Análise Inteligente de Currículo</p>
        <p className="text-lg text-slate-600 mb-12 text-center">Envie seu currículo e a descrição da vaga para receber uma análise detalhada com AI</p>
        <div className="border border-slate-200 bg-white rounded-2xl shadow-xl p-8 w-[70vw] mx-auto mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-13 h-13 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileArrowUpIcon size={24} className="text-blue-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">Envie seu Currículo</p>
              <p className="text-slate-600">Formatos suportados: PDF, DOC, DOCX (máx. 5MB)</p>
            </div>
          </div>
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <input id="cv-upload" type="file" className="hidden" accept=".pdf,.doc,.docx" />
            <label htmlFor="cv-upload" className="cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CloudArrowUpIcon size={28} className="text-blue-700" />
              </div>  
              <p className="text-lg font-semibold text-slate-900 mb-2">Clique para selecionar ou arraste seu currículo</p>
              <p className="text-sm text-slate-500">PDF, DOC ou DOCX até 5MB</p>
            </label>
          </div>
        </div>
        <div className="border border-slate-200 bg-white rounded-2xl shadow-xl p-8 w-[70vw] mx-auto mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-13 h-13 bg-blue-100 rounded-lg flex items-center justify-center">
              <BriefcaseIcon size={24} className="text-blue-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">Descrição da Vaga</p>
              <p className="text-slate-600">Cole aqui a descrição da vaga desejada</p>
            </div>
          </div>
          <textarea 
            name="vaga-desc"
            id="vaga-desc"
            className="w-full h-64 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none text-slate-700 text-sm"
            placeholder="Cole aqui a descrição da vaga, incluindo requisitos técnicos, soft skills desejadas, responsabilidades e qualquer outra informação relevante..."
            maxLength={500}>
          </textarea>
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm text-slate-500">Quanto mais detalhes, melhor será a análise</p>
            <p className="text-sm text-slate-400">{0}/500</p>
          </div>
        </div>
        <div className="flex gap-4 justify-center mb-10">
          <button className="px-8 py-4 bg-white text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors border-2 border-slate-200 whitespace-nowrap cursor-pointer">Cancelar</button>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colorsdisable:bg-slate-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer flex items-center gap-2">Iniciar Análise</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Upload