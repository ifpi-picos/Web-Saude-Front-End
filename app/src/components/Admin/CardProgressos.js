export default function CardProgressos() {
  return (
    <div className="analytics">
      <div className="card">
        <div className="card-head">
          <h2>340,230</h2>
          <span className="las la-eye"></span>
        </div>
        <div className="card-progress">
          <small>visualizações de página</small>
          <div className="card-indicator">
            <div className="indicator two" style={{ width: "80%" }}></div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <h2>47,500</h2>
          <span className="las la-envelope"></span>
        </div>
        <div className="card-progress">
          <small>visualizações mensal</small>
          <div className="card-indicator">
            <div className="indicator four" style={{ width: "80%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
