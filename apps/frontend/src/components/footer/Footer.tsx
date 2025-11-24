import { ReadCvLogoIcon } from "@phosphor-icons/react"

function Footer() {
  return (
    <footer className="bg-slate-900">
      <div className="container mx-auto p-4 md:py-8 text-white">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <ReadCvLogoIcon size={28} className="bg-blue-600 p-1 rounded-sm" />
            <span className="text-heading self-center text-2xl font-semibold whitespace-nowrap">CV Analyzer</span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-body sm:mb-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Inicio</a>
            </li>
            <li>
              <a href="#comofunciona" className="hover:underline me-4 md:me-6">Como funciona</a>
            </li>
            <li>
              <a href="#publicoalvo" className="hover:underline me-4 md:me-6">Recursos</a>
            </li>
            <li>
              <a href="https://samuelsrj.vercel.app/" target="_blank" className="hover:underline">Contato</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-default sm:mx-auto lg:my-8 text-slate-500" />
        <span className="block text-sm text-body sm:text-center">Desenvolvido por <a href="https://samuelsrj.vercel.app/" target="_blank" className="underline">SamuelSRJ</a>. Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}

export default Footer