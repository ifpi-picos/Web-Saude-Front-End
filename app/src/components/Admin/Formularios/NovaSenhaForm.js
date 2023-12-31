"use client";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import PrivateRoute from "@/components/Admin/privateRouter";
import styles from "@/components/Admin/Formularios/css/Form.module.css";

const schema = yup.object().shape({
  senha: yup
    .string()
    .required("senha obrigatória")
    .min(6, "min 6 caracteres")
    .max(12, "max 12 caracteres"),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha"), null], "As senhas devem coincidir")
    .required("Confirmação obrigatória"),
});

export default function NovaSenhaForm({ nome, onClose, atualizarUsuarios }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async formData => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://api-web-saude.vercel.app/usuario/nova-senha/${nome}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({
            senha: formData.senha,
            confirmarSenha: formData.confirmarSenha,
          }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log("Resposta da API:", responseData);
        atualizarUsuarios();
        onClose();
      } else {
        console.error(
          "Erro na chamada à API:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <PrivateRoute>
      <>
        <section
          className={styles.sectionForm}
          style={{ height: "100%", backgroundColor: "#eeeeee" }}
        >
          <div
            className={styles.divForm}
            style={{ marginTop: "0px", borderRadius: "20px" }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.divLogo}>
                <Image
                  className={styles.imageLogo}
                  src="/imgs/logo.png"
                  alt="logo"
                  width={200}
                  height={200}
                />
              </div>
              <h2 className={styles.title}>Nova Senha</h2>
              <div className={styles.divInputs}>
                <label>Senha</label>
                <Controller
                  control={control}
                  name="senha"
                  render={({ field }) => (
                    <input
                      className={errors.senha ? styles.erro : ""}
                      type="password"
                      name="senha"
                      value={field.value}
                      onChange={e => {
                        if (e.target.value.length <= 12) {
                          field.onChange(e);
                        }
                      }}
                      onPaste={async e => {
                        e.preventDefault();

                        try {
                          const pastedText =
                            await navigator.clipboard.readText();
                          if (pastedText.length <= 255) {
                            field.onChange({ target: { value: pastedText } });
                          }
                        } catch (error) {
                          console.error(
                            "Erro ao ler dados da área de transferência:",
                            error
                          );
                        }
                      }}
                      {...field}
                    />
                  )}
                />
                {errors.senha && (
                  <div className={styles.error}>{errors.senha.message} </div>
                )}
                <label>Confirmar Senha</label>
                <Controller
                  control={control}
                  name="confirmarSenha"
                  render={({ field }) => (
                    <input
                      className={errors.confirmarSenha ? styles.erro : ""}
                      type="password"
                      name="confirmarSenha"
                      value={field.value}
                      onChange={e => {
                        if (e.target.value.length <= 12) {
                          field.onChange(e);
                        }
                      }}
                      onPaste={async e => {
                        e.preventDefault();

                        try {
                          const pastedText =
                            await navigator.clipboard.readText();
                          if (pastedText.length <= 12) {
                            field.onChange({ target: { value: pastedText } });
                          }
                        } catch (error) {
                          console.error(
                            "Erro ao ler dados da área de transferência:",
                            error
                          );
                        }
                      }}
                      {...field}
                    />
                  )}
                />
                {errors.confirmarSenha && (
                  <div className={styles.error}>
                    {errors.confirmarSenha.message}
                  </div>
                )}
              </div>
              <div className={styles.divButtonSubmit}>
                <button className={styles.button} type="submit">
                  Alterar Senha
                </button>
              </div>
            </form>
          </div>
        </section>
      </>
    </PrivateRoute>
  );
}
