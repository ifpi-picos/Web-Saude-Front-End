import React from "react";
import "@/components/UsuariosAndAdmin/css/Paginacao.css";

export default function Paginacao({ currentPage, totalPages, setCurrentPage }) {
  const maxPageButtons = 4;

  function getPaginationInterval() {
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    startPage = Math.max(1, endPage - maxPageButtons + 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  return (
    <div className="div-buttons-catalogo">
      {currentPage > 1 && (
        <div className="button-prox-ant">
          <button
            onClick={() => {
              if (currentPage > 1) {
                const newPage = currentPage - 1;
                setCurrentPage(newPage);
                window.history.pushState({}, "", `${newPage}`);
              }
            }}
          >
            Anterior
          </button>
        </div>
      )}
      {getPaginationInterval().map(pageNumber => (
        <div className="div-buttons" key={pageNumber}>
          <div className="button-catalogo">
            <button
              className={currentPage === pageNumber ? "active" : ""}
              onClick={() => {
                setCurrentPage(pageNumber);
                const path =
                  document.title === "Clínicas"
                    ? "clinicas"
                    : document.title === "Hospital"
                    ? "hospitais"
                    : "page";
                window.history.pushState({}, "", `/${path}/${pageNumber}`);
              }}
            >
              {pageNumber}
            </button>
          </div>
        </div>
      ))}
      {currentPage < totalPages && (
        <div className="button-prox-ant">
          <button
            onClick={() => {
              if (currentPage < totalPages) {
                const newPage = currentPage + 1;
                setCurrentPage(newPage);
                const path =
                  document.title === "Clínicas"
                    ? "clinicas"
                    : document.title === "Hospitais"
                    ? "hospitais"
                    : "page";
                window.history.pushState({}, "", `/${path}/${newPage}`);
              }
            }}
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  );
}
