"use client";
import { useState, useEffect } from "react";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import CardAdmin from "@/components/Admin/CardAdmin";
import CardProgressos from "@/components/Admin/CardProgressos";
import PrivateRoute from "@/components/Admin/privateRouter";
import Loading from "../loading";
import Link from "next/link";
import Usuarios from "@/components/Admin/Usuarios";
import "@/components/Admin/css/Dashboard.css";

export default function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useToken, setUseToken] = useState(null);

  useEffect(() => {
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
        <Loading />
      </div>
    );
  }
  if (usuarios.length > 0) {
    console.log(usuarios);
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
          <CardProgressos />
          <div className="registros table-responsive">
            <div className="registro-header">
              <p>
                <strong>
                  <h3 className="titulo-usuarios">Usuários</h3>
                </strong>
              </p>
            </div>
          </div>
               
        </div>
        <div className="button-novo-usuario">
        <a  className="button-usuarios"> Novo Usuário</a>
        </div>

        <Usuarios usuarios={usuarios} />
      </div>
    </PrivateRoute>
  );
}
