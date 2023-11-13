"use client";
import { useState, useEffect } from "react";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import CardAdmin from "@/components/Admin/CardAdmin";
import CardProgressos from "@/components/Admin/CardProgressos";
import PrivateRoute from "@/components/Admin/privateRouter";
import { useDecodedToken } from "@/services/decodeToken";
import "@/components/Admin/css/Dashboard.css";
import Loading from "../loading";
import Link from "next/link";
export default function Dashboard() {
  const decodedToken = useDecodedToken();
  const [informacao, setInformacao] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (decodedToken) {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(
            `https://api-web-saude.vercel.app/usuario/unidades-desaude/${decodedToken}`,
            {
              headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
              },
            }
          );
          const data = await response.json();
          setInformacao(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [decodedToken]);

  if (!decodedToken) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <Loading />
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
          <CardProgressos />
          <div className="registros table-responsive">
            <div className="registro-header">
              <div className="add">
                <button style={{ marginRight: "10px" }}>Buscar</button>
                <select name="" id="">
                  <option value="">ID</option>
                </select>
              </div>

              <div className="browse">
                <input
                  type="search"
                  placeholder="Search"
                  className="record-search"
                />
              </div>
            </div>
          </div>
          <CardAdmin informacao={informacao} />
        </div>
      </div>
    </PrivateRoute>
  );
}
