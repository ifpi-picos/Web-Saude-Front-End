import ClinicaForm from "@/components/Admin/Formularios/ClinicaForm";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import PrivateRoute from "@/components/Admin/privateRouter";
import Link from "next/link";
import "@/components/Admin/Formularios/css/Form.css";
export default function CadastrarClinica() {
  return (
    <PrivateRoute>
      <HeaderAdmin/>
      <div className="page-header">
       <Link href="/dashboard" style={{display:"flex",justifyContent:"center",fontSize:"20px",fontWeight:"bold",marginTop:"8px"}}>Dashboard</Link>
      </div>
      <main className="main">
        <ClinicaForm />
      </main>
    </PrivateRoute>
  );
}
