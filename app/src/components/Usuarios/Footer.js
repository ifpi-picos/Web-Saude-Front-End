import React from "react";
import Link from "next/link";
import "@/components/Usuarios/css/Footer.css";
import Image from "next/image";
import Logo from "../imgs/logo.png";

export default function Footer() {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <Image src={Logo} width={200} alt="Logo" />
        <p className="footer-links">
          <Link href="/faleconosco" className="link-1">
            Fale Conosco
          </Link>
        </p>
        <p>Web Saúde © 2023</p>
      </div>

      <div className="footer-center">
        <div>
          <h3>Contato</h3>
          <p>
            <Link href="#">email@.com</Link>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <h3>Sobre Nós</h3>

        <p>
          O Web Saúde é uma plataforma que serve para auxiliar as pessoas que
          desconhecem informações essenciais sobre os hospitais ou clínicas que
          estão localizados na região de Picos - PI, mostrando as especialidades
          disponíveis, horário de atendimento ou até mesmo sua localização
          exata.
        </p>
      </div>
    </footer>
  );
}
