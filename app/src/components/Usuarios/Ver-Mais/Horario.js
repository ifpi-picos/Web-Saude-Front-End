import ConsultasService from "@/services/ConsultasService";
import "@/components/Usuarios/Ver-Mais/css/Horario.css";

export default async function Horario({ nome }) {
  const unidadesdeSaude = await ConsultasService.pegarUnidadedeSaude(nome);

  const isHorarioDiferenteDe24Horas =
    unidadesdeSaude.horario !== "Atendimento 24 Horas";

  if (isHorarioDiferenteDe24Horas) {
    return (
      <section id="horario" className="section-horario">
        <table className="table table-light table-striped table-bordered">
          <thead>
            <tr>
              <th
                colSpan="4"
                style={{ backgroundColor: "#00285f", color: "white" }}
              >
                Horário
              </th>
            </tr>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Dia</th>
              <th scope="col">Abertura</th>
              <th scope="col">Fechamento</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Domingo</td>
              <td>Fechado</td>
              <td>Fechado</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Segunda</td>
              <td>{unidadesdeSaude.horarioSemana?.open}</td>
              <td>{unidadesdeSaude.horarioSemana?.close}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Terça</td>
              <td>{unidadesdeSaude.horarioSemana?.open}</td>
              <td>{unidadesdeSaude.horarioSemana?.close}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Quarta</td>
              <td>{unidadesdeSaude.horarioSemana?.open}</td>
              <td>{unidadesdeSaude.horarioSemana?.close}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Quinta</td>
              <td>{unidadesdeSaude.horarioSemana?.open}</td>
              <td>{unidadesdeSaude.horarioSemana?.close}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Sexta</td>
              <td>{unidadesdeSaude.horarioSemana?.open}</td>
              <td>{unidadesdeSaude.horarioSemana?.close}</td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>Sábado</td>
              <td>{unidadesdeSaude.sabado?.open || "Fechado"}</td>
              <td>{unidadesdeSaude.sabado?.close || "Fechado"}</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  } else {
    return (
      <section id="horario" className="section-horario">
        <p>
          Este estabelecimento oferece atendimento 24 horas por dia, 7 dias por
          semana.
        </p>
      </section>
    );
  }
}
