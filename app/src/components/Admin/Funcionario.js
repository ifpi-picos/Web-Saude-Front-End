"use client";
import { useState, useEffect } from "react";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import CardAdmin from "@/components/UsuariosAndAdmin/Card";
import CardProgressosFuncionario from "./CardProgressosFuncionario";
import PrivateRoute from "@/components/Admin/privateRouter";
import Loading from "@/app/loading";
import Link from "next/link";
import "@/components/Admin/css/Dashboard.css";

export default function Funcionario() {
  const [unidadesDeSaude, setUniidadesDeSaude] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useToken, setUseToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      setUseToken(token);
      try {
        const response = await fetch(
          `https://api-web-saude.vercel.app/usuario/unidades-de-saude/`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          }
        );
        const data = await response.json();
        setUniidadesDeSaude(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {});
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
          <CardProgressosFuncionario />
          <div className="registros table-responsive">
            <div className="registro-header">
              <p>
                <strong>
                  Clique no botão ver mais para ver as informações do seu
                  estabelecimento!
                </strong>
              </p>
            </div>
          </div>
          <CardAdmin informacao={unidadesDeSaude} />
        </div>
      </div>
    </PrivateRoute>
  );
}
