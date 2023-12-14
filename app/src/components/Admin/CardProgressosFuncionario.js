import React from "react";
import { FaEye } from "react-icons/fa";
import PrivateRoute from "./privateRouter";

export default function CardProgressosFuncionario() {
  return (
    <PrivateRoute>
      <div className="analytics">
        <div className="card">
          <div className="card-head">
            <h2>340</h2>
            <FaEye className="icon" size={25} />
          </div>
          <div className="card-progress">
            <small>Visualizações total de seus Estabelecimentos</small>
            <div className="card-indicator">
              <div className="indicator verde" style={{ width: "80%" }}></div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h2>47</h2>
            <FaEye className="icon" size={25} />
          </div>
          <div className="card-progress">
            <small>Visualizações mensais</small>
            <div className="card-indicator">
              <div className="indicator azul" style={{ width: "80%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
