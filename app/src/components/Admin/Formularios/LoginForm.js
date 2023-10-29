"use client";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import "@/components/Admin/Formularios/css/Form.css";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [authToken, setAuthToken] = useState(null);

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const response = await fetch(`https://api-web-saude.vercel.app/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const token = data.token;

        console.log("Token recebido:", token);

        localStorage.setItem("token", token);
        setAuthToken(token);
        console.log(
          "Token salvo no localStorage:",
          localStorage.getItem("token")
        );
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };
  useEffect(() => {
    if (authToken) {
      window.location.href = "/login/dashboard";
    }
  }, [authToken]);
  return (
    <section style={{ marginTop: "0px" }}>
      <div className="painel">
        <h3>
          <Link href="/">
            <FaHome size={24} /> Home
          </Link>
        </h3>
      </div>
      <div className="box">
        <legend>
          <strong>Login</strong>
        </legend>
        <form onSubmit={handleLogin}>
          <div className="inputBox">
            <label className="labelInput" htmlFor="email">
              Email:
            </label>
            <input
              className="inputUser"
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="inputBox">
            <label className="labelInput" htmlFor="senha">
              Senha:
            </label>
            <input
              className="inputUser"
              type="password"
              id="senha"
              name="senha"
              required
              value={senha}
              onChange={e => setSenha(e.target.value)}
            />
          </div>

          <button id="submit" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}
