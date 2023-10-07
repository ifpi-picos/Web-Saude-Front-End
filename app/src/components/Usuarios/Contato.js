import { FaEnvelopeOpen } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import "../Usuarios/css/Contato.css";
import Clinica from "@/services/ClinicaService";

export default async function Contato({ nome }) {
  const clinica = await Clinica.pegarClinica(nome);

  return (
    <div id="contatos" className="contact-info">
      <div className="card">
        <h4>Email</h4>
        <FaEnvelopeOpen className="icon" />
        <p>{clinica.email}</p>
      </div>

      <div className="card">
        <h4>Telefone</h4>
        <FaPhoneAlt className="icon" />
        <p>{clinica.whatsapp}</p>
      </div>

      <div className="card">
        <h4>instagram</h4>
        <FaInstagram className="icon" />
        <p>{clinica.instagram}</p>
      </div>
    </div>
  );
}
