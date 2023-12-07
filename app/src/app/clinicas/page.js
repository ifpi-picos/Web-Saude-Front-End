import React from "react";
import Card from "@/components/UsuariosAndAdmin/Card";
import Slogan from "@/components/Usuarios/Home/Slogan";
import Filtros from "@/components/Usuarios/Home/Filtros";
import Header from "@/components/Usuarios/Header";
import Footer from "@/components/Usuarios/Footer";
import "@/components/Usuarios/Home/css/Home.css";
import "@/components/Usuarios/css/Layout.css";
import ButtonSearch from "@/components/Usuarios/Home/ButtonSearch";
import ConsultasService from "@/services/ConsultasService";

export const metadata = {
  title: "Clínicas",
};
export default async function filtroClinicas() {
  const informacao = await ConsultasService.pegarClinicas();

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
