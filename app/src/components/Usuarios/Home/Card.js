"use client";
import React, { useState, useEffect } from "react";
import Paginacao from "../../UsuariosAndAdmin/Paginacao";
import Link from "next/link";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "@/components/Usuarios/Home/css/Card.css";

export default function Card({ pageNumber, informacao }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (pageNumber) {
      setCurrentPage(parseInt(pageNumber));
    }
  }, [pageNumber]);

  const maxPostsPerPage = 4;
  const indexOfLastPost = currentPage * maxPostsPerPage;
  const indexOfFirstPost = indexOfLastPost - maxPostsPerPage;

  const limitedPosts = Array.isArray(informacao)
    ? informacao.slice(indexOfFirstPost, indexOfLastPost)
    : [];
  const totalPages = Math.ceil(informacao.length / maxPostsPerPage);

  return (
    <section className="section-card">
      {limitedPosts.length === 0 ? (
        <p className="mt-3">
          <strong>Nenhum resultado encontrado.</strong>
        </p>
      ) : (
        <>
          {limitedPosts.map((info, index) => (
            <div className="card-container" key={index}>
              <div className="top">
                <div className="image-container">
                  <img src={info.imagem} alt={info.nome} />
                </div>
              </div>
              <div className="button">
                <h3>{info.nome}</h3>
                <div className="div-endereco">
                  <FaMapMarkerAlt className="endereco-icon" />
                  <p>
                    {info.endereco.rua}, {info.endereco.numero} -{" "}
                    {info.endereco.bairro}, {info.endereco.cidade} -
                    {info.endereco.uf}, {info.endereco.cep}
                  </p>
                </div>

                {info.horario === "Atendimento 24 Horas" ? (
                  <div className="div-horario-icon">
                    <FaClock className="horario-icon" />
                    <p>Atendimento 24 horas</p>
                  </div>
                ) : (
                  <div className="div-horario-icon">
                    <FaClock className="horario-icon" />
                    <p>
                      Aberto de Segunda a Sexta das{" "}
                      <strong>{info.horarioSemana.open}</strong> até as{" "}
                      <strong>{info.horarioSemana.close}</strong>
                    </p>
                  </div>
                )}
                {info.sabado ? (
                  info.sabado.open && info.sabado.close ? (
                    <div className="div-horario-icon">
                      <FaClock className="horario-icon-sabado" />
                      <p>
                        Aberto aos sábados das
                        <strong>{info.sabado.open}</strong> até as
                        <strong>{info.sabado.close}</strong>
                      </p>
                    </div>
                  ) : (
                    <p>Fechado aos sábados</p>
                  )
                ) : info.horario === "Atendimento 24 Horas" ? (
                  <p>Abre todos os dias</p>
                ) : (
                  <p>Fechado aos sábados</p>
                )}
                <div className="div-ver-mais btn-margin">
                  <div className="div-button-ver-mais">
                    <Link href={`/ver-mais/${info.nome}`}>Ver mais</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {totalPages > 1 && (
            <Paginacao
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </section>
  );
}
