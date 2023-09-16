"use client";
import { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "../Admin/css/HeaderAdmin.css";

export default function HeaderAdmin() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      variant="dark"
      style={{ backgroundColor: "#00285f" }}
    >
      <Container fluid className="w-100 m-4">
        <Navbar.Toggle onClick={handleToggle} aria-controls="navbar-nav" />
        <Navbar.Collapse
          id="navbar-nav"
          className={expanded ? "justify-content-start" : "justify-content-end"}
        >
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
            >
              <Nav.Link
                className="cadastro"
                href="/login/dashboard/nova-clinica"
              >
                Cadastrar Clínica
              </Nav.Link>
              <Nav.Link
                className="cadastro"
                href="/login/dashboard/novo-hospital"
              >
                Cadastrar Hospital
              </Nav.Link>
              <Nav.Link className="cadastro" href="/">
                Cadastrar Especialidades
              </Nav.Link>
              <NavDropdown.Divider />
            </NavDropdown>
            <Nav.Link href="#home">Logout</Nav.Link>
          </Nav>
          <Navbar.Brand href="#home">Logo</Navbar.Brand>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
