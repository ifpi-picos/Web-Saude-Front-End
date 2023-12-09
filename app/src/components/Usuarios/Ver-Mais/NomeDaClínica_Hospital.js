import React from "react";
import Image from "next/image";
import ConsultasService from "@/services/ConsultasService";
import styles from "@/components/Usuarios/Ver-Mais/css/NomeUnidadeDeSaude.module.css";

export default async function NomeDaClinica_Hospital({ nome }) {
  const unidadesdeSaude = await ConsultasService.pegarUnidadedeSaude(nome);

  return (
    <section className={styles.sectionClinicaHospital}>
      <div className={styles.divClinicaHospital}>
        <h1>{unidadesdeSaude.nome}</h1>
      </div>
      <div className={styles.imgClinicaHospital}>
        <Image
          src="/imgs/doutor-vermais.svg"
          alt="img-clinica-hospital"
          width={200}
          height={200}
        />
      </div>
    </section>
  );
}
