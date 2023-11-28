import NotFound from "@/app/not-found";
import NovaSenhaForm from "@/components/Admin/Formularios/NovaSenhaForm";
import PrivateRoute from "@/components/Admin/privateRouter";
import ConsultasService from "@/services/ConsultasService";
export default async function NovaSenha({ params }) {
  const usuario = await ConsultasService.pegarUsuarioPeloNome(params.nome);

  if (usuario.length === 0) {
    return <NotFound />;
  }
  return (
    <PrivateRoute>
      <NovaSenhaForm nome={params.nome} />
    </PrivateRoute>
  );
}
