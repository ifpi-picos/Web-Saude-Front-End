import ClinicaForm from "@/components/Admin/Formularios/ClinicaForm";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import PrivateRoute from "@/components/Admin/privateRouter";
import "@/components/Admin/Formularios/css/Form.css";
export default function CadastrarClinica() {
  return (
    <PrivateRoute>
      <HeaderAdmin />
      <main className="main">
        <ClinicaForm />
      </main>
    </PrivateRoute>
  );
}
