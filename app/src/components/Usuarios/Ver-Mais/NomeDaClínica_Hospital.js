import Image from "next/image";
import ConsultasService from "@/services/ConsultasService";
import "@/components/Usuarios/Ver-Mais/css/NomeUnidadeDeSaude.css";
export default async function NomeDaClinica_Hospital({ nome }) {
  const unidadesdeSaude = await ConsultasService.pegarUnidadedeSaude(nome);

  return (
    <section className="section-clinica-hospital">
      <div className="div-clinica-hospital">
        <h1>{unidadesdeSaude.nome}</h1>
      </div>
      <div className="img-clinica-hospital">
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
