"use client";
import React, { useState, useEffect } from "react";
import styles from "@/components/Admin/css/Notificacoes.module.css";
import Image from "next/image";
import Loading from "@/app/loading";
import PrivateRoute from "./privateRouter";
import Link from "next/link";

export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notificacoesLidas, setNotificacoesLidas] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `https://api-web-saude.vercel.app/notificacoes`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          }
        );
        const responseData = await response.json();

        if (
          responseData &&
          responseData.Message &&
          Array.isArray(responseData.Message)
        ) {
          setNotificacoes(responseData.Message);
          setNotificacoesLidas(false);
        } else {
          console.error(
            "Invalid data format. Expected an array in responseData.Message."
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [notificacoesLidas]);

  const marcarComoLidas = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://api-web-saude.vercel.app/marcar-como-lidas`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,

          },
        }
      );

      if (response.ok) {
        const resposta = await response.json();
        setNotificacoesLidas(true);
        return resposta;
      } else {
        console.error(
          "Erro ao marcar notificações como lidas:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erro ao marcar notificações como lidas:", error);
    }
  };

  const marcarComoLidasPeloID =  async (id) =>{

   const token = localStorage.getItem("token");

   try {
    const response = await fetch( `https://api-web-saude.vercel.app/marcar-como-lida/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "x-access-token": token
      }
       
    },

    )
    
    if(response.ok){
      const resposta = await response.json();
      return resposta
    }
   } catch (error) {
    console.error("Erro ao marcar notificações como lidas:", error);

   }
  }

  if (isLoading) {
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
      <section className={styles.sectionNotificacoes}>
        <main className={styles.container}>
          <div className={styles.panel}>
            <h1>
              Notificações <button id={styles.number}></button>
            </h1>
            <button
              className={`btn btn-primary ${styles.panelButton}`}
              onClick={marcarComoLidas}
            >
              Marcar como lidas
            </button>
          </div>
          {notificacoes.map(notificacao => (
              <Link
              onClick={() => marcarComoLidasPeloID(notificacao.id)}
              className={styles.link}
              href={
                notificacao.tipo === "Pedido"
                  ? "/dashboard/unidades-de-saude/pedidos"
                  : "/dashboard/unidades-de-saude/"
              }
            >
            <div
              
              className={` ${styles.notification} ${
                notificacao.lida === true ? styles.lida : styles.new
              }`}
              key={notificacao._id}
            >
            
                <div className={styles.block}>
                  <Image
                    src="/assets/images/avatar-mark-webber.webp"
                    alt="MarkWebber avatar"
                    width={40}
                    height={40}
                  />
                  <div className={styles.description}>
                    <h3 className={styles.mensagem}>
                      <span className={styles.article}>{notificacao.tipo}</span>
                    </h3>
                    <p className={styles.mensagem}>
                      <span className={styles.article}>
                        {notificacao.mensagem}
                      </span>
                      <button
                        className={
                          notificacao.lida === true
                            ? styles.circleNone
                            : styles.circle
                        }
                      ></button>
                    </p>
                    <p className={styles.time}>
                      {notificacao.dataCriacaoFormatada}
                    </p>
                  </div>
                </div>
            </div>
            </Link>

          ))}
        </main>
      </section>
    </PrivateRoute>
  );
}
