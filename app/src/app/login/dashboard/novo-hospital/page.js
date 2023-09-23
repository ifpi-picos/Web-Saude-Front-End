"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import EnderecoForm from "@/components/Admin/Endereco";
import HospitalForm from "@/components/Admin/Hospital";
import "@/components/Admin/css/Hospital.css";
import "@/components/Admin/css/Endereco.css";

export default function CadastrarHospital() {
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

  const addHospital = async (data, enderecoId) => {
    data.endereco = enderecoId;
    data.imagem = clinicImageURL;
    data.especialidades = selectedEspecialidadesIds;

    try {
      await fetch(
        "https://api-web-saude.vercel.app/admin/novo-hospital",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("Hospital salvo com sucesso!");
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
        addHospital(data, enderecoId);
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
        <HospitalForm
          showHospitalForm={showClinicaForm}
          handleNextClick={handleNextClick}
          register={register}
          HospitalImageURLL={clinicImageURL}
          setHospitalImageURLL={setClinicImageURL}
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
