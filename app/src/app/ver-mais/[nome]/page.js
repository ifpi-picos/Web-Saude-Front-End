import NomeDaClinica_Hospital from "@/components/Usuarios/NomeDaClínica_Hospital";
import Header from "@/components/Usuarios/Header";
import CardInformativo from "@/components/Usuarios/CardInformativo";
import Horario from "@/components/Usuarios/Horario";
import Contato from "@/components/Usuarios/Contato";
import CardSobre from "@/components/Usuarios/CardSobre";
import Especialidades from "@/components/Usuarios/Especialidades";
import Mapa from "@/components/Usuarios/Mapa";
import Footer from "@/components/Usuarios/Footer";
import "../../../components/Usuarios/css/verMais.css";
import Link from "next/link";

export default function verMais({ params }) {
  return (
    <>
      <Header />
      <main>
        <div className="top-atalhos">
          <ul>
            <li>
              {" "}
              <Link href="/">Home Page </Link>{" "}
            </li>
            <li>/</li>
            <li>
              {" "}
              <Link href="#especialidades"> Especialidades </Link>
            </li>
          </ul>
        </div>
        <NomeDaClinica_Hospital nome={params.nome} />
        <CardInformativo nome={params.nome} />
        <Horario nome={params.nome} />
        <Contato nome={params.nome} />
        <CardSobre nome={params.nome} />
        <Mapa />
        <Especialidades nome={params.nome} />
      </main>
      <Footer />
    </>
  );
}
