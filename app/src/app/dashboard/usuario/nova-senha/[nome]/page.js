import NovaSenhaForm from "@/components/Admin/Formularios/NovaSenhaForm";
import PrivateRoute from "@/components/Admin/privateRouter";

export default function NovaSenha({ params }) {
  return (
    <PrivateRoute>
      <NovaSenhaForm nome={params.nome} />
    </PrivateRoute>
  );
}
