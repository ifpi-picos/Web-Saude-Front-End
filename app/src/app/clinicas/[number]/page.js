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
  let informacao;
   if(params.number === "resultados"){
      informacao = await FiltroService.pegarClinicas();
   }
   else{
    informacao = 0
   }
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
