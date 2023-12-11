import React, { Component } from "react";
import { Modal, Button, Carousel, Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/components/Usuarios/Ver-Mais/css/Galeria.css";

const allImages = [
  "/imgs/medicina1.jpg",
  "/imgs/medicina2.jpg",
  "/imgs/medicina3.jpg",
  "/imgs/medicina1.jpg",
  "/imgs/medicina2.jpg",
  "/imgs/medicina3.jpg"
];

export default class Galeria extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      selectedImageIndex: 0,
      showAllImages: false
    };

    this.galleryRef = React.createRef();
  }

  openLightbox = (index) => {
    this.setState({
      selectedImageIndex: index,
      showModal: true
    });
  };

  closeLightbox = () => {
    this.setState({
      showModal: false
    });
  };

  toggleImages = () => {
    const { showAllImages } = this.state;

    if (showAllImages) {
      this.setState({
        selectedImageIndex: 0
      });

      this.galleryRef.current.scrollIntoView({ behavior: "smooth" });
    }

    this.setState({
      showAllImages: !showAllImages
    });
  };

  render() {
    const { showAllImages, showModal, selectedImageIndex } = this.state;
    const visibleImages = showAllImages ? allImages : allImages.slice(0, 2);

    return (
      <div ref={this.galleryRef} id="galeria" className="photo-gallery">
        <div className="container text-center">
          <div className="intro">
            <h2>Galeria</h2>
          </div>
          <Row className="justify-content-center">
            {visibleImages.map((src, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card>
                  <Card.Img
                    src={src}
                    alt={`Image ${index + 1}`}
                    onClick={() => this.openLightbox(index)}
                    style={{ cursor: "pointer" }}
                    variant="top"
                    className="img-fluid"
                  />
                </Card>
              </Col>
            ))}
          </Row>
          {allImages.length > 2 && (
            <div className="text-center mt-3">
              <Button
                className="mb-3"
                variant="primary"
                onClick={this.toggleImages}
              >
                {showAllImages ? "Ver Menos" : "Ver Mais"}
              </Button>
            </div>
          )}
          <Modal show={showModal} onHide={this.closeLightbox}>
            <Modal.Body>
              <Carousel
                activeIndex={selectedImageIndex}
                onSelect={(selectedIndex) =>
                  this.setState({ selectedImageIndex: selectedIndex })
                }
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
  }
}

