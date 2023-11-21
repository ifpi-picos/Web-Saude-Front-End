"use client";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import PrivateRoute from "../privateRouter";
import "@/components/Admin/Formularios/css/Form.css";

const schema = yup.object().shape({
  nome: yup
    .string()
    .required("nome obirgatário")
    .min(3, "tamanho muito grande")
    .max(50, "tamanho muito grande"),
  email: yup
    .string()
    .email("Informe um e-mail válido")
    .min(3, "tamanho muito grande")
    .max(50, "tamanho muito grande"),
  senha: yup
    .string()
    .required("senha obrigatória")
    .min(6, "min 6 caracteres")
    .max(12, "max 12 caracteres"),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha"), null], "As senhas devem coincidir")
    .required("Confirmação de senha obrigatória"),
});
export default function CadstrarUsuarioForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async formData => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://api-web-saude.vercel.app/novo-usuario`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({
            nome: formData.nome,
            email: formData.email,
            senha: formData.senha,
          }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setShowModal(true);
        window.location.href = "/login";
      }
      if (response.status === 400) {
        setErrorMessage("Email ou senha incorretos");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <PrivateRoute>
      <>
        <section className="section-form">
          <div
            className="div-form"
            style={{
              position: "absolute",
              bottom: "0",
              left: "50%",
              top: "50%",
              height: "100%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="div-logo">
                <Link href="/dashboard">
                  <Image
                    className="image-logo"
                    src="/imgs/logo.png"
                    alt="logo"
                    width={200}
                    height={200}
                  />
                </Link>
              </div>
              <h2 className="title">Cadastrar Usuário</h2>
              <div className="div-inputs">
                <label>Nome</label>
                <Controller
                  name="nome"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      name="nome"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.nome && (
                  <div className="error">{errors.nome.message}</div>
                )}
                <label>Email</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="email"
                      name="email"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.email && (
                  <div className="error">{errors.email.message}</div>
                )}
                <label>Senha</label>
                <Controller
                  control={control}
                  name="senha"
                  render={({ field }) => (
                    <input
                      type="password"
                      name="senha"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.senha && (
                  <div className="error">{errors.senha.message} </div>
                )}
                <label>Confirmar Senha</label>
                <Controller
                  control={control}
                  name="confirmarSenha"
                  render={({ field }) => (
                    <input
                      type="password"
                      name="confirmarSenha"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.confirmarSenha && (
                  <div className="error">{errors.confirmarSenha.message}</div>
                )}
              </div>
              <div className="div-button-submit">
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          </div>
        </section>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Usuário Cadastrado com Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>O Usuário foi Cadastrado com sucesso.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowModal(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </PrivateRoute>
  );
}
