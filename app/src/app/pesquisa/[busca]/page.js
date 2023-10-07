import React from "react";
import Card from "@/components/Usuarios/Card";
import Slogan from "@/components/Usuarios/Slogan";
import Filtros from "@/components/Usuarios/Filtros";
import Header from "@/components/Usuarios/Header";
import Footer from "@/components/Usuarios/Footer";
import "@/components/Usuarios/css/Home.css";
import "@/components/Usuarios/css/Layout.css";
import Clinica from "@/services/ClinicaService";

export default async function Pesquisa({ params }) {
  const busca = decodeURIComponent(params.busca.replace(/-/g, " "));

  const informacao = await Clinica.filtrar(busca);
  console.log(busca)
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
