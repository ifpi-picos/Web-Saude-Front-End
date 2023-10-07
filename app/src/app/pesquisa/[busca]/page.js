import React from "react";
import Card from "@/components/Usuarios/Home/Card";
import Slogan from "@/components/Usuarios/Home/Slogan";
import Filtros from "@/components/Usuarios/Home/Filtros";
import Header from "@/components/Usuarios/Header";
import Footer from "@/components/Usuarios/Footer";
import "@/components/Usuarios/css/Home.css";
import "@/components/Usuarios/css/Layout.css";
import FiltroService from "@/services/FiltroService";

export default async function Pesquisa({ params }) {
  const busca = decodeURIComponent(params.busca.replace(/-/g, " "));

  const informacao = await FiltroService.filtrar(busca);
  return (
    <>
      <Header />
      <div className="containers">
        <Slogan />
        <Filtros />
      </div>
      <Card busca={params.busca} informacao={informacao} />
      <Footer />
    </>
  );
}
