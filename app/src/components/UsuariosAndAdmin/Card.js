"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCog, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import Paginacao from "./Paginacao";
import { useDecodedToken } from "@/services/decodeToken";
import styles from "@/components/UsuariosAndAdmin/css/Card.module.css";

export default function CardAdmin({ pageNumber, informacao, params }) {
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

        const token = localStorage.getItem("token");
        const deleteEndpoint =
          tipoEstabelecimento === "Atendimento 24 Horas"
            ? `https://web-saude-back-end-api.onrender.com/admin/deletar-hospital/${itemId}`
            : `https://web-saude-back-end-api.onrender.com/admin/deletar-clinica/${itemId}`;

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
  const handleAprovarUnidadeDeSaude = (selectedItem, index) => {
    if (selectedItem) {
      const confirmation = window.confirm(
        "Tem certeza que deseja aprovar esta unidade de saúde?"
      );

      if (confirmation) {
        const itemId = selectedItem._id;
        const tipoEstabelecimento = selectedItem.horario;

        const token = localStorage.getItem("token");
        const deleteEndpoint =
          tipoEstabelecimento === "Atendimento 24 Horas"
            ? `https://web-saude-back-end-api.onrender.com/aprovar-hospital/${itemId}`
            : `https://web-saude-back-end-api.onrender.com/aprovar-clinica/${itemId}`;

        fetch(deleteEndpoint, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        })
          .then(response => {
            if (response.ok) {
              handleCloseModal(index);
              window.location.href = "/dashboard/unidades-de-saude/pedidos";
            } else {
              console.error("Erro ao aprovar a unidade de saúde.");
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  const handleUpdateItem = (index, nome, horario) => {
    const url =
      horario === "Atendimento 24 Horas"
        ? `/alterar-hospital/${nome}`
        : `/alterar-clinica/${nome}`;

    window.location.href = url;
    handleCloseModal(index);
  };

  const isAdminPage =
    typeof window !== "undefined" &&
    (window.location.pathname.startsWith("/funcionario") ||
      window.location.pathname.startsWith("/dashboard/unidades-de-saude"));

  return (
    <section className={styles.sectionCard}>
      {limitedPosts.length === 0 ? (
        <p className={styles.noResults}>Nenhum resultado encontrado.</p>
      ) : (
        <>
          {limitedPosts.map((info, index) => (
            <div className={styles.cardContainer} key={index}>
              <Modal
                show={itemStates[index]?.showModal}
                onHide={() => handleCloseModal(index)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Opções da {info.nome}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p className={styles.opcoes}>Escolha uma opção:</p>
                  <Button
                    className={styles.buttonsModel}
                    variant="success"
                    onClick={() =>
                      handleUpdateItem(index, info.nome, info.horario)
                    }
                  >
                    Alterar
                  </Button>
                  <Button
                    className={styles.buttonsModel}
                    variant="danger"
                    onClick={() => handleDeleteItem(info, index)}
                  >
                    Excluir
                  </Button>
                  <Button
                    className={styles.buttonsModel}
                    variant="secondary"
                    onClick={() => handleCloseModal(index)}
                  >
                    Fechar
                  </Button>
                </Modal.Body>
              </Modal>
              <div className={styles.top}>
                <div className={styles.imageContainer}>
                  <img src={info.imagem} alt={info.nome} />
                </div>
              </div>
              <div className={styles.button}>
                <div className={styles.icon}>
                  {isAdminPage && (
                    <FaCog
                      className={styles.configIcon}
                      onClick={() => handleShowModal(info, index)}
                    />
                  )}
                </div>
                <p className={styles.status}>
                  Status:
                  <span
                    className={
                      info.status === true
                        ? styles.statusAberto
                        : styles.statusFechado
                    }
                  >
                    {info.status === true ? "Aberto" : "Fechado"}
                  </span>
                </p>
                <h3>{info.nome}</h3>
                {info.aprovado === false && decodedToken === "admin" ? (
                  <div className="btn-warning">
                    <Button
                      className={styles.buttonsModel}
                      variant="warning"
                      onClick={() => handleAprovarUnidadeDeSaude(info, index)}
                    >
                      Aprovar
                    </Button>
                  </div>
                ) : null}
                <div className={styles.divEndereco}>
                  <FaMapMarkerAlt className={styles.enderecoIcon} />
                  <p>
                    {info.endereco.rua}, {info.endereco.numero} -
                    {info.endereco.bairro}, {info.endereco.cidade} -
                    {info.endereco.uf}, {info.endereco.cep}
                  </p>
                </div>
                {info.horario === "Atendimento 24 Horas" ? (
                  <div className={styles.divHorarioIcon}>
                    <FaClock className={styles.horarioIcon} />
                    <p>
                      Oferecemos assistência médica constante, 24 horas por dia
                    </p>
                  </div>
                ) : (
                  <div className={styles.divHorarioIcon}>
                    <FaClock className={styles.horarioIcon} />
                    <p>
                      Aberto de Segunda a Sexta das{" "}
                      <strong>{info.horarioSemana.open}</strong> até as{" "}
                      <strong>{info.horarioSemana.close}</strong>
                    </p>
                  </div>
                )}
                {info.sabado ? (
                  info.sabado.open && info.sabado.close ? (
                    <div className={styles.divHorarioIcon}>
                      <FaClock className={styles.horarioIcon} />
                      <p>
                        Aberto aos sábados das{" "}
                        <strong>{info.sabado.open}</strong> até as{" "}
                        <strong>{info.sabado.close}</strong>
                      </p>
                    </div>
                  ) : (
                    <div className={styles.divHorarioIcon}>
                      <FaClock className={styles.horarioIcon} />
                      <p>Fechado aos fins de semana para descanso</p>
                    </div>
                  )
                ) : info.horario === "Atendimento 24 Horas" ? (
                  <div className={styles.divHorarioIcon}>
                    <FaClock className={styles.horarioIcon} />
                    <p>Estamos aqui todos os dias da semana para atendê-lo..</p>
                  </div>
                ) : (
                  <div className={styles.divHorarioIcon}>
                    <FaClock className={styles.horarioIconSabado} />
                    <p>Fechado aos fins de semana para descanso</p>
                  </div>
                )}
                <div className={styles.divVerMais}>
                  <div className={styles.divButtonVerMais}>
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
