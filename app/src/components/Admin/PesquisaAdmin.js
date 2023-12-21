"use client";
import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import styles from "@/components/Admin/css/PesquisaAdmin.module.css";

export default function PesquisaAdmin({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Form onSubmit={handleSearchSubmit}>
        <InputGroup className={styles.inputGroup}>
          <Form.Control
            className={styles.pesquisaForm}
            type="text"
            placeholder="Digite sua pesquisa..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button
            type="submit"
            variant="outline-secondary"
            className={styles.buttonPesquisa}
          >
            Pesquisar
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}
