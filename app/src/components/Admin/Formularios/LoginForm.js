"use client";
import React, { useState } from 'react';
import { useForm, Controller, set } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "@/components/Admin/Formularios/css/Form.css";
import Image from "next/image";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Informe um e-mail válido")
    .required("O e-mail é obrigatório"),
  senha: yup
    .string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(12, "A senha não pode ter mais de 12 caracteres"),
});

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async data => {
    try {
      const response = await fetch(`https://api-web-saude.vercel.app/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        const token = responseData.token;

        localStorage.setItem("token", token);
       
        window.location.href = "/dashboard";
      }

      if(response.status === 401){
        setErrorMessage("Email ou senha incorretos");

      }
    } catch (error) {
      console.error("Erro ao fazer login: Status inesperado", error);
    }
  };
  return (
    <section className="section-form">
      <div
        className="div-form"
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="div-logo">
            <Image
              className="image-logo"
              src="/imgs/logo.png"
              alt="logo"
              width={200}
              height={200}
            />
          </div>

          <h2 className="title">Login</h2>
          <div className="div-inputs">
            <label htmlFor="email">Email</label>
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

            <label htmlFor="senha">Senha</label>
            <Controller
              name="senha"
              control={control}
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
              <div className="error">{errors.senha.message}</div>
            )}

            {errorMessage && <div className="error">{errorMessage}</div>}
          </div>

          <div className="div-button">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </section>
  );
}
