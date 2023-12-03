import NotFound from "@/app/not-found";
import NovaSenhaForm from "@/components/Admin/Formularios/NovaSenhaForm";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import PrivateRoute from "@/components/Admin/privateRouter";
import ConsultasService from "@/services/ConsultasService";

export const metadata = {
  title: "Nova Senha",
};
export default async function NovaSenha({ params }) {
  const usuario = await ConsultasService.pegarUsuarioPeloNome(params.nome);

  if (usuario.length === 0) {
    return <NotFound />;
  }
  return (
    <PrivateRoute>
      <HeaderAdmin />
      <NovaSenhaForm nome={params.nome} />
    </PrivateRoute>
  );
}
