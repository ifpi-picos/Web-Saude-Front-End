"use client";
import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../Usuarios/css/Mapa.css";
import Clinica from "@/services/ClinicaService";

export default function Mapa({ nome }) {
  const [map, setMap] = useState(null);
  const [clinica, setClinica] = useState(null);

  useEffect(() => {
    async function fetchClinica() {
      const clinicaData = await Clinica.pegarClinica(nome);
      setClinica(clinicaData);
    }

    fetchClinica();
  }, [nome]);

  useEffect(() => {
    if (clinica) {
      if (!map) {
        const newMap = L.map("mapa").setView(
          [clinica.latitude, clinica.longitude],
          20
        );
        const endereco =
          clinica.endereco.rua +
          " - " +
          clinica.endereco.numero +
          " - " +
          clinica.endereco.bairro +
          " - " +
          clinica.endereco.cidade +
          " - " +
          clinica.endereco.uf +
          " - " +
          clinica.endereco.cep;
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(newMap);

        L.marker([clinica.latitude, clinica.longitude])
          .addTo(newMap)
          .bindPopup(endereco)
          .openPopup();

        setMap(newMap);
      } else {
        map.setView([clinica.latitude, clinica.longitude], 20);
      }
    }
  }, [clinica, map]);

  return (
    <div className="App">
      <div id="mapa" className="div-mapa"></div>
    </div>
  );
}
