import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/components/Usuarios/css/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerDistributed}>
      <div className={styles.footerLeft}>
        <Image src="/imgs/logo.png" width={200} height={200} alt="Logo" />
        <p>
          <Link href="/faleconosco">Fale Conosco</Link>
        </p>
        <p>Web Saúde © 2023</p>
      </div>

      <div className={styles.footerCenter}>
        <div>
          <h3>Contato</h3>
          <p>
            <Link href="#">email@.com</Link>
          </p>
        </div>
      </div>

      <div className={styles.footerRight}>
        <h3>Sobre Nós</h3>
        <p>
          O Web Saúde é uma plataforma que auxilia as pessoas que desconhecem
          informações essenciais sobre hospitais ou clínicas em Picos - PI,
          mostrando especialidades, horários e localizações.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
