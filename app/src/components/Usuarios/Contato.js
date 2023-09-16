"use client";
import React, { useState, useEffect } from "react";
import { FaEnvelopeOpen } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import "../Usuarios/css/Contato.css";

export default function Contato({ nome }) {
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
    <div id="contatos" className="contact-info">
      <div className="card">
        <h4>Email</h4>
        <FaEnvelopeOpen className="icon" />
        <p>{clinica[0]?.email}</p>
      </div>

      <div className="card">
        <h4>Telefone</h4>
        <FaPhoneAlt className="icon" />
        <p>{clinica[0]?.whatsapp}</p>
      </div>

      <div className="card">
        <h4>instagram</h4>
        <FaInstagram className="icon" />
        <p>{clinica[0]?.instagram}</p>
      </div>
    </div>
  );
}
