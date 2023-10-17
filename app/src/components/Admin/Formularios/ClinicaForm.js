"use client";
import { useState } from "react";
import CloudinaryUploadWidget from "../../UsuariosAndAdmin/Upload";
import SelectEspecialidades from "../../UsuariosAndAdmin/SelectEspecialidades";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

export default function ClinicaForm() {
  const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState([]);

  const [formData, setFormData] = useState({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
    nome: "",
    imagem: "",
    horarioSemana: {
      open: "",
      close: "",
    },
    sabado: {
      open: "",
      close: "",
    },
    email: "",
    whatsapp: "",
    instagram: "",
    descricao: "",
    longitude: "",
    latitude: "",
    especialidades: [],
  });

  const handleImageURLChange = imageUrl => {
    setFormData({ ...formData, imagem: imageUrl });
  };
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
  const handleSpecialtyChange = selectedSpecialties => {
    setFormData({ ...formData, especialidades: selectedSpecialties });
    const selectedIds = selectedSpecialties.map(specialty => specialty.value);
    setSelectedSpecialtyIds(selectedIds);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      especialidades: selectedSpecialtyIds, // Inclui os IDs das especialidades selecionadas
    };
    try {
      const response = await fetch(
        "https://api-web-saude.vercel.app/admin/nova-clinica",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        window.location.href = '/';

      } else {
        console.error("Erro ao enviar os dados.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
       <div className="painel">
       <h3> <Link href="/login/dashboard">
          <FaUser size={24} /> Ir para o Painel
        </Link></h3>
      </div>
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

            <div className="buttonBox">
              <label className="labelInput"> Imagem da Clínica:</label>

              <div className="buttontUser">
                <CloudinaryUploadWidget onURLChange={handleImageURLChange} />
              </div>
            </div>
            <div className="selectBox">
              <SelectEspecialidades
                onChange={handleSpecialtyChange}
                selectedSpecialties={formData.especialidades}
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
              <label className="labelInput">Email (opcional):</label>

              <input
                className="inputUser"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputBox">
              <label className="labelInput">instagram (opcional):</label>

              <input
                className="inputUser"
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputBox">
              <label className="labelInput"> whatsapp (opcional):</label>

              <input
                className="inputUser"
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputBox">
              <label className="labelInput"> Descrição (opcional):</label>

              <textarea
                className=""
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
                placeholder="texto"
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
              <label className="labelInput">Uf:</label>

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