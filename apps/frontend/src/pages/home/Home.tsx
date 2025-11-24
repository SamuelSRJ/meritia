import ComoFunciona from "../../components/comofunciona/ComoFunciona"
import Convite from "../../components/convite/Convite"
import Inicio from "../../components/inicio/Inicio"
import PublicoAlvo from "../../components/publicoalvo/PublicoAlvo"

function Home() {
  return (
    <div className='w-full'>
      <section id="inicio">
        <Inicio />
      </section>
      <section id="comofunciona">
        <ComoFunciona />
      </section>
      <section id="publicoalvo">
        <PublicoAlvo />
      </section>
      <section id="convite">
        <Convite />
      </section>
    </div>
  )
}

export default Home