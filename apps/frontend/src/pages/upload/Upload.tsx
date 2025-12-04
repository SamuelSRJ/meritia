import { BriefcaseIcon, CheckIcon, CloudArrowUpIcon, FileArrowUpIcon, FileTextIcon, XIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";


function Upload() {

  const [filename, setFilename] = useState<string>("");
  const [fileSizeKB, setFileSizeKB] = useState<number>(0);
  const [limite, setLimit] = useState(0);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const maxBytes = 5 * 1024 * 1024
    if (file.size > maxBytes) {
      setError("Arquivo maior que 5MB");
      setFilename("");
      setFileSizeKB(0);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setError("");
    setFilename(file.name);
    setFileSizeKB(Math.round(file.size / 1024));
  };

  const handleRemoveFile = () => {
    setFilename("");
    setFileSizeKB(0);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

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
            <input id="cv-upload" type="file" className="hidden" accept=".pdf,.doc,.docx" ref={inputRef} onChange={handleFileChange} />
            {
              !filename ?
                <label htmlFor="cv-upload" className="cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CloudArrowUpIcon size={28} className="text-blue-700" />
                </div>  
                <p className="text-lg font-semibold text-slate-900 mb-2">Clique para selecionar ou arraste seu currículo</p>
                <p className="text-sm text-slate-500">PDF, DOC ou DOCX até 5MB</p>
              </label> 
              :
              <div className="cursor-default">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileTextIcon size={28} className="text-green-700" />
                </div>  
                <p className="text-lg font-semibold text-slate-900 mb-2">{filename}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-4 h-4 flex bg-green-600 rounded-full items-center justify-center">
                    <CheckIcon size={12} className="text-white" />
                  </div>
                  <p className="text-green-400 text-sm">Arquivo carregado • {fileSizeKB} KB</p>
                </div>
                <button onClick={handleRemoveFile}>
                  <div className="flex items-center justify-center gap-1 rounded-lg py-1 px-3 bg-red- hover:bg-red-100 cursor-pointer transition-colors">
                    <div className="flex items-center justify-center">
                      <XIcon size={12} className="text-red-500" />
                    </div>
                    <p className="text-red-400 text-sm">Remover arquivo</p>
                  </div>
                </button>
              </div>
            }
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}           
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
            maxLength={1000}>
          </textarea>
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm text-slate-500">Quanto mais detalhes, melhor será a análise</p>
            <p className="text-sm text-slate-400">{0}/1000</p>
          </div>
        </div>
        <div className="flex gap-4 justify-center mb-10">
          <button className="px-8 py-4 bg-white text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors border-2 border-slate-200 whitespace-nowrap cursor-pointer">Cancelar</button>
          {/* <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colorsdisable:bg-slate-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer flex items-center gap-2">Iniciar Análise</button> */}
          <Link to={"/results"} className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colorsdisable:bg-slate-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer flex items-center gap-2">Iniciar Análise</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Upload