import HospitalForm from "@/components/Admin/Formularios/HospitalForm";
import "@/components/Admin/Formularios/css/Form.css";
import PrivateRoute from "@/components/Admin/privateRouter";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import Link from "next/link";
export default function CadastrarHospital() {
  return (
    <PrivateRoute>
      <HeaderAdmin />
      <div className="page-header">
        <Link
          href="/dashboard"
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "8px",
          }}
        >
          Dashboard
        </Link>
      </div>
      <main className="main">
        <HospitalForm />
      </main>
    </PrivateRoute>
  );
}
