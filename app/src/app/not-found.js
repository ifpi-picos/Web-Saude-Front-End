import Image from "next/image";
import Link from "next/link";
import error from "@/components/imgs/undraw_page_not_found_re_e9o6.svg";
import "@/app/not-found.css";
export default function NotFound() {
  return (
    <section className="section-erro">
      <div className="div-img">
        <Image
          src={error}
          className="img-erro"
          alt="img-erro"
          width={300}
          height={300}
        />
      </div>
      <div className="div-erro">
        <div className="div-info">
          <h1>OPS Página não encontrada</h1>
        </div>
        <div className="div-button">
          <Link href="/">Página Inicial</Link>
        </div>
      </div>
    </section>
  );
}
