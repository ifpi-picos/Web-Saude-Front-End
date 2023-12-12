import PrivateRoute from "./privateRouter";

export default function CardProgressosFuncionario() {
  return (
    <PrivateRoute>
      <div className="analytics">
        <div className="card">
          <div className="card-head">
            <h2>340</h2>
            <span className="las la-eye"></span>
          </div>
          <div className="card-progress">
            <small>visualizações total de seus estabelecimentos</small>
            <div className="card-indicator">
              <div className="indicator verde" style={{ width: "80%" }}></div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h2>47</h2>
            <span className="las la-envelope"></span>
          </div>
          <div className="card-progress">
            <small>visualizações mensal</small>
            <div className="card-indicator">
              <div className="indicator azul" style={{ width: "80%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
