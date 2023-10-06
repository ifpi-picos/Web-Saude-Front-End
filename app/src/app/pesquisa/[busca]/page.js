import React from "react";
import Card from "@/components/Usuarios/Card";
import Slogan from "@/components/Usuarios/Slogan";
import Filtros from "@/components/Usuarios/Filtros";
import Header from "@/components/Usuarios/Header";
import Footer from "@/components/Usuarios/Footer";
import "@/components/Usuarios/css/Home.css";
import "@/components/Usuarios/css/Layout.css";
import Clinica from "@/services/Clinica";

export default async function Pesquisa({ params }) {
  const informacao = await Clinica.filtrar(params.busca);
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
