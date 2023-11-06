import AlterarHospitalForm from "@/components/Admin/Formularios/AlterarHospitalForm";
import PrivateRoute from "@/components/Admin/privateRouter";
import HospitalService from "@/services/HospitalService";

export default async function alterarHospital({params}){
    const hospitalData = await HospitalService.pegarHospital(params.nome)

    return(
      <PrivateRoute>
        <AlterarHospitalForm hospitalData={hospitalData} nome={params.nome}/>
      </PrivateRoute>
    )
}