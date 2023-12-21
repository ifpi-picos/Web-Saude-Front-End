"use client";
import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import styles from "@/components/Admin/css/FiltrosAdmin.module.css"; // Import the CSS module

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
      <div className="mt-4">
        <ButtonGroup className={styles.buttonGroup}>
          <Button
            variant="primary"
            className={
              selectedFilter === "clinicas" ? styles.buttonPrimary : ""
            }
            onClick={() => handleFilterChange("clinicas")}
          >
            Clínicas
          </Button>
          <Button
            variant="success"
            className={
              selectedFilter === "hospitais" ? styles.buttonSuccess : ""
            }
            onClick={() => handleFilterChange("hospitais")}
          >
            Hospitais
          </Button>
          <Button
            variant="danger"
            className={selectedFilter === "pedidos" ? styles.buttonDanger : ""}
            onClick={() => handleFilterChange("pedidos")}
          >
            Pedidos
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
