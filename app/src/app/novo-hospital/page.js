import HospitalForm from "@/components/Admin/Formularios/HospitalForm";
import PrivateRoute from "@/components/Admin/privateRouter";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";

export const metadata = {
  title: "Novo Hospital",
};
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
