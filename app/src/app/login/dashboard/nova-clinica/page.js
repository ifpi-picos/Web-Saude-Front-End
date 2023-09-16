"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ClinicaForm from "@/components/Admin/Clinica";
import EnderecoForm from "@/components/Admin/Endereco";
import "@/components/Admin/css/Clinica.css";
import "@/components/Admin/css/Endereco.css";

export default function CadastrarClinica() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const [showEnderecoForm, setShowEnderecoForm] = useState(false);
  const [showClinicaForm, setShowClinicaForm] = useState(true);
  const [enderecoId, setEnderecoId] = useState("");
  const [clinicImageURL, setClinicImageURL] = useState("");
  const [selectedEspecialidadesIds, setSelectedEspecialidadesIds] = useState(
    []
  );

  const addClinica = async (data, enderecoId) => {
    data.endereco = enderecoId;
    data.imagem = clinicImageURL;
    data.especialidades = selectedEspecialidadesIds;

    try {
      await fetch(
        "https://web-saude-back-end-eric-developer.vercel.app/admin/nova-clinica",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("Clínica salva com sucesso!");
      window.location.href = "/";
    } catch (error) {
      console.log("Erro ao salvar a clínica:", error);
    }
  };

  const addEndereco = async data => {
    try {
      const response = await fetch(
        "https://web-saude-back-end-eric-developer.vercel.app/cadastrar-endereco",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      const enderecoId = responseData._id;

      if (!enderecoId) {
        console.log("Houve um erro ao salvar a clínica");
      } else {
        setEnderecoId(enderecoId);
        console.log("ID do Endereço:", enderecoId);
        console.log("Endereço salvo com sucesso!");
        addClinica(data, enderecoId);
      }
    } catch (error) {
      console.log("Erro ao salvar o endereço:", error);
    }
  };

  const onSubmit = async data => {
    await addEndereco(data);
  };

  const handleNextClick = () => {
    setShowEnderecoForm(true);
    setShowClinicaForm(false);
  };

  return (
    <main className="main">
      {showClinicaForm && (
        <ClinicaForm
          showClinicaForm={showClinicaForm}
          handleNextClick={handleNextClick}
          register={register}
          clinicImageURL={clinicImageURL}
          setClinicImageURL={setClinicImageURL}
          selectedEspecialidadesIds={selectedEspecialidadesIds} // Passando os IDs das especialidades selecionadas
          setSelectedEspecialidadesIds={setSelectedEspecialidadesIds} // Passando a função para atualizar os IDs das especialidades selecionadas
        />
      )}
      {showEnderecoForm && (
        <EnderecoForm
          showEnderecoForm={showEnderecoForm}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
        />
      )}
    </main>
  );
}
