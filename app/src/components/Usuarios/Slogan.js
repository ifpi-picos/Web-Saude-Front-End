import Slogam from "@/components/imgs/medicos.svg";
import Image from "next/image";
export default function Slogan() {
  return (
    <section className="section-slogan">
      <div className="div-content">
        <h1>Web Saúde</h1>
        <p>A Saúde mais perto de você</p>
      </div>
      <div className="img-slogan">
        <Image src={Slogam} alt="slogan" />
      </div>
    </section>
  );
}
