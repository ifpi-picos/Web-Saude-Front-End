"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
function ErrorPage({ statusCode }) {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center">
        <Image src="/imgs/undraw_server_down_s-4-lk.svg" alt="Erro" width={300} height={300} />
        <h1 className="display-4">Oops! Algo deu errado.</h1>
        <p className="lead">
          Ocorreu um erro ({statusCode}). Lamentamos pelo inconveniente.
        </p>
        <p>
          Parece que algo não está funcionando como esperado. Aqui estão algumas
          coisas que você pode fazer:
        </p>
        <ul className="list-unstyled">
          <li>Verifique sua conexão com a internet.</li>
          <li>Tente novamente mais tarde.</li>
        </ul>
        <p>
          Se o problema persistir, entre em contato com nossa equipe de suporte
          em <a href="mailto:suporte@seuapp.com">suporte@seuapp.com</a>.
        </p>
        <Link className="btn btn-primary" href="/">
          Voltar à Página Inicial
        </Link>
      </div>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
