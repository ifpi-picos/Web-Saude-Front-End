import AlterarClincaForm from "@/components/Admin/Formularios/AlterarClinicaForm";

export default function AlterarClinica({params}){

    return(
        <AlterarClincaForm id={params.id}/>
    )
}