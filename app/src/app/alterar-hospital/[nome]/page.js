import AlterarHospitalForm from "@/components/Admin/Formularios/AlterarHospitalForm";
import PrivateRoute from "@/components/Admin/privateRouter";
import HospitalService from "@/services/HospitalService";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import Link from "next/link";
export default async function alterarHospital({ params }) {
  const hospitalData = await HospitalService.pegarHospital(params.nome);

  return (
    <PrivateRoute>
      <HeaderAdmin/>
      <div className="page-header">
       <Link href="/dashboard" style={{display:"flex",justifyContent:"center",fontSize:"20px",fontWeight:"bold",marginTop:"8px"}}>Dashboard</Link>
      </div>
      <AlterarHospitalForm hospitalData={hospitalData} nome={params.nome} />
    </PrivateRoute>
  );
}
