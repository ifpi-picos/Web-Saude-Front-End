import "../Usuarios/css/CardSobre.css";
import Clinica from "@/services/ClinicaService";

import Card from "react-bootstrap/Card";

export default async function CardSobre({ nome }) {
  const clinica = await Clinica.pegarClinica(nome);

  return (
    <Card className="sobre">
      <Card.Header>Sobre</Card.Header>
      <Card.Body>
        <section className="mb-0">
          <p>
            
           {clinica.descricao}
          </p>
        
        </section>
      </Card.Body>
    </Card>
  );
}
