import React from "react";
import "@/components/Admin/css/Usuarios.css";

export default function Usuarios({ usuarios }) {
  const HandleDeletar = async userId => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://api-web-saude.vercel.app/deletar-usuario/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        console.error("Erro ao enviar os dados.");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
                <a
                  href={`/dashboard/usuario/nova-senha/${info.nome}`}
                  className="button-usuarios"
                >
                  Nova Senha
                </a>
                <button
                  className="redButton"
                  onClick={e => {
                    e.preventDefault();
                    const confirmDelete = window.confirm(
                      `Tem certeza que deseja deletar o usuário ${info.nome}?`
                    );
                    if (confirmDelete) {
                      HandleDeletar(info._id);
                    }
                  }}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
