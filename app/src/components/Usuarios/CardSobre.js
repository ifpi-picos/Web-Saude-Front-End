import { FcAbout } from "react-icons/fc";
import "../Usuarios/css/CardSobre.css";
import Clinica from "@/services/Clinica";

export default async function CardSobre({ nome }) {
  const clinica = await Clinica.pegarClinica(nome)

  return (
    <main id="sobre" className="cards">
      <section className="card about">
        <div className="icon">
          <FcAbout className="icon-about" />
        </div>
        <h2>Sobre</h2>
        <p>
          {clinica.descricao}
        </p>
        <button>Visitar Site</button>
      </section>
    </main>
  );
}
