import React from "react";
import Card from "@/components/Usuarios/Card";
import Slogan from "@/components/Usuarios//Slogan";
import Filtros from "@/components/Usuarios/Filtros";
import Header from "@/components/Usuarios/Header";
import Footer from "@/components/Usuarios/Footer";
import "@/components/Usuarios/css/Home.css";
import "@/components/Usuarios/css/Layout.css";
import FiltroService from "@/services/FiltroService";
import ButtonSearch from "@/components/Usuarios/ButtonSearch";

export default async function Pesquisa({ params }) {
  const busca = decodeURIComponent(params.busca.replace(/-/g, " "));

  const informacao = await FiltroService.filtrar(busca);
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
