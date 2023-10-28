import { FaEnvelopeOpen } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import FiltroService from "@/services/FiltroService";
import "@/components/Usuarios/Ver-Mais/css/Contato.css"

export default async function Contato({ nome }) {
  const unidadesdeSaude = await FiltroService.pegarUnidadedeSaude(nome);

  return (
    <div id="contatos" className="contact-info">
      <div className="card">
        <h4>Email</h4>
        <FaEnvelopeOpen className="icon" />
        <p>{unidadesdeSaude.email}</p>
      </div>

      <div className="card">
        <h4>Telefone</h4>
        <FaPhoneAlt className="icon" />
        <p>{unidadesdeSaude.whatsapp}</p>
      </div>

      <div className="card">
        <h4>instagram</h4>
        <FaInstagram className="icon" />
        <p>{unidadesdeSaude.instagram}</p>
      </div>
    </div>
  );
}
