// Contato.js
import { FaEnvelopeOpen } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import ConsultasService from "@/services/ConsultasService";
import styles from "@/components/Usuarios/Ver-Mais/css/Contato.module.css";

export default async function Contato({ nome }) {
  const unidadesdeSaude = await ConsultasService.pegarUnidadedeSaude(nome);

  return (
    <div id="contatos" className={styles.contactInfo}>
      <div className={styles.card}>
        <h4>Email</h4>
        <FaEnvelopeOpen className={styles.icon} />
        <p>{unidadesdeSaude.email}</p>
      </div>

      <div className={styles.card}>
        <h4>Telefone</h4>
        <FaPhoneAlt className={styles.icon} />
        <p>{unidadesdeSaude.whatsapp}</p>
      </div>

      <div className={styles.card}>
        <h4>Instagram</h4>
        <FaInstagram className={styles.icon} />
        <p>{unidadesdeSaude.instagram}</p>
      </div>
    </div>
  );
}
