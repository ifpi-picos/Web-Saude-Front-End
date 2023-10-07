"use client";

import React, { useState } from "react";
import "@/components/Usuarios/css/Card.css";
import Link from "next/link";
import "@/components/Usuarios/css/ButtonSearch.css";

export default function ButtonSearch() {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = event => {
    setSearchValue(event.target.value);
  };
  const formattedSearchValue = searchValue.replace(/ /g, "-"); // Substitui espaços por hífens

  return (
    <>
      <div className="div-search">
        <form>
          <div className="input-search">
            <input
              type="search"
              placeholder="Hospital/Clínica ou Especialidade"
              value={searchValue}
              onChange={handleInputChange}
            />
            <div className="button-search">
              {console.log(searchValue)}
              <Link
                href={`/pesquisa/${encodeURIComponent(formattedSearchValue)}`}
              >
                Buscar
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
