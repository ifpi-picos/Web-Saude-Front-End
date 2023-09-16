"use client";
import { useState, useEffect } from "react";
import { FcAbout } from "react-icons/fc";
import "../Usuarios/css/CardSobre.css";

export default function CardSobre({ nome }) {
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
    <main id="sobre" className="cards">
      <section className="card about">
        <div className="icon">
          <FcAbout className="icon-about" />
        </div>
        <h2>Sobre</h2>
        <p>
          {clinica[0]?.descricao}
          dhfudshfuihsduifsdhoiufhsuidhfuisohdfuihsdiuhcvuidhsfuihsduifhdsuihvuihduhdsuihvudhfuisdhafuihsdfuihsdiufhiusdhfuisdhfuishdfuihsdfuihsduifhusdihfuidshfuisdhfuids
        </p>
        <button>Visitar Site</button>
      </section>
    </main>
  );
}
