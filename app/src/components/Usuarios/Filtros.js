"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Filtros() {
  const [selectedOption, setSelectedOption] = useState('filtros');
 const router = useRouter()
  useEffect(() => {
    const handleOptionChange = (e) => {
      const selectedValue = e.target.value;
      setSelectedOption(selectedValue);
  
      if (selectedValue === 'Hospitais') {
        router.push('/hospitais');
      } else if (selectedValue === 'Clinicas') {
        router.push('/clinicas');

      }
    };

    const selectElement = document.querySelector('.select-element-filtros');

    if (selectElement) {
      selectElement.addEventListener('change', handleOptionChange);
    }

    return () => {
      if (selectElement) {
        selectElement.removeEventListener('change', handleOptionChange);
      }
    };
  }, []);

  return (
    <div className="div-buttons">
      <div className="div-button">
        <select className="select-element-filtros" value={selectedOption}>
          <option value="filtros">Filtros</option>
          <option value="Hospitais">Hospitais</option>
          <option value="Clinicas">Clínicas</option>
        </select>
      </div>
      <div className="div-button">
        <select className="select-element" value={selectedOption}>
          <option value="Especialidades">Especialidades</option>
          <option value="pediatra">Pediatra</option>
          <option value="dermatologista">Dermatologista</option>
        </select>
      </div>
    </div>
  );
}
