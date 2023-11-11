"use client";
import { slide as Menu } from "react-burger-menu";
import Link from "next/link";
import Image from "next/image";
import "../Usuarios/css/Header.css";

export default function Header() {
  return (
    <header className="container-menu">
      <div className="logo">
        <Link href="/">
          <Image
            src="/imgs/logo.png"
            alt="logo"
            width={200}
            height={200}
            className="customisar-imagem"
          />
        </Link>
      </div>
      <div className="menuVisible">
        <nav>
          <ul>
            <div className="button-entrar">
              <Link href="/login">ENTRAR</Link>
            </div>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/sobre">Sobre</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="burgerVisible">
        <Menu right>
          <div className="button-entrar">
            <Link href="/login">ENTRAR</Link>
          </div>

          <Link href="/" className="menu-items">
            Home
          </Link>
          <Link href="/sobre" className="menu-items">
            Sobre
          </Link>
        </Menu>
      </div>
    </header>
  );
}
