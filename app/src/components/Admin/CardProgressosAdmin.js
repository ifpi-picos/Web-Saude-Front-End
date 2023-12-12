import PrivateRoute from "./privateRouter";

export default function CardProgressosAdmin() {
  return (
    <PrivateRoute>
      <div className="analytics">
        <div className="card">
          <div className="card-head">
            <h2>340</h2>
            <span className="las la-eye"></span>
          </div>
          <div className="card-progress">
            <small>Visualizações Total Do Site</small>
            <div className="card-indicator">
              <div className="indicator roxo" style={{ width: "80%" }}></div>
            </div>
          </div>
          
        </div>
        <div className="card">
          <div className="card-head">
            <h2>340</h2>
            <span className="las la-eye"></span>
          </div>
          <div className="card-progress">
            <small>Quantidade de Unidades De Saúde</small>
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
            <small>Usuários Ativos</small>
            <div className="card-indicator">
              <div className="indicator azul" style={{ width: "80%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
