import React, { useState } from "react";
import ConsultasService from "@/services/ConsultasService";
import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importa os ícones de fechar e de setas
import styles from "@/components/Usuarios/Ver-Mais/css/Galeria.module.css"; // Importa o arquivo CSS Module

export default function Galeria({ unidadeDeSaude }) {

  const showCarousel = () => {
    document.getElementById("carrossel-overlay").style.display = "block";
  };

  const closeCarousel = () => {
    document.getElementById("carrossel-overlay").style.display = "none";
  };

  return (
    <section className={styles.sectionGaleria}>
      <h1 className={styles.tituloGaleria}>Galeria</h1>

      <div className={styles.galeria}>
        {unidadeDeSaude.imagens &&
          unidadeDeSaude.imagens.slice(0, 2).map((src, index) => (
            <div key={index} className={styles.image}>
              <Link href={src}>
                <Image src={src} width={200} height={200} className={styles.imagens} />
              </Link>
            </div>
          ))}
      </div>

      {unidadeDeSaude.imagens.length > 2 && (
        <div className={styles.buttonGaleria}>
          <button onClick={showCarousel}>Ver Mais</button>
        </div>
      )}

      <div id="carrossel-overlay" className={styles.carrosselOverlay}>
        {/* Carrossel */}
        <Carousel
          className={styles.carouselContent}
          nextIcon={<FaChevronRight size={40} />}
          prevIcon={<FaChevronLeft size={40} />}
        >
          {unidadeDeSaude.imagens.map((src, index) => (
            <Carousel.Item key={index}>
              <img
                src={src}
                className="d-block w-100"
                alt={`Imagem ${index}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className={styles.closeIcon} onClick={closeCarousel}>
          <FaTimes color="red" size={50} />
        </div>
      </div>
    </section>
  );
}
