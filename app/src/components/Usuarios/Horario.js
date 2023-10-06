import "../Usuarios/css/Horario.css";
import Clinica from "@/services/Clinica";

export default async function Horario({ nome }) {
  const clinica = await Clinica.pegarClinica(nome)
 
  return (
    <section id="horario" className="section-horario">
      <table className="table table-light table-striped table-bordered">
        <thead>
          <tr>
            <th
              colSpan="4"
              style={{ backgroundColor: "white", color: "black" }}
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
            <td>{clinica.horarioSemana?.open}</td>
            <td>{clinica.horarioSemana?.close}</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Terça</td>
            <td>{clinica.horarioSemana?.open}</td>
            <td>{clinica.horarioSemana?.close}</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Quarta</td>
            <td>{clinica.horarioSemana?.open}</td>
            <td>{clinica.horarioSemana?.close}</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Quinta</td>
            <td>{clinica.horarioSemana?.open}</td>
            <td>{clinica.horarioSemana?.close}</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Sexta</td>
            <td>{clinica.horarioSemana?.open}</td>
            <td>{clinica.horarioSemana?.close}</td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td>Sabado</td>
            <td>{clinica.Sabado?.open || "Fechado"} </td>
            <td>{clinica.Sabado?.close || "Fechado"} </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
