"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import styles from "@/components/Admin/Formularios/css/Form.module.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Informe um e-mail válido")
    .required("O e-mail é obrigatório")
    .max(255, "e-mail muito longo")
    .matches(/@(gmail\.com|hotmail\.com|outlook\.com)$/, "e-mail inválido"),
  senha: yup
    .string()
    .required("A senha é obrigatória")
    .min(6, "min 6 caracteres")
    .max(12, "max 12 caracteres"),
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

  useEffect(() => {
    setErrorMessage("");
  }, [errors.email, errors.senha]);

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
        const decoded = jwtDecode(token);
        if (decoded.userType === "admin") {
          window.location.href = "/dashboard";
        }
        if (decoded.userType === "funcionario") {
          window.location.href = "/funcionario";
        }
      }

      if (response.status === 401) {
        setErrorMessage("Email ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro ao fazer login: Status inesperado", error);
    }
  };

  return (
    <section className={styles.sectionForm}>
      <div className={styles.divForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.divLogo}>
            <Link href="/">
              <Image
                className={styles.imageLogo}
                src="/imgs/logo.png"
                alt="logo"
                width={200}
                height={200}
              />
            </Link>
          </div>

          <h2 className={styles.title}>Login</h2>
          <div className={styles.divInputs}>
            <label htmlFor="email">Email</label>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  className={errors.email ? styles.erro : ""}
                  type="email"
                  name="email"
                  value={field.value}
                  onChange={e => {
                    if (e.target.value.length <= 255) {
                      field.onChange(e);
                    }
                  }}
                  onPaste={async e => {
                    e.preventDefault();

                    try {
                      const pastedText = await navigator.clipboard.readText();
                      if (pastedText.length <= 255) {
                        field.onChange({
                          target: { value: pastedText },
                        });
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
            {errors.email && (
              <div className={styles.error}>{errors.email.message}</div>
            )}

            <label htmlFor="senha">Senha</label>
            <Controller
              name="senha"
              control={control}
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
                      const pastedText = await navigator.clipboard.readText();
                      if (pastedText.length <= 12) {
                        field.onChange({
                          target: { value: pastedText },
                        });
                      }
                    } catch (error) {
                      console.error(
                        "Erro ao ler dados da área de transferência:",
                        error
                      );
                    }
                  }}
                />
              )}
            />
            {errors.senha && (
              <div className={styles.error}>{errors.senha.message}</div>
            )}
          </div>

          <div className={styles.divButtonSubmit}>
            <button className={styles.button} type="submit">
              Entrar
            </button>
          </div>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </form>
      </div>
    </section>
  );
}
