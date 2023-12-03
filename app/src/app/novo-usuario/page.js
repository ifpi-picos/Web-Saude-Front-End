"use client";
import CadastrarUsuarioForm from "@/components/Admin/Formularios/CadastrarUsuarioForm";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import PrivateRoute from "@/components/Admin/privateRouter";

export const metadata = {
  title: "Novo Usuário",
};
export default function NovoUsuario() {
  return (
    <PrivateRoute>
      <HeaderAdmin />
      <CadastrarUsuarioForm />;
    </PrivateRoute>
  );
}
