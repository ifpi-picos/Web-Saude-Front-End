import "../Usuarios/css/NomeDaClínica_Hospital.css";
import Image from "next/image";
import imagem from "../../components/imgs/doutor-vermais.svg";
import FiltroService from "@/services/FiltroService";
export default async function NomeDaClinica_Hospital({ nome }) {
  const unidadesdeSaude = await FiltroService.pegarUnidadedeSaude(nome);

  return (
    <section className="section-clinica-hospital">
      <div className="div-clinica-hospital">
        <h1>{unidadesdeSaude.nome}</h1>
      </div>
      <div className="img-clinica-hospital">
        <Image src={imagem} alt="img-clinica-hospital" />
      </div>
    </section>
  );
}
