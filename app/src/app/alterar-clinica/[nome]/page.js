import AlterarClincaForm from "@/components/Admin/Formularios/AlterarClinicaForm";
import PrivateRoute from "@/components/Admin/privateRouter";
import ConsultasService from "@/services/ConsultasService";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import NotFound from "@/app/not-found";
export default async function AlterarClinica({ params }) {
  const clinicaData = await ConsultasService.pegarClinica(params.nome);
  const unidadesdeSaude = await ConsultasService.pegarUnidadedeSaude(
    params.nome
  );

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
