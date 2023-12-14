"use client";
import React, { useState, useEffect } from "react";
import "@/components/Admin/css/Usuarios.css";
import PrivateRoute from "./privateRouter";
import { Modal } from "react-bootstrap";
import NovaSenhaForm from "./Formularios/NovaSenhaForm";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import CardProgressosAdmin from "./CardProgressosAdmin";
import Loading from "@/app/loading";
import Link from "next/link";
import CadastrarUsuarioForm from "@/components/Admin/Formularios/CadastrarUsuarioForm";

export default function Admin() {
  const [showNovaSenhaForm, setShowNovaSenhaForm] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useToken, setUseToken] = useState(null);
  const [showCadastroForm, setShowCadastroForm] = useState(false);

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
        window.location.href = "/dashboard";
      } else {
        console.error("Erro ao enviar os dados.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleNovaSenhaClick = nome => {
    setNomeUsuario(nome);
    setShowNovaSenhaForm(true, nome);
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

  const handleNovoUsuarioClick = () => {
    setShowCadastroForm(true);
  };

  const atualizarUsuarios = async () => {
    await fetchData();
    setShowCadastroForm(false);
  };

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
      <div className="main-content">
        <HeaderAdmin />
        <div className="page-header">
          <h1>Dashboard</h1>
          <small>
            <Link href="/">Home</Link> / <strong>Dashboard</strong>
          </small>
        </div>

        <div className="page-content">
          <CardProgressosAdmin />
          <div className="registros table-responsive">
            <div className="registro-header">
              <p>
                <strong>
                  <h2 className="titulo-usuarios">Usuários</h2>
                </strong>
              </p>
            </div>
          </div>
        </div>
        <div className="button-novo-usuario">
          <button className="button-usuarios" onClick={handleNovoUsuarioClick}>
            Novo Usuário
          </button>
        </div>
      </div>
      <table>
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
                  className="button-usuarios"
                  onClick={() => handleNovaSenhaClick(info.nome)}
                >
                  Nova Senha
                </button>
                <a
                  href="/novo-usuario"
                  className="redButton"
                  onClick={e => {
                    e.preventDefault();
                    const confirmDelete = window.confirm(
                      `Tem certeza que deseja deletar o usuário ${info?.nome}?`
                    );
                    if (confirmDelete) {
                      HandleDeletar(info?._id);
                    }
                  }}
                >
                  Excluir
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        show={showNovaSenhaForm}
        onHide={() => setShowNovaSenhaForm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nova Senha do(a) {nomeUsuario}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NovaSenhaForm
            atualizarUsuarios={atualizarUsuarios}
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
            atualizarUsuarios={atualizarUsuarios}
          />
        </Modal.Body>
      </Modal>
    </PrivateRoute>
  );
}
