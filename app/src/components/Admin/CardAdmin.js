"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../Admin/css/CardAdmin.css";
import Image from "next/image";

export default function CardAdmin({ pageNumber }) {
  const [info, setInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const maxPostsPerPage = 3;
  const [searchResults, setSearchResults] = useState([]);

  const indexOfLastPost = currentPage * maxPostsPerPage;
  const indexOfFirstPost = indexOfLastPost - maxPostsPerPage;
  const limitedPosts = Array.isArray(info)
    ? info.slice(indexOfFirstPost, indexOfLastPost)
    : [];
  const totalPages = Math.ceil(info.length / maxPostsPerPage);

  const maxPageButtons = 4;

  useEffect(() => {
    if (searchResults.length > 0) {
      setInfo(searchResults);
    } else {
      fetch("https://api-web-saude.vercel.app/clinicas")
        .then(response => {
          if (!response.ok) {
            throw new Error("Falha ao buscar dados da API");
          }
          return response.json();
        })
        .then(data => {
          setInfo(data);
        })
        .catch(error => {
          console.error("Erro ao obter dados:", error);
        });
    }
  }, [searchResults]);

  useEffect(() => {
    if (pageNumber) {
      setCurrentPage(parseInt(pageNumber));
    }
  }, [pageNumber]);

  function getIntervaloPaginas() {
    let paginaInicial = Math.max(
      1,
      currentPage - Math.floor(maxPageButtons / 2)
    );
    const paginaFinal = Math.min(
      totalPages,
      paginaInicial + maxPageButtons - 1
    );
    paginaInicial = Math.max(1, paginaFinal - maxPageButtons + 1);
    return Array.from(
      { length: paginaFinal - paginaInicial + 1 },
      (_, i) => paginaInicial + i
    );
  }

  function handleSearch(data) {
    setSearchResults(data);
    setCurrentPage(1);
  }

  const postsToDisplay =
    searchResults.length > 0 ? searchResults : limitedPosts;

  return (
    <section className="section-card-admin">
      {postsToDisplay.length > 0 ? (
        postsToDisplay.map((info, key) => (
          <div className="card-container" key={key}>
            <div className="top">
              <div className="image-container">
                <Image
                  src={info.imagem}
                  height={200}
                  width={200}
                  alt={info.nome}
                />
              </div>
            </div>
            <div className="button">
              <h3>{info.nome}</h3>
              <p>
                {info.endereco.rua}. de Fátima, 629 - Centro, Picos - PI,
                64600-148
              </p>
              <p>
                Aberto de Segunda a Sexta das{" "}
                <strong>{info.horarioSemana.open}</strong> até as{" "}
                <strong>{info.horarioSemana.close}</strong>
              </p>
              <div className="div-ver-mais btn-margin">
                <div className="div-button-ver-mais">
                  <Link href={`/ver-mais/${info.nome}`}>Ver mais</Link>
                </div>
              </div>
            </div>
            <div className="buttons">
              <div className="button-alterar">
                <Link href="">Editar</Link>
              </div>
              <div className="button-deletar">
                <Link href="">Deletar</Link>
              </div>
            </div>
            <hr />
          </div>
        ))
      ) : (
        <div className="no-results-message">Nenhum resultado encontrado.</div>
      )}

      <div className="div-buttons-catalogo">
        {currentPage > 1 && (
          <div className="button-prox-ant">
            <Link href={`/${currentPage - 1}`} key="anterior">
              <button>Anterior</button>
            </Link>
          </div>
        )}
        {getIntervaloPaginas().map(numeroPagina => (
          <div className="div-buttons" key={numeroPagina}>
            <div className="button-catalogo">
              <Link href={`/${numeroPagina}`} key={numeroPagina}>
                <button
                  className={currentPage === numeroPagina ? "active" : ""}
                >
                  {numeroPagina}
                </button>
              </Link>
            </div>
          </div>
        ))}
        {currentPage < totalPages && (
          <div className="button-prox-ant">
            <Link href={`/${currentPage + 1}`} key="proxima">
              <button>Próximo</button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
