import React from "react";
import Card from "@/components/UsuariosAndAdmin/Card";
import Slogan from "@/components/Usuarios/Home/Slogan";
import Filtros from "@/components/Usuarios/Home/Filtros";
import Header from "@/components/Usuarios/Header";
import Footer from "@/components/Usuarios/Footer";
import ConsultasService from "@/services/ConsultasService";
import ButtonSearch from "@/components/Usuarios/Home/ButtonSearch";
import "@/components/Usuarios/Home/css/Home.css";
import styles from "@/components/Usuarios/css/Layout.module.css";

export const metadata = {
  title: "Hospitais",
};

export default async function PageHospitais({ params }) {
  const informacao = await ConsultasService.pegarHospitais();

  return (
    <>
      <Header />
      <div className={styles.containers}>
        <Slogan />
        <ButtonSearch />
        <Filtros />
      </div>
      <Card informacao={informacao} pageNumber={params.pageNumber} />
      <Footer />
    </>
  );
}
