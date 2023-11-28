"use client";
import NomeDaClinica_Hospital from "@/components/Usuarios/Ver-Mais/NomeDaClínica_Hospital";
import Header from "@/components/Usuarios/Header";
import CardInformativo from "@/components/Usuarios/Ver-Mais/CardInformativo";
import Horario from "@/components/Usuarios/Ver-Mais/Horario";
import Contato from "@/components/Usuarios/Ver-Mais/Contato";
import CardSobre from "@/components/Usuarios/Ver-Mais/CardSobre";
import Especialidades from "@/components/Usuarios/Ver-Mais/Especialidades";
import Mapa from "@/components/Usuarios/Ver-Mais/Mapa";
import Footer from "@/components/Usuarios/Footer";
import Link from "next/link";
import FiltroService from "@/services/ConsultasService";
import NotFound from "@/app/not-found";
import "../../../components/Usuarios/css/verMais.css";

export default async function verMais({ params }) {
  const unidadesdeSaude = await FiltroService.pegarUnidadedeSaude(params.nome);
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
            <li>/</li>
            <li>
              <Link href="#especialidades"> Especialidades </Link>
            </li>
          </ul>
        </div>
        <NomeDaClinica_Hospital nome={params?.nome} />
        <CardInformativo nome={params?.nome} />
        <Horario nome={params?.nome} />
        <CardSobre nome={params?.nome} />
        <Contato nome={params?.nome} />
        <Especialidades nome={params?.nome} />
        <Mapa nome={params?.nome} />
      </main>
      <Footer />
    </>
  );
}
