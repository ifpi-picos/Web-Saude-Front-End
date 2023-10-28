"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCog } from 'react-icons/fa'; // Importe o ícone de engrenagem do React Icons
import { Button, Modal } from "react-bootstrap";
import "../Admin/css/CardAdmin.css";
import Paginacao from "../UsuariosAndAdmin/Paginacao";
export default function CardAdmin({ pageNumber,informacao }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (pageNumber) {
      setCurrentPage(parseInt(pageNumber));
    }
  }, [pageNumber]);

  const maxPostsPerPage = 4;
  const indexOfLastPost = currentPage * maxPostsPerPage;
  const indexOfFirstPost = indexOfLastPost - maxPostsPerPage;

  // Filtra os dados com base no termo de pesquisa
  const limitedPosts = Array.isArray(informacao)
    ? informacao.slice(indexOfFirstPost, indexOfLastPost)
    : [];
  const totalPages = Math.ceil(informacao.length / maxPostsPerPage);
  const handleShowModal = item => {
    setSelectedItem(item);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const handleDeleteItem = () => {
    // Adicione a lógica para excluir o item selecionado
    // Após a exclusão, você pode fechar o modal
    // Certifique-se de lidar com a exclusão no seu servidor/API
    // e atualizar a lista de informações
    setShowModal(false);
  };
  
  const handleUpdateItem = () => {
    // Adicione a lógica para atualizar o item selecionado
    // Após a atualização, você pode fechar o modal
    // Certifique-se de lidar com a atualização no seu servidor/API
    // e atualizar a lista de informações
    setShowModal(false);
  };
  return (
    <section className="section-card-admin">
      {limitedPosts.length === 0 ? (
        <p className="mt-3">Nenhum resultado encontrado.</p>
      ) : (
        <>
          {limitedPosts.map((info, index) => (
            <div className="card-container" key={index}>
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
                onClick={() => handleShowModal(info)}
              />
              </div>
                <h3>{info.nome}</h3>
                <p>
                  {info.endereco.rua}, {info.endereco.numero} -{" "}
                  {info.endereco.bairro}, {info.endereco.cidade} -
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
      <Modal show={showModal} onHide={handleCloseModal}>
<Modal.Header closeButton>
  <Modal.Title>Opções do Item</Modal.Title>
</Modal.Header>
<Modal.Body>
  <p>Escolha uma opção:</p>
  <Button variant="success" onClick={handleUpdateItem}>
    Alterar
  </Button>
  <Button variant="danger" onClick={handleDeleteItem}>
    Excluir
  </Button>
  <Button variant="secondary" onClick={handleCloseModal}>
    Fechar
  </Button>
</Modal.Body>
</Modal>
    </section>
  );
}



