"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaSave, FaEdit, FaTrash } from "react-icons/fa";
import "@/components/Admin/Formularios/css/EspecialidadeForm.css";
import ConsultasService from "@/services/ConsultasService";
export default function EspecialidadeForm() {
  const [especialidades, setEspecialidades] = useState([]);
  const [novaEspecialidade, setNovaEspecialidade] = useState("");
  const [editandoIndex, setEditandoIndex] = useState(null);

  const editBoxRef = useRef(null);

  useEffect(() => {
    listarEspecialidades();
  }, []);

  const listarEspecialidades = async () => {
    try {
      const espe = await ConsultasService.pegarEspecialidades();
      setEspecialidades(espe);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNovaEspecialidadeChange = e => {
    setNovaEspecialidade(e.target.value);
  };

  const handleNovaEspecialidadeSubmit = () => {
    const nomeEspecialidade = novaEspecialidade.trim();

    if (nomeEspecialidade) {
      cadastrarEspecialidade(nomeEspecialidade);
    }
  };

  const cadastrarEspecialidade = nomeEspecialidade => {
    const token = localStorage.getItem("token");
    fetch("https://api-web-saude.vercel.app/nova-especialidade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ nome: nomeEspecialidade }),
    })
      .then(response => response.json())
      .then(() => {
        setNovaEspecialidade("");
        listarEspecialidades();
        if (token) {
          window.alert("Especialidade salva com sucesso!");
        }
      })
      .catch(error => console.error(error));
  };

  const editarEspecialidade = index => {
    setEditandoIndex(index);
  };

  const salvarEspecialidade = index => {
    const editedName = editBoxRef.current.querySelector("input").value;
    const id = especialidades[index]._id;
    const token = localStorage.getItem("token");
    fetch(`https://api-web-saude.vercel.app/alterar-especialidade/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ nome: editedName }),
    })
      .then(response => response.json())
      .then(() => {
        setEditandoIndex(null);
        listarEspecialidades();
        if (token) {
          window.alert("Especialidade alterada com sucesso!");
        }
      })
      .catch(error => console.error(error));
  };

  const handleExcluirEspecialidade = index => {
    const id = especialidades[index]._id;
    const token = localStorage.getItem("token");
    if (
      window.confirm("Tem certeza de que deseja excluir esta especialidade?")
    ) {
      fetch(`https://api-web-saude.vercel.app/deletar-especialidade/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
        .then(() => {
          const updatedEspecialidades = [...especialidades];
          updatedEspecialidades.splice(index, 1);
          setEspecialidades(updatedEspecialidades);
          listarEspecialidades();
        })
        .catch(error => console.error(error));
    }
  };

  const cancelarEdicao = () => {
    setEditandoIndex(null);
  };

  return (
    <>
      <div className="conteudo">
        <div className="topo">
          <input
            type="text"
            placeholder="Adicione uma nova especialidade"
            value={novaEspecialidade}
            onChange={handleNovaEspecialidadeChange}
          />
          <button onClick={handleNovaEspecialidadeSubmit}>
            <FaSave />
          </button>
        </div>
        <ul
          id="listarEspecialidades"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {especialidades.map((especialidade, index) => (
            <li key={index}>
              {editandoIndex === index ? (
                <div className="frm-linha" ref={editBoxRef}>
                  <label htmlFor="nome">Nome</label>
                  <input type="text" defaultValue={especialidade.nome} />
                  <div>
                    <button onClick={() => salvarEspecialidade(index)}>
                      Salvar
                    </button>
                    <button
                      id="btnCancelarEdicao"
                      onClick={() => cancelarEdicao()}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {especialidade.nome}
                  <div className="icones">
                    <button
                      style={{
                        background: "none",
                        color: "white",
                        marginLeft: "10px",
                      }}
                      id={`editarEspecialidade_${index}`}
                      onClick={() => editarEspecialidade(index)}
                    >
                      <FaEdit
                        style={{
                          width: "15px",
                          height: "100%",
                          marginLeft: "20px",
                        }}
                      />
                    </button>
                    <button
                      style={{
                        background: "none",
                        color: "white",
                        marginLeft: "10px",
                      }}
                      id={`excluirEspecialidade_${index}`}
                      onClick={() => handleExcluirEspecialidade(index)}
                    >
                      <FaTrash style={{ width: "15px", height: "100%" }} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
