import Link from "next/link";

export default async function Filtros() {
  return (
    <div className="div-buttons">
      <div className="div-button">
       <Link href={'#'}>Hospitais</Link>
      </div>
      <div className="div-button">
       <Link href={'/clinicas'}>Clínicas</Link>
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
