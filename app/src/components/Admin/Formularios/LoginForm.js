"use client"
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "@/components/Admin/Formularios/css/Form.css";

const schema = yup.object().shape({
  email: yup.string().email("Informe um e-mail válido").required("O e-mail é obrigatório"),
  senha: yup.string().required("A senha é obrigatória").min(6, "A senha deve ter pelo menos 6 caracteres")
  .max(12, "A senha não pode ter mais de 20 caracteres"),
});

export default function LoginForm() {
  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
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

        console.log("Token recebido:", token);

        localStorage.setItem("token", token);
        console.log("Token salvo no localStorage:", localStorage.getItem("token"));

        window.location.href = "/login/dashboard";
      } 
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("email", {
        type: "manual",
        message: "Erro ao fazer login, verifique suas credenciais.",
      });
    }
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputBox">
            <label className="labelInput" htmlFor="email">
              Email:
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  className="inputUser"
                  type="email"
                  id="email"
                  name="email"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <div className="error">{errors.email.message}</div>
            )}
          </div>

          <div className="inputBox">
            <label className="labelInput" htmlFor="senha">
              Senha:
            </label>
            <Controller
              name="senha"
              control={control}
              render={({ field }) => (
                <input
                  className="inputUser"
                  type="password"
                  id="senha"
                  name="senha"
                  {...field}
                />
              )}
            />
            {errors.senha && (
              <div className="error">{errors.senha.message}</div>
            )}
          </div>

          <button id="submit" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}
