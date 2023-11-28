import React from "react";
import Card from "@/components/Usuarios/Home/Card";
import Slogan from "@/components/Usuarios/Home/Slogan";
import Filtros from "@/components/Usuarios/Home/Filtros";
import Header from "@/components/Usuarios/Header";
import Footer from "@/components/Usuarios/Footer";
import "@/components/Usuarios/Home/css/Home.css";
import "@/components/Usuarios/css/Layout.css";
import ConsultasService from "@/services/ConsultasService";
import ButtonSearch from "@/components/Usuarios/Home/ButtonSearch";

export default async function Pesquisa({ params }) {
  const busca = decodeURIComponent(params.busca.replace(/-/g, " "));

  const informacao = await ConsultasService.filtrarUnidadesDeSaude(busca);
  return (
    <>
      <Header />
      <div className="containers">
        <Slogan />
        <ButtonSearch />
        <Filtros />
      </div>
      <Card informacao={informacao} />
      <Footer />
    </>
  );
}
