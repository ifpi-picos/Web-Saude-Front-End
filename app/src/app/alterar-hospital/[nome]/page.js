import AlterarHospitalForm from "@/components/Admin/Formularios/AlterarHospitalForm";
import PrivateRoute from "@/components/Admin/privateRouter";
import HospitalService from "@/services/HospitalService";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import FiltroService from "@/services/FiltroService";
import NotFound from "@/app/not-found";
export default async function alterarHospital({ params }) {
  const hospitalData = await HospitalService.pegarHospital(params.nome);

  const unidadesdeSaude = await FiltroService.pegarUnidadedeSaude(params.nome);

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
