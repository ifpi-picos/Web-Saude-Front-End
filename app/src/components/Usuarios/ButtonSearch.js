import React from "react";

export default function ButtonSearch({ handleSearch, searchTerm, setSearchTerm }) {
  return (
    <div className="div-search">
      <form>
        <div className="input-search">
          <input
            type="search"
            placeholder="Hospital/Clínica ou Especialidade"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="button-search">
            <button type="button" onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
