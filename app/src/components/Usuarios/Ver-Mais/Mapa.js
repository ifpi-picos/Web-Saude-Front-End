"use client";
import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FiltroService from "@/services/FiltroService";
import "@/components/Usuarios/Ver-Mais/css/Mapa.css";

export default function Mapa({ nome }) {
  const [map, setMap] = useState(null);
  const [unidadesDeSaude, setUnidadesDeSaude] = useState(null);

  useEffect(() => {
    async function fetchUnidadesDeSaude() {
      const unidades = await FiltroService.pegarUnidadedeSaude(nome);
      setUnidadesDeSaude(unidades);
    }

    fetchUnidadesDeSaude();
  }, [nome]);

  useEffect(() => {
    if (unidadesDeSaude) {
      if (!map) {
        const newMap = L.map("mapa").setView(
          [unidadesDeSaude.latitude, unidadesDeSaude.longitude],
          20
        );
        const endereco =
          unidadesDeSaude.endereco.rua +
          " - " +
          unidadesDeSaude.endereco.numero +
          " - " +
          unidadesDeSaude.endereco.bairro +
          " - " +
          unidadesDeSaude.endereco.cidade +
          " - " +
          unidadesDeSaude.endereco.uf +
          " - " +
          unidadesDeSaude.endereco.cep;
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(newMap);

        L.marker([unidadesDeSaude.latitude, unidadesDeSaude.longitude])
          .addTo(newMap)
          .bindPopup(endereco)
          .openPopup();

        setMap(newMap);
      } else {
        map.setView([unidadesDeSaude.latitude, unidadesDeSaude.longitude], 20);
      }
    }
  }, [unidadesDeSaude, map]);

  return (
    <div className="App">
      <div id="mapa" className="div-mapa"></div>
    </div>
  );
}
