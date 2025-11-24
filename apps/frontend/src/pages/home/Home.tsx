import ComoFunciona from "../../components/comofunciona/ComoFunciona"
import Convite from "../../components/convite/Convite"
import Footer from "../../components/footer/Footer"
import Inicio from "../../components/inicio/Inicio"
import Navbar from "../../components/navbar/Navbar"
import PublicoAlvo from "../../components/publicoalvo/PublicoAlvo"

function Home() {
  return (
    <div className='w-full'>
      <Navbar />
      <section id="inicio" className="scroll">
        <Inicio />
      </section>
      <section id="comofunciona" className="scroll">
        <ComoFunciona />
      </section>
      <section id="publicoalvo" className="scroll">
        <PublicoAlvo />
      </section>
      <section id="convite" className="scroll">
        <Convite />
      </section>
      <Footer />
    </div>
  )
}

export default Home