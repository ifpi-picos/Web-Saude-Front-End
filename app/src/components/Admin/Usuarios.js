import React from "react";
import Link from "next/link";
import "@/components/Admin/css/Usuarios.css";

export default function Usuarios ({ usuarios }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(info => (
            <tr key={info.id}>
              <td>{info.nome}</td>
              <td>{info.email}</td>
              <td>
                <Link href={`/dashboard/usuario/nova-senha/${info.nome}`} className="button-usuarios">
                  Nova Senha
                </Link>
                <Link href={"/"} className="redButton">
                  Deletar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
