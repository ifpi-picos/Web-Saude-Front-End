import "../Usuarios/css/CardSobre.css";
import Card from "react-bootstrap/Card";
import FiltroService from "@/services/FiltroService";
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
