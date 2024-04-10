import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "@/components/Usuarios/Ver-Mais/css/Galeria.module.css";

export default function Galeria({ unidadeDeSaude }) {
  const [showCarousel, setShowCarousel] = useState(false);

  const openCarousel = () => {
    setShowCarousel(true);
  };

  const closeCarousel = () => {
    setShowCarousel(false);
  };

  return (
    <section className={styles.sectionGaleria}>
      <h1 className={styles.tituloGaleria}>Galeria</h1>

      <div className={styles.galeria}>
        {unidadeDeSaude?.imagens.slice(0, 2).map((src, index) => (
          <div key={index} className={styles.image}>
            <Link href={src}>
              <Image
                src={src}
                alt={`Imagem ${index}`}
                width={200}
                height={200}
                className={styles.imagens}
              />
            </Link>
          </div>
        ))}
      </div>

      {unidadeDeSaude?.imagens.length > 2 && (
        <div className={styles.buttonGaleria}>
          <button onClick={openCarousel}>Ver Mais</button>
        </div>
      )}

      {showCarousel && (
        <div id="carrossel-overlay" className={styles.carrosselOverlay}>
          <Carousel
            className={styles.carouselContent}
            nextIcon={<FaChevronRight size={40} />}
            prevIcon={<FaChevronLeft size={40} />}
          >
            {unidadeDeSaude?.imagens.map((src, index) => (
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
      )}
    </section>
  );
}
