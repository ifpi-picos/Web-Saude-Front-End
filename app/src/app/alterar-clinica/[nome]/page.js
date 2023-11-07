import AlterarClincaForm from "@/components/Admin/Formularios/AlterarClinicaForm";
import PrivateRoute from "@/components/Admin/privateRouter";
import ClinicaService from "@/services/ClinicaService";

export default async function AlterarClinica({ params }) {
  const clinicaData = await ClinicaService.pegarClinica(params.nome);
  return (
    <PrivateRoute>
      <AlterarClincaForm clinicaData={clinicaData} nome={params.nome} />
    </PrivateRoute>
  );
}
