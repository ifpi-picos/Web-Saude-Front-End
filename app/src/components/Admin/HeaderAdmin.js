"use client";
import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Image from "next/image";
import "../Admin/css/HeaderAdmin.css";

export default function HeaderAdmin() {
  const [expanded, setExpanded] = useState(false);
  const [dropdownBackgroundColor, setDropdownBackgroundColor] =
    useState("transparent");

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleDropdownMouseOver = () => {
    setDropdownBackgroundColor("#yourColor");
  };

  const handleDropdownMouseOut = () => {
    setDropdownBackgroundColor("transparent");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      variant="dark"
      style={{ backgroundColor: "#00285f" }}
    >
      <Container fluid className="conatainer w-100 m-4">
        <Navbar.Brand href="/dashboard" className="me-auto">
          <Image
            src="/imgs/logo.png"
            alt="logo"
            width={200}
            height={200}
            className="customisar-imagem"
          />
        </Navbar.Brand>
        <Navbar.Toggle onClick={handleToggle} aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="#profile">Perfil</Nav.Link>
            <NavDropdown
              className="cadastros"
              title="Cadastro"
              id="nav-dropdown"
              onMouseOver={handleDropdownMouseOver}
              onMouseOut={handleDropdownMouseOut}
              style={{ backgroundColor: dropdownBackgroundColor }}
            >
              <Nav.Link className="cadastro" href="/nova-clinica">
                Cadastrar Clínica
              </Nav.Link>
              <Nav.Link className="cadastro" href="/novo-hospital">
                Cadastrar Hospital
              </Nav.Link>
              <Nav.Link className="cadastro" href="/especialidades">
                Cadastrar Especialidades
              </Nav.Link>
            </NavDropdown>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
