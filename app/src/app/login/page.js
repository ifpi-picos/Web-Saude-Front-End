"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../../components/Admin/css/Login.css";

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
        window.location.href = "login//dashboard";
      } else {
        console.error("Erro ao autenticar usuário");
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  return (
    <div className="box-form">
      <div className="img-box">
        <Image alt="imagem web saude" width={200} height={200} />
      </div>
      <div className="form-box">
        <h2>Login</h2>
        <p>
          Deseja Voltar? <Link href="/"> Home </Link>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder="Senha"
              required
              value={senha}
              onChange={e => setSenha(e.target.value)}
            />
          </div>
          <div className="input-group">
            <button type="submit" className="button-entrar">
              ENTRAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
