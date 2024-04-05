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

export default async function verMais({ params }) {
  const unidadeDeSaude = await ConsultasService.pegarUnidadedeSaude(
    params.nome
  );
  const unidadesdeSaude = await ConsultasService.pegarUnidadedeSaude(
    params.nome
  );
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
        <CardInformativo nome={params?.nome} />
        <CardSobre nome={params?.nome} />
        <Especialidades nome={params?.nome} />
        <Horario nome={params?.nome} />
        <Contato nome={params?.nome} />
        <Galeria unidadeDeSaude={unidadeDeSaude} />
        <Mapa nome={params?.nome} />
      </main>
      <Footer />
    </>
  );
}
