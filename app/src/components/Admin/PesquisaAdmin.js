"use client";
import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

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
    <div className="d-flex justify-content-center align-items-center" >
      <Form onSubmit={handleSearchSubmit} className="mt-5 ">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Digite sua pesquisa..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              boxShadow: 'none',
              width:"170px",
              height:"40px",
              border:"1px solid black"
            }}
          />
          <Button
            type="submit"
            variant="outline-secondary"
            style={{ backgroundColor: "#00285f",height:"40px" }}
          >
            Pesquisar
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}
