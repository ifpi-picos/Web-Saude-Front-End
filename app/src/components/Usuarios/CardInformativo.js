"use client";
import React, { useState, useEffect } from "react";
import "../Usuarios/css/CardInformativo.css";
import Link from "next/link";
import Image from "next/image";

export default function CardInformativo({ nome }) {
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
    <section className="section-informações">
      <div className="card-informacoes">
        <div className="top">
          <div className="image-container">
            <Image
              src={clinica[0]?.imagem}
              alt="Imagem da Clínica"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="button">
          <h3>
            <Link href="#mapa">Mapa</Link>
          </h3>
          <p>
            {clinica[0]?.endereco.rua}, {clinica[0]?.endereco.numero} -{" "}
            {clinica[0]?.endereco.bairro}, {clinica[0]?.endereco.cidade} -{" "}
            {clinica[0]?.endereco.uf}, {clinica[0]?.endereco.cep}
          </p>
          <hr />
          <div className="div-atalhos">
            <ul>
              <li>
                <Link className="btn" href="#sobre">
                  Sobre
                </Link>
              </li>
              <li>
                <Link className="btn" href="#horario">
                  Horário
                </Link>
              </li>
              <li>
                <Link className="btn" href="#contato">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
