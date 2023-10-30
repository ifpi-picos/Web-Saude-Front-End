import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import CardAdmin from "@/components/Admin/CardAdmin";
import CardProgressos from "@/components/Admin/CardProgressos";
import FiltroService from "@/services/FiltroService";
import PrivateRoute from "@/components/Admin/privateRouter";
import "@/components/Admin/css/Dashboard.css";

export default async function Dashboard() {
  const informacao = await FiltroService.unidadesdeSaude();

  return (
    <PrivateRoute>
    <div className="main-content">
      <HeaderAdmin />

      <div className="page-header">
        <h1>Dashboard</h1>
        <small>Home / Dashboard</small>
      </div>

      <div className="page-content">
        <CardProgressos />
        <div className="registros table-responsive">
          <div className="registro-header">
            <div className="add">
              <button style={{ marginRight: "10px" }}>Buscar</button>
              <select name="" id="">
                <option value="">ID</option>
              </select>
            </div>

            <div className="browse">
              <input type="search" placeholder="Search" class="record-search" />
            </div>
          </div>
        </div>
        <CardAdmin informacao={informacao} />
      </div>
    </div>
    </PrivateRoute>

  );
}
