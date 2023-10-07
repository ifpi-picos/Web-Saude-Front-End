"use client";
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
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Integer posuere erat a ante. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Integer posuere erat a ante.{" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Integer posuere erat a ante. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Integer posuere erat a ante.{" "}
          </p>
          <footer className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </footer>
        </section>
      </Card.Body>
    </Card>
  );
}
