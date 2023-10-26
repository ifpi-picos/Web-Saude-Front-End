import "../Usuarios/css/CardInformativo.css";
import Link from "next/link";
import Image from "next/image";
import FiltroService from "@/services/FiltroService";

export default async function CardInformativo({ nome }) {
  const unidadesdeSaude = await FiltroService.pegarUnidadedeSaude(nome);
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
          <h3>
            <Link href="#mapa">Mapa</Link>
          </h3>
          <p>
            {unidadesdeSaude.endereco.rua}, {unidadesdeSaude.endereco.numero} -{" "}
            {unidadesdeSaude.endereco.bairro}, {unidadesdeSaude.endereco.cidade}{" "}
            - {unidadesdeSaude.endereco.uf}, {unidadesdeSaude.endereco.cep}
          </p>
          <hr />
          <div className="div-atalhos">
            <ul>
              <li>
                <Link className="btn" href="#sobre">
                  Sobre
                </Link>
              </li>
              <li>
                <Link className="btn" href="#horario">
                  Horário
                </Link>
              </li>
              <li>
                <Link className="btn" href="#contato">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
