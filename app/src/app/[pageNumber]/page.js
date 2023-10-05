import React from "react";
import Card from "@/components/Usuarios/Card";
import Slogan from "@/components/Usuarios/Slogan";
import Filtros from "@/components/Usuarios/Filtros";
import Header from "@/components/Usuarios/Header";
import Footer from "@/components/Usuarios/Footer";
import "@/components/Usuarios/css/Home.css";
import "@/components/Usuarios/css/Layout.css";
import Clinica from "@/services/Clinica";

export default async function PageNumber({ params }) {
  
let informacao
  if(params.pageNumber.length <= 2){
    informacao = await Clinica.pegarClinicas()
  }else{
     informacao = await Clinica.pegarClinica(params.pageNumber)
  }

  return (
    <>
      <Header />
      <div className="containers">
        <Slogan />
        <Filtros />
      </div>
      <Card pageNumber={params.pageNumber} informacao={informacao}/>
      <Footer />
    </>
  );
}
