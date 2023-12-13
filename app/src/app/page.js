import React from "react";
import Card from "@/components/UsuariosAndAdmin/Card";
import Slogan from "@/components/Usuarios/Home/Slogan";
import Filtros from "@/components/Usuarios/Home/Filtros";
import Header from "@/components/Usuarios/Header";
import Footer from "@/components/Usuarios/Footer";
import ButtonSearch from "@/components/Usuarios/Home/ButtonSearch";
import ConsultasService from "@/services/ConsultasService";
import "../components/Usuarios/Home/css/Home.css";

export const metadata = {
  title: "Home",
};

export default async function CorpoHome() {
  const informacao = await ConsultasService.unidadesdeSaude();

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
