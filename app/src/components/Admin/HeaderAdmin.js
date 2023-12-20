"use client";
import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Image from "next/image";
import { useDecodedToken } from "@/services/decodeToken";
import { FaSignOutAlt } from "react-icons/fa"; // Importando o ícone de logout
import styles from "../Admin/css/HeaderAdmin.module.css";
import PrivateRoute from "./privateRouter";

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

  const decodedToken = useDecodedToken();

  return (
    <PrivateRoute>
      <Navbar
        expand="lg"
        expanded={expanded}
        variant="white"
        style={{
          backgroundColor: "#00285f",
          borderBottom: "3px solid #07a",
          position: "fixed",
          width: "100%",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Container fluid className="conatainer w-100 m-4">
          <Navbar.Brand
            href={decodedToken === "admin" ? "/dashboard" : "/funcionario"}
            className="me-auto"
          >
            <Image
              src="/imgs/logo.png"
              alt="logo"
              width={200}
              height={200}
              className={styles.customisarImagem}
            />
          </Navbar.Brand>

          <Navbar.Toggle
            onClick={handleToggle}
            aria-controls="navbar-nav"
            className={styles.customToggler}
          />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link
                className={styles.painel}
                href={decodedToken === "admin" ? "/dashboard" : "/funcionario"}
              >
                Dashboard
              </Nav.Link>
              <NavDropdown
                className={styles.cadastros}
                title={<span style={{ color: "white" }}>Cadastro</span>}
                id="nav-dropdown"
                onMouseOver={handleDropdownMouseOver}
                onMouseOut={handleDropdownMouseOut}
                style={{ backgroundColor: dropdownBackgroundColor }}
              >
                <Nav.Link className={styles.cadastro} href="/nova-clinica">
                  Cadastrar Clínica
                </Nav.Link>
                <Nav.Link className={styles.cadastro} href="/novo-hospital">
                  Cadastrar Hospital
                </Nav.Link>
                <Nav.Link className={styles.cadastro} href="/especialidades">
                  Cadastrar Especialidades
                </Nav.Link>
                {decodedToken === "admin" ? (
                  <Nav.Link
                    className={styles.cadastro}
                    href="/dashboard/unidades-de-saude"
                  >
                    Unidades De Saúde
                  </Nav.Link>
                ) : null}
              </NavDropdown>
              <Nav.Link className={styles.logout} onClick={handleLogout}>
                Logout <FaSignOutAlt className="icon" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </PrivateRoute>
  );
}
