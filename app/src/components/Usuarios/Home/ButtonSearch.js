"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "@/components/Usuarios/Home/css/ButtonSearch.css";

export default function ButtonSearch() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleInputChange = event => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
  };

  const handleSearch = event => {
    event.preventDefault();
    const formattedSearchValue = encodeURIComponent(
      searchValue.replace(/ /g, "-")
    );
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
            required
          />
          <div className="button-search">
            <button type="submit">Buscar</button>
          </div>
        </div>
      </form>
    </div>
  );
}
