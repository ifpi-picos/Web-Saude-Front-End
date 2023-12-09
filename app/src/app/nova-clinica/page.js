import ClinicaForm from "@/components/Admin/Formularios/ClinicaForm";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import PrivateRoute from "@/components/Admin/privateRouter";

export const metadata = {
  title: "Nova Clínica",
};
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
