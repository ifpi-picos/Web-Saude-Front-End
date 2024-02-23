"use client";
import { slide as Menu } from "react-burger-menu";
import Link from "next/link";
import Image from "next/image";
import "@/components/Usuarios/css/Header.css"

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
              <a href="/login">ENTRAR</a>
            </div>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/sobre">Sobre</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="burgerVisible">
        <Menu right>
          <div className="button-entrar">
            <a href="/login">ENTRAR</a>
          </div>

          <a href="/" className="menu-items">
            Home
          </a>
          <a href="/sobre" className="menu-items">
            Sobre
          </a>
        </Menu>
      </div>
    </header>
  );
}
