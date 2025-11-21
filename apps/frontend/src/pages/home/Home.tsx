import Inicio from "../../components/inicio/Inicio"

function Home() {
  return (
    <div className='w-full'>
      <section id="inicio" className="scroll-mt-16"> {/* ajuste scroll-mt-* se tiver navbar fixa */}
        <Inicio />
      </section>
      <section id="sobre" className="scroll-mt-16">
        {/* <ComoFunciona /> */}
      </section>
      <section id="projetos" className="scroll-mt-16">
        {/* <PublicoAlvo /> */}
      </section>
      <section id="contato" className="">
        {/* <Pronto /> */}
      </section>
    </div>
  )
}

export default Home