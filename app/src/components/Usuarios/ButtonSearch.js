"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "@/components/Usuarios/css/ButtonSearch.css";

export default function ButtonSearch() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleInputChange = event => {
    const inputValue = event.target.value;
    // Remove todos os caracteres de pontuação (incluindo hífens)
    const formattedValue = inputValue.replace(/[\p{P}\p{S}]/gu, " ");
    setSearchValue(formattedValue);
  };
  const handleSearch = event => {
    event.preventDefault(); // Evita que o formulário recarregue a página
    const formattedSearchValue = encodeURIComponent(
      searchValue.replace(/ /g, "-")
    );
    // Redirecione para a página de pesquisa com o valor formatado
    router.push(`/pesquisa/${formattedSearchValue}`);
  };

  return (
    <div className="div-search">
      <form onSubmit={handleSearch}>
        <div className="input-search">
          <input
            type="search"
            placeholder="Hospital/Clínica ou Especialidade"
            value={searchValue}
            onChange={handleInputChange}
          />
          <div className="button-search">
            <button type="submit">Buscar</button>
          </div>
        </div>
      </form>
    </div>
  );
}
