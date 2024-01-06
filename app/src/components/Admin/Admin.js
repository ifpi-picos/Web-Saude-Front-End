"use client";
import React, { useState, useEffect } from "react";
import PrivateRoute from "./privateRouter";
import { Modal, Alert } from "react-bootstrap";
import NovaSenhaForm from "./Formularios/NovaSenhaForm";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import CardProgressos from "./CardProgressos";
import Loading from "@/app/loading";
import Link from "next/link";
import CadastrarUsuarioForm from "@/components/Admin/Formularios/CadastrarUsuarioForm";
import styles from "@/components/Admin/css/Usuarios.module.css";

export default function Admin() {
  const [showNovaSenhaForm, setShowNovaSenhaForm] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useToken, setUseToken] = useState(null);
  const [showCadastroForm, setShowCadastroForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const HandleDeletar = async userId => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://api-web-saude.vercel.app/deletar-usuario/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );

      if (response.ok) {
        await fetchData();
        setSuccessMessage("Usuário excluído com sucesso!");
      } else {
        console.error("Erro ao excluir o usuário.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNovaSenhaClick = nome => {
    setNomeUsuario(nome);
    setShowNovaSenhaForm(true);
  };

  const handleNovoUsuarioClick = () => {
    setShowCadastroForm(true);
  };

  const atualizarUsuarios = async tipo => {
    await fetchData();
    setShowCadastroForm(false);
    setShowNovaSenhaForm(false);

    if (tipo === "senha") {
      setSuccessMessage("Nova senha definida com sucesso!");
    } else if (tipo === "cadastro") {
      setSuccessMessage("Usuário cadastrado com sucesso!");
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    setUseToken(token);
    try {
      const response = await fetch(
        `https://api-web-saude.vercel.app/usuarios/`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      const data = await response.json();
      setUsuarios(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading && useToken) {
    return (
      <div>
        <PrivateRoute>
          <Loading />
        </PrivateRoute>
      </div>
    );
  }

  return (
    <PrivateRoute>
     <div className={styles.mainContent}>
        <HeaderAdmin />
        <div className={styles.pageHeader}>
          <h1>Dashboard</h1>
          <small>
            <Link href="/">Home</Link> / <strong>Dashboard</strong>
          </small>
        </div>

        <div className={styles.pageContent}>
          <CardProgressos />
        </div>

        <div className={styles.buttonNovoUsuario}>
          <button
            className={styles.buttonUsuarios}
            onClick={handleNovoUsuarioClick}
          >
            Novo Usuário
          </button>
        </div>

        {successMessage && (
          <Alert
            variant="success"
            onClose={() => setSuccessMessage(null)}
            dismissible
            className="mt-3"
          >
            {successMessage}
          </Alert>
        )}

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((info, index) => (
              <tr key={index}>
                <td>{info?.nome}</td>
                <td>{info?.tipo}</td>
                <td>
                  <button
                    className={styles.buttonUsuarios}
                    onClick={() => handleNovaSenhaClick(info.nome)}
                  >
                    Nova Senha
                  </button>
                  <button
                    className={styles.redButton}
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        `Tem certeza que deseja deletar o usuário ${info?.nome}?`
                      );
                      if (confirmDelete) {
                        HandleDeletar(info?._id);
                      }
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        show={showNovaSenhaForm}
        onHide={() => setShowNovaSenhaForm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nova Senha do(a) {nomeUsuario}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NovaSenhaForm
            atualizarUsuarios={() => atualizarUsuarios("senha")}
            onClose={() => setShowNovaSenhaForm(false)}
            nome={nomeUsuario}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showCadastroForm} onHide={() => setShowCadastroForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Novo Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CadastrarUsuarioForm
            onClose={() => setShowCadastroForm(false)}
            atualizarUsuarios={() => atualizarUsuarios("cadastro")}
          />
        </Modal.Body>
      </Modal>
    </PrivateRoute>
  );
}
