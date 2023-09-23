"use client";
import React, { useState, useEffect } from "react";
import "../Usuarios/css/NomeDaClínica_Hospital.css";
import Image from "next/image";
import imagem from "../../components/imgs/doutor-vermais.svg";
import Clinica from "@/services/Clinica";

export default async function NomeDaClinica_Hospital({ nome }) {

  const clinica = await Clinica.pegarClinica(nome)

  return (
    <section className="section-clinica-hospital">
      <div className="div-clinica-hospital">
        <h1>{clinica.nome}</h1>
      </div>
      <div className="img-clinica-hospital">
        <Image src={imagem} alt="img-clinica-hospital" />
      </div>
    </section>
  );
}
