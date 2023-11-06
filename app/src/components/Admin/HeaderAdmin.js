"use client";
import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useRouter } from "next/navigation";
import "../Admin/css/HeaderAdmin.css";

export default function HeaderAdmin() {
  const [expanded, setExpanded] = useState(false);
  const [dropdownBackgroundColor, setDropdownBackgroundColor] =
    useState("transparent");
  const router = useRouter();

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
        <Navbar.Toggle onClick={handleToggle} aria-controls="navbar-nav" />
        <Navbar.Collapse
          id="navbar-nav"
          className={expanded ? "justify-content-start" : "justify-content-end"}
        >
          <Navbar.Brand href="#home" className="ms-auto">
            Logo
          </Navbar.Brand>
          <Nav
            className={
              expanded ? "mr-auto flex-column align-items-start" : "mr-auto"
            }
          >
            <Nav.Link href="#home">Perfil</Nav.Link>
            <NavDropdown
              className="cadastros"
              title="Cadastro"
              id="nav-dropdown"
              onMouseOver={handleDropdownMouseOver}
              onMouseOut={handleDropdownMouseOut}
              style={{ backgroundColor: dropdownBackgroundColor }}
            >
              <Nav.Link
                className="cadastro"
                href="/nova-clinica"
              >
                Cadastrar Clínica
              </Nav.Link>
              <Nav.Link
                className="cadastro"
                href="/novo-hospital"
              >
                Cadastrar Hospital
              </Nav.Link>
              <Nav.Link
                className="cadastro"
                href="/especialidades"
              >
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
