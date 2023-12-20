"use client";
import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

export default function FiltroAdmin({ onFilterChange }) {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterChange = filter => {
    setSelectedFilter(filter);
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  useEffect(() => {
    if (selectedFilter) {
      fetch(`https://api-web-saude.vercel.app/${selectedFilter}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error("Erro ao buscar dados da API:", error);
        });
    }
  }, [selectedFilter]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="mt-3">
        <ButtonGroup>
          <Button
            variant="primary"
            style={{
              backgroundColor:
                selectedFilter === "clinicas" ? "#007bff" : "white",
              color: selectedFilter === "clinicas" ? "white" : "black",
            }}
            onClick={() => handleFilterChange("clinicas")}
          >
            Clínicas
          </Button>
          <Button
            variant="success"
            style={{
              backgroundColor:
                selectedFilter === "hospitais" ? "#28a745" : "white",
              color: selectedFilter === "hospitais" ? "white" : "black",
            }}
            onClick={() => handleFilterChange("hospitais")}
          >
            Hospitais
          </Button>
          <Button
            variant="danger"
            style={{
              backgroundColor:
                selectedFilter === "pedidos" ? "#dc3545" : "white",
              color: selectedFilter === "pedidos" ? "white" : "black",
            }}
            onClick={() => handleFilterChange("pedidos")}
          >
            Pedidos
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
