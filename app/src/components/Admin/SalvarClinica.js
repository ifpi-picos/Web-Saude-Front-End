"use client";
import React, { useState } from "react";
import axios from "axios";
function ClinicaForm() {
  const [formData, setFormData] = useState({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
    nome: "",
    horarioSemana: {
      open: "",
      close: "",
    },
    sabado: {
      open: "",
      close: "",
    },
    longitude: "",
    latitude: "",
    especialidades: [],
  });
  // Atualize a função handleChange para tratar os campos de hora
  const handleChange = e => {
    const { name, value } = e.target;
    if (name.startsWith("horarioSemana.")) {
      const fieldName = name.replace("horarioSemana.", "");
      setFormData({
        ...formData,
        horarioSemana: {
          ...formData.horarioSemana,
          [fieldName]: value,
        },
      });
    } else if (name.startsWith("sabado.")) {
      const fieldName = name.replace("sabado.", "");
      setFormData({
        ...formData,
        sabado: {
          ...formData.sabado,
          [fieldName]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/admin/nova-clinica", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error("Erro ao enviar os dados.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className="box">
        <legend>
          <strong>Cadastrar Nova Clínica</strong>
        </legend>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className="inputBox">
              <label className="labelInput"> Nome da Clínica:</label>

              <input
                className="inputUser"
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputBox">
              <label className="labelInput">
                Horário de Abertura (Semana):
              </label>

              <input
                className="inputUser"
                type="time"
                name="horarioSemana.open"
                value={formData.horarioSemana.open}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputBox">
              <label className="labelInput">
                Horário de Fechamento (Semana):
              </label>

              <input
                className="inputUser"
                type="time"
                name="horarioSemana.close"
                value={formData.horarioSemana.close}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputBox">
              <label className="labelInput">
                {" "}
                Horário de Abertura (Sábado):
              </label>

              <input
                className="inputUser"
                type="time"
                name="sabado.open"
                value={formData.sabado.open}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputBox">
              <label className="labelInput">
                {" "}
                Horário de Fechamento (Sábado):
              </label>

              <input
                className="inputUser"
                type="time"
                name="sabado.close"
                value={formData.sabado.close}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputBox">
              <label className="labelInput"> Longitude:</label>

              <input
                className="inputUser"
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputBox">
              <label className="labelInput">Latitude: </label>

              <input
                className="inputUser"
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputBox">
              <label className="labelInput">CEP:</label>

              <input
                className="inputUser"
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputBox">
              <label className="labelInput">Rua:</label>

              <input
                className="inputUser"
                type="text"
                name="rua"
                value={formData.rua}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputBox">
              <label className="labelInput">Número:</label>

              <input
                className="inputUser"
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputBox">
              <label className="labelInput">Bairro:</label>

              <input
                className="inputUser"
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputBox">
              <label className="labelInput">Cidade:</label>

              <input
                className="inputUser"
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputBox">
              <label className="labelInput">UF:</label>

              <input
                className="inputUser"
                type="text"
                name="uf"
                value={formData.uf}
                onChange={handleChange}
                required
              />
            </div>

            <button id="submit" type="submit">
              Cadastrar Clínica
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default ClinicaForm;
