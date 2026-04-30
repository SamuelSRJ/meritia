import { ReadCvLogoIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {

  useAuth();
  
  return (
    <nav className="bg-white w-full">
      <div className="container flex flex-wrap items-center justify-between mx-auto py-4">
        <Link to={"/"} className="flex mx-auto lg:mx-1 items-center space-x-3 rtl:space-x-reverse">
          <ReadCvLogoIcon size={28} className="bg-blue-600 text-white p-1 rounded-sm" />
          <span className="text-2xl text-heading font-semibold whitespace-nowrap">CV Analyzer</span>
        </Link>
        {/* {!user ? (
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link to={"/"} className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">Fazer Login</Link>
          </div>
        ) : (
          <div className="flex md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse items-center">
            <span className="text-slate-400">{user.email}</span>
            <button 
              onClick={logout}
              className="px-5 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors whitespace-nowrap cursor-pointer">Sair</button>
          </div>
        )} */}
      </div>
    </nav>
  )
}

export default Navbar