"use client";
import CadastrarUsuarioForm from "@/components/Admin/Formularios/CadastrarUsuarioForm";
import PrivateRoute from "@/components/Admin/privateRouter";

export default function NovoUsuario() {
  return (
    <PrivateRoute>
      <CadastrarUsuarioForm />;
    </PrivateRoute>
  );
}
