import Link from "next/link";

export default function Filtros() {
  return (
    <div className="div-buttons">
      <div className="div-button">
        <select>
          <option defaultValue="Hospital">Hospital</option>
          <option> Doutor Oscar</option>
        </select>
      </div>
      <div className="div-button">
        <select>
          <option defaultValue="Clínica">Clínica</option>

          <option> Medcenter</option>
          <option> Clinica Popular</option>
        </select>
      </div>
      <div className="div-button">
        <select>
          <option defaultValue="Especialidades">Especialidades</option>
          <option> Pediatra</option>
        </select>
      </div>
    </div>
  );
}
