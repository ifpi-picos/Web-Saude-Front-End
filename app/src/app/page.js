import React from "react";
import Card from "@/components/Usuarios/Card";
import Slogan from "@/components/Usuarios/Slogan";
import Filtros from "@/components/Usuarios/Filtros";
import Header from "@/components/Usuarios/Header";
import Footer from "@/components/Usuarios/Footer";
import ButtonSearch from "@/components/Usuarios/ButtonSearch";
import Clinica from "@/services/Clinica";
import "../components/Usuarios/css/Home.css";

export default async function CorpoHome() {
  const informacao = await Clinica.pegarClinicas();
  return (
    <>
      <Header />
      <main>
        <Slogan />
        <ButtonSearch />
        <Filtros />
        <Card informacao={informacao} />
      </main>
      <Footer />
    </>
  );
}
