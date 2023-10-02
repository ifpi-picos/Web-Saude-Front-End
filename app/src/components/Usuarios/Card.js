"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "@/components/Usuarios/css/Card.css";
import Paginacao from "../UsuariosAndAdmin/Paginacao";
import ButtonSearch from "./ButtonSearch";

export default function Card({ pageNumber,informacao,infos }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa

  useEffect(() => {
    if (pageNumber) {
      setCurrentPage(parseInt(pageNumber));
      setSearchTerm(""); // Limpa o termo de pesquisa ao mudar de página
    }
  }, [pageNumber]);

  const maxPostsPerPage = 4;
  const indexOfLastPost = currentPage * maxPostsPerPage;
  const indexOfFirstPost = indexOfLastPost - maxPostsPerPage;

  // Filtra os dados com base no termo de pesquisa
  const filteredPosts = informacao.filter((info) =>
    info.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const limitedPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / maxPostsPerPage);

  const handleSearch = () => {
    setCurrentPage(1); // Volta para a primeira página ao realizar uma pesquisa
    
  };

  return (
    <section className="section-card">
      <ButtonSearch/>

      <>
        { limitedPosts.map((info, index) => (
          <div className="card-container" key={index}>
            <div className="top">
              <div className="image-container">
                <img src={info.imagem} alt={info.nome || infos.nome} />
              </div>
            </div>
            <div className="button">
              <h3>{info.nome}</h3>
              <p>
                {/* {info.endereco.rua}*/}. de Fátima, 629 - Centro, Picos - PI, 
                64600-148
              </p>
              <p>
                Aberto de Segunda a Sexta das{" "}
                {/* <strong>{info.horarioSemana.open}</strong> até as{" "}
                  <strong>{info.horarioSemana.close}</strong>*/}
              </p>
              <div className="div-ver-mais btn-margin">
                <div className="div-button-ver-mais">
                  <Link href={`/ver-mais/${info.nome}`}>Ver mais</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>

      <Paginacao
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}
