"use client"
import React, { useState } from "react";
import "@/components/Usuarios/css/Card.css";
import Clinica from "@/services/Clinica";
import Link from "next/link";
export default function ButtonSearch({nome}) {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      return;
    }

    try {
      const info = await Clinica.pegarClinica(searchTerm);
      setSearchResults([info]); 
      window.location.href = `/${info.nome}`

    } catch (error) {
      console.error("Erro ao realizar a pesquisa:", error);
    }
  };
  console.log(nome)
  return (<>
    <div className="div-search">
      <form>
        <div className="input-search">
          <input
            type="search"
            placeholder="Hospital/Clínica ou Especialidade"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="button-search">
            <button type="button" onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
      </form>
    </div>
    
              
        
          </>
  );
}
