import Link from "next/link";
import Image from "next/image";
import ConsultasService from "@/services/ConsultasService";
import { FaMapMarkerAlt, FaStar, FaLock } from "react-icons/fa";
import styles from "@/components/Usuarios/Ver-Mais/css/CardInformativo.module.css"; // Importa o arquivo CSS Module

export default async function CardInformativo({ nome }) {
  const unidadesdeSaude = await ConsultasService.pegarUnidadedeSaude(nome);

  return (
    <section className={styles.sectionInformacoes}>
      <div className={styles.cardInformacoes}>
        <div className={styles.top}>
          <div className={styles.imageContainer}>
            <Image
              src={unidadesdeSaude.imagem}
              alt="Imagem da Clínica"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className={styles.button}>
          <p className={styles.status}>
            {unidadesdeSaude.status ? (
              <FaStar className={styles.statusIcon} />
            ) : (
              <FaLock className={styles.statusIcon} />
            )}
            <span
              className={
                unidadesdeSaude.status === true
                  ? styles.statusAberto
                  : styles.statusFechado
              }
            >
              {" "}
              {unidadesdeSaude.status === true ? "Aberto" : "Fechado"}
            </span>
          </p>
          <div>
            <h3>{unidadesdeSaude.nome}</h3>
          </div>
          <div className={styles.divEndereco}>
            <FaMapMarkerAlt className={styles.enderecoIcon} />
            <p>
              {unidadesdeSaude.endereco.rua}, {unidadesdeSaude.endereco.numero}{" "}
              - {unidadesdeSaude.endereco.bairro},{" "}
              {unidadesdeSaude.endereco.cidade} - {unidadesdeSaude.endereco.uf},{" "}
              {unidadesdeSaude.endereco.cep}
            </p>
          </div>
          <hr />
          <div className={styles.divAtalhos}>
            <ul>
              <li>
                <Link className={styles.btn} href="#sobre">
                  Comentários
                </Link>
              </li>
              <li>
                <Link className={styles.btn} href="#galeria">
                  Galeria
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
