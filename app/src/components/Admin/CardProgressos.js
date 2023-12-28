"use client";
import React, { useState, useEffect } from "react";
import { FaBuilding, FaUser, FaEye, FaBell } from "react-icons/fa";
import PrivateRoute from "./privateRouter";
import ConsultasService from "@/services/ConsultasService";
import styles from "@/components/Admin/Progresso.module.css"; // Importando o módulo CSS
import { useDecodedToken } from "@/services/decodeToken";
import Link from "next/link";

function CardProgressosAdmin() {
  const [totalUnidadesDeSaude, setTotalUnidadesDeSaude] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalNotificacoes, setTotalNotificacoes] = useState(0);

  useEffect(() => {
    async function fetchDataUnidadesDeSaude() {
      try {
        const result = await ConsultasService.pegarTotalDasUnidadesDeSaude();
        setTotalUnidadesDeSaude(result.total);
      } catch (error) {
        console.error("Erro ao obter dados de unidades de saúde:", error);
      }
    }

    async function fetchDataUsuarios() {
      try {
        const result = await ConsultasService.pegarTotalDeUsuarios();
        setTotalUsuarios(result.total);
      } catch (error) {
        console.error("Erro ao obter dados de usuários:", error);
      }
    }

    async function fetchDataNotificacoes() {
      try {
        setTotalNotificacoes(50);
      } catch (error) {
        console.error("Erro ao obter dados de notificações:", error);
      }
    }

    fetchDataUnidadesDeSaude();
    fetchDataUsuarios();
    fetchDataNotificacoes();
  }, []);

  function calcularPorcentagem(valor, total) {
    return total !== 0 ? (valor / total) * 100 : 0;
  }

  const isAdminPage =
    typeof window !== "undefined" && window.location.pathname === "/dashboard";

  const decodedToken = useDecodedToken();

  return (
    <PrivateRoute>
      {decodedToken === "admin" ? (
        <div className={styles.analytics}>
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <h2>340</h2>
              <FaEye className="icon" size={25} />
            </div>
            <div className={styles.cardProgress}>
              <small>Visualizações Total do Site</small>
              <div className={styles.cardIndicator}>
                <div
                  className={`${styles.indicator} ${styles.indicatorRoxo}`}
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>
          </div>

          {isAdminPage && (
            <Link href="/dashboard/notificacoes" className={styles.link}>
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <h2>{totalNotificacoes}</h2>
                  <FaBell className="icon" size={25} />
                </div>
                <div className={styles.cardProgress}>
                  <small>Notificações</small>
                  <div className={styles.cardIndicator}>
                    <div
                      className={`${styles.indicator} ${styles.indicatorAmarelo}`}
                      style={{
                        width: `${calcularPorcentagem(
                          totalNotificacoes,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          <Link href="/dashboard/unidades-de-saude" className={styles.link}>
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <h2>{totalUnidadesDeSaude}</h2>
                <FaBuilding className="icon" size={25} />
              </div>
              <div className={styles.cardProgress}>
                <small>Quantidade de Unidades de Saúde</small>
                <div className={styles.cardIndicator}>
                  <div
                    className={`${styles.indicator} ${styles.indicatorVerde}`}
                    style={{
                      width: `${calcularPorcentagem(
                        totalUnidadesDeSaude,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </Link>
          {isAdminPage && (
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <h2>{totalUsuarios}</h2>
                <FaUser className="icon" size={25} />
              </div>
              <div className={styles.cardProgress}>
                <small>Quantidade de Usuários Ativos</small>
                <div className={styles.cardIndicator}>
                  <div
                    className={`${styles.indicator} ${styles.indicatorAzul}`}
                    style={{
                      width: `${calcularPorcentagem(totalUsuarios, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.analytics}>
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <h2>340</h2>
              <FaEye className="icon" size={25} />
            </div>
            <div className={styles.cardProgress}>
              <small>Visualizações total de seus Estabelecimentos</small>
              <div
                className={`${styles.cardIndicator} ${styles.indicatorVerde}`}
                style={{ width: "80%" }}
              ></div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHead}>
              <h2>47</h2>
              <FaEye className="icon" size={25} />
            </div>
            <div className={styles.cardProgress}>
              <small>Visualizações mensais</small>
              <div
                className={`${styles.cardIndicator} ${styles.indicatorAzul}`}
                style={{ width: "80%" }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </PrivateRoute>
  );
}

export default CardProgressosAdmin;
