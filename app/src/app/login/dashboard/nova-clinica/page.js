"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ClinicaForm from "@/components/Admin/SalvarClinica";
import EnderecoForm from "@/components/Admin/Endereco"; // Importe o componente de endereço
import "@/components/Admin/css/Clinica.css";

export default function CadastrarClinica() {
  return (
    <main className="main">
      <ClinicaForm />
    </main>
  );
}
