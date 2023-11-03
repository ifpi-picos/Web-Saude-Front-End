import ClinicaForm from "@/components/Admin/Formularios/ClinicaForm";
import "@/components/Admin/Formularios/css/Form.css";
import PrivateRoute from "@/components/Admin/privateRouter";

export default function CadastrarClinica() {
  return (
    <PrivateRoute>
      <main className="main">
        <ClinicaForm />
      </main>
    </PrivateRoute>
  );
}
