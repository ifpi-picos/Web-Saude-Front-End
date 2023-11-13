import EspecialidadeForm from "@/components/Admin/Formularios/EspecialidadeForm";
import PrivateRoute from "@/components/Admin/privateRouter";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import Link from "next/link";
export default function especialidade() {
  return (
    <PrivateRoute>
      <HeaderAdmin/>
      <div className="page-header">
       <Link href="/dashboard" style={{display:"flex",justifyContent:"center",fontSize:"20px",fontWeight:"bold",marginBottom:"-45px",marginTop:"10px"}}>Dashboard</Link>
      </div>
      <EspecialidadeForm />
    </PrivateRoute>
  );
}
