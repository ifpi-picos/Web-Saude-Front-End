import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function SelectEspecialidades({
  onChange,
  selectedSpecialties,
}) {
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "blue" : "black",
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
    }),
  };

  const handleSelectionChange = selectedOptions => {
    setSelectedOptions(selectedOptions);
    onChange(selectedOptions);
  };

  useEffect(() => {
    fetch("https://api-web-saude.vercel.app/especialidades")
      .then(response => response.json())
      .then(data => {
        const specialtyOptions = data.map(specialty => ({
          value: specialty._id,
          label: specialty.nome,
        }));
        setSpecialtyOptions(specialtyOptions);
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
      value={selectedOptions}
      onChange={handleSelectionChange}
    />
  );
}
