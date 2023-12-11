import React, { useState, useRef } from "react";
import { Modal, Button, Carousel, Card, Row, Col } from "react-bootstrap";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css"; // Adicionando o Bootstrap
import "@/components/Usuarios/Ver-Mais/css/Galeria.css"; // Mantenha seus estilos personalizados

const allImages = [
  "/imgs/medicina1.jpg", "/imgs/medicina2.jpg", "/imgs/medicina3.jpg", "/imgs/medicina1.jpg", "/imgs/medicina2.jpg", "/imgs/medicina3.jpg"
];

const Galeria = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const galleryRef = useRef(null);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const closeLightbox = () => {
    setShowModal(false);
  };

  const toggleImages = () => {
    if (showAllImages) {
      setSelectedImageIndex(0);
      galleryRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setShowAllImages(!showAllImages);
  };

  const visibleImages = showAllImages ? allImages : allImages.slice(0, 2);

  return (
    <div ref={galleryRef} className="photo-gallery">
      <div className="container text-center">
        <div className="intro">
          <h2>Galeria</h2>
        </div>
        <Row className="justify-content-center">
          {visibleImages.map((src, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card >
                <Card.Img
                  src={src}
                  alt={`Image ${index + 1}`}
                  onClick={() => openLightbox(index)}
                  style={{ cursor: "pointer"}}
                  variant="top"
                  className="img-fluid"
                />
              </Card>
            </Col>
          ))}
        </Row>
        {allImages.length > 2 && (
          <div className="text-center mt-3">
            <Button className="mb-3" variant="primary" onClick={toggleImages}>
              {showAllImages ? "Ver Menos" : "Ver Mais"}
            </Button>
          </div>
        )}
        <Modal show={showModal} onHide={closeLightbox}>
          <Modal.Body>
            <Carousel
              activeIndex={selectedImageIndex}
              onSelect={(selectedIndex) => setSelectedImageIndex(selectedIndex)}
              interval={null}
            >
              {allImages.map((src, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={src}
                    alt={`Image ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Galeria;
