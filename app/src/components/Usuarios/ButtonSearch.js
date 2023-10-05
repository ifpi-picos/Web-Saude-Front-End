"use client"
import React, { useState } from "react";
import "@/components/Usuarios/css/Card.css";
import Link from "next/link";
export default function ButtonSearch({params}) {
  const [searchValue, setSearchValue] = useState(""); // Estado para armazenar o valor de pesquisa

  const handleInputChange = (event) => {
    setSearchValue(event.target.value); // Atualiza o estado com o valor de pesquisa
  };
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
          <Link href={`/pesquisa/${searchValue}`}>Buscar</Link>
          </div>
        </div>
      </form>
    </div>
    
 </>
  );

  }