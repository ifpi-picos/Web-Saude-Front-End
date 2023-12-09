import Image from "next/image";
import styles from "@/components/Usuarios/Home/css/Slogan.module.css";

export default function Slogan() {
  return (
    <section className={styles.sectionSlogan}>
      <div className={styles.divContent}>
        <h1>Web Saúde</h1>
        <p>A Saúde mais perto de você</p>
      </div>
      <div className={styles.imgSlogan}>
        <Image src="/imgs/medicos.svg" width={200} height={200} alt="slogan" />
      </div>
    </section>
  );
}
