"use client";
import React, { useState, useEffect } from "react";
import "../Usuarios/css/NomeDaClínica_Hospital.css";
import Image from "next/image";
import imagem from "../../components/imgs/doutor-vermais.svg";
export default function NomeDaClinica_Hospital({ nome }) {
  const [clinica, setClinica] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://web-saude-back-end-eric-developer.vercel.app/clinica/${nome}`
        );
        if (!response.ok) {
          throw new Error("Falha ao buscar dados da API");
        }
        const data = await response.json();
        setClinica(data);
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      }
    };

    if (nome) {
      fetchData();
    }
  }, [nome]);
  return (
    <section className="section-clinica-hospital">
      <div className="div-clinica-hospital">
        <h1>{clinica[0]?.nome}</h1>
      </div>
      <div className="img-clinica-hospital">
        <Image src={imagem} alt="img-clinica-hospital" />
      </div>
    </section>
  );
}
