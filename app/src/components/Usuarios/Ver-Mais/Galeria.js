"use client";
import React, { useState, useEffect } from "react";
import ConsultasService from "@/services/ConsultasService";
import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importa os ícones de fechar e de setas
import "@/components/Usuarios/Ver-Mais/css/Galeria.css";

export default function Galeria({ unidadeDeSaude }) {
  const [showCarousel, setShowCarousel] = useState(false);
  const [visibleImages, setVisibleImages] = useState(2);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (unidadeDeSaude && unidadeDeSaude.imagens) {
      setTotalImages(unidadeDeSaude.imagens.length);
      // Definir o número inicial de imagens visíveis ao montar o componente
      setVisibleImages(Math.min(2, unidadeDeSaude.imagens.length));
    }
  }, [unidadeDeSaude]);

  const showMoreImages = () => {
    setShowCarousel(true);
  };

  const closeCarousel = () => {
    setShowCarousel(false);
  };

  return (
    <section className="sectionGaleria">
      <h1 className="tituloGaleria">Galeria</h1>

      <div className="galeria">
        {unidadeDeSaude.imagens &&
          unidadeDeSaude.imagens.slice(0, visibleImages).map((src, index) => (
            <div key={index} className="image">
              <Link href={src}>
                <Image src={src} width={200} height={200} className="imagens" />
              </Link>
            </div>
          ))}
      </div>

      {totalImages > visibleImages && (
        <div className="buttonGaleria">
          <button onClick={showMoreImages}>Ver Mais</button>
        </div>
      )}

      {showCarousel && (
        <div className="carrosselOverlay">
          {/* Carrossel */}
          <Carousel
            className="carouselContent"
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
          <div className="closeIcon" onClick={closeCarousel}>
            <FaTimes color="red" size={50} />
          </div>
        </div>
      )}
    </section>
  );
}
