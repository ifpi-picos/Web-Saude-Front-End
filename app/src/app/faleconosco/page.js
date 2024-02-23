import Footer from "@/components/Usuarios/Footer";
import Header from "@/components/Usuarios/Header";
import Image from "next/image";
import styles from "@/components/Usuarios/css/FaleConosco.module.css"; // Importando o CSS Module

export const metadata = {
  title: "Fale Conosco",
};

export default function FaleConosco() {
  return (
    <>
      <Header />
      <section className={styles.sectionForm}> 
        <div className={styles.divForm}>
          <form action="#">
            <div className={styles.divLogo}>
              <Image
                className={styles.imageLogo} 
                src="/imgs/logo.png"
                width={200}
                height={200}
                alt="logo"
              />
            </div>

            <h1 className={styles.title}>Fale Conosco</h1> 
            <div className={styles.divInputs}>
              <label htmlFor="nome">Nome</label>
              <input type="text" name="" id="" />
              <label htmlFor="email">Email</label>
              <input type="email" name="" id="" />
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Mensagem"
              ></textarea>
            </div>
            <div className={styles.divButton}> 
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
