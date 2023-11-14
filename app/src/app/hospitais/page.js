import React from "react";
import Card from "@/components/Usuarios/Home/Card";
import Slogan from "@/components/Usuarios/Home/Slogan";
import Filtros from "@/components/Usuarios/Home/Filtros";
import Header from "@/components/Usuarios/Header";
import Footer from "@/components/Usuarios/Footer";
import ButtonSearch from "@/components/Usuarios/Home/ButtonSearch";
import HospitalService from "@/services/HospitalService";
import "@/components/Usuarios/Home/css/Home.css";
import "@/components/Usuarios/css/Layout.css";

export default async function filtroHospitais() {
  const informacao = await HospitalService.pegarHospitais();

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
