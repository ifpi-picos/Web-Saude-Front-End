"use client";
import { useState, useEffect } from "react";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import CardAdmin from "@/components/UsuariosAndAdmin/Card";
import CardProgressos from "./CardProgressos";
import PrivateRoute from "@/components/Admin/privateRouter";
import Loading from "@/app/loading";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa"; // Importe o ícone desejado do React Icons
import "@/components/Admin/css/Dashboard.css";

export default function Funcionario() {
  const [unidadesDeSaude, setUnidadesDeSaude] = useState([]);
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
        setUnidadesDeSaude(data);
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

  const unidadesNaoAprovadas = unidadesDeSaude.filter(
    unidade => !unidade.aprovado
  );

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
          <div className="registros table-responsive"></div>

          {unidadesNaoAprovadas.length > 0 && (
            <div className="alert alert-success mt-3" role="alert">
              <div className="d-flex align-items-center justify-content-center m-2">
                <p className="mb-0">
                  <FaCheckCircle size={35} />
                  {unidadesNaoAprovadas.length === 1 ? (
                    <>
                      O cadastro da unidade de saúde{" "}
                      <strong>{unidadesNaoAprovadas[0].nome}</strong> foi
                      realizado com <strong>sucesso!</strong> No entanto, ela
                      está aguardando aprovação.
                    </>
                  ) : (
                    <>
                      Os cadastros das unidades de saúde{" "}
                      <strong>
                        (
                        {unidadesNaoAprovadas
                          .map(unidade => unidade.nome)
                          .join(", ")}
                        )
                      </strong>{" "}
                      foram realizados com <strong>sucesso!</strong> No entanto,
                      elas estão aguardando aprovação.
                    </>
                  )}
                  Entraremos em contato dentro de <strong>24 horas</strong> para
                  confirmar e liberar o acesso aos visitantes.
                </p>
              </div>
            </div>
          )}

          <CardAdmin informacao={unidadesDeSaude} />
        </div>
      </div>
    </PrivateRoute>
  );
}
