import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import CardAdmin from "@/components/UsuariosAndAdmin/Card";
import CardProgressos from "@/components/Admin/CardProgressos";
import PrivateRoute from "@/components/Admin/privateRouter";
import Link from "next/link";
import ConsultasService from "@/services/ConsultasService";
import FiltroAdmin from "@/components/Admin/FiltrosAdmin";
import PesquisaAdmin from "@/components/Admin/PesquisaAdmin";
import styles from "@/components/Admin/css/Usuarios.module.css";

export const metadata = {
  title: "Hospitais",
};

export default async function Hospitais() {
  const hospitais = await ConsultasService.pegarHospitais();

  return (
    <PrivateRoute>
      <div className={styles.mainContent}>
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
          <CardAdmin informacao={hospitais} />
        </div>
      </div>
    </PrivateRoute>
  );
}
