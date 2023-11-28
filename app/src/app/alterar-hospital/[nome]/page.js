import AlterarHospitalForm from "@/components/Admin/Formularios/AlterarHospitalForm";
import PrivateRoute from "@/components/Admin/privateRouter";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import ConsultasService from "@/services/ConsultasService";
import NotFound from "@/app/not-found";
export default async function alterarHospital({ params }) {
  const hospitalData = await ConsultasService.pegarHospital(params.nome);

  const unidadesdeSaude = await ConsultasService.pegarUnidadedeSaude(
    params.nome
  );

  if (unidadesdeSaude.length === 0) {
    return <NotFound />;
  }
  return (
    <PrivateRoute>
      <HeaderAdmin />
      <AlterarHospitalForm hospitalData={hospitalData} nome={params.nome} />
    </PrivateRoute>
  );
}
