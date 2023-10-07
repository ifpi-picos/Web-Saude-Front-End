import "../Usuarios/css/CardInformativo.css";
import Link from "next/link";
import Image from "next/image";
import Clinica from "@/services/ClinicaService";

export default async function CardInformativo({ nome }) {
  const clinica = await Clinica.pegarClinica(nome);
  return (
    <section className="section-informações">
      <div className="card-informacoes">
        <div className="top">
          <div className="image-container">
            <Image
              src={clinica.imagem}
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
            {clinica.endereco.rua}, {clinica.endereco.numero} -{" "}
            {clinica.endereco.bairro}, {clinica.endereco.cidade} -{" "}
            {clinica.endereco.uf}, {clinica.endereco.cep}
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
