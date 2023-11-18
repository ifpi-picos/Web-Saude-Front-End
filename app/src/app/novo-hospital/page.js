import HospitalForm from "@/components/Admin/Formularios/HospitalForm";
import "@/components/Admin/Formularios/css/Form.css";
import PrivateRoute from "@/components/Admin/privateRouter";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
export default function CadastrarHospital() {
  return (
    <PrivateRoute>
      <HeaderAdmin />
      <main className="main">
        <HospitalForm />
      </main>
    </PrivateRoute>
  );
}
