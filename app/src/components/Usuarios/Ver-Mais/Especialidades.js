import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Especialidades({ nome }) {
  const [show, setShow] = useState(false);
  const [especialidades, setEspecialidades] = useState([]);
  const fechaModal = () => setShow(false);
  const abrirModal = () => setShow(true);

  useEffect(() => {
    fetch(`https://api-web-saude.vercel.app/especialidades/${nome}`)
      .then((response) => response.json())
      .then((data) => setEspecialidades(data));
  }, [nome]);
 
  return (
    <div id="especialidades">
      <Button
        className="button-especialidades"
        variant="primary"
        onClick={abrirModal}
      >
        Especialidades
      </Button>

      <Modal show={show} onHide={fechaModal}>
        <Modal.Header closeButton>
          <Modal.Title>Especialidades</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ cursor: "pointer" }}>
          <ul>
            {especialidades.map((especialidade, index) => (
              <li key={index}>{especialidade.nome}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fechaModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
