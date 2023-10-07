import React from "react";
import Card from "@/components/Usuarios/Card";
import Slogan from "@/components/Usuarios/Slogan";
import Filtros from "@/components/Usuarios/Filtros";
import Header from "@/components/Usuarios/Header";
import Footer from "@/components/Usuarios/Footer";
import "@/components/Usuarios/css/Home.css";
import "@/components/Usuarios/css/Layout.css";
import Clinica from "@/services/Clinica";

export default async function filtroClinicas({ params }) {
  const informacao = await Clinica.pegarClinicas();

  return (
    <>
      <Header />
      <div className="containers">
        <Slogan />
        <Filtros />
      </div>
      <Card pageNumber={params.pageNumber} informacao={informacao} />
      <Footer />
    </>
  );
}
