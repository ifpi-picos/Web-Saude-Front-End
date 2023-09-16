import CardsSobres from "@/components/Usuarios/CardsSobre";
import Footer from "@/components/Usuarios/Footer";
import Header from "@/components/Usuarios/Header";
import TituloSobre from "@/components/Usuarios/TituloSobre";
import "@/components/Usuarios/css/Sobre.css";
export default function Sobre() {
  return (
    <>
      <Header />
      <main>
        <TituloSobre />
        <CardsSobres />
      </main>
      <Footer />
    </>
  );
}
