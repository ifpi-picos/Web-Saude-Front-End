import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function SelectEspecialidades({
  onChange,
  selectedSpecialties,
  nome,
}) {
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      maxWidth: "300px",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "blue" : "#00285f",
      color: "white",
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
    }),
  };

  const handleSelectionChange = selectedOptions => {
    onChange(selectedOptions);
  };

  useEffect(() => {
    fetch(`https://api-web-saude.vercel.app/especialidades/${nome}`)
      .then(response => response.json())
      .then(data => {
        setEspecialidades(data);
      })
      .catch(error => {
        console.error("Erro ao buscar especialidades da API:", error);
      });
  }, [nome]);

  useEffect(() => {
    fetch("https://api-web-saude.vercel.app/especialidades")
      .then(response => response.json())
      .then(data => {
        const specialtyOptionsFromAPI = data.map(specialty => ({
          value: specialty._id,
          label: specialty.nome,
        }));
        setSpecialtyOptions(specialtyOptionsFromAPI);
      })
      .catch(error => {
        console.error("Erro ao buscar especialidades da API:", error);
      });
  }, []);

  return (
    <Select
      styles={customStyles}
      options={specialtyOptions}
      isMulti
      onChange={handleSelectionChange}
      value={selectedSpecialties}
    />
  );
}
