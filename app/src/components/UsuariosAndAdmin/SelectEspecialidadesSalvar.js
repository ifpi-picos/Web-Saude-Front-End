import React, { useEffect, useState } from "react";
import Select from "react-select";
import "@/components/Admin/Formularios/css/Form.css";

export default function SelectEspecialidadesSalvar({
  onChange,
  selectedSpecialties,
  nome,
  esepecialidadesSelecionadas,
}) {
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [selectedDefaultSpecialties, setSelectedDefaultSpecialties] = useState(
    []
  );
  const [selectedCustomSpecialties, setSelectedCustomSpecialties] = useState(
    []
  );
  const [removedSpecialtyIds, setRemovedSpecialtyIds] = useState([]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "7px",

    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
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
    const defaultSpecialties = selectedOptions.filter(option =>
      selectedDefaultSpecialties.some(
        defaultOption => defaultOption.value === option.value
      )
    );
    const customSpecialties = selectedOptions.filter(
      option =>
        !defaultSpecialties.some(
          defaultOption => defaultOption.value === option.value
        )
    );

    setSelectedDefaultSpecialties(defaultSpecialties);
    setSelectedCustomSpecialties(customSpecialties);
    onChange(selectedOptions);

    const removedIds = removedSpecialtyIds.slice();
    selectedDefaultSpecialties.forEach(defaultOption => {
      if (
        !defaultSpecialties.some(option => option.value === defaultOption.value)
      ) {
        removedIds.push(defaultOption.value);
      }
    });
    setRemovedSpecialtyIds(removedIds);
    esepecialidadesSelecionadas = selectedOptions.map(option => option.value);
  };

  useEffect(() => {
    fetch(`https://api-web-saude.vercel.app/especialidades/${nome}`)
      .then(response => response.json())
      .then(data => {
        const defaultSpecialties = data.map(specialty => ({
          value: specialty._id,
          label: specialty.nome,
        }));
        setSelectedDefaultSpecialties(defaultSpecialties);
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
      className="select"
      styles={customStyles}
      options={specialtyOptions}
      isMulti
      onChange={handleSelectionChange}
    />
  );
}
