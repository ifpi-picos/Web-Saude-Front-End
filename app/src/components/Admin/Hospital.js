"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
export default function HospitalForm({
  showHospitalForm,
  handleNextClick,
  register,
  HospitalImageURL,
  setHospitalImageURL,
  selectedEspecialidadesIds,
  setSelectedEspecialidadesIds,
}) {
  const [imageURL, setImageURL] = useState("");
  const [formValues, setFormValues] = useState({});
  const [especialidades, setEspecialidades] = useState([]);

  const handleImageUpload = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "eric_santos");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkpivrhuy/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setImageURL(data.secure_url);
        setHospitalImageURL(data.secure_url); // Atualizando a URL da imagem em CadastrarClinica.js
        console.log("Caminho da imagem:", data.secure_url);
      } else {
        console.error("Falha ao enviar imagem para o Cloudinary.");
      }
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Verificar se há campos requeridos não preenchidos
    const inputs = event.target.getElementsByTagName("input");
    let isValid = true;

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (input.hasAttribute("required") && input.value.trim() === "") {
        isValid = false;
        // Adicionar classe CSS para indicar que o campo é obrigatório e está vazio (opcional)
        input.classList.add("campo-obrigatorio-vazio");
      }
    }

    if (!isValid) {
      console.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Se todos os campos obrigatórios estiverem preenchidos, você pode prosseguir para a próxima etapa
    handleNextClick();
  };
  useEffect(() => {
    // Função para carregar as especialidades
    const fetchEspecialidades = async () => {
      try {
        const response = await fetch(
          "https://web-saude-back-end-eric-developer.vercel.app/especialidades"
        );
        if (!response.ok) {
          throw new Error("Falha ao carregar as especialidades");
        }
        const data = await response.json();
        setEspecialidades(data); // Armazena as especialidades no estado
      } catch (error) {
        console.error("Erro ao carregar as especialidades:", error);
      }
    };

    fetchEspecialidades();
  }, []);
  const handleEspecialidadesChange = event => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      option => ({
        _id: option.value,
        nome: option.textContent,
      })
    );

    // Exibir os IDs e nomes das especialidades selecionadas no console
    console.log("Especialidades selecionadas:", selectedOptions);

    // Exibir somente os IDs das especialidades selecionadas no console
    const selectedEspecialidadesIds = selectedOptions.map(
      especialidade => especialidade._id
    );
    console.log(
      "IDs das especialidades selecionadas:",
      selectedEspecialidadesIds
    );

    setSelectedEspecialidadesIds(selectedEspecialidadesIds); // Atualize o estado com as especialidades selecionadas
  };

  return (
    <div className="box-hospital">
      <div className="img-box">
        <Image alt="Imagem do formulário" width={200} height={200} />
      </div>
      <div className="form-box">
        <h2>Cadastrar Hospital</h2>
        <p>
          Deseja Voltar? <a href="#">Painel</a>{" "}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nome">Nome do Hospital</label>
            <input
              type="text"
              {...register("nome")}
              id="nome"
              name="nome"
              placeholder="Digite o nome do Hospital"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 mt-4">
            <input
              type="file"
              className="form-control"
              id="imagem"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div className="input-group select">
            <label htmlFor="especialidades">Especialidades</label>
            <select
              className="div-button cursor"
              name="especialidades"
              id="especialidades"
              multiple
              value={selectedEspecialidadesIds}
              onChange={handleEspecialidadesChange}
            >
              <option disabled>Selecione as especialidades</option>
              {especialidades.map(especialidade => (
                <option key={especialidade._id} value={especialidade._id}>
                  {especialidade.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group longitude">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="number"
              name="longitude"
              {...register("longitude")}
              id="longitude"
              placeholder="Digite a sua longitude"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              name="latitude"
              {...register("latitude")}
              id="latitude"
              placeholder="Digite a sua latitude"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              {...register("email")}
              id="email"
              placeholder="Digite a sua email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="whatsapp">Whatsapp</label>
            <input
              type="tel"
              name="whatsapp"
              {...register("whatsapp")}
              id="whatsapp"
              placeholder="Digite seu whatsapp"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="instagram">Instagram</label>
            <input
              type="text"
              name="instagram"
              {...register("instagram")}
              id="instagram"
              placeholder="Digite seu Instagram"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="descricao">Descrição(opcional)</label>
            <textarea
              name="descricao"
              {...register("descricao")}
              id="descricao"
              placeholder="Descreva o Hospital"
            />
          </div>

          <div className="input-group">
            <button type="submit" className="div-button-prox">
              PRÓXIMO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
