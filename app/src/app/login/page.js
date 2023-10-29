"use client";
import { useState } from "react";
import LoginForm from "@/components/Admin/Formularios/LoginForm";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        // Redirecionar após o login usando window.location
        window.location.href = "login/dashboard";
      } else {
        console.error("Erro ao autenticar usuário");
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  return <LoginForm />;
}
