import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "@/components/Usuarios/Ver-Mais/css/Especialidades.css"
export default function Especialidades({ nome }) {
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    fetch(`https://api-web-saude.vercel.app/especialidades/${nome}`)
      .then(response => response.json())
      .then(data => setEspecialidades(data));
  }, [nome]);

  return (
      <Card className="card-especialidades">
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>Especialidades</Card.Title>
          <Card.Text>
            {especialidades.map((especialidade, index) => (
              <span key={index}>
                {especialidade.nome}
                {index !== especialidades.length - 1 ? ", " : "."}

              </span>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
  );
}
