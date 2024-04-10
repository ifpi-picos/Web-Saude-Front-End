"use client";
import Header from "@/components/Usuarios/Header";
import CardInformativo from "@/components/Usuarios/Ver-Mais/CardInformativo";
import Horario from "@/components/Usuarios/Ver-Mais/Horario";
import Contato from "@/components/Usuarios/Ver-Mais/Contato";
import CardSobre from "@/components/Usuarios/Ver-Mais/CardSobre";
import Especialidades from "@/components/Usuarios/Ver-Mais/Especialidades";
import Mapa from "@/components/Usuarios/Ver-Mais/Mapa";
import Footer from "@/components/Usuarios/Footer";
import Link from "next/link";
import ConsultasService from "@/services/ConsultasService";
import NotFound from "@/app/not-found";
import "../../../components/Usuarios/css/verMais.css";
import Galeria from "@/components/Usuarios/Ver-Mais/Galeria";
import Comentarios from "@/components/Usuarios/Ver-Mais/Comentarios";

export default async function VerMais({ nome }) {
  const unidadeDeSaude = await ConsultasService?.pegarUnidadedeSaude(nome);
  const unidadesdeSaude = await ConsultasService?.pegarUnidadedeSaude(nome);
  if (unidadesdeSaude.length === 0) {
    return <NotFound />;
  }
  return (
    <>
      <Header />
      <main>
        <div className="top-atalhos">
          <ul>
            <li>
              <Link href="/">Home Page </Link>
            </li>
            <li>
              <Link href="/sobre"> Sobre </Link>
            </li>
          </ul>
        </div>
        <CardInformativo nome={nome} />
        <CardSobre nome={nome} />
        <Especialidades nome={nome} />
        <Horario nome={nome} />
        <Contato nome={nome} />
       <Galeria unidadeDeSaude={unidadeDeSaude}/>
        <Mapa nome={nome} />
        <Comentarios />
      </main>
      <Footer />
    </>
  );
}
