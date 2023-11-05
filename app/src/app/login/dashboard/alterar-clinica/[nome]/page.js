import AlterarClincaForm from "@/components/Admin/Formularios/AlterarClinicaForm";
import ClinicaService from "@/services/ClinicaService";

export default async function AlterarClinica({params}){
       const clinicaData = await ClinicaService.pegarClinica(params.nome)
    return(
        <AlterarClincaForm clinicaData={clinicaData} nome={params.nome} />

    )
}