import AlterarClincaForm from "@/components/Admin/Formularios/AlterarClinicaForm";
import PrivateRoute from "@/components/Admin/privateRouter";
import ClinicaService from "@/services/ClinicaService";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import FiltroService from "@/services/FiltroService";
import NotFound from "@/app/not-found";
import Link from "next/link";
export default async function AlterarClinica({ params }) {
  const clinicaData = await ClinicaService.pegarClinica(params.nome);

  const unidadesdeSaude = await FiltroService.pegarUnidadedeSaude(params.nome);

  if (unidadesdeSaude.length === 0) {
    return <NotFound />;
  }
  return (
    <PrivateRoute>
      <HeaderAdmin />
      <div className="page-header">
        <Link
          href="/dashboard"
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "8px",
          }}
        >
          Dashboard
        </Link>
      </div>
      <AlterarClincaForm clinicaData={clinicaData} nome={params.nome} />
    </PrivateRoute>
  );
}
