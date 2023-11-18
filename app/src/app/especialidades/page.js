import EspecialidadeForm from "@/components/Admin/Formularios/EspecialidadeForm";
import PrivateRoute from "@/components/Admin/privateRouter";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";

export default function especialidade() {
  return (
    <PrivateRoute>
      <HeaderAdmin />
      <EspecialidadeForm />
    </PrivateRoute>
  );
}
