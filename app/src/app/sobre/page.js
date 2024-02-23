import CardsSobres from "@/components/Usuarios/PageSobre/CardsSobre";
import Footer from "@/components/Usuarios/Footer";
import Header from "@/components/Usuarios/Header";
import TituloSobre from "@/components/Usuarios/PageSobre/TituloSobre";
import styles from "@/components/Usuarios/css/Sobre.module.css"; 

export const metadata = {
  title: "Sobre",
};
export default function Sobre() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <TituloSobre />
        <CardsSobres />
      </main>
      <Footer />
    </>
  );
}
