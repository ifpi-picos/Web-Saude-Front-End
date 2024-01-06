import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import CardAdmin from "@/components/UsuariosAndAdmin/Card";
import CardProgressos from "@/components/Admin/CardProgressos";
import PrivateRoute from "@/components/Admin/privateRouter";
import Link from "next/link";
import ConsultasService from "@/services/ConsultasService";
import FiltroAdmin from "@/components/Admin/FiltrosAdmin";
import PesquisaAdmin from "@/components/Admin/PesquisaAdmin";

export const metadata = {
  title: "Unidades De Saude",
};

export default async function unidadesDeSaude() {
  const unidadesDeSaude = await ConsultasService.unidadesdeSaude();

  return (
    <PrivateRoute>
      <div className="main-content">
        <HeaderAdmin />
        <div className="page-header">
          <h1>Dashboard</h1>
          <small>
            <Link href="/">Home</Link> / <strong>Dashboard</strong>
          </small>
        </div>

        <div className="page-content">
          <CardProgressos />
          <PesquisaAdmin />
          <FiltroAdmin />
          <CardAdmin informacao={unidadesDeSaude} />
        </div>
      </div>
    </PrivateRoute>
  );
}
