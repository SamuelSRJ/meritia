import ComoFunciona from "../../components/comofunciona/ComoFunciona"
import Convite from "../../components/convite/Convite"
import Inicio from "../../components/inicio/Inicio"
import PublicoAlvo from "../../components/publicoalvo/PublicoAlvo"

function Home() {
  return (
    <div className='w-full'>
      <section id="inicio" className="scroll-mt-16"> {/* ajuste scroll-mt-* se tiver navbar fixa */}
        <Inicio />
      </section>
      <section id="comofunciona" className="scroll-mt-16">
        <ComoFunciona />
      </section>
      <section id="publicoalvo" className="scroll-mt-16">
        <PublicoAlvo />
      </section>
      <section id="convite" className="">
        <Convite />
      </section>
    </div>
  )
}

export default Home