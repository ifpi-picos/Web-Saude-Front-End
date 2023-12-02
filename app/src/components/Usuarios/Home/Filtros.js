"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import "@/components/Usuarios/Home/css/Filtros.css";

const Filtros = () => {
  const router = useRouter();
  const [selectedFiltro, setSelectedFiltro] = useState(null);
  const [selectedEspecialidade, setSelectedEspecialidade] = useState(null);
  const [especialidades, setEspecialidades] = useState([]);

  const handleFiltroChange = selectedOption => {
    setSelectedFiltro(selectedOption);

    if (selectedOption) {
      const route = selectedOption.value.toLowerCase();
      router.push(`/${route}`);
    }
  };

  const handleEspecialidadeChange = selectedOption => {
    setSelectedEspecialidade(selectedOption);

    if (selectedOption) {
      const especialidadeUrl = `/pesquisa/${selectedOption.label}`;
      router.push(especialidadeUrl);
    }
  };

  useEffect(() => {
    fetch("https://api-web-saude.vercel.app/especialidades")
      .then(response => response.json())
      .then(data => {
        const options = data.map((especialidade, index) => ({
          value: especialidade._id,
          label: especialidade.nome,
          key: index,
        }));
        setEspecialidades(options);
      })
      .catch(error => {
        console.error("Erro ao buscar especialidades:", error);
      });
  }, []);

  const customStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: "#00285f",
      color: "white",
      borderRadius: 10,
      width: "100%",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? "blue" : isFocused ? "lightgray" : "white",
      color: isSelected ? "white" : "black",
    }),
    singleValue: styles => ({
      ...styles,
      color: "white",
    }),
    input: styles => ({
      ...styles,
      color: "white",
    }),
  };

  return (
    <div className="div-select-filtros">
      <div className="div-button">
        <Select
          className="select-element-filtros-1"
          value={selectedFiltro}
          options={[
            { value: "Hospitais", label: "Hospitais" },
            { value: "Clínicas", label: "Clínicas" },
          ]}
          onChange={handleFiltroChange}
          styles={customStyles}
          placeholder="Filtros"
        />
      </div>
      <div className="div-button">
        <Select
          className="select-element-filtros-2"
          value={selectedEspecialidade}
          options={especialidades}
          onChange={handleEspecialidadeChange}
          styles={customStyles}
          placeholder="Especialidades"
        />
      </div>
    </div>
  );
};

export default Filtros;
