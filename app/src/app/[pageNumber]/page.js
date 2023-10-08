import React from "react";
import Card from "@/components/Usuarios/Card";
import Slogan from "@/components/Usuarios/Slogan";
import Filtros from "@/components/Usuarios/Filtros";
import Header from "@/components/Usuarios/Header";
import Footer from "@/components/Usuarios/Footer";
import FiltroService from "@/services/FiltroService";
import ButtonSearch from "@/components/Usuarios/ButtonSearch";
import "@/components/Usuarios/css/Home.css";
import "@/components/Usuarios/css/Layout.css";

export default async function PageNumber({params}) {
  
  const informacao = await FiltroService.pegarHospitaisEClincas();

  return (
    <>
      <Header />
      <div className="containers">
        <Slogan />
        <ButtonSearch />
        <Filtros />
      </div>
      <Card pageNumber={params.pageNumber} informacao={informacao} />
      <Footer />
    </>
  );
}
