"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ClinicaForm from "@/components/Admin/Clinica";
import EnderecoForm from "@/components/Admin/Endereco"; // Importe o componente de endereço
import "@/components/Admin/css/Clinica.css";

export default function CadastrarClinica() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const [showClinicaForm, setShowClinicaForm] = useState(true);
  const [showEnderecoForm, setShowEnderecoForm] = useState(false); // Adicione isso
  const [clinicImageURL, setClinicImageURL] = useState("");
  const [selectedEspecialidadesIds, setSelectedEspecialidadesIds] = useState([]);

  const onSubmit = async (data) => {
    console.log("Dados a serem enviados para o backend:", data);
    data.imagem = clinicImageURL;
    data.especialidades = selectedEspecialidadesIds;

    try {
      const response = await fetch(
        "http://localhost:5000/admin/nova-clinica",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
    
      
      if (response.ok) {
        const responseData = await response.json();
      const enderecoId = responseData.endereco._id;
      console.log("ID do endereço:", enderecoId);
        console.log("Clínica e endereço salvos com sucesso!");
      } else {
        console.log("Erro ao salvar a clínica e o endereço.");
      }
    } catch (error) {
      console.error("Erro ao salvar a clínica e o endereço:", error);
    }
  };

  const handleNextClick = () => {
    setShowClinicaForm(false);
    setShowEnderecoForm(true); // Mude para mostrar o formulário de endereço
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
          selectedEspecialidadesIds={selectedEspecialidadesIds}
          setSelectedEspecialidadesIds={setSelectedEspecialidadesIds}
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
