"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCog } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import Paginacao from "../UsuariosAndAdmin/Paginacao";
import { useDecodedToken } from "@/services/decodeToken";
import "../Admin/css/CardAdmin.css";

export default function CardAdmin({ pageNumber, informacao }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemStates, setItemStates] = useState([]);

  const decodedToken = useDecodedToken();

  useEffect(() => {
    if (pageNumber) {
      setCurrentPage(parseInt(pageNumber));
    }
  }, [pageNumber]);

  useEffect(() => {
    const initialState = informacao.map(() => ({
      showModal: false,
      selectedItem: null,
    }));
    setItemStates(initialState);
  }, [informacao]);

  const maxPostsPerPage = 4;
  const indexOfLastPost = currentPage * maxPostsPerPage;
  const indexOfFirstPost = indexOfLastPost - maxPostsPerPage;

  const limitedPosts = Array.isArray(informacao)
    ? informacao.slice(indexOfFirstPost, indexOfLastPost)
    : [];
  const totalPages = Math.ceil(informacao.length / maxPostsPerPage);

  const handleShowModal = (item, index) => {
    const newStates = [...itemStates];
    newStates[index] = {
      showModal: true,
      selectedItem: item,
    };
    setItemStates(newStates);
  };

  const handleCloseModal = index => {
    const newStates = [...itemStates];
    newStates[index] = {
      showModal: false,
      selectedItem: null,
    };
    setItemStates(newStates);
  };

  const handleDeleteItem = (selectedItem, index) => {
    if (selectedItem) {
      const confirmation = window.confirm(
        "Tem certeza que deseja deletar esta unidade de saúde?"
      );

      if (confirmation) {
        const itemId = selectedItem._id;
        const tipoEstabelecimento = selectedItem.horario;
        console.log(itemId, tipoEstabelecimento);
        const token = localStorage.getItem("token");
        const deleteEndpoint =
          tipoEstabelecimento === "Atendimento 24 Horas"
            ? `https://api-web-saude.vercel.app/admin/deletar-hospital/${itemId}`
            : `https://api-web-saude.vercel.app/admin/deletar-clinica/${itemId}`;

        fetch(deleteEndpoint, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        })
          .then(response => {
            if (response.ok) {
              handleCloseModal(index);
              if (decodedToken === "admin") {
                window.location.href = "/dashboard";
              } else {
                window.location.href = "/funcionario";
              }
            } else {
              console.error("Erro ao excluir o estabelecimento.");
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  const handleUpdateItem = index => {
    handleCloseModal(index);
  };

  return (
    <section className="section-card-admin">
      {limitedPosts.length === 0 ? (
        <p className="mt-3">Nenhum resultado encontrado.</p>
      ) : (
        <>
          {limitedPosts.map((info, index) => (
            <div className="card-container" key={index}>
              <Modal
                show={itemStates[index]?.showModal}
                onHide={() => handleCloseModal(index)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Opções da {info.nome}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p className="opcoes">Escolha uma opção:</p>
                  <Button
                    className="buttons-model"
                    variant="success"
                    onClick={() => handleUpdateItem(index)}
                  >
                    <a
                      href={
                        info.horario === "Atendimento 24 Horas"
                          ? `/alterar-hospital/${info.nome}`
                          : `/alterar-clinica/${info.nome}`
                      }
                    >
                      Alterar
                    </a>
                  </Button>
                  <Button
                    className="buttons-model"
                    variant="danger"
                    onClick={() => handleDeleteItem(info, index)}
                  >
                    Excluir
                  </Button>
                  <Button
                    className="buttons-model"
                    variant="secondary"
                    onClick={() => handleCloseModal(index)}
                  >
                    Fechar
                  </Button>
                </Modal.Body>
              </Modal>
              <div className="top">
                <div className="image-container">
                  <img src={info.imagem} alt={info.nome} />
                </div>
              </div>
              <div className="button">
                <div className="icone">
                  <FaCog
                    size={30}
                    className="config-icon"
                    onClick={() => handleShowModal(info, index)}
                  />
                </div>
                <h3>{info.nome}</h3>
                <p>
                  {info.endereco.rua}, {info.endereco.numero} -{" "}
                  {info.endereco.bairro}, {info.endereco.cidade} -{" "}
                  {info.endereco.uf}, {info.endereco.cep}
                </p>
                {info.horario === "Atendimento 24 Horas" ? (
                  <p>Atendimento 24 horas</p>
                ) : (
                  <p>
                    Aberto de Segunda a Sexta das{" "}
                    <strong>{info.horarioSemana.open}</strong> até as{" "}
                    <strong>{info.horarioSemana.close}</strong>
                  </p>
                )}
                {info.sabado ? (
                  info.sabado.open && info.sabado.close ? (
                    <p>
                      Aberto aos sábados das <strong>{info.sabado.open}</strong>{" "}
                      até as <strong>{info.sabado.close}</strong>
                    </p>
                  ) : (
                    <p>Fechado aos sábados</p>
                  )
                ) : info.horario === "Atendimento 24 Horas" ? (
                  <p>Abre todos os dias</p>
                ) : (
                  <p>Fechado aos sábados</p>
                )}
                <div className="div-ver-mais btn-margin">
                  <div className="div-button-ver-mais">
                    <Link href={`/ver-mais/${info.nome}`}>Ver mais</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {totalPages > 1 && (
            <Paginacao
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </section>
  );
}
