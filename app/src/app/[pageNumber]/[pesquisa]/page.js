"use client"
import React, { useState } from "react";
import Clinica from "@/services/Clinica";
import Slogan from "@/components/Usuarios/Slogan";
import Filtros from "@/components/Usuarios/Filtros";
import Header from "@/components/Usuarios/Header";
import Footer from "@/components/Usuarios/Footer";
import "@/components/Usuarios/css/Home.css";
import "@/components/Usuarios/css/Layout.css";
import "@/components/Usuarios/css/Card.css";
import ButtonSearch from "@/components/Usuarios/ButtonSearch";
import Link from "next/link";

export default function pesquisa({params}) {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      return;
    }

    try {
      const info = await Clinica.pegarClinica(params.pageNumber);
      setSearchResults([info]);
      
    } catch (error) {
      console.error("Erro ao realizar a pesquisa:", error);
    }
  };
  console.log(searchTerm)
  return (
    <>
      <Header />
      <div className="containers">
          <Slogan />
          <ButtonSearch
            handleSearch={handleSearch}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            nome={params.pesquisa}
            
          />
          <Filtros />
        </div>       
          <section className="section-card">
            {searchResults.map((info)=>
          <div className="card-container">
            <div className="top">
              <div className="image-container">
                <img src={info.imagem} alt={info.nome} />
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
          
              
          )}
          </section>
       <Footer/>
      </>
    
  );
}
