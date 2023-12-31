import "@/components/Usuarios/css/FaleConosco.css";
import Footer from "@/components/Usuarios/Footer";
import Header from "@/components/Usuarios/Header";
import Image from "next/image";

export const metadata = {
  title: "Fale Conosco",
};
export default function FaleConosco() {
  return (
    <>
      <Header />
      <section className="section-form">
        <div className="div-form">
          <form action="#">
            <div className="div-logo">
              <Image
                className="image-logo"
                src="/imgs/logo.png"
                width={200}
                height={200}
                alt="logo"
              />
            </div>

            <h1 className="title">Fale Conosco</h1>
            <div className="div-inputs">
              <label for="nome">Nome</label>
              <input type="text" name="" id="" />
              <label for="email">Email</label>
              <input type="email" name="" id="" />
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Mensagem"
              ></textarea>
            </div>
            <div className="div-button">
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
