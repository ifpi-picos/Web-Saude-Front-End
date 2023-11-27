"use client";
import CadstrarUsuarioForm from "@/components/Admin/Formularios/CadastrarUsuarioForm";
import PrivateRoute from "@/components/Admin/privateRouter";

export default function NovoUsuario() {

  return (
    <PrivateRoute>
      <CadstrarUsuarioForm />;
    </PrivateRoute>
  )
}
