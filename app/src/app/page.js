import React from "react";
import Card from "@/components/Usuarios/Card";
import Slogan from "@/components/Usuarios/Slogan";
import Filtros from "@/components/Usuarios/Filtros";
import Header from "@/components/Usuarios/Header";
import Footer from "@/components/Usuarios/Footer";
import ButtonSearch from "@/components/Usuarios/ButtonSearch";
import "../components/Usuarios/css/Home.css";

async function getClinicas() {
  const res = await fetch(`http://localhost:5000/clinicas`);
  const info = await res.json();

  return info;
}
export default async function CorpoHome() {
  const informacao = await getClinicas();
  return (
    <>
      <Header />
      <main>
        <Slogan />
        <ButtonSearch/>
        <Filtros />
        <Card informacao={informacao} />
      </main>
      <Footer />
    </>
  );
}
