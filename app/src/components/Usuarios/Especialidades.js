"use client";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Especialidades({ nome }) {
  const [show, setShow] = useState(false);
  const fechaModal = () => setShow(false);
  const abrirModal = () => setShow(true);
  const [clinica, setClinica] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    fetch(`https://api-web-saude.vercel.app/clinica/${nome}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Falha ao buscar dados da API");
        }
        return response.json();
      })
      .then(data => {
        console.log("Dados da resposta da API:", data);
        setClinica(data);

        // Buscar todas as especialidades existentes
        fetch("https://api-web-saude.vercel.app/especialidades")
          .then(response => {
            if (!response.ok) {
              throw new Error("Falha ao buscar as especialidades existentes");
            }
            return response.json();
          })
          .then(data => {
            console.log("Especialidades existentes:", data);
            setEspecialidades(data);
          })
          .catch(error => {
            console.log("Erro ao buscar as especialidades existentes:", error);
          });
      })
      .catch(error => {
        console.log("Erro na chamada para a API:", error);
      });
  }, [nome]);

  // Função para obter os nomes das especialidades da clínica
  const getNomesEspecialidadesClinica = () => {
    const nomesEspecialidades = especialidades
      .filter(especialidade =>
        clinica[0]?.especialidades?.includes(especialidade._id)
      )
      .map(especialidade => especialidade.nome);
    return nomesEspecialidades;
  };

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
          {getNomesEspecialidadesClinica().map(nomeEspecialidade => (
            <p key={nomeEspecialidade}>
              {nomeEspecialidade}
              {console.log(nomeEspecialidade)}
            </p>
          ))}
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
