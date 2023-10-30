import HospitalForm from "@/components/Admin/Formularios/HospitalForm";
import "@/components/Admin/Formularios/css/Form.css";
import PrivateRoute from "@/components/Admin/privateRouter";

export default function CadastrarHospital() {
  return (
    <PrivateRoute>
    <main className="main">
      <HospitalForm />
    </main>
    </PrivateRoute>
  );
}
