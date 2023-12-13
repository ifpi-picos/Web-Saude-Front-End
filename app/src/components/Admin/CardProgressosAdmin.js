"use client";
import React, { Component } from "react";
import PrivateRoute from "./privateRouter";
import ConsultasService from "@/services/ConsultasService";

class CardProgressosAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalUnidadesDeSaude: 0,
      totalUsuarios: 0,
    };

    this.fetchDataUsuarios();
    this.fetchDataUnidadesDeSaude();
  }

  async fetchDataUnidadesDeSaude() {
    try {
      const result = await ConsultasService.pegarTotalDasUnidadesDeSaude();
      this.setState({ totalUnidadesDeSaude: result.total });
    } catch (error) {
      console.error("Erro ao obter dados de unidades de saúde:", error);
    }
  }

  async fetchDataUsuarios() {
    try {
      const result = await ConsultasService.pegarTotalDeUsuarios();
      this.setState({ totalUsuarios: result.total });
    } catch (error) {
      console.error("Erro ao obter dados de usuários:", error);
    }
  }

  calcularPorcentagem(valor, total) {
    return total !== 0 ? (valor / total) * 100 : 0;
  }

  render() {
    const isAdminPage =
      typeof window !== "undefined" &&
      window.location.pathname === "/dashboard";

    return (
      <PrivateRoute>
        <div className="analytics">
          <div className="card">
            <div className="card-head">
              <h2>{this.state.totalUnidadesDeSaude}</h2>
              <span className="las la-eye"></span>
            </div>
            <div className="card-progress">
              <small>Quantidade de Unidades De Saúde</small>
              <div className="card-indicator">
                <div
                  className="indicator verde"
                  style={{
                    width: `${this.calcularPorcentagem(
                      this.state.totalUnidadesDeSaude,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          {isAdminPage && (
            <div className="card">
              <div className="card-head">
                <h2>{this.state.totalUsuarios}</h2>
                <span className="las la-envelope"></span>
              </div>
              {}
              <div className="card-progress">
                <small>Usuários Ativos</small>
                <div className="card-indicator">
                  <div
                    className="indicator azul"
                    style={{
                      width: `${this.calcularPorcentagem(
                        this.state.totalUsuarios,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </PrivateRoute>
    );
  }
}

export default CardProgressosAdmin;
