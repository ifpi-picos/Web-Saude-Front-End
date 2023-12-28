import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import ConsultasService from "@/services/ConsultasService";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/components/Usuarios/Ver-Mais/css/Galeria.css";

export default async function Galeria({ nome }) {
  const unidadeDeSaude = await ConsultasService.pegarUnidadedeSaude(nome);

  return (
    <div id="galeria" className="photo-gallery">
      <div className="container text-center">
        <div className="intro">
          <h2>Galeria</h2>
        </div>
        <Row className="justify-content-center">
          {unidadeDeSaude.imagens.map((src, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img
                  src={src}
                  alt={`Imagem ${index + 1}`}
                  style={{ cursor: "pointer" }}
                  variant="top"
                  className="img-fluid imagens"
                />
              </Card>
            </Col>
          ))}
        </Row>
        {unidadeDeSaude.imagens.length > 2 && (
          <div className="text-center mt-3">
            <Button variant="primary" className="mb-2">
              Ver Mais
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
