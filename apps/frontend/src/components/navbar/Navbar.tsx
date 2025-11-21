
function Navbar() {
  return (
    <nav className="bg-white w-full">
      <div className="container flex flex-wrap items-center justify-between mx-auto py-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-7" alt="Flowbite Logo"/>
          <span className="self-center text-2xl text-heading font-semibold whitespace-nowrap">CV Analyzer</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">Fazer Login</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar