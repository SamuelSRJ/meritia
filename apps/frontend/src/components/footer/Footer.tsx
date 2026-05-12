import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900">
      <div className="container mx-auto p-4 md:py-8 text-white">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to={"/"}
            className="flex items-center mb-4 sm:mb-0 space-x-1 rtl:space-x-reverse"
          >
            <img
              src="/meritia.png"
              className="w-12 h-12 p-1 rounded-sm"
            />
            <span className="text-heading self-center text-3xl font-semibold whitespace-nowrap">
              Meritia
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-body sm:mb-0">
            <li>
              <Link to={"/#"} className="hover:underline me-4 md:me-6">
                Inicio
              </Link>
            </li>
            <li>
              <Link to={"/#"} className="hover:underline me-4 md:me-6">
                Como funciona
              </Link>
            </li>
            <li>
              <Link to={"/#"} className="hover:underline me-4 md:me-6">
                Recursos
              </Link>
            </li>
            <li>
              <a
                href="https://samuelsrj.vercel.app/"
                target="_blank"
                className="hover:underline"
              >
                Contato
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-default sm:mx-auto lg:my-8 text-slate-500" />
        <span className="block text-sm text-body sm:text-center">
          Desenvolvido por{" "}
          <a
            href="https://samuelsrj.vercel.app/"
            target="_blank"
            className="underline"
          >
            SamuelSRJ
          </a>
          . Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
