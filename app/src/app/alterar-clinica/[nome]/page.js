import AlterarClincaForm from "@/components/Admin/Formularios/AlterarClinicaForm";
import PrivateRoute from "@/components/Admin/privateRouter";
import ClinicaService from "@/services/ClinicaService";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import FiltroService from "@/services/FiltroService";
import NotFound from "@/app/not-found";
export default async function AlterarClinica({ params }) {
  const clinicaData = await ClinicaService.pegarClinica(params.nome);

  const unidadesdeSaude = await FiltroService.pegarUnidadedeSaude(params.nome);

  if (unidadesdeSaude.length === 0) {
    return <NotFound />;
  }
  return (
    <PrivateRoute>
      <HeaderAdmin />
      <AlterarClincaForm clinicaData={clinicaData} nome={params.nome} />
    </PrivateRoute>
  );
}
