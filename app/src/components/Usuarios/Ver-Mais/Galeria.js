import React from "react";
import ConsultasService from "@/services/ConsultasService";
import Link from "next/link";
import Image from "next/image";
import "@/components/Usuarios/Ver-Mais/css/Galeria.css";

export default async function Galeria({ nome }) {
  const unidadeDeSaude = await ConsultasService.pegarUnidadedeSaude(nome);

  return (
    
    <section className="sectionGaleria">
       <h1 className="tituloGaleria">
        Galeria
       </h1>

       <div className="galeria">
          {unidadeDeSaude.imagens.map((src, index) => (

          <div key={index} className="image">
              <Link href={src}>
                <Image src={src} width={200} height={200} className="imagens"/>
              </Link>
          </div>          
          ))}
       </div>
       
       <div className="buttonGaleria">
        <button>Ver Mais</button>
       </div>
    </section>
  );
}
