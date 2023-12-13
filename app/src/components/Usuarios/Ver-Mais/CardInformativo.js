import Link from "next/link";
import Image from "next/image";
import ConsultasService from "@/services/ConsultasService";
import { FaMapMarkerAlt } from "react-icons/fa";
import "@/components/Usuarios/Ver-Mais/css/CardInformativo.css";
export default async function CardInformativo({ nome }) {
  const unidadesdeSaude = await ConsultasService.pegarUnidadedeSaude(nome);
  return (
    <section className="section-informações">
      <div className="card-informacoes">
        <div className="top">
          <div className="image-container">
            <Image
              src={unidadesdeSaude.imagem}
              alt="Imagem da Clínica"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="button">
          <p className={"status"}>
            Status:
            <span
              className={
                unidadesdeSaude.status === true
                  ? "statusAberto"
                  : "statusFechado"
              }
            >
              {" "}
              {unidadesdeSaude.status === true ? "Aberto" : "Fechado"}
            </span>
          </p>
          <h3>{unidadesdeSaude?.nome}</h3>
          <div className="divEndereco">
            <FaMapMarkerAlt className="enderecoIcon" />
            <p>
              {unidadesdeSaude?.endereco?.rua},{" "}
              {unidadesdeSaude?.endereco?.numero} -{" "}
              {unidadesdeSaude?.endereco?.bairro},{" "}
              {unidadesdeSaude?.endereco?.cidade} -{" "}
              {unidadesdeSaude?.endereco?.uf}, {unidadesdeSaude?.endereco?.cep}
            </p>
          </div>
          <hr />
          <div className="div-atalhos">
            <ul>
              <li>
                <Link className="btn" href="#sobre">
                  Comentários
                </Link>
              </li>
              <li>
                <Link className="btn" href="#galeria">
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
