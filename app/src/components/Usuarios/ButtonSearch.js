"use client"
import { useState } from "react";

export default function ButtonSearch({ handleSearch, pageNumber }) {
  const [searchTerm, setSearchTerm] = useState("");

  function fetchSearchResults() {
    if (searchTerm) {
      fetch(
        `https://web-saude-back-end-eric-developer.vercel.app/clinica/${searchTerm}`
      )
        .then(response => {
          if (!response.ok) {
            throw new Error("Falha ao buscar dados da API");
          }
          return response.json();
        })
        .then(data => {
          handleSearch(data, searchTerm, pageNumber); // Passa também o searchTerm e pageNumber
        })
        .catch(error => {
          console.error("Deu erro:", error);
          handleSearch([], searchTerm, pageNumber); // Define o estado vazio em caso de erro
        });
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    fetchSearchResults();
  }

  return (
    <div className="div-search">
      <form onSubmit={handleSubmit}>
        <div className="input-search">
          <input
            type="search"
            placeholder="Hospital/Clínica ou Especialidade"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
          <div className="button-search">
            <button type="submit">Buscar</button>
          </div>
        </div>
      </form>
    </div>
  );
}
