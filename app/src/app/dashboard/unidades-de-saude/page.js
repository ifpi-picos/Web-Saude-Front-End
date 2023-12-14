import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import CardAdmin from "@/components/UsuariosAndAdmin/Card";
import CardProgressosAdmin from "@/components/Admin/CardProgressosAdmin";
import PrivateRoute from "@/components/Admin/privateRouter";
import Link from "next/link";
import ConsultasService from "@/services/ConsultasService";
import FiltroAdmin from "@/components/Admin/FiltroAdmin";
import PesquisaAdmin from "@/components/Admin/PesquisaAdmin";
import "@/components/Admin/css/Dashboard.css";

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
          <CardProgressosAdmin />
          <div className="registros table-responsive">
            <div className="registro-header">
              <p className="titulo">
                <strong>
                  <h2>Unidades De Saúde</h2>
                </strong>
              </p>
            </div>
          </div>
          <FiltroAdmin />
          <PesquisaAdmin />
          <CardAdmin informacao={unidadesDeSaude} />
        </div>
      </div>
    </PrivateRoute>
  );
}
