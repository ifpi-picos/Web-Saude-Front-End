"use client";
/* ButtonSearch.js */
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/Usuarios/Home/css/ButtonSearch.module.css";

export default function ButtonSearch() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleInputChange = event => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
  };

  const handleSearch = event => {
    event.preventDefault();
    const formattedSearchValue = encodeURIComponent(
      searchValue.replace(/ /g, "-")
    );
    router.push(`/pesquisa/${formattedSearchValue}`);
  };

  return (
    <div className={styles.divSearch}>
      <form onSubmit={handleSearch}>
        <div className={styles.inputSearch}>
          <input
            type="search"
            placeholder="Hospital/Clínica ou Especialidade"
            value={searchValue}
            onChange={handleInputChange}
            required
          />
          <div className={styles.buttonSearch}>
            <button type="submit">Buscar</button>
          </div>
        </div>
      </form>
    </div>
  );
}
