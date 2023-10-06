"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
export default function ClinicaForm({
  showClinicaForm,
  handleNextClick,
  register,
  clinicImageURL,
  setClinicImageURL,
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
        setClinicImageURL(data.secure_url);
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

    handleNextClick();
  };
  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await fetch(
          "https://api-web-saude.vercel.app/especialidades"
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

    console.log("Especialidades selecionadas:", selectedOptions);

    const selectedEspecialidadesIds = selectedOptions.map(
      especialidade => especialidade._id
    );
    console.log(
      "IDs das especialidades selecionadas:",
      selectedEspecialidadesIds
    );

    setSelectedEspecialidadesIds(selectedEspecialidadesIds);
  };

  return (
    <div className="box-clinica">
      <div className="img-box">
        <Image alt="Imagem do formulário" width={200} height={200} />
      </div>
      <div className="form-box">
        <h2>Cadastrar Clínica</h2>
        <p>
          Deseja Voltar? <a href="#">Painel</a>{" "}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nome">Nome da Clínica</label>
            <input
              type="text"
              {...register("nome")}
              id="nome"
              name="nome"
              placeholder="Digite o nome da Clínica"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-group horario">
            <label htmlFor="horario">Horário de Abertura (Semana)</label>
            <input
              type="time"
              name="horarioAberturaSemana"
              id="horario"
              defaultValue="07:00"
            />
          </div>
          <div className="input-group horario">
            <label htmlFor="horario">Horário de Fechamento (Semana)</label>
            <input
              type="time"
              name="horarioFechamentoSemana"
              id="horario"
              defaultValue="07:00"
            />
          </div>
          <div className="input-group horario">
            <label htmlFor="horario">Horário de Abertura (Sábado)</label>
            <input
              type="time"
              name="horarioAberturaSabaado"
              id="horario"
              defaultValue="07:00"
            />
          </div>

          <div className="input-group">
            <label htmlFor="horario">Horário de Fechamento (Sábado)</label>
            <input
              type="time"
              name="horarioFechamentoSabao"
              id="horario"
              defaultValue="18:00"
            />
          </div>

          <div className="mb-3 mt-4">
            <input
              type="file"
              className="form-control"
              id="imagem"
              accept="image/*"
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
              id="longitude"
              placeholder="Digite a sua longitude"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              placeholder="Digite a sua latitude"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
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
              id="instagram"
              placeholder="Digite seu Instagram"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="descricao">Descrição(opcional)</label>
            <textarea
              name="descricao"
              id="descricao"
              placeholder="Descreva a Clínica"
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
