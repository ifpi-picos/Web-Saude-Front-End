import Card from "react-bootstrap/Card";
import FiltroService from "@/services/FiltroService";
import "@/components/Usuarios/Ver-Mais/css/CardSobre.css"

export default async function CardSobre({ nome }) {
  const unidadesdeSaude = await FiltroService.pegarUnidadedeSaude(nome);

  return (
    <Card className="sobre">
      <Card.Header>Sobre</Card.Header>
      <Card.Body>
        <section className="mb-0">
          <p>{unidadesdeSaude.descricao}</p>
        </section>
      </Card.Body>
    </Card>
  );
}
