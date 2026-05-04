import {
  BriefcaseIcon,
  CheckIcon,
  CloudArrowUpIcon,
  FileArrowUpIcon,
  FileTextIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useAnalysis } from "../../context/AnalysisContext";

function Upload() {
  const [filename, setFilename] = useState<string>("");
  const [fileSizeKB, setFileSizeKB] = useState<number>(0);
  const [limit, setLimit] = useState(0);
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileRef = useRef<File | null>(null);
  const navigate = useNavigate();
  const { setResult, setError: setContextError } = useAnalysis();
  const maxChars: number = 2000;

  const processFile = (file: File | undefined) => {
    if (!file) return;
    const maxBytes = 5 * 1024 * 1024;
    if (file.size > maxBytes) {
      setError("Arquivo maior que 5MB");
      setFilename("");
      setFileSizeKB(0);
      fileRef.current = null;
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Formato do arquivo não suportado");
      setFilename("");
      setFileSizeKB(0);
      fileRef.current = null;
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setError("");
    setFilename(file.name);
    setFileSizeKB(Math.round(file.size / 1024));
    fileRef.current = file;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  const handleRemoveFile = () => {
    setFilename("");
    setFileSizeKB(0);
    setError("");
    fileRef.current = null;
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleReset = () => {
    setFilename("");
    setFileSizeKB(0);
    setError("");
    setLimit(0);
    fileRef.current = null;
    if (inputRef.current) inputRef.current.value = "";
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLimit(e.target.value.length);
  };

  const getApiUrl = () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    if (baseUrl) {
      return baseUrl;
    }
    // Fallback dinâmico: usa a máquina host na porta 4000
    return `http://${window.location.hostname}:4000`;
  };

  const handleAnalyze = async () => {
    setUploadError("");
    setContextError(null);

    // Validações
    if (!fileRef.current) {
      setUploadError("Por favor, selecione um arquivo de currículo");
      return;
    }

    const jobDescription = textareaRef.current?.value.trim();
    if (!jobDescription) {
      setUploadError("Por favor, descreva a vaga");
      return;
    }

    // Preparar FormData
    const formData = new FormData();
    formData.append("resume", fileRef.current); // ← Nome CORRETO para o backend
    formData.append("jobDescription", jobDescription);

    setIsAnalyzing(true);

    try {
      const response = await fetch(`${getApiUrl()}/resume/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao processar o currículo");
      }

      const data = await response.json();
      setResult(data);
      navigate("/results");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro desconhecido ao processar";
      setUploadError(message);
      setContextError(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <div className="container mx-auto ">
        <p className="text-3xl lg:text-4xl font-bold text-slate-900 mt-8 mb-4 text-center">
          Análise Inteligente de Currículo
        </p>
        <p className="text-lg text-slate-600 mb-12 text-center">
          Envie seu currículo e a descrição da vaga para receber uma análise
          detalhada com AI
        </p>
        <div className="border border-slate-200 bg-white rounded-2xl shadow-xl p-4 lg:p-8 lg:w-[70vw] mx-2 lg:mx-auto mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-15 lg:w-13 lg:h-13 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileArrowUpIcon size={36} className="text-blue-700" />
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-bold text-slate-900">
                Envie seu Currículo
              </p>
              <p className="text-slate-600">
                Formatos suportados: PDF, DOC, DOCX (máx. 5MB)
              </p>
            </div>
          </div>
          <div
            className={
              "border-2 border-dashed rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer " +
              (isDragging ? "border-blue-400 bg-blue-50" : "border-slate-300")
            }
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              id="cv-upload"
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              ref={inputRef}
              onChange={handleFileChange}
            />
            {!filename ? (
              <label htmlFor="cv-upload" className="cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CloudArrowUpIcon size={28} className="text-blue-700" />
                </div>
                <p className="text-lg font-semibold text-slate-900 mb-2">
                  Clique para selecionar ou arraste seu currículo
                </p>
                <p className="text-sm text-slate-500">
                  PDF, DOC ou DOCX até 5MB
                </p>
              </label>
            ) : (
              <div className="cursor-default">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileTextIcon size={28} className="text-green-700" />
                </div>
                <p className="text-lg font-semibold text-slate-900 mb-2">
                  {filename}
                </p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-4 h-4 flex bg-green-600 rounded-full items-center justify-center">
                    <CheckIcon size={12} className="text-white" />
                  </div>
                  <p className="text-green-400 text-sm">
                    Arquivo carregado • {fileSizeKB} KB
                  </p>
                </div>
                <button onClick={handleRemoveFile}>
                  <div className="flex items-center justify-center gap-1 rounded-lg py-1 px-3 bg-red-50 hover:bg-red-100 cursor-pointer transition-colors">
                    <div className="flex items-center justify-center">
                      <XIcon size={12} className="text-red-500" />
                    </div>
                    <p className="text-red-400 text-sm">Remover arquivo</p>
                  </div>
                </button>
              </div>
            )}
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </div>
        </div>

        <div className="border border-slate-200 bg-white rounded-2xl shadow-xl p-4 lg:p-8 lg:w-[70vw] mx-2 lg:mx-auto mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-24 h-15 lg:w-13 lg:h-13 bg-blue-100 rounded-lg flex items-center justify-center">
              <BriefcaseIcon size={36} className="text-blue-700" />
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-bold text-slate-900">
                Descrição da Vaga
              </p>
              <p className="text-slate-600">
                Cole aqui a descrição da vaga desejada{" "}
                <span className="text-slate-400 text-sm">
                  (max. {maxChars} caractéres)
                </span>
              </p>
            </div>
          </div>
          <textarea
            ref={textareaRef}
            name="vaga-desc"
            id="vaga-desc"
            className="w-full h-64 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none text-slate-700 text-sm"
            placeholder="Cole aqui a descrição da vaga, incluindo requisitos técnicos, soft skills desejadas, responsabilidades e qualquer outra informação relevante..."
            maxLength={maxChars}
            onChange={handleTextareaChange}
          ></textarea>
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm text-slate-500">
              Quanto mais detalhes, melhor será a análise
            </p>
            {limit >= maxChars ? (
              <p className="text-sm text-red-400">
                {limit}/{maxChars}
              </p>
            ) : (
              <p className="text-sm text-slate-400">
                {limit}/{maxChars}
              </p>
            )}
          </div>
        </div>

        {uploadError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 w-[70vw] mx-auto">
            <p className="text-red-700 text-sm">{uploadError}</p>
          </div>
        )}

        <div className="flex gap-4 justify-center mb-10">
          <button
            onClick={handleReset}
            className="px-8 py-4 bg-white text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors border-2 border-slate-200 whitespace-nowrap cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !filename || limit === 0}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analisando...
              </>
            ) : (
              "Iniciar Análise"
            )}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Upload;
