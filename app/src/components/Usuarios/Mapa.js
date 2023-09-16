"use client";
import { useEffect } from "react";
import L from "leaflet";
import "../Usuarios/css/Mapa.css";
import "leaflet/dist/leaflet.css";

function Mapa() {
  useEffect(() => {
    const map = L.map("mapa").setView([-7.08484, -41.47252], 20);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    L.marker([-7.08484, -41.47252])
      .addTo(map)
      .bindPopup("Av. Nossa Sra. de Fátima, 629 - Centro, Picos - PI")
      .openPopup();

    // Retorna uma função de limpeza que destrói o mapa antes de atualizar o componente
    return () => {
      map.remove();
    };
  }, []);
  return (
    <div className="App">
      <div id="mapa" className="div-mapa"></div>
    </div>
  );
}

export default Mapa;
